using OWML.Common;
using Sfs2X.Core;
using Sfs2X.Entities.Data;
using Sfs2X.Requests;
using System;
using System.Collections;
using UnityEngine;

namespace OuterWildsOnline.SyncObjects
{
    public class PlayerToSendSync : ObjectToSendSync
    {
        private UnityEngine.UI.Text pingText;
        private void PingPongHandler(BaseEvent evt)
        {
            if (pingText != null) { pingText.text = (int)evt.Params["lagValue"] + "ms"; }
        }

        private PlayerCharacterController playerCharacterController;
        private JetpackThrusterModel jetpackThrusterModel;
        private Transform playerCamera;
        protected override void Awake()
        {
            playerCharacterController = FindObjectOfType<PlayerCharacterController>();
            jetpackThrusterModel = FindObjectOfType<JetpackThrusterModel>();
           
            playerCharacterController.OnJump += PlayerJump;
            playerCharacterController.OnBecomeGrounded += PlayerGrounded;
            playerCharacterController.OnBecomeUngrounded += PlayerUngrounded;

            jetpackThrusterModel.OnStartTranslationalThrust += PlayerStartedTranslationalThrust;
            jetpackThrusterModel.OnStopTranslationalThrust += PlayerStoppedTranslationalThrust;

            sfs.AddEventListener(SFSEvent.PING_PONG, PingPongHandler);
            SortOutListeners();

            SetObjectName("Player");
            base.Awake();

            ObjectData.PutBool("light", PlayerState.IsFlashlightOn());
            ObjectData.PutBool("suit", PlayerState.IsWearingSuit());
            ObjectData.PutUtfString("colour", ConnectionController.ModHelperInstance.Config.GetSettingsValue<string>("playerColour"));
            SetPlayerColour();
        }
        protected override void Start()
        {
            base.Start();
            playerCamera = Locator.GetPlayerCamera().transform;

            StartCoroutine(SendPlayerData());
            ConnectionController.SetPlayerRepresentationObject(this);
        }

        protected override void OnDestroy()
        {
            playerCharacterController.OnJump -= PlayerJump;
            playerCharacterController.OnBecomeGrounded -= PlayerGrounded;
            playerCharacterController.OnBecomeUngrounded -= PlayerUngrounded;

            jetpackThrusterModel.OnStartTranslationalThrust -= PlayerStartedTranslationalThrust;
            jetpackThrusterModel.OnStopTranslationalThrust -= PlayerStoppedTranslationalThrust;

            sfs.RemoveEventListener(SFSEvent.PING_PONG, PingPongHandler);
            RemoveFromListeners();

            base.OnDestroy();
        }

        protected override void OnSync(SFSObject syncData)
        {
            base.OnSync(syncData);

            //Sync Head Rotation
            Vector3 localRotation = playerCamera.localEulerAngles;
            syncData.PutFloat("hrotx", localRotation.x);
            syncData.PutFloat("hroty", localRotation.y);
            syncData.PutFloat("hrotz", localRotation.z);
        }

