using System;
using UnityEngine;

namespace OuterWildsOnline
{
    //TODO consertar isso
    public static class CreateRemoteCopies
    {
        private static void FindAndDoAction(Transform parentTransform, Action<Transform> action, bool ignoreIfNotFound, params string[] childNames) 
        {
            for (int i = 0; i < childNames.Length; i++)
            {
                Transform foundChild;
                if (parentTransform != null)
                    foundChild = parentTransform.Find(childNames[i]);
                else
                    foundChild = GameObject.Find(childNames[i]).transform;

                if (foundChild != null || !ignoreIfNotFound)
                    action(foundChild);
            }
        }
        private static void ReplaceThrusterFlameControllerRecursively(Transform transform)
        {
            foreach (Transform child in transform)
            {
                if (child.TryGetComponent(out ThrusterFlameController thrusterFlameController))
                {
                    GameObject.DestroyImmediate(thrusterFlameController);
                    child.gameObject.AddComponent<ThrusterFlameControllerSync>();
                }
                if (child.TryGetComponent(out ThrusterParticlesBehavior thrusterParticlesBehavior))
                {
                    GameObject.DestroyImmediate(thrusterParticlesBehavior);
                }
                if (child.childCount > 0)
                {
                    ReplaceThrusterFlameControllerRecursively(child);
                }
            }
        }
        // For compatibility with NomaiVR. NomaiVR hides the player body, so we need to show it again.
        private static void MakeBodyPartsVisible(Transform bodyTransform)
        {
            var renderers = bodyTransform.GetComponentsInChildren<SkinnedMeshRenderer>(true);
            foreach (var renderer in renderers)
            {
                if (renderer.gameObject.layer == LayerMask.NameToLayer("VisibleToProbe"))
                {
                    renderer.gameObject.layer = LayerMask.NameToLayer("Default");
                }
            }

            // NomaiVR also completely disables the player arms, so we gotta enable those.
            var withoutSuit = bodyTransform.Find("player_mesh_noSuit:Traveller_HEA_Player");
            withoutSuit.Find("player_mesh_noSuit:Player_LeftArm").gameObject.SetActive(true);
            withoutSuit.Find("player_mesh_noSuit:Player_RightArm").gameObject.SetActive(true);
            var withSuit = bodyTransform.Find("Traveller_Mesh_v01:Traveller_Geo");
            withSuit.Find("Traveller_Mesh_v01:PlayerSuit_LeftArm").gameObject.SetActive(true);
            withSuit.Find("Traveller_Mesh_v01:PlayerSuit_RightArm").gameObject.SetActive(true);
        }
        public static GameObject CreatePlayerRemoteCopy()
        {
            GameObject remotePlayer = new GameObject("Remote Player");

            GameObject localPlayerBody = Locator.GetPlayerTransform().Find("Traveller_HEA_Player_v2").gameObject;
            GameObject remotePlayerBody = GameObject.Instantiate(localPlayerBody, remotePlayer.transform);
            

            MakeBodyPartsVisible(remotePlayerBody.transform);
            remotePlayer.AddComponent<OWRigidbody>().MakeKinematic();
            remotePlayer.AddComponent<ImpactSensor>();
            remotePlayer.AddComponent<ForceDetector>();
            remotePlayer.AddComponent<FluidDetector>();

            remotePlayer.SetActive(false);

            remotePlayer.AddComponent<SimpleRemoteInterpolation>();
            GameObject.Destroy(remotePlayerBody.GetComponent<PlayerAnimController>());

            remotePlayerBody.transform.localPosition = new Vector3(0f, -1.03f, -0.2f);
            remotePlayerBody.transform.localRotation = Quaternion.Euler(-1.500009f, 0f, 0f);
            remotePlayerBody.transform.localScale = new Vector3(0.1f, 0.1f, 0.1f);

            remotePlayerBody.transform.Find("player_mesh_noSuit:Traveller_HEA_Player/player_mesh_noSuit:Player_Head").gameObject.layer = 0;
            remotePlayerBody.transform.Find("Traveller_Mesh_v01:Traveller_Geo/Traveller_Mesh_v01:PlayerSuit_Helmet").gameObject.layer = 0;

            remotePlayerBody.AddComponent<PlayerAnimationSync>();
            remotePlayer.AddComponent<PlayerControllerSync>();

            GameObject remoteVFXObjects = new GameObject("RemotePlayerVFX");
            remoteVFXObjects.transform.SetParent(remotePlayer.transform);
            remoteVFXObjects.AddComponent<PlayerParticlesControllerSync>();

            GameObject thrusterWash = new GameObject("ThrusterWash");
            thrusterWash.transform.SetParent(remoteVFXObjects.transform);
            GameObject.Instantiate(Locator.GetPlayerTransform().Find("PlayerVFX/ThrusterWash/ThrusterWash_Default"), thrusterWash.transform);
            thrusterWash.AddComponent<ThrusterWashControllerSync>();


            Locator.GetPlayerTransform().Find("PlayerVFX/Thrusters").gameObject.SetActive(false);
            GameObject thrusters = GameObject.Instantiate(Locator.GetPlayerTransform().Find("PlayerVFX/Thrusters").gameObject, remoteVFXObjects.transform);
            Locator.GetPlayerTransform().Find("PlayerVFX/Thrusters").gameObject.SetActive(true);
            ReplaceThrusterFlameControllerRecursively(thrusters.transform);
            thrusters.SetActive(true);
            thrusters.transform.localPosition += new Vector3(0, 0.2f, 0);
            remotePlayer.AddComponent<PlayerStateSync>();

            //Camera sync
            GameObject headDirection = new GameObject("HeadDirection");
            Transform playerCamera = Locator.GetPlayerCamera().transform;
            headDirection.AddComponent<PlayerHeadSync>();
            headDirection.transform.parent = remotePlayer.transform;
            headDirection.transform.localPosition = playerCamera.localPosition;
            headDirection.transform.localRotation = playerCamera.localRotation;

            //Flashlight Sync
            Transform playerFlashLight = Locator.GetPlayerCamera().transform.Find("FlashlightRoot");

            playerFlashLight.gameObject.SetActive(false);
            GameObject flashLight = GameObject.Instantiate(playerFlashLight.gameObject, headDirection.transform);
            GameObject.Destroy(flashLight.GetComponent<Flashlight>());
            playerFlashLight.gameObject.SetActive(true);
            flashLight.gameObject.SetActive(true);

            PlayerFlashlightSync flashLightSync = flashLight.AddComponent<PlayerFlashlightSync>();

            flashLightSync.root = flashLight.transform;
            flashLightSync.basePivot = flashLight.transform.Find("Flashlight_BasePivot");
            flashLightSync.wobblePivot = flashLightSync.basePivot.Find("Flashlight_WobblePivot");
            flashLightSync.lights = flashLightSync.wobblePivot.GetComponentsInChildren<OWLight2>();

            flashLight.transform.localPosition = playerFlashLight.localPosition;
            flashLight.transform.localRotation = playerFlashLight.localRotation;


            remotePlayer.AddComponent<SyncObjects.PlayerToReceiveSync>();

            //remotePlayer.AddComponent<LockOnReticule>().Init();
            return remotePlayer;
        }
        //TODO fazer com que não fique tão confuso com a quantidade de strings espalhadas
        public static GameObject CreateShipRemoteCopy()
        {
            GameObject remotePlayerShip = new GameObject("Remote Ship");

            remotePlayerShip.AddComponent<ProxyShadowCasterSuperGroup>();
            remotePlayerShip.AddComponent<SimpleRemoteInterpolation>();
            remotePlayerShip.AddComponent<OWRigidbody>().MakeKinematic();
            remotePlayerShip.AddComponent<FluidDetector>();
            remotePlayerShip.AddComponent<RulesetDetector>();

            GameObject remoteVFXObjects = new GameObject("RemoteShipVFX");
            remoteVFXObjects.transform.parent = remotePlayerShip.transform;

            GameObject.Instantiate(GameObject.Find("Ship_Body/Module_Cabin/Effects_Cabin/ThrusterWash/ThrusterWash_Ship"), remoteVFXObjects.transform);
            
            string[] listOfObjectsToFind_Thrusters = new string[]
            {
                "Ship_Body/Module_Engine/Effects_Engine/Thrusters",
                "Ship_Body/Module_Supplies/Effects_Supplies/Thrusters",
            };
            void DisableInstantiateAndReenable(Transform t)
            {
                t.gameObject.SetActive(false);
                GameObject.Instantiate(t.gameObject, remoteVFXObjects.transform);
                t.gameObject.SetActive(true);
            }

            FindAndDoAction(null, DisableInstantiateAndReenable, true, listOfObjectsToFind_Thrusters);

            ReplaceThrusterFlameControllerRecursively(remoteVFXObjects.transform);

            Utils.SetActiveRecursively(remoteVFXObjects.transform, true);

            string[] listOfObjectsToFind_Model = new string[]
            {
                "Ship_Body/Module_Cabin/Geo_Cabin/Cabin_Geometry/Cabin_Exterior",
                "Ship_Body/Module_Cabin/Geo_Cabin/Cabin_Tech/Cabin_Tech_Exterior",
                "Ship_Body/Module_Cabin/Geo_Cabin/Shadowcaster_Cabin",

                "Ship_Body/Module_Cockpit/Geo_Cockpit/Cockpit_Geometry/Cockpit_Exterior",
                "Ship_Body/Module_Cockpit/Geo_Cockpit/Cockpit_Tech/Cockpit_Tech_Exterior",
                "Ship_Body/Module_Cockpit/Geo_Cockpit/Cockpit_Geometry/ShadowCaster_Cockpit",

                "Ship_Body/Module_Engine/Geo_Engine/Engine_Geometry/Engine_Exterior",
                "Ship_Body/Module_Engine/Geo_Engine/ShadowCaster_Engine",

                "Ship_Body/Module_Supplies/Geo_Supplies/Supplies_Geometry/Supplies_Exterior",
                "Ship_Body/Module_Supplies/Geo_Supplies/ShadowCaster_Supplies",

                "Ship_Body/Module_LandingGear/LandingGear_Front/Geo_LandingGear_Front/LandingGear_FrontFoot",
                "Ship_Body/Module_LandingGear/LandingGear_Front/Geo_LandingGear_Front/LandingGear_FrontLeg",
                "Ship_Body/Module_LandingGear/LandingGear_Front/Geo_LandingGear_Front/ShadowCaster_FrontFoot",
                "Ship_Body/Module_LandingGear/LandingGear_Front/Geo_LandingGear_Front/ShadowCaster_FrontLeg",
                "Ship_Body/Module_LandingGear/LandingGear_Front/LandingGear_Front_Tech",

                "Ship_Body/Module_LandingGear/LandingGear_Left/Geo_LandingGear_Left/LandingGear_LeftFoot",
                "Ship_Body/Module_LandingGear/LandingGear_Left/Geo_LandingGear_Left/LandingGear_LeftLeg",
                "Ship_Body/Module_LandingGear/LandingGear_Left/Geo_LandingGear_Left/ShadowCaster_LeftFoot",
                "Ship_Body/Module_LandingGear/LandingGear_Left/Geo_LandingGear_Left/ShadowCaster_LeftLeg",

                "Ship_Body/Module_LandingGear/LandingGear_Right/Geo_LandingGear_Right/LandingGear_RightFoot",
                "Ship_Body/Module_LandingGear/LandingGear_Right/Geo_LandingGear_Right/LandingGear_RightLeg",
                "Ship_Body/Module_LandingGear/LandingGear_Right/Geo_LandingGear_Right/ShadowCaster_RightFoot",
                "Ship_Body/Module_LandingGear/LandingGear_Right/Geo_LandingGear_Right/ShadowCaster_RightLeg"
            };

            void InstantiateAndMove(Transform t) 
            {
                GameObject.Instantiate(t.gameObject, remotePlayerShip.transform).transform.localPosition -= new Vector3(0, 4, 0);
            }

            FindAndDoAction(null, InstantiateAndMove, true, listOfObjectsToFind_Model);

            Utils.RemoveCollisionFromObjectRecursively(remotePlayerShip.transform);
            remotePlayerShip.AddComponent<ThrusterWashControllerSync>();

            remotePlayerShip.AddComponent<SyncObjects.ShipToReceiveSync>();

            remotePlayerShip.SetActive(false);

            return remotePlayerShip;
        }

