using Sfs2X.Core;
using Sfs2X.Entities;
using Sfs2X.Entities.Data;
using UnityEngine;

namespace OuterWildsOnline.SyncObjects
{
    public class PlayerToReceiveSync : ObjectToRecieveSync
    {
        PlayerControllerSync playerControllerSync;
        PlayerAnimationSync playerAnimationSync;
        PlayerStateSync playerStateSync;

        ThrusterFlameControllerSync[] thrustersControllersSync;
        ThrusterWashControllerSync thrusterWashControllerSync;

        public override void Init(string objectName, int userID, int entityID)
        {
            User objectOwner = sfs.UserManager.GetUserById(userID);
            base.Init(objectName, userID, entityID);
            transform.name = objectOwner.Name;

            var obj = GameObject.FindWithTag("MapCamera");
            var markerManager = obj.GetRequiredComponent<MapController>().GetMarkerManager();
            var canvasMarker = markerManager.InstantiateNewMarker(true);
            markerManager.RegisterMarker(canvasMarker, GetComponent<OWRigidbody>());
            canvasMarker.SetLabel(objectOwner.Name.ToUpper());
            canvasMarker.SetColor(Color.white);
            canvasMarker.SetVisibility(true);

            gameObject.AddComponent<RemotePlayerHUDMarker>().InitCanvasMarker(objectOwner.Name);
        }
        protected override void Start()
        {
            playerControllerSync = GetComponent<PlayerControllerSync>();
            playerAnimationSync = GetComponentInChildren<PlayerAnimationSync>();
            playerStateSync = GetComponent<PlayerStateSync>();

            thrustersControllersSync = GetComponentsInChildren<ThrusterFlameControllerSync>(true);
            thrusterWashControllerSync = GetComponentInChildren<ThrusterWashControllerSync>();
            if (ObjectData.GetBool("suit"))
            {
                playerAnimationSync.OnPutOnSuit();
                playerStateSync.OnSuitUp();
            }
            base.Start();
        }
        public override void UpdateObjectData(ISFSObject objectData)
        {
            base.UpdateObjectData(objectData);

            if (playerAnimationSync != null && playerStateSync != null)
            {
                if (objectData.GetBool("suit") == true)
                {
                    playerAnimationSync.OnPutOnSuit();
                    playerStateSync.OnSuitUp();
                }
                else
                {
                    playerAnimationSync.OnRemoveSuit();
                    playerStateSync.OnRemoveSuit();
                }
            }
        }
        protected override void OnExtensionResponse(SFSObject responseParams)
        {
            base.OnExtensionResponse(responseParams);

            if (responseParams.ContainsKey("jcf"))
            {
                playerControllerSync.SetJumpCrouchFraction(responseParams.GetFloat("jcf"));
            }
            if (responseParams.ContainsKey("rgvx"))
            {
                playerControllerSync.SetRelativeGroundVelocity(
                    new Vector3(responseParams.GetFloat("rgvx"),
                                responseParams.GetFloat("rgvy"),
                                responseParams.GetFloat("rgvz")));
            }
            //if (responseParams.ContainsKey("suit"))
            //{
            //    if (responseParams.GetBool("suit") == true)
            //    {
            //        playerAnimationSync.OnPutOnSuit();
            //        playerStateSync.OnSuitUp();
            //    }
            //    else
            //    {
            //        playerAnimationSync.OnRemoveSuit();
            //        playerStateSync.OnRemoveSuit();
            //    }
            //}
            if (responseParams.ContainsKey("pfa"))
            {
                if (responseParams.GetBool("pfa") == true)
                {
                    playerStateSync.OnInitPlayerForceAlignment();
                }
                else
                {
                    playerStateSync.OnBreakPlayerForceAlignment();
                }
            }
            if (responseParams.ContainsKey("thr,0"))
            {
                for (int i = 0; i < thrustersControllersSync.Length; i++) //10 thrusters                 
                {
                    thrustersControllersSync[i].OnTranslationalThrust(responseParams.GetBool("thr," + i));
                }
            }
            if (responseParams.ContainsKey("tt"))
            {
                if (responseParams.GetBool("tt"))
                {
                    thrusterWashControllerSync.OnStartTranslationalThrust();
                }
                else
                {
                    thrusterWashControllerSync.OnStopTranslationalThrust();
                    for (int i = 0; i < thrustersControllersSync.Length; i++) //10 thrusters                 
                    {
                        thrustersControllersSync[i].OnTranslationalThrust(false);
                    }
                }
            }
            if (responseParams.ContainsKey("tmla"))
            {
                thrusterWashControllerSync.ThrusterModelLocalYAcceleration = responseParams.GetFloat("tmla");
                playerAnimationSync.ThrusterModelLocalYAcceleration = responseParams.GetFloat("tmla");
            }
            if (responseParams.ContainsKey("j"))
            {
                playerAnimationSync.OnPlayerJump();
            }
            if (responseParams.ContainsKey("g"))
            {
                playerAnimationSync.OnPlayerGrounded();
            }
            if (responseParams.ContainsKey("ug"))
            {
                playerAnimationSync.OnPlayerUngrounded();
            }
        }
    }
}
