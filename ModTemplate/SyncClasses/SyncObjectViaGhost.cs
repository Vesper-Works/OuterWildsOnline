using Sfs2X.Core;
using Sfs2X.Entities.Data;
using Sfs2X.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnityEngine;

namespace ModTemplate.SyncClasses
{
    public class SyncObjectViaGhost : MonoBehaviour
    {
        private Vector3 lastPosition;
        private Vector3 lastRotation;
        protected void Start()
        {
            ConnectionController.Connection.AddEventListener(SFSEvent.EXTENSION_RESPONSE, OnExtensionResponse);



            var data = new SFSObject();
            data.PutNull("Spawn");
            ConnectionController.Connection.Send(new ExtensionRequest("GeneralEvent", data));
        }

        protected virtual void Update()
        {
            var data = new SFSObject();

            var pos = SFSSectorManager.ClosestSectorToPlayer.transform.InverseTransformPoint(transform.position);
            if (!lastPosition.ApproxEquals(pos, 0.01f))
            {
                lastPosition = pos;
                data.PutFloat("x", pos.x);
                data.PutFloat("y", pos.y);
                data.PutFloat("z", pos.z);
            }

            var rot = SFSSectorManager.ClosestSectorToPlayer.transform.InverseTransformRotation(transform.rotation).eulerAngles;
            if (!lastRotation.ApproxEquals(rot, 0.01f))
            {
                lastRotation = rot;
                data.PutFloat("rotx", rot.x);
                data.PutFloat("roty", rot.y);
                data.PutFloat("rotz", rot.z);
            }

            data.PutInt("sec", SFSSectorManager.ClosestSectorToPlayerID);
            data.PutNull(gameObject.name);

            ConnectionController.Connection.Send(new ExtensionRequest("SyncObject", data));
        }

        protected void OnExtensionResponse(BaseEvent evt)
        {
            string cmd = (string)evt.Params["cmd"];

            if (evt.Params == null) { return; }
            if (evt.Params.Count == 0) { return; }
            if (!evt.Params.ContainsKey("params")) { return; }

            SFSObject responseParams = (SFSObject)evt.Params["params"];

            if (responseParams == null) { return; }

            if (!responseParams.ContainsKey("userId")) { return; }

            GameObject remoteObject = null;
            try
            {
                remoteObject = RemoteObjects.ObjectTypes[gameObject.name][responseParams.GetInt("userId")];
            }
            catch (Exception)
            {
                ConnectionController.ModHelperInstance.Console.WriteLine("No remote player found!", OWML.Common.MessageType.Warning);
                return;
            }
            if (remoteObject == null) { return; }

            if (responseParams.ContainsKey("x"))
            {
                remoteObject.GetComponent<SimpleRemoteInterpolation>().SetPosition(
                new Vector3(responseParams.GetFloat("x"), responseParams.GetFloat("y"), responseParams.GetFloat("z")),
                true,
                responseParams.GetInt("sec"));
            }
            if (responseParams.ContainsKey("rotx"))
            {
                remoteObject.GetComponent<SimpleRemoteInterpolation>().SetRotation(
                Quaternion.Euler(responseParams.GetFloat("rotx"), responseParams.GetFloat("roty"), responseParams.GetFloat("rotz")),
                true,
                responseParams.GetInt("sec"));
            }
        }
    }
}