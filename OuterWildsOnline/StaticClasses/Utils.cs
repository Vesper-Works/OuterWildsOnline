using OWML.Common;
using System;
using System.Collections.Generic;
using System.Reflection;
using UnityEngine;

namespace OuterWildsOnline
{
    public enum CustomSkin
    {
        Protagonist,
        Gabbro,
        Feldspar,
        Chert
    }
    public static class Utils
    {
        public static void SetActiveRecursively(Transform transform, bool active)
        {
            transform.gameObject.SetActive(active);
            foreach (Transform child in transform)
            {
                child.gameObject.SetActive(active);
                foreach (var component in child.GetComponents<MonoBehaviour>())
                {
                    component.enabled = active;
                }
                if (child.childCount > 0)
                {
                    SetActiveRecursively(child, active);
                }
            }
        }
        public static void DestroyChildrenWithNameRecursively(this Transform transform, string name)
        {
            List<GameObject> childrenToDestroy = new List<GameObject>();
            foreach (Transform child in transform)
            {
                if (child.gameObject.name.Contains(name))
                {
                    childrenToDestroy.Add(child.gameObject);
                }
                if (child.childCount > 0)
                {
                    DestroyChildrenWithNameRecursively(child, name);
                }
            }
            int length = childrenToDestroy.Count;
            for (int i = 0; i < length; i++)
            {
                GameObject.DestroyImmediate(childrenToDestroy[i]);
            }
        }
        public static void DestroyComponentFromGameObjectRecursively(this Transform transform, Type component)
        {

            foreach (Transform child in transform)
            {
                if (child.TryGetComponent(component, out Component componentToDestroy))
                {
                    Component.DestroyImmediate(componentToDestroy);
                }
                if (child.childCount > 0)
                {
                    DestroyComponentFromGameObjectRecursively(child, component);
                }
            }
        }
        public static void RemoveCollisionFromObjectRecursively(Transform transform)
        {
            if (transform.TryGetComponent<Collider>(out Collider collider)) { collider.enabled = false; }
            foreach (Transform child in transform)
            {
                if (child.TryGetComponent<Collider>(out collider)) { collider.enabled = false; }
                if (child.childCount > 0)
                {
                    RemoveCollisionFromObjectRecursively(child);
                }
            }
        }
        public static void UpdateColourRecursive(Color color, Transform child)
        {
            if (child.TryGetComponent(out SkinnedMeshRenderer meshRenderer))
            {
                meshRenderer.material.color = color;
            }
            foreach (Transform possibleRenderer in child)
            {
                if (possibleRenderer.TryGetComponent(out meshRenderer))
                {
                    foreach (var material in meshRenderer.materials)
                    {
                        material.color = color;
                    }
                }
                UpdateColourRecursive(color, possibleRenderer);
            }
        }
        public static void MakeObjectAcceptTransparencyRecursive(Transform child)
        {
            if (child.TryGetComponent(out Renderer meshRenderer))
            {
                var mat = meshRenderer.material;

                // set rendering mode to transparent
                mat.SetFloat("_Mode", 4);
                mat.SetInt("_SrcBlend", (int)UnityEngine.Rendering.BlendMode.One);
                mat.SetInt("_DstBlend", (int)UnityEngine.Rendering.BlendMode.OneMinusSrcAlpha);
                mat.SetInt("_ZWrite", 0);
                mat.DisableKeyword("_ALPHATEST_ON");
                mat.DisableKeyword("_ALPHABLEND_ON");
                mat.EnableKeyword("_ALPHAPREMULTIPLY_ON");
                mat.renderQueue = 3000;
            }
            foreach (Transform possibleRenderer in child)
            {
                if (possibleRenderer.TryGetComponent(out meshRenderer))
                {
                    foreach (var mat in meshRenderer.materials)
                    {
                        // set rendering mode to transparent
                        mat.SetFloat("_Mode", 3);
                        mat.SetInt("_SrcBlend", (int)UnityEngine.Rendering.BlendMode.One);
                        mat.SetInt("_DstBlend", (int)UnityEngine.Rendering.BlendMode.OneMinusSrcAlpha);
                        mat.SetInt("_ZWrite", 0);
                        mat.DisableKeyword("_ALPHATEST_ON");
                        mat.DisableKeyword("_ALPHABLEND_ON");
                        mat.EnableKeyword("_ALPHAPREMULTIPLY_ON");
                        mat.renderQueue = 3000;
                    }
                }
                MakeObjectAcceptTransparencyRecursive(possibleRenderer);
            }
        }
        public static string GetPlayerProfileName()
        {
#if DEBUG
            return ConnectionController.Connection.MySelf.Name;
#endif
            string playerName;
            try //Stolen straight from QSB!
            {
                //ConnectionController.Console.WriteLine($"Here1", MessageType.Warning);
                //var titleScreenManager = MonoBehaviour.FindObjectOfType<TitleScreenManager>();
                //ConnectionController.Console.WriteLine($"Here2", MessageType.Warning);
                //var profileManager = titleScreenManager._profileManager;
                //ConnectionController.Console.WriteLine($"Here3", MessageType.Warning);
                //if (profileManager.GetType().Name == "MSStoreProfileManager")
                //{
                //    playerName = (string)profileManager.GetType().GetProperty("userDisplayName").GetValue(profileManager);
                //    ConnectionController.Console.WriteLine($"Here4", MessageType.Warning);
                //}
                //else
                {
                    playerName = StandaloneProfileManager.SharedInstance.currentProfile.profileName;
                }
            }
            catch (Exception ex)
            {
                ConnectionController.Console.WriteLine($"Error - Exception when getting player name : {ex}", MessageType.Error);
                playerName = "Unknown Player";
            }
            return playerName;
        }
        public static T GetCopyOf<T>(this Component comp, T other) where T : Component
        {
            Type type = comp.GetType();
            if (type != other.GetType()) return null; // type mis-match
            BindingFlags flags = BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.Default | BindingFlags.DeclaredOnly;
            PropertyInfo[] pinfos = type.GetProperties(flags);
            foreach (var pinfo in pinfos)
            {
                if (pinfo.CanWrite)
                {
                    try
                    {
                        pinfo.SetValue(comp, pinfo.GetValue(other, null), null);
                    }
                    catch { } // In case of NotImplementedException being thrown. For some reason specifying that exception didn't seem to catch it, so I didn't catch anything specific.
                }
            }
            FieldInfo[] finfos = type.GetFields(flags);
            foreach (var finfo in finfos)
            {
                finfo.SetValue(comp, finfo.GetValue(other));
            }
            return comp as T;
        }
        public static T AddComponent<T>(this GameObject go, T toAdd) where T : Component
        {
            return go.AddComponent<T>().GetCopyOf(toAdd) as T;
        }
        public static ReferenceFrameVolume MakeReferenceFrameVolume(GameObject body, OWRigidbody rigidbody, float sphereOfInfluence)
        {
            GameObject rfGO = new GameObject("RFVolume");
            rfGO.transform.parent = body.transform;
            rfGO.transform.localPosition = Vector3.zero;
            rfGO.layer = 19;
            rfGO.SetActive(false);

            SphereCollider SC = rfGO.AddComponent<SphereCollider>();
            SC.isTrigger = true;
            SC.radius = sphereOfInfluence * 2;

            ReferenceFrameVolume RFV = rfGO.AddComponent<ReferenceFrameVolume>();

            ReferenceFrame RV = new ReferenceFrame(rigidbody);
            RV._minSuitTargetDistance = sphereOfInfluence;
            RV._maxTargetDistance = 0;
            RV._autopilotArrivalDistance = 2.0f * sphereOfInfluence;
            RV._autoAlignmentDistance = sphereOfInfluence * 1.5f;

            RV._hideLandingModePrompt = false;
            RV._matchAngularVelocity = true;
            RV._minMatchAngularVelocityDistance = 70;
            RV._maxMatchAngularVelocityDistance = 400;
            RV._bracketsRadius = sphereOfInfluence;

            RFV._referenceFrame = RV;
            RFV._minColliderRadius = sphereOfInfluence;
            RFV._maxColliderRadius = sphereOfInfluence * 2f;
            RFV._isPrimaryVolume = true;
            RFV._isCloseRangeVolume = false;


            rfGO.SetActive(true);
            return RFV;
        }
        public static string GetPath(this Transform current)
        {
            if (current.parent == null)
                return "/" + current.name;
            return current.parent.GetPath() + "/" + current.name;
        }
    }
}