        private IEnumerator SendPlayerData() //Sends less-important client data to other players, such as the thrusters and crouching
        {
            yield return new WaitForSecondsRealtime(2f);
            while (true)
            {
                var data = new SFSObject();

                //if (playerCharacterController.GetJumpCrouchFraction() != 0) TODO: send only when needed (JFC is not 0 and one after it is)
                {
                    data.PutFloat("jcf", playerCharacterController.GetJumpCrouchFraction());
                }

                Vector3 relativeGroundVelocity = playerCharacterController.GetRelativeGroundVelocity();
                data.PutFloat("rgvx", relativeGroundVelocity.x);
                data.PutFloat("rgvy", relativeGroundVelocity.y);
                data.PutFloat("rgvz", relativeGroundVelocity.z);

                if (jetpackThrusterModel.IsTranslationalThrusterFiring())
                {
                    data.PutFloat("tmla", jetpackThrusterModel.GetLocalAcceleration().y);

                    ThrusterFlameController[] thrusters = Locator.GetPlayerTransform().Find("PlayerVFX/Thrusters").GetComponentsInChildren<ThrusterFlameController>(true);
                    for (int i = 0; i < thrusters.Length; i++) //10 thrusters
                    {
                        if (Vector3.Dot(jetpackThrusterModel.GetLocalAcceleration(), thrusters[i]._thrusterFilter) > 0)
                        {
                            data.PutBool("thr," + i, true);
                        }
                        else
                        {
                            data.PutBool("thr," + i, false);
                        }
                    }
                }
                data.PutUtfString("objectName", ObjectName);
                data.PutInt("objectId", ObjectId);
                sfs.Send(new ExtensionRequest("SyncObject", data, sfs.LastJoinedRoom));
                yield return new WaitForSecondsRealtime(0.1f);
            }
        }
        public override void ConfigChanged(IModConfig config)
        {
            ObjectData.PutUtfString("colour", ConnectionController.ModHelperInstance.Config.GetSettingsValue<string>("playerColour"));
            SetPlayerColour();
            ConnectionController.Instance.UpdateObjectToSyncData(this);
        }
        private void SetPlayerColour()
        {
            string playerColourString = ConnectionController.ModHelperInstance.Config.GetSettingsValue<string>("playerColour");
            if (playerColourString == "")
            {

                System.Security.Cryptography.MD5 md5Hasher = System.Security.Cryptography.MD5.Create();
                var hashed = md5Hasher.ComputeHash(System.Text.Encoding.UTF8.GetBytes(Utils.GetPlayerProfileName()));
                var ivalue = BitConverter.ToInt32(hashed, 0);
                Func<string, int> convertTo255 = delegate (string value)
                {
                    return int.Parse(value) * 255 / 999;
                };
                Color playerColour = new Color(
                    convertTo255(ivalue.ToString().Substring(0, 3)) / 255f,
                    convertTo255(ivalue.ToString().Substring(3, 3)) / 255f,
                    convertTo255(ivalue.ToString().Substring(6, 3)) / 255f);
                ConnectionController.Console.WriteLine("From PlayerToSendSync: " + playerColour.ToString());
                Utils.UpdateColourRecursive(playerColour, transform);
            }
            else
            {
                string[] playerColourStr = playerColourString.Split(',');
                Color playerColour = new Color(int.Parse(playerColourStr[0]) / 255f, int.Parse(playerColourStr[1]) / 255f, int.Parse(playerColourStr[2]) / 255f);
                Utils.UpdateColourRecursive(playerColour, transform);
            }
        }
        
        #region PlayerEventsData
        private void PlayerJump()
        {
            var data = new SFSObject();
            data.PutNull("jump");
            data.PutUtfString("objectName", ObjectName);
            data.PutInt("objectId", ObjectId);
            sfs.Send(new ExtensionRequest("SyncObject", data, sfs.LastJoinedRoom));
        }
        private void PlayerGrounded()
        {
            var data = new SFSObject();
            data.PutNull("g");//Grounded
            data.PutUtfString("objectName", ObjectName);
            data.PutInt("objectId", ObjectId);
            sfs.Send(new ExtensionRequest("SyncObject", data, sfs.LastJoinedRoom));
        }
        private void PlayerUngrounded()
        {
            var data = new SFSObject();
            data.PutNull("ug");//Ungrounded
            data.PutUtfString("objectName", ObjectName);
            data.PutInt("objectId", ObjectId);
            sfs.Send(new ExtensionRequest("SyncObject", data, sfs.LastJoinedRoom));
        }
        private void PlayerSuitUp()
        {
            if (GameObject.Find("PlayerHUD/HelmetOnUI/UICanvas/SecondaryGroup/GForce/Ping") == null)
            {
                var pingTextObject = Instantiate(GameObject.Find("PlayerHUD/HelmetOnUI/UICanvas/SecondaryGroup/GForce/NumericalReadout"), GameObject.Find("PlayerHUD/HelmetOnUI/UICanvas/SecondaryGroup/GForce").transform);
                foreach (Transform child in pingTextObject.transform)
                {
                    if (child.gameObject.name.ToLower().Contains("clone")) { Destroy(child.gameObject); }
                }
                pingTextObject.name = "Ping";
                Destroy(pingTextObject.GetComponentInChildren<LocalizedText>());
                pingTextObject.transform.GetChild(0).GetComponent<UnityEngine.UI.Text>().text = "PING";
                pingTextObject.transform.position += new Vector3(0, 0.07f, 0);
                pingText = pingTextObject.GetComponent<UnityEngine.UI.Text>();
            }

            ObjectData.PutBool("suit", true);
            ConnectionController.Instance.UpdateObjectToSyncData(this);
        }
        private void PlayerRemoveSuit()
        {
            ObjectData.PutBool("suit", false);
            ConnectionController.Instance.UpdateObjectToSyncData(this);
        }
        private void PlayerInitPlayerForceAlignment()
        {
            var data = new SFSObject();
            data.PutBool("pfa", true);
            data.PutUtfString("objectName", ObjectName);
            data.PutInt("objectId", ObjectId);
            sfs.Send(new ExtensionRequest("SyncObject", data, sfs.LastJoinedRoom));
        }
        private void PlayerBreakPlayerForceAlignment()
        {
            var data = new SFSObject();
            data.PutBool("pfa", false);
            data.PutUtfString("objectName", ObjectName);
            data.PutInt("objectId", ObjectId);
            sfs.Send(new ExtensionRequest("SyncObject", data, sfs.LastJoinedRoom));
        }
        private void PlayerStartedTranslationalThrust()
        {
            var data = new SFSObject();
            data.PutBool("tt", true);
            data.PutUtfString("objectName", ObjectName);
            data.PutInt("objectId", ObjectId);
            sfs.Send(new ExtensionRequest("SyncObject", data, sfs.LastJoinedRoom));
        }
        private void PlayerStoppedTranslationalThrust()
        {
            var data = new SFSObject();
            data.PutBool("tt", false);
            data.PutUtfString("objectName", ObjectName);
            data.PutInt("objectId", ObjectId);
            sfs.Send(new ExtensionRequest("SyncObject", data, sfs.LastJoinedRoom));
        }


