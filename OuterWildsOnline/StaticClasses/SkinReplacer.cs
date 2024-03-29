﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnityEngine;

namespace OuterWildsOnline.StaticClasses
{
    public static class SkinReplacer
    {
        private static AssetBundle _assetBundle;

        private static string playerPrefix = "Traveller_Rig_v01:Traveller_";
        private static string playerSuffix = "_Jnt";

        private static readonly Dictionary<string, GameObject> _skins = new Dictionary<string, GameObject>()
        {
            { "Chert", LoadPrefab("OW_Chert_Skin") },
            { "Gabbro", LoadPrefab("OW_Gabbro_Skin") },
            { "Feldspar", LoadPrefab("OW_Feldspar_Skin") },
        };

        private static readonly Dictionary<string, Func<string, string>> _boneMaps = new Dictionary<string, Func<string, string>>()
        {
            { "Chert", (name) => name.Replace("Chert_Skin_02:Child_Rig_V01:", playerPrefix) },
            { "Gabbro", (name) => name.Replace("gabbro_OW_V02:gabbro_rig_v01:", playerPrefix) },
            { "Feldspar", (name) => name.Replace("Feldspar_Skin:Short_Rig_V01:", playerPrefix) },
        };

        public static SkinnedMeshRenderer[] ReplaceSkin(GameObject playerBody, string skinName)
        {
            var skin = _skins.GetValueOrDefault(skinName);
            var map = _boneMaps.GetValueOrDefault(skinName);

            if (skin == default || map == default)
            {
                ConnectionController.Console.WriteLine($"SKIN [{skinName}] WASN'T FOUND");
                return null;
            }

            //ConnectionController.Console.WriteLine($"Swapping player mesh to {skinName} using {skin}, {map}");

            // Returns the skinned mesh renderer so if you switch to a different skin you can destroy the old one
            return Swap(playerBody, skin, map);
        }

        public static void ResetSkin(GameObject playerBody)
        {
            // Maybe you'll want to cache this dictionary
            var playerPrefab = RemoteObjects.CloneStorage["Player"];
            var suitRenderers = playerPrefab.transform.Find("Traveller_HEA_Player_v2(Clone)/Traveller_Mesh_v01:Traveller_Geo").GetComponentsInChildren<SkinnedMeshRenderer>();
            var suitlessRenderers = playerPrefab.transform.Find("Traveller_HEA_Player_v2(Clone)/player_mesh_noSuit:Traveller_HEA_Player").GetComponentsInChildren<SkinnedMeshRenderer>();
            var originalMeshs = new Dictionary<string, Mesh>();
            foreach(var skinnedMeshRenderer in suitRenderers.Concat(suitlessRenderers))
            {
                //ConnectionController.Console.WriteLine($"Adding skin to dictionary: [{skinnedMeshRenderer.gameObject.name}]");
                originalMeshs.Add(skinnedMeshRenderer.gameObject.name, skinnedMeshRenderer.sharedMesh);
            }

            foreach(var skinnedMeshRenderer in playerBody.GetComponentsInChildren<SkinnedMeshRenderer>())
            {
                if(originalMeshs.ContainsKey(skinnedMeshRenderer.gameObject.name))
                {
                    skinnedMeshRenderer.sharedMesh = originalMeshs[skinnedMeshRenderer.gameObject.name];
                }
                else
                {
                    ConnectionController.Console.WriteLine($"Couldn't find: [{skinnedMeshRenderer.gameObject.name}]");
                }
            }
        }

        /// <summary>
        /// Creates a copy of the skin and attaches all it's bones to the skeleton of the player
        /// boneMap maps from the bone name of the skin to the bone name of the original player prefab
        /// </summary>
        private static SkinnedMeshRenderer[] Swap(GameObject original, GameObject toCopy, Func<string, string> boneMap)
        {
            var newModel = GameObject.Instantiate(toCopy, original.transform.parent.transform);
            newModel.transform.localPosition = Vector3.zero;
            newModel.SetActive(true);

            // Disappear existing mesh renderers
            foreach (var skinnedMeshRenderer in original.GetComponentsInChildren<SkinnedMeshRenderer>())
            {
                if (!skinnedMeshRenderer.name.Contains("Props_HEA_Jetpack"))
                {
                    skinnedMeshRenderer.sharedMesh = null;

                    var owRenderer = skinnedMeshRenderer.gameObject.GetComponent<OWRenderer>();
                    if (owRenderer != null) owRenderer.enabled = false;

                    var streamingMeshHandle = skinnedMeshRenderer.gameObject.GetComponent<StreamingMeshHandle>();
                    if (streamingMeshHandle != null) GameObject.Destroy(streamingMeshHandle);
                }
            }

            var skinnedMeshRenderers = newModel.transform.GetComponentsInChildren<SkinnedMeshRenderer>();
            foreach (var skinnedMeshRenderer in skinnedMeshRenderers)
            {
                var bones = skinnedMeshRenderer.bones;
                for (int i = 0; i < bones.Length; i++)
                {
                    // Reparent the bone to the player skeleton
                    var bone = bones[i];
                    string matchingBone = boneMap(bone?.name);
                    var newParent = SearchInChildren(original.transform.parent, matchingBone);
                    if (newParent == null)
                    {
                        // This should never happen in a release, this is just for testing with new models
                        ConnectionController.Console.WriteLine($"Couldn't find bone [{matchingBone}] matching [{bone}]");
                    }
                    else
                    {
                        bone.parent = newParent;
                        bone.localPosition = Vector3.zero;
                        bone.localRotation = Quaternion.identity;

                        // Because the Remote Player is scaled by 0.1f for some reason so we have to offset this
                        bone.localScale = Vector3.one * 10f;
                    }
                }

                skinnedMeshRenderer.rootBone = SearchInChildren(original.transform.parent, playerPrefix + "Trajectory" + playerSuffix);
                skinnedMeshRenderer.quality = SkinQuality.Bone4;
                skinnedMeshRenderer.updateWhenOffscreen = true;

                // Reparent the skinnedMeshRenderer to the original object.
                skinnedMeshRenderer.transform.parent = original.transform;
            }
            // Since we reparented everything to the player we don't need this anymore
            GameObject.Destroy(newModel);

            return skinnedMeshRenderers;
        }

        public static Transform SearchInChildren(Transform parent, string target)
        {
            if (parent.name.Equals(target)) return parent;

            foreach (Transform child in parent)
            {
                var search = SearchInChildren(child, target);
                if (search != null) return search;
            }

            return null;
        }

        private static GameObject LoadPrefab(string name)
        {
            if(_assetBundle == null)
            {
                _assetBundle = ConnectionController.ModHelperInstance.Assets.LoadBundle($"AssetBundles/skins");
            }

            //ConnectionController.Console.WriteLine($"Loading skin {name}");

            var prefab = _assetBundle.LoadAsset<GameObject>($"Assets/Prefabs/{name}.prefab");

            return prefab;
        }
    }
}
