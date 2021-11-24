using Sfs2X;
using Sfs2X.Core;
using Sfs2X.Entities.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnityEngine;

namespace OuterWildsOnline.SyncClasses
{
    public class GhostObjectToSync : MonoBehaviour
    {
        private SmartFox sfs { get => ConnectionController.Connection; }

        private string _objectName;
        private int _userID;
        protected void Start()
        {
            sfs.AddEventListener(SFSEvent.EXTENSION_RESPONSE, OnExtensionResponse);
        }

        public void Init(string objectName, int userID)
        {
            this._objectName = objectName;
            this._userID = userID;
        }

        private void OnExtensionResponse(BaseEvent evt)
        {
            string cmd = (string)evt.Params["cmd"];

            if(cmd != "SyncObject") { return; }

            SFSObject responseParams = (SFSObject)evt.Params["params"];

            string objectName = responseParams.GetUtfString("objectName");
            int userID = responseParams.GetInt("userId");
            if(objectName != _objectName || userID != _userID) { return; }

            if (responseParams.ContainsKey("x"))
            {
                GetComponent<SimpleRemoteInterpolation>().SetPosition(
                new Vector3(responseParams.GetFloat("x"), responseParams.GetFloat("y"), responseParams.GetFloat("z")),
                true,
                responseParams.GetInt("sec"));
            }
            if (responseParams.ContainsKey("rotx"))
            {
                GetComponent<SimpleRemoteInterpolation>().SetRotation(
                Quaternion.Euler(responseParams.GetFloat("rotx"), responseParams.GetFloat("roty"), responseParams.GetFloat("rotz")),
                true,
                responseParams.GetInt("sec"));
            }
        }
    }
}
