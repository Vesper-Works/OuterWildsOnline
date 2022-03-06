using Sfs2X;
using Sfs2X.Entities.Data;
using Sfs2X.Requests;
using System;
using UnityEngine;

namespace OuterWildsOnline.SyncObjects
{
    public class ObjectToSendSync : MonoBehaviour
    {
        private Vector3 lastPosition;
        private Vector3 lastRotation;

        private string objectName;
        private int objectId;

        protected bool interpolate = true;

        protected SmartFox sfs { get => ConnectionController.Connection; }
        public string ObjectName { get => objectName; }
        public int ObjectId { get => objectId; }

        public ObjectToSendSync Init(string objectName)
        {
            this.objectName = objectName;
            return this;
        }
        protected virtual void Awake() //Generate on awake in case that this script is attached to a prefab of sorts
        {
            objectId = Guid.NewGuid().GetHashCode();
        }
        protected void FixedUpdate()
        {
            if (objectName == null || SFSSectorManager.ClosestSectorToPlayer == null ||Vector3.Distance(Locator.GetPlayerTransform().position, transform.position) > 1000f) { return; }
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
            data.PutBool("interp", interpolate);
            data.PutInt("sec", SFSSectorManager.ClosestSectorToPlayerID);
            data.PutUtfString("objectName", objectName);
            data.PutInt("objectId", objectId);
            sfs.Send(new ExtensionRequest("SyncObject", data, sfs.LastJoinedRoom));
        }
    }
}