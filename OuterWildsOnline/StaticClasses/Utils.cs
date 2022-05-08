using OWML.Common;
using System;
using System.Collections.Generic;
using UnityEngine;

namespace OuterWildsOnline
{
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
            foreach (Transform child in transform)
            {
                if (child.gameObject.name.ToLower().Contains("collision")) { child.gameObject.SetActive(false); }
                if (child.childCount > 0)
                {
                    RemoveCollisionFromObjectRecursively(child);
                }
            }
        }

        public static void UpdateColourRecursive(Color color, Transform child)
        {
            foreach (Transform possibleRenderer in child)
            {
                if (possibleRenderer.TryGetComponent(out SkinnedMeshRenderer meshRenderer))
                {
                    meshRenderer.material.color = color;
                }
                UpdateColourRecursive(color, possibleRenderer);
            }
        }
        public static string GetPlayerProfileName()
        {
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
                    ConnectionController.Console.WriteLine($"{playerName}", MessageType.Warning);
                }
            }
            catch (Exception ex)
            {
                ConnectionController.Console.WriteLine($"Error - Exception when getting player name : {ex}", MessageType.Error);
                playerName = "Unknown Player";
            }
            return playerName;
        }
    }
}
