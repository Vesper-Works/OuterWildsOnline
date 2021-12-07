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
                transform.GetChild(0).gameObject.SetActive(responseParams.GetBool("enable"));
            }
            #endregion

            #region Ship
            if (responseParams.ContainsKey("tmla"))
            {
                gameObject.GetComponent<ThrusterWashControllerSync>().ThrusterModelLocalYAcceleration = responseParams.GetFloat("tmla");
            }
            if (responseParams.ContainsKey("thr,0"))
            {

                ThrusterFlameControllerSync[] thrusters = GetComponentsInChildren<ThrusterFlameControllerSync>(true);

                for (int i = 0; i < thrusters.Length; i++) //10 thrusters                 
                {
                    thrusters[i].OnTranslationalThrust(responseParams.GetBool("thr," + i));
                }                      
            }
            if (responseParams.ContainsKey("tt"))
            {
                if (responseParams.GetBool("tt"))
                {
                    gameObject.GetComponent<ThrusterWashControllerSync>().OnStartTranslationalThrust();
                }
                else
                {
                    gameObject.GetComponent<ThrusterWashControllerSync>().OnStopTranslationalThrust();
                    ThrusterFlameControllerSync[] thrusters = GetComponentsInChildren<ThrusterFlameControllerSync>(true);

                    for (int i = 0; i < thrusters.Length; i++) //10 thrusters                 
                    {
                        thrusters[i].OnTranslationalThrust(false);
                    }
                }
            }
            #endregion
            #region NomaiHands
            if (responseParams.ContainsKey("nx")) //Special nomai coords
            {
              //Use an overloaded SetPostition
            }
            #endregion
        }
    }
}