        private void OnFlashlightOff()
        {
            ObjectData.PutBool("light", false);
            ConnectionController.Instance.UpdateObjectToSyncData(this);
        }

        private void OnFlashlightOn()
        {
            ObjectData.PutBool("light", true);
            ConnectionController.Instance.UpdateObjectToSyncData(this);
        }
        #endregion
        private void SortOutListeners()
        {
            #region UnusedListeners
            //GlobalMessenger.AddListener("EnterConversation", new Callback(this.OnEnterConversation));
            //GlobalMessenger.AddListener("ExitConversation", new Callback(this.OnExitConversation));
            //GlobalMessenger.AddListener("EnterDarkZone", new Callback(this.OnEnterDarkZone));
            //GlobalMessenger.AddListener("ExitDarkZone", new Callback(this.OnExitDarkZone));
            #endregion
            GlobalMessenger.AddListener("TurnOnFlashlight", OnFlashlightOn);
            GlobalMessenger.AddListener("TurnOffFlashlight", OnFlashlightOff);
            GlobalMessenger.AddListener("InitPlayerForceAlignment", PlayerInitPlayerForceAlignment);
            GlobalMessenger.AddListener("BreakPlayerForceAlignment", PlayerBreakPlayerForceAlignment);

            #region UnusedListeners
            //GlobalMessenger<Signalscope>.AddListener("EnterSignalscopeZoom", new Callback<Signalscope>(PlayerStateSync.OnEnterSignalscopeZoom));
            //GlobalMessenger.AddListener("ExitSignalscopeZoom", new Callback(PlayerStateSync.OnExitSignalscopeZoom));
            //GlobalMessenger.AddListener("EnterShipComputer", new Callback(PlayerStateSync.OnEnterShipComputer));
            //GlobalMessenger.AddListener("ExitShipComputer", new Callback(PlayerStateSync.OnExitShipComputer));
            //GlobalMessenger.AddListener("EnterLandingView", new Callback(PlayerStateSync.OnEnterLandingView));
            //GlobalMessenger.AddListener("ExitLandingView", new Callback(PlayerStateSync.OnExitLandingView));
            //GlobalMessenger.AddListener("EnterShip", new Callback(PlayerStateSync.OnEnterShip));
            //GlobalMessenger.AddListener("ExitShip", new Callback(PlayerStateSync.OnExitShip));
            #endregion
            GlobalMessenger.AddListener("SuitUp", PlayerSuitUp);
            GlobalMessenger.AddListener("RemoveSuit", PlayerRemoveSuit);
            #region UnusedListeners
            //GlobalMessenger.AddListener("EnterShuttle", new Callback(PlayerStateSync.OnEnterShuttle));
            //GlobalMessenger.AddListener("ExitShuttle", new Callback(PlayerStateSync.OnExitShuttle));
            //GlobalMessenger.AddListener("EnterMapView", new Callback(PlayerStateSync.OnEnterMapView));
            //GlobalMessenger.AddListener("ExitMapView", new Callback(PlayerStateSync.OnExitMapView));
            //GlobalMessenger<OWRigidbody>.AddListener("EnterFlightConsole", new Callback<OWRigidbody>(PlayerStateSync.OnEnterFlightConsole));
            //GlobalMessenger.AddListener("ExitFlightConsole", new Callback(PlayerStateSync.OnExitFlightConsole));
            //GlobalMessenger<float>.AddListener("PlayerCameraEnterWater", new Callback<float>(PlayerStateSync.OnCameraEnterWater));
            //GlobalMessenger.AddListener("PlayerCameraExitWater", new Callback(PlayerStateSync.OnCameraExitWater));
            //GlobalMessenger<OWRigidbody>.AddListener("AttachPlayerToPoint", new Callback<OWRigidbody>(this.OnAttachPlayerToPoint));
            //GlobalMessenger.AddListener("DetachPlayerFromPoint", new Callback(this.OnDetachPlayerFromPoint));
            //GlobalMessenger.AddListener("PlayerEnterBrambleDimension", new Callback(PlayerStateSync.OnPlayerEnterBrambleDimension));
            //GlobalMessenger.AddListener("PlayerExitBrambleDimension", new Callback(PlayerStateSync.OnPlayerExitBrambleDimension));
            //GlobalMessenger.AddListener("PlayerEnterGiantsDeep", new Callback(PlayerStateSync.OnPlayerEnterGiantsDeep));
            //GlobalMessenger.AddListener("PlayerExitGiantsDeep", new Callback(PlayerStateSync.OnPlayerExitGiantsDeep));
            //GlobalMessenger.AddListener("EnterZeroGTraining", new Callback(this.OnEnterZeroGTraining));
            //GlobalMessenger.AddListener("ExitZeroGTraining", new Callback(this.OnExitZeroGTraining));
            //GlobalMessenger.AddListener("PlayerCameraLockOn", new Callback(this.OnPlayerCameraLockOn));
            //GlobalMessenger.AddListener("PlayerCameraBreakLock", new Callback(this.OnPlayerCameraBreakLock));
            //GlobalMessenger<DeathType>.AddListener("PlayerDeath", new Callback<DeathType>(PlayerStateSync.OnPlayerDeath));
            //GlobalMessenger.AddListener("PlayerResurrection", new Callback(PlayerStateSync.OnPlayerResurrection));
            //GlobalMessenger.AddListener("ShipHullBreach", new Callback(PlayerStateSync.OnShipHullBreach));
            //GlobalMessenger.AddListener("EnterNomaiRemoteCamera", new Callback(this.OnEnterNomaiRemoteCamera));
            //GlobalMessenger.AddListener("ExitNomaiRemoteCamera", new Callback(this.OnExitNomaiRemoteCamera));
            //GlobalMessenger<EyeState>.AddListener("EyeStateChanged", new Callback<EyeState>(this.OnEyeStateChanged));
            //GlobalMessenger<bool>.AddListener("StartSleepingAtCampfire", new Callback<bool>(this.OnStartSleepingAtCampfire));
            //GlobalMessenger.AddListener("StopSleepingAtCampfire", new Callback(this.OnStopSleepingAtCampfire));
            //GlobalMessenger.AddListener("StartFastForward", new Callback(this.OnStartFastForward));
            //GlobalMessenger.AddListener("EndFastForward", new Callback(this.OnEndFastForward));
            //GlobalMessenger.AddListener("EnterCloak", new Callback(this.OnEnterCloak));
            //GlobalMessenger.AddListener("ExitCloak", new Callback(this.OnExitCloak));
            //GlobalMessenger.AddListener("EnterDreamWorld", new Callback(this.OnEnterDreamWorld));
            //GlobalMessenger.AddListener("ExitDreamWorld", new Callback(this.OnExitDreamWorld));
            //GlobalMessenger.AddListener("StartViewingProjector", new Callback(this.OnStartViewingProjector));
            //GlobalMessenger.AddListener("EndViewingProjector", new Callback(this.OnEndViewingProjector));
            //GlobalMessenger<Peephole>.AddListener("StartPeeping", new Callback<Peephole>(this.OnStartPeeping));
            //GlobalMessenger<Peephole>.AddListener("StopPeeping", new Callback<Peephole>(this.OnStopPeeping));
            //GlobalMessenger.AddListener("PlayerEnterUndertowVolume", new Callback(this.OnEnterUndertowVolume));
            //GlobalMessenger.AddListener("PlayerExitUndertowVolume", new Callback(this.OnExitUndertowVolume));
            //GlobalMessenger.AddListener("PlayerGrabbedByGhost", new Callback(this.OnGrabbedByGhost));
            //GlobalMessenger.AddListener("PlayerReleasedByGhost", new Callback(this.OnReleasedByGhost));
            #endregion
        }

