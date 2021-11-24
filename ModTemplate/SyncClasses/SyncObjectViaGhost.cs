using Sfs2X.Core;
using Sfs2X.Entities.Data;
using Sfs2X.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnityEngine;

namespace OuterWildsOnline.SyncClasses
{
    public abstract class SyncObjectViaGhost : MonoBehaviour
    {
        private Vector3 lastPosition;
        private Vector3 lastRotation;

        private string objectName;

        public string ObjectName { get => objectName; }

        protected void Init(string objectName)
        {
            this.objectName = objectName;
        }
        protected virtual void FixedUpdate()
        {
            if(objectName == null) { return; }
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
            data.PutUtfString("objectName", objectName);

            ConnectionController.Connection.Send(new ExtensionRequest("SyncObject", data, ConnectionController.Connection.LastJoinedRoom));
        }


    }
}