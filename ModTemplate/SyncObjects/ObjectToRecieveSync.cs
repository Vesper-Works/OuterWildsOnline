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
        private SmartFox sfs { get => ConnectionController.Connection; }

        private string _objectName;
        private int _userID;
        protected virtual void Start()
        {
            sfs.AddEventListener(SFSEvent.EXTENSION_RESPONSE, OnExtensionResponse);
        }

        public void Init(string objectName, int userID)
        {
            this._objectName = objectName;
            this._userID = userID;
        }

        protected virtual void OnExtensionResponse(BaseEvent evt)
        {
            string cmd = (string)evt.Params["cmd"];

            if(cmd != "SyncObject") { return; }

            SFSObject responseParams = (SFSObject)evt.Params["params"];

            string objectName = responseParams.GetUtfString("objectName");
            int userID = responseParams.GetInt("userId");
            if(objectName != _objectName || userID != _userID) { return; }

            bool interpolate = responseParams.ContainsKey("interp") ? responseParams.GetBool("interp") : true;

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

            #region Probe
            if (responseParams.ContainsKey("enable"))
            {
                ConnectionController.ModHelperInstance.Console.WriteLine(responseParams.GetBool("enable"));
                transform.GetChild(0).gameObject.SetActive(responseParams.GetBool("enable"));
            }
            #endregion

            #region Ship
            if (responseParams.ContainsKey("tmla"))
            {
                gameObject.GetComponent<ThrusterWashControllerSync>().ThrusterModelLocalYAcceleration = responseParams.GetFloat("tmla");
            }
            if (responseParams.ContainsKey("tt"))
            {
                ConnectionController.ModHelperInstance.Console.WriteLine("Recieving thrusting!");
                if (responseParams.GetBool("tt") == true)
                {
                    gameObject.GetComponent<ThrusterWashControllerSync>().OnStartTranslationalThrust();
                    foreach (var thrusterController in gameObject.GetComponentsInChildren<ThrusterFlameControllerSync>())
                    {
                        thrusterController.OnStartTranslationalThrust();
                    }
                }
                else
                {
                    gameObject.GetComponent<ThrusterWashControllerSync>().OnStopTranslationalThrust();
                    foreach (var thrusterController in gameObject.GetComponentsInChildren<ThrusterFlameControllerSync>())
                    {
                        thrusterController.OnStopTranslationalThrust();
                    }
                }
            }
            #endregion
        }
    }
}