        private void RemoveFromListeners()
        {
            #region UnusedListeners
            //GlobalMessenger.RemoveListener("EnterConversation", new Callback(this.OnEnterConversation));
            //GlobalMessenger.RemoveListener("ExitConversation", new Callback(this.OnExitConversation));
            //GlobalMessenger.RemoveListener("EnterDarkZone", new Callback(this.OnEnterDarkZone));
            //GlobalMessenger.RemoveListener("ExitDarkZone", new Callback(this.OnExitDarkZone));
            #endregion
            GlobalMessenger.RemoveListener("TurnOnFlashlight", OnFlashlightOn);
            GlobalMessenger.RemoveListener("TurnOffFlashlight", (OnFlashlightOff));
            GlobalMessenger.RemoveListener("InitPlayerForceAlignment", PlayerInitPlayerForceAlignment);
            GlobalMessenger.RemoveListener("BreakPlayerForceAlignment", PlayerBreakPlayerForceAlignment);

            #region UnusedListeners
            //GlobalMessenger<Signalscope>.RemoveListener("EnterSignalscopeZoom", new Callback<Signalscope>(PlayerStateSync.OnEnterSignalscopeZoom));
            //GlobalMessenger.RemoveListener("ExitSignalscopeZoom", new Callback(PlayerStateSync.OnExitSignalscopeZoom));
            //GlobalMessenger.RemoveListener("EnterShipComputer", new Callback(PlayerStateSync.OnEnterShipComputer));
            //GlobalMessenger.RemoveListener("ExitShipComputer", new Callback(PlayerStateSync.OnExitShipComputer));
            //GlobalMessenger.RemoveListener("EnterLandingView", new Callback(PlayerStateSync.OnEnterLandingView));
            //GlobalMessenger.RemoveListener("ExitLandingView", new Callback(PlayerStateSync.OnExitLandingView));
            //GlobalMessenger.RemoveListener("EnterShip", new Callback(PlayerStateSync.OnEnterShip));
            //GlobalMessenger.RemoveListener("ExitShip", new Callback(PlayerStateSync.OnExitShip));
            #endregion
            GlobalMessenger.RemoveListener("SuitUp", PlayerSuitUp);
            GlobalMessenger.RemoveListener("RemoveSuit", PlayerRemoveSuit);

            #region UnusedListeners
            //GlobalMessenger.RemoveListener("EnterShuttle", new Callback(PlayerStateSync.OnEnterShuttle));
            //GlobalMessenger.RemoveListener("ExitShuttle", new Callback(PlayerStateSync.OnExitShuttle));
            //GlobalMessenger.RemoveListener("EnterMapView", new Callback(PlayerStateSync.OnEnterMapView));
            //GlobalMessenger.RemoveListener("ExitMapView", new Callback(PlayerStateSync.OnExitMapView));
            //GlobalMessenger<OWRigidbody>.RemoveListener("EnterFlightConsole", new Callback<OWRigidbody>(PlayerStateSync.OnEnterFlightConsole));
            //GlobalMessenger.RemoveListener("ExitFlightConsole", new Callback(PlayerStateSync.OnExitFlightConsole));
            //GlobalMessenger<float>.RemoveListener("PlayerCameraEnterWater", new Callback<float>(PlayerStateSync.OnCameraEnterWater));
            //GlobalMessenger.RemoveListener("PlayerCameraExitWater", new Callback(PlayerStateSync.OnCameraExitWater));
            //GlobalMessenger<OWRigidbody>.RemoveListener("AttachPlayerToPoint", new Callback<OWRigidbody>(this.OnAttachPlayerToPoint));
            //GlobalMessenger.RemoveListener("DetachPlayerFromPoint", new Callback(this.OnDetachPlayerFromPoint));
            //GlobalMessenger.RemoveListener("PlayerEnterBrambleDimension", new Callback(PlayerStateSync.OnPlayerEnterBrambleDimension));
            //GlobalMessenger.RemoveListener("PlayerExitBrambleDimension", new Callback(PlayerStateSync.OnPlayerExitBrambleDimension));
            //GlobalMessenger.RemoveListener("PlayerEnterGiantsDeep", new Callback(PlayerStateSync.OnPlayerEnterGiantsDeep));
            //GlobalMessenger.RemoveListener("PlayerExitGiantsDeep", new Callback(PlayerStateSync.OnPlayerExitGiantsDeep));
            //GlobalMessenger.RemoveListener("EnterZeroGTraining", new Callback(this.OnEnterZeroGTraining));
            //GlobalMessenger.RemoveListener("ExitZeroGTraining", new Callback(this.OnExitZeroGTraining));
            //GlobalMessenger.RemoveListener("PlayerCameraLockOn", new Callback(this.OnPlayerCameraLockOn));
            //GlobalMessenger.RemoveListener("PlayerCameraBreakLock", new Callback(this.OnPlayerCameraBreakLock));
            //GlobalMessenger<DeathType>.RemoveListener("PlayerDeath", new Callback<DeathType>(PlayerStateSync.OnPlayerDeath));
            //GlobalMessenger.RemoveListener("PlayerResurrection", new Callback(PlayerStateSync.OnPlayerResurrection));
            //GlobalMessenger.RemoveListener("ShipHullBreach", new Callback(PlayerStateSync.OnShipHullBreach));
            //GlobalMessenger.RemoveListener("EnterNomaiRemoteCamera", new Callback(this.OnEnterNomaiRemoteCamera));
            //GlobalMessenger.RemoveListener("ExitNomaiRemoteCamera", new Callback(this.OnExitNomaiRemoteCamera));
            //GlobalMessenger<EyeState>.RemoveListener("EyeStateChanged", new Callback<EyeState>(this.OnEyeStateChanged));
            //GlobalMessenger<bool>.RemoveListener("StartSleepingAtCampfire", new Callback<bool>(this.OnStartSleepingAtCampfire));
            //GlobalMessenger.RemoveListener("StopSleepingAtCampfire", new Callback(this.OnStopSleepingAtCampfire));
            //GlobalMessenger.RemoveListener("StartFastForward", new Callback(this.OnStartFastForward));
            //GlobalMessenger.RemoveListener("EndFastForward", new Callback(this.OnEndFastForward));
            //GlobalMessenger.RemoveListener("EnterCloak", new Callback(this.OnEnterCloak));
            //GlobalMessenger.RemoveListener("ExitCloak", new Callback(this.OnExitCloak));
            //GlobalMessenger.RemoveListener("EnterDreamWorld", new Callback(this.OnEnterDreamWorld));
            //GlobalMessenger.RemoveListener("ExitDreamWorld", new Callback(this.OnExitDreamWorld));
            //GlobalMessenger.RemoveListener("StartViewingProjector", new Callback(this.OnStartViewingProjector));
            //GlobalMessenger.RemoveListener("EndViewingProjector", new Callback(this.OnEndViewingProjector));
            //GlobalMessenger<Peephole>.RemoveListener("StartPeeping", new Callback<Peephole>(this.OnStartPeeping));
            //GlobalMessenger<Peephole>.RemoveListener("StopPeeping", new Callback<Peephole>(this.OnStopPeeping));
            //GlobalMessenger.RemoveListener("PlayerEnterUndertowVolume", new Callback(this.OnEnterUndertowVolume));
            //GlobalMessenger.RemoveListener("PlayerExitUndertowVolume", new Callback(this.OnExitUndertowVolume));
            //GlobalMessenger.RemoveListener("PlayerGrabbedByGhost", new Callback(this.OnGrabbedByGhost));
            //GlobalMessenger.RemoveListener("PlayerReleasedByGhost", new Callback(this.OnReleasedByGhost));
            #endregion
        }
    }
}
