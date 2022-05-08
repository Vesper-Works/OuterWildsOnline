using Sfs2X.Core;
using Sfs2X.Entities;
using Sfs2X.Entities.Data;
using UnityEngine;
using TMPro;
using UnityEngine.UI;
using System;

namespace OuterWildsOnline.SyncObjects
{
    public class PlayerToReceiveSync : ObjectToRecieveSync
    {
        PlayerControllerSync playerControllerSync;
        PlayerAnimationSync playerAnimationSync;
        PlayerStateSync playerStateSync;

        ThrusterFlameControllerSync[] thrustersControllersSync;
        ThrusterWashControllerSync thrusterWashControllerSync;

        public Vector3 LocalHeadRotation { get; private set; } = Vector3.zero;
        public bool IsFlashlightOn { get; private set; } = false;

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

            //SpriteRenderer nameTag = new GameObject("Player Name Tag").AddComponent<SpriteRenderer>();
            //TextToTexture textToTexture = new TextToTexture(Font.CreateDynamicFontFromOSFont(Font.GetOSInstalledFontNames()[0], 1), 1, 1);

            //nameTag.sprite = Sprite.Create(textToTexture.CreateTextToTexture(objectOwner.Name, 0, 0, 1, 1, 1), new Rect(0, 0, 500, 500), new Vector2(250, 0));
            //nameTag.text = objectOwner.Name;
            ////nameTag.fontSize = 222;
            //nameTag.alignment = TextAlignmentOptions.Center;
            //nameTag.font = TMP_FontAsset.CreateFontAsset(Resources.FindObjectsOfTypeAll<Font>()[0]);
            //nameTag.transform.parent = transform;
            //nameTag.transform.localPosition = Vector3.up * 1.3f;
            //nameTag.transform.localRotation = Quaternion.Euler(0, 180, 0);
            //nameTag.transform.localScale = new Vector3(0.008f, 0.008f, 0.008f);
            ////  helmetlessInputField.font = FindObjectOfType<DialogueBoxVer2>().GetComponentInChildren<Text>().font;

            gameObject.AddComponent<RemotePlayerHUDMarker>().InitCanvasMarker(objectOwner.Name).InitCanvasMarker();

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

            IsFlashlightOn = ObjectData.GetBool("light");

            UpdateColour();
            base.Start();
        }

        public override void UpdateObjectData(ISFSObject objectData)
        {
            base.UpdateObjectData(objectData);

            IsFlashlightOn = ObjectData.GetBool("light");

            if (playerAnimationSync != null && playerStateSync != null)
            {
                bool shouldBeWithSuit = objectData.GetBool("suit");
                if (objectData.GetBool("suit") && !playerStateSync.IsWearingSuit())
                {
                    playerAnimationSync.OnPutOnSuit();
                    playerStateSync.OnSuitUp();
                }
                else if (!shouldBeWithSuit && playerStateSync.IsWearingSuit())
                {
                    playerAnimationSync.OnRemoveSuit();
                    playerStateSync.OnRemoveSuit();
                }
            }
            UpdateColour();
        }
        private void UpdateColour()
        {
            try
            {
                string playerColourString = ObjectData.GetUtfString("colour");
                if (playerColourString == "")
                {

                    System.Security.Cryptography.MD5 md5Hasher = System.Security.Cryptography.MD5.Create();
                    var hashed = md5Hasher.ComputeHash(System.Text.Encoding.UTF8.GetBytes(Utils.GetPlayerProfileName()));
                    var ivalue = BitConverter.ToInt32(hashed, 0);
                    Func<string, int> convertTo255 = delegate(string value)
                    {
                        return int.Parse(value) * 255 / 999;
                    };
                    Color playerColour = new Color(
                        convertTo255(ivalue.ToString().Substring(0, 3)) / 255f,
                        convertTo255(ivalue.ToString().Substring(3, 3)) / 255f,
                        convertTo255(ivalue.ToString().Substring(6, 3)) / 255f);
                    ConnectionController.ModHelperInstance.Console.WriteLine("From PlayerToReceiveSync: " + playerColour.ToString());
                    Utils.UpdateColourRecursive(playerColour, transform);
                }
                else
                {
                    string[] playerColourStr = playerColourString.Split(',');
                    Color playerColour = new Color(int.Parse(playerColourStr[0]) / 255f, int.Parse(playerColourStr[1]) / 255f, int.Parse(playerColourStr[2]) / 255f);
                    Utils.UpdateColourRecursive(playerColour, transform);
                }
            }
            catch (System.Exception e)
            {
                ConnectionController.ModHelperInstance.Console.WriteLine(e.Message);
                ConnectionController.ModHelperInstance.Console.WriteLine("Player colour error. (Make sure to use x,x,x format). To Recieve");
            }
        }
        protected override void OnExtensionResponse(SFSObject responseParams)
        {
            base.OnExtensionResponse(responseParams);

            if (responseParams.ContainsKey("hrotx"))
            {
                LocalHeadRotation = new Vector3(responseParams.GetFloat("hrotx"),
                                responseParams.GetFloat("hroty"),
                                responseParams.GetFloat("hrotz"));
            }

            SyncEventsData(responseParams);
        }

        private void SyncEventsData(SFSObject responseParams)
        {

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
