using Sfs2X;
using Sfs2X.Core;
using Sfs2X.Entities.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnityEngine;

namespace OuterWildsOnline.SyncObjects
{
    public class ObjectToRecieveSync : MonoBehaviour
    {
        protected SmartFox sfs { get => ConnectionController.Connection; }

        private string _objectName;
        private int _userID;
        protected virtual void Start()
        {
            ConnectionController.ModHelperInstance.Console.WriteLine("Added OnExtensionResponse event to sfs");
            sfs.AddEventListener(SFSEvent.EXTENSION_RESPONSE, OnExtensionResponse);
        }
        protected virtual void OnDestroy()
        {
            ConnectionController.ModHelperInstance.Console.WriteLine("Removed OnExtensionResponse event from sfs");
            sfs.RemoveEventListener(SFSEvent.EXTENSION_RESPONSE, OnExtensionResponse);
        }

        public virtual void Init(string objectName, int userID)
        {
            _objectName = objectName;
            _userID = userID;
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
            ConnectionController.ModHelperInstance.Console.WriteLine("b");
            string cmd = (string)evt.Params["cmd"];

            if (cmd != "SyncObject") { return; }

            SFSObject responseParams = (SFSObject)evt.Params["params"];

            string objectName = responseParams.GetUtfString("objectName");
            int userID = responseParams.GetInt("userId");
            ConnectionController.ModHelperInstance.Console.WriteLine("c");
            if (objectName != _objectName || userID != _userID) { return; }
            OnExtensionResponse(responseParams);
        }
    }
}
