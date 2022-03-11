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
        public static void DestoryChildrenWithNameRecursively(this Transform transform, string name)
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
                    DestoryChildrenWithNameRecursively(child, name);
                }
            }
            int length = childrenToDestroy.Count;
            for (int i = 0; i < length; i++)
            {
                GameObject.DestroyImmediate(childrenToDestroy[i]);
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
    }
}
