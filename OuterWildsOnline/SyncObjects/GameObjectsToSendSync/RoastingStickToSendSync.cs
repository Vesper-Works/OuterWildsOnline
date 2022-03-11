using Sfs2X.Entities.Data;
using Sfs2X.Requests;
using System.Collections;
using UnityEngine;

namespace OuterWildsOnline.SyncObjects
{
    public class RoastingStickToSendSync : ObjectToSendSync
    {
        protected override void Awake()
        {
            interpolate = true;
            GlobalMessenger<Campfire>.AddListener("EnterRoastingMode", new Callback<Campfire>(this.OnEnterRoastingMode));
            GlobalMessenger.AddListener("ExitRoastingMode", new Callback(this.OnExitRoastingMode));

            SetObjectName("RoastingStick");
            base.Awake();
            ObjectData.PutBool("enable", gameObject.activeSelf);
        }

        private void OnEnterRoastingMode(Campfire campfire)
        {
            ObjectData.PutBool("enable", true);
            ConnectionController.Instance.UpdateObjectToSyncData(this);
        }

        private void OnExitRoastingMode()
        {
            ObjectData.PutBool("enable", false);
            ConnectionController.Instance.UpdateObjectToSyncData(this);
        }

        protected override void OnSync(SFSObject syncData)
        {
            var pos = SFSSectorManager.ClosestSectorToPlayer.transform.InverseTransformPoint(transform.position + (transform.forward * (transform.GetChild(0).localPosition.z/2)));
            if (!lastPosition.ApproxEquals(pos, 0.01f))
            {
                lastPosition = pos;
                syncData.PutFloat("x", pos.x);
                syncData.PutFloat("y", pos.y);
                syncData.PutFloat("z", pos.z);
            }

            var rot = SFSSectorManager.ClosestSectorToPlayer.transform.InverseTransformRotation(transform.rotation).eulerAngles;
            if (!lastRotation.ApproxEquals(rot, 0.01f))
            {
                lastRotation = rot;
                syncData.PutFloat("rotx", rot.x);
                syncData.PutFloat("roty", rot.y);
                syncData.PutFloat("rotz", rot.z);
            }
            syncData.PutBool("interp", interpolate);
            syncData.PutInt("sec", SFSSectorManager.ClosestSectorToPlayerID);
        }
    }
}
