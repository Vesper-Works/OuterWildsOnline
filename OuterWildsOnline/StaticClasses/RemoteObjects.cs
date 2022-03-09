using System.Collections.Generic;
using System.Linq;
using UnityEngine;
using OuterWildsOnline.SyncObjects;
using Sfs2X.Entities.Data;

namespace OuterWildsOnline
{
    public static class RemoteObjects
    {
        private static Dictionary<int, ClientRemoteObjects> Objects = new Dictionary<int, ClientRemoteObjects>();

        public static Dictionary<string, GameObject> CloneStorage = new Dictionary<string, GameObject>();
        public static List<ObjectToRecieveSync> Players { get => GetNameObjectList("Player"); }

        public static ISFSObject LocalObjectsListFromMyself = new SFSObject();

        public static bool AddNewObject(ObjectToRecieveSync @object)
        {
            if (!Objects.ContainsKey(@object.UserId))
                Objects.Add(@object.UserId, new ClientRemoteObjects());

            return Objects[@object.UserId].AddNewObject(@object);
        }

        public static bool RemoveObject(ObjectToRecieveSync @object)
        {
            if (!Objects.ContainsKey(@object.UserId))
                return false;

            return Objects[@object.UserId].RemoveObject(@object);
        }

        public static bool RemoveObjects(int userId, bool destroyGameObjects = false)
        {
            if (!Objects.ContainsKey(userId))
                return false;

            Objects[userId].RemoveObjects(destroyGameObjects);
            return true;
        }
        public static void RemoveAllObjects(bool destroyGameObjects)
        {
            if (destroyGameObjects)
                DestroyAllObjects();

            Objects.Clear();
        }

        public static bool GetObject(int userId, string objectName, int objectId, out ObjectToRecieveSync @object)
        {
            @object = null;
            if (!Objects.ContainsKey(userId))
                return false;

            return Objects[userId].GetObject(objectName, objectId, out @object);
        }

        public static List<ObjectToRecieveSync> GetNameObjectList(string objectName)
        {
            List<ObjectToRecieveSync> objectsOfSameName = new List<ObjectToRecieveSync>();
            foreach (var objGroup in Objects)
            {
                if (objGroup.Value.GetObjectList(objectName, out var objects))
                    objectsOfSameName.AddRange(objects);
            }
            return objectsOfSameName;
        }
        public static List<ObjectToRecieveSync> GetUserObjectList(int userId)
        {
            if (Objects.ContainsKey(userId))
                return Objects[userId].ToList();

            return new List<ObjectToRecieveSync>();
        }
        public static bool GetObjectList(int userId, string objectName, out List<ObjectToRecieveSync> objects)
        {
            objects = null;
            if (!Objects.ContainsKey(userId))
                return false;

            return Objects[userId].GetObjectList(objectName, out objects);
        }
        public static void Clear(bool destroyGameObjects)
        {
            if (destroyGameObjects)
                DestroyAllObjects();

            Objects.Clear();
            CloneStorage.Clear();
        }
        private static void DestroyAllObjects()
        {
            foreach (var objGroups in Objects)
                objGroups.Value.RemoveObjects(true);
        }
    }
    public class ClientRemoteObjects
    {
        private Dictionary<string, Dictionary<int, ObjectToRecieveSync>> remoteClientObjects;

        public ClientRemoteObjects()
        {
            remoteClientObjects = new Dictionary<string, Dictionary<int, ObjectToRecieveSync>>();
        }

        public bool AddNewObject(ObjectToRecieveSync @object)
        {
            if (!remoteClientObjects.ContainsKey(@object.ObjectName))
                remoteClientObjects.Add(@object.ObjectName, new Dictionary<int, ObjectToRecieveSync>());

            if(remoteClientObjects[@object.ObjectName].ContainsKey(@object.ObjectId))
                return false;
            
            remoteClientObjects[@object.ObjectName].Add(@object.ObjectId, @object);
            return true;
        }

        public bool RemoveObject(ObjectToRecieveSync @object)
        {
            if (!remoteClientObjects.ContainsKey(@object.ObjectName))
                return false;

            return remoteClientObjects[@object.ObjectName].Remove(@object.ObjectId);
        }
        public void RemoveObjects(bool destroyGameObjects = false)
        {
            if (destroyGameObjects)
            {
                DestroyObjects();
            }

            remoteClientObjects.Clear();
        }
        private void DestroyObjects()
        {
            foreach (var pair in remoteClientObjects.Values)
            {
                foreach (var obj in pair.Values)
                {
                    if (obj != null)
                        GameObject.Destroy(obj.gameObject);
                }
            }
        }

        public bool GetObject(string objectName, int objectId, out ObjectToRecieveSync @object)
        {
            @object = null;
            if (!remoteClientObjects.ContainsKey(objectName))
                return false;

            return remoteClientObjects[objectName].TryGetValue(objectId, out @object);
        }

        public bool GetObjectList(string objectName, out List<ObjectToRecieveSync> objects)
        {
            objects = null;
            if (!remoteClientObjects.ContainsKey(objectName))
                return false;

            objects = remoteClientObjects[objectName].Values.ToList();
            return true;
        }
        public List<ObjectToRecieveSync> ToList()
        {
            List<ObjectToRecieveSync> objects = new List<ObjectToRecieveSync>();
            foreach (var objGroup in remoteClientObjects)
            {
                objects.AddRange(objGroup.Value.Values);
            }
            return objects;
        }
    }
}