        public static GameObject CreateProbeRemoteCopy()
        {
            GameObject remoteProbe = new GameObject("Remote Probe");

            //TODO see if this is really needed
            remoteProbe.AddComponent<SimpleRemoteInterpolation>();

            GameObject remoteProbeBody = new GameObject("Remote Probe Body");
            remoteProbeBody.transform.parent = remoteProbe.transform;

            string[] listOfObjectsToFind = new string[]
            {
                "CameraPivot",
                "Lantern",
            };
            void DisableInstantiateAndReenable(Transform t)
            {
                t.gameObject.SetActive(false);
                GameObject.Instantiate(t.gameObject, remoteProbeBody.transform);
                t.gameObject.SetActive(true);
            }

            FindAndDoAction(Locator.GetProbe().transform, DisableInstantiateAndReenable, true, listOfObjectsToFind);

            Transform cameraPivot = remoteProbeBody.transform.GetChild(0);
            Transform lantern = remoteProbeBody.transform.GetChild(1);
            GameObject.DestroyImmediate(lantern.GetComponent<ProbeLantern>());
            lantern.GetComponent<Light>().enabled = true;

            GameObject.DestroyImmediate(cameraPivot.GetComponentInChildren<ProbeSpotlight>());
            GameObject.DestroyImmediate(cameraPivot.GetChild(0).GetComponentInChildren<ProbeAnimatorController>()); ///Geometry/Props_HEA_Probe_ANIM
            GameObject.DestroyImmediate(cameraPivot.GetComponent<ProbeHorizonTracker>());

            cameraPivot.gameObject.SetActive(true);
            lantern.gameObject.SetActive(true);

            remoteProbe.AddComponent<SyncObjects.ProbeToReceiveSync>();

            remoteProbe.SetActive(false);
            remoteProbeBody.SetActive(false);
            return remoteProbe;
        }
    }
}
