using Sfs2X;
using Sfs2X.Core;
using Sfs2X.Entities.Data;

using UnityEngine;

namespace OuterWildsOnline.SyncObjects
{
    public class ObjectToRecieveSync : MonoBehaviour
    {
        protected SmartFox sfs { get => ConnectionController.Connection; }

        private string _objectName;
        private int _userID;
        private int _objectId;

        public string ObjectName { get => _objectName; }
        public int UserId { get => _userID; }
        public int ObjectId { get => _objectId; }

        protected ISFSObject ObjectData;

        public virtual void UpdateObjectData(ISFSObject objectData) 
        {
            ObjectData = objectData;
        }
        protected virtual void Start()
        {
            sfs.AddEventListener(SFSEvent.EXTENSION_RESPONSE, OnExtensionResponse);
        }
        protected virtual void OnDestroy()
        {
            sfs.RemoveEventListener(SFSEvent.EXTENSION_RESPONSE, OnExtensionResponse);
        }

        public virtual void Init(string objectName, int userID, int objectId)
        {
            _objectName = objectName;
            _userID = userID;
            _objectId = objectId;

            //ConnectionController.ModHelperInstance.Console.WriteLine($"On Init {objectName} / {userID} / {objectId}");
        }

        //Instead of overriding the delegate OnExtensionResponse we could create a method that only gets called when it is supposed to
        //And which returns a already treated responseParams to make using it easier
        //Plus if the object doesn't need to sync the transform it can just ignore the base method
        protected virtual void OnExtensionResponse(SFSObject responseParams)
        {
            bool interpolate = !responseParams.ContainsKey("interp") || responseParams.GetBool("interp");

            if (responseParams.ContainsKey("x"))
            {
                GetComponent<SimpleRemoteInterpolation>().SetPosition(
                new Vector3(responseParams.GetFloat("x"), responseParams.GetFloat("y"), responseParams.GetFloat("z")),
                interpolate,
                responseParams.GetInt("sec"));
            }
            if (responseParams.ContainsKey("rotx"))
            {
                GetComponent<SimpleRemoteInterpolation>().SetRotation(
                Quaternion.Euler(responseParams.GetFloat("rotx"), responseParams.GetFloat("roty"), responseParams.GetFloat("rotz")),
                interpolate,
                responseParams.GetInt("sec"));
            }
        }
        
        private void OnExtensionResponse(BaseEvent evt)
        {
            string cmd = (string)evt.Params["cmd"];

            if (cmd != "SyncObject") { return; }

            SFSObject responseParams = (SFSObject)evt.Params["params"];

            int userID = responseParams.GetInt("userId");
            string objectName = responseParams.GetUtfString("objectName");
            int objectId = responseParams.GetInt("objectId");
            if (objectName == _objectName && userID == _userID && objectId == _objectId)
                OnExtensionResponse(responseParams);
        }
    }
}
