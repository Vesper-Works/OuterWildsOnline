using Sfs2X.Core;
using Sfs2X.Entities;
using Sfs2X.Entities.Data;
using UnityEngine;
using TMPro;
using UnityEngine.UI;
using System;
using OuterWildsOnline.StaticClasses;

namespace OuterWildsOnline.SyncObjects
{
    public class PlayerToReceiveSync : ObjectToRecieveSync
    {
        PlayerControllerSync playerControllerSync;
        PlayerAnimationSync playerAnimationSync;
        PlayerStateSync playerStateSync;

        ThrusterFlameControllerSync[] thrustersControllersSync;
        ThrusterWashControllerSync thrusterWashControllerSync;
        CanvasMapMarker mapCanvasMarker;

        private SkinnedMeshRenderer[] _currentSuitSkin;
        private SkinnedMeshRenderer[] _currentSuitlessSkin;
        private string customSkin;

        public Vector3 LocalHeadRotation { get; private set; } = Vector3.zero;
        public bool IsFlashlightOn { get; private set; } = false;

        public override void Init(string objectName, int userID, int entityID)
        {
            User objectOwner = sfs.UserManager.GetUserById(userID);
            base.Init(objectName, userID, entityID);
            transform.name = objectOwner.Name;

            var obj = GameObject.FindWithTag("MapCamera");
            var mapMarkerManager = obj.GetRequiredComponent<MapController>().GetMarkerManager();
            mapCanvasMarker = mapMarkerManager.InstantiateNewMarker(true);
            mapMarkerManager.RegisterMarker(mapCanvasMarker, GetComponent<OWRigidbody>());

            mapCanvasMarker.SetLabel(objectOwner.Name.ToUpper());
            mapCanvasMarker.SetColor(Color.white);
            mapCanvasMarker.SetVisibility(true);

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

            UpdateSkin();
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
            UpdateSkin();

            if (ObjectData.GetBool("far"))
            {
                mapCanvasMarker.SetLabel($"{transform.name} Deep Space Connection - Approximating...");
                mapCanvasMarker.SetColor(Color.yellow);
                GetComponent<RemotePlayerHUDMarker>().SetMarkerText($"{transform.name} Deep Space Connection - Approximating...");
                GetComponent<RemotePlayerHUDMarker>().SetHazard(true);
            }
            else
            {
                mapCanvasMarker.SetLabel($"{transform.name}");
                mapCanvasMarker.SetColor(Color.white);
                GetComponent<RemotePlayerHUDMarker>().SetMarkerText($"{transform.name}");
                GetComponent<RemotePlayerHUDMarker>().SetHazard(false);
            }
        }
        private void UpdateSkin()
        {
            if (customSkin == "Protagonist")
            {
                UpdateColour(false);
            }
            else
            {
                UpdateColour(true);
            }
            if (customSkin == ObjectData.GetUtfString("customSkin")) { return; }
            customSkin = ObjectData.GetUtfString("customSkin");

            // Destroy the current skins if they exist
            if (_currentSuitSkin != null)
            {
                foreach (var skin in _currentSuitSkin)
                {
                    GameObject.Destroy(skin.gameObject);
                }
                _currentSuitSkin = null;
            }
            if (_currentSuitlessSkin != null)
            {
                foreach (var skin in _currentSuitlessSkin)
                {
                    GameObject.Destroy(skin.gameObject);
                }
                _currentSuitlessSkin = null;
            }

            if (customSkin == "Protagonist")
            {
                SkinReplacer.ResetSkin(transform.Find("Traveller_HEA_Player_v2(Clone)/Traveller_Mesh_v01:Traveller_Geo").gameObject);
                SkinReplacer.ResetSkin(transform.Find("Traveller_HEA_Player_v2(Clone)/player_mesh_noSuit:Traveller_HEA_Player").gameObject);
                UpdateColour(false);
            }
            else
            {
                _currentSuitSkin = SkinReplacer.ReplaceSkin(transform.Find("Traveller_HEA_Player_v2(Clone)/Traveller_Mesh_v01:Traveller_Geo").gameObject, customSkin);
                _currentSuitlessSkin = SkinReplacer.ReplaceSkin(transform.Find("Traveller_HEA_Player_v2(Clone)/player_mesh_noSuit:Traveller_HEA_Player").gameObject, customSkin);
                UpdateColour(true);
            }
        }
        private void UpdateColour(bool plain)
        {
            try
            {
                string playerColourString = ObjectData.GetUtfString("clothesColour");
                if (string.IsNullOrEmpty(playerColourString))
                {

                    System.Security.Cryptography.MD5 md5Hasher = System.Security.Cryptography.MD5.Create();
                    var hashed = md5Hasher.ComputeHash(System.Text.Encoding.UTF8.GetBytes(Utils.GetPlayerProfileName()));
                    var ivalue = BitConverter.ToInt32(hashed, 0);
                    Func<string, int> convertTo255 = delegate (string value)
                    {
                        return int.Parse(value) * 255 / 999;
                    };
                    Color primary = new Color(
                        convertTo255(ivalue.ToString().Substring(0, 3)) / 255f,
                        convertTo255(ivalue.ToString().Substring(3, 3)) / 255f,
                        convertTo255(ivalue.ToString().Substring(6, 3)) / 255f);
                    Color.RGBToHSV(primary, out float hue, out float saturation, out float brightness);
                    hue = (hue + (30f / 360f)) % 1;
                    Color secondary = Color.HSVToRGB(hue, saturation, brightness);
                    hue = (hue + (300f / 360f)) % 1;
                    Color tertiary = Color.HSVToRGB(hue, saturation, brightness);

                    Utils.UpdateColourRecursive(primary, transform);
                    Utils.UpdateColourRecursive(tertiary,
                        transform.Find("Traveller_HEA_Player_v2(Clone)/Traveller_Mesh_v01:Traveller_Geo/Traveller_Mesh_v01:Props_HEA_Jetpack"));
                    if (plain) { return; }
                    Utils.UpdateColourRecursive(secondary,
                        transform.Find("Traveller_HEA_Player_v2(Clone)/Traveller_Mesh_v01:Traveller_Geo/Traveller_Mesh_v01:PlayerSuit_LeftArm"));
                    Utils.UpdateColourRecursive(secondary,
                        transform.Find("Traveller_HEA_Player_v2(Clone)/Traveller_Mesh_v01:Traveller_Geo/Traveller_Mesh_v01:PlayerSuit_RightArm"));

                    Utils.UpdateColourRecursive(primary,
                        transform.Find("Traveller_HEA_Player_v2(Clone)/player_mesh_noSuit:Traveller_HEA_Player/player_mesh_noSuit:Player_Clothes"));
                    Utils.UpdateColourRecursive(secondary,
                        transform.Find("Traveller_HEA_Player_v2(Clone)/player_mesh_noSuit:Traveller_HEA_Player/player_mesh_noSuit:Player_Head"));
                    Utils.UpdateColourRecursive(tertiary,
                        transform.Find("Traveller_HEA_Player_v2(Clone)/player_mesh_noSuit:Traveller_HEA_Player/player_mesh_noSuit:Player_LeftArm"));
                    Utils.UpdateColourRecursive(tertiary,
                        transform.Find("Traveller_HEA_Player_v2(Clone)/player_mesh_noSuit:Traveller_HEA_Player/player_mesh_noSuit:Player_RightArm"));

                }
                else
                {
                    string[] clothesColourStr = playerColourString.Split(',');
                    string[] handsColourStr = ObjectData.GetUtfString("handsColour").Split(',');
                    string[] headColourStr = ObjectData.GetUtfString("headColour").Split(',');
                    string[] jetpackColourStr = ObjectData.GetUtfString("jetpackColour").Split(',');
                    if (clothesColourStr.Length != 3) { clothesColourStr = new string[] { "255", "255", "255" }; }
                    if (handsColourStr.Length != 3) { handsColourStr = new string[] { "255", "255", "255" }; }
                    if (headColourStr.Length != 3) { headColourStr = new string[] { "255", "255", "255" }; }
                    if (jetpackColourStr.Length != 3) { jetpackColourStr = new string[] { "255", "255", "255" }; }
                    Color clothesColour = new Color(int.Parse(clothesColourStr[0]) / 255f, int.Parse(clothesColourStr[1]) / 255f, int.Parse(clothesColourStr[2]) / 255f);
                    Color handsColour = new Color(int.Parse(handsColourStr[0]) / 255f, int.Parse(handsColourStr[1]) / 255f, int.Parse(handsColourStr[2]) / 255f);
                    Color headColour = new Color(int.Parse(headColourStr[0]) / 255f, int.Parse(headColourStr[1]) / 255f, int.Parse(headColourStr[2]) / 255f);
                    Color jetpackColour = new Color(int.Parse(jetpackColourStr[0]) / 255f, int.Parse(jetpackColourStr[1]) / 255f, int.Parse(jetpackColourStr[2]) / 255f);

                    Utils.UpdateColourRecursive(clothesColour, transform);
                    Utils.UpdateColourRecursive(jetpackColour,
                        transform.Find("Traveller_HEA_Player_v2(Clone)/Traveller_Mesh_v01:Traveller_Geo/Traveller_Mesh_v01:Props_HEA_Jetpack"));
                    if (plain) { return; }
                    Utils.UpdateColourRecursive(handsColour,
                        transform.Find("Traveller_HEA_Player_v2(Clone)/Traveller_Mesh_v01:Traveller_Geo/Traveller_Mesh_v01:PlayerSuit_LeftArm"));
                    Utils.UpdateColourRecursive(handsColour,
                        transform.Find("Traveller_HEA_Player_v2(Clone)/Traveller_Mesh_v01:Traveller_Geo/Traveller_Mesh_v01:PlayerSuit_RightArm"));

                    Utils.UpdateColourRecursive(clothesColour,
                        transform.Find("Traveller_HEA_Player_v2(Clone)/player_mesh_noSuit:Traveller_HEA_Player/player_mesh_noSuit:Player_Clothes"));
                    Utils.UpdateColourRecursive(headColour,
                        transform.Find("Traveller_HEA_Player_v2(Clone)/player_mesh_noSuit:Traveller_HEA_Player/player_mesh_noSuit:Player_Head"));
                    Utils.UpdateColourRecursive(handsColour,
                        transform.Find("Traveller_HEA_Player_v2(Clone)/player_mesh_noSuit:Traveller_HEA_Player/player_mesh_noSuit:Player_LeftArm"));
                    Utils.UpdateColourRecursive(handsColour,
                        transform.Find("Traveller_HEA_Player_v2(Clone)/player_mesh_noSuit:Traveller_HEA_Player/player_mesh_noSuit:Player_RightArm"));
                }
            }
            catch (System.Exception e)
            {
                ConnectionController.ModHelperInstance.Console.WriteLine(e.Message, OWML.Common.MessageType.Error);
                ConnectionController.ModHelperInstance.Console.WriteLine("Remote player colour error", OWML.Common.MessageType.Error);
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
