using Sfs2X;
using Sfs2X.Entities.Data;
using Sfs2X.Requests;
using System;
using System.Collections;
using UnityEngine;

namespace OuterWildsOnline.SyncObjects
{
    public class ObjectToSendSync : MonoBehaviour
    {
        
        protected Vector3 lastPosition;
        protected Vector3 lastRotation;

        protected string objectName;
        protected int objectId;

        protected bool interpolate = true;

        //If negative then don't force sync
        protected float forceSyncDeltaTime = 0.5f;

        protected SmartFox sfs { get => ConnectionController.Connection; }
        public string ObjectName { get => objectName; }
        public int ObjectId { get => objectId; }

        public SFSObject ObjectData { get; protected set; }

        public virtual void ConfigChanged(OWML.Common.IModConfig config)
        {

        }
        protected void SetObjectName(string objectName)
        {
            this.objectName = objectName;
        }
        protected virtual void Awake() //Generate on awake in case that this script is attached to a prefab of sorts
        {
            objectId = Guid.NewGuid().GetHashCode();
            ObjectData = new SFSObject();
            ObjectData.PutUtfString("name", objectName);
            ObjectData.PutInt("id", objectId);
        }
        protected virtual void Start() 
        {
            ConnectionController.Instance.AddObjectToSync(this);
            StartCoroutine(ForceSync());
        }
        protected virtual void FixedUpdate()
        {
            if (objectName == null || SFSSectorManager.ClosestSectorToPlayer == null || Vector3.Distance(Locator.GetPlayerTransform().position, transform.position) > 1000f) { return; }
            var data = new SFSObject();
            OnSync(data);
            data.PutUtfString("objectName", objectName);
            data.PutInt("objectId", objectId);
            sfs.Send(new ExtensionRequest("SyncObject", data, sfs.LastJoinedRoom));
        }
        protected virtual IEnumerator ForceSync()
        {
            bool continueForceSync = true;
            while (continueForceSync)
            {
                if (forceSyncDeltaTime <= 0)
                    continueForceSync = false;

                yield return new WaitForSeconds(forceSyncDeltaTime);

                if (objectName != null && SFSSectorManager.ClosestSectorToPlayer != null && Vector3.Distance(Locator.GetPlayerTransform().position, transform.position) <= 1000f)
                {
                    var data = new SFSObject();
                    OnForceSync(data);
                    data.PutUtfString("objectName", objectName);
                    data.PutInt("objectId", objectId);
                    sfs.Send(new ExtensionRequest("SyncObject", data, sfs.LastJoinedRoom));
                }
            }
        }
        protected virtual void OnSync(SFSObject syncData)
        {
            var pos = SFSSectorManager.ClosestSectorToPlayer.transform.InverseTransformPoint(transform.position);
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
        protected virtual void OnForceSync(SFSObject syncData)
        {
            syncData.PutFloat("x", lastPosition.x);
            syncData.PutFloat("y", lastPosition.y);
            syncData.PutFloat("z", lastPosition.z);

            syncData.PutFloat("rotx", lastRotation.x);
            syncData.PutFloat("roty", lastRotation.y);
            syncData.PutFloat("rotz", lastRotation.z);

            syncData.PutBool("interp", interpolate);
            syncData.PutInt("sec", SFSSectorManager.ClosestSectorToPlayerID);
        }
        protected virtual void OnDestroy()
        {
            if(RemoteObjects.GetObject(sfs.MySelf.Id,ObjectName,ObjectId,out _))
                ConnectionController.Instance.RemoveObjectToSync(this);
        }
    }
}