using Sfs2X;
using Sfs2X.Entities.Data;
using Sfs2X.Requests;
using UnityEngine;

namespace OuterWildsOnline.SyncObjects
{
    public class ObjectToSendSync : MonoBehaviour
    {
        private Vector3 lastPosition;
        private Vector3 lastRotation;

        private string objectName;

        protected bool interpolate = true;

        protected SmartFox sfs { get => ConnectionController.Connection; }
        public string ObjectName { get => objectName; }

        public ObjectToSendSync Init(string objectName)
        {
            this.objectName = objectName;
            return this;
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
            sfs.Send(new ExtensionRequest("SyncObject", data, sfs.LastJoinedRoom));
        }
    }
}