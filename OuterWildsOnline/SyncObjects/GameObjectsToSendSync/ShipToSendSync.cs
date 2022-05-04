using Sfs2X.Entities.Data;
using Sfs2X.Requests;
using System.Collections;
using UnityEngine;

namespace OuterWildsOnline.SyncObjects
{
    public class ShipToSendSync : ObjectToSendSync
    {
        private ShipThrusterModel shipThrusterModel;
        protected override void Awake()
        {
            shipThrusterModel = gameObject.GetComponent<ShipThrusterModel>();
            shipThrusterModel.OnStartTranslationalThrust += ShipStartedTranslationalThrust;
            shipThrusterModel.OnStopTranslationalThrust += ShipStoppedTranslationalThrust;

            SetObjectName("Ship");
            base.Awake();
        }
        protected override void Start() 
        {
            base.Start();
            StartCoroutine(SyncShipVisuals());
        }
        private void ShipStartedTranslationalThrust()
        {
            var data = new SFSObject();
            data.PutBool("tt", true);
            data.PutUtfString("objectName", ObjectName);
            data.PutInt("objectId", objectId);
            sfs.Send(new ExtensionRequest("SyncObject", data, sfs.LastJoinedRoom));
        }
        private void ShipStoppedTranslationalThrust()
        {
            var data = new SFSObject();
            data.PutBool("tt", false);
            data.PutUtfString("objectName", ObjectName);
            data.PutInt("objectId", objectId);
            sfs.Send(new ExtensionRequest("SyncObject", data, sfs.LastJoinedRoom));
        }

        private IEnumerator SyncShipVisuals()
        {
            while (true)
            {
                var data = new SFSObject();

                if (shipThrusterModel.IsTranslationalThrusterFiring())
                {
                    data.PutFloat("tmla", shipThrusterModel.GetLocalAcceleration().y);
                    data.PutUtfString("objectName", ObjectName);
                    data.PutInt("objectId", objectId);
                    ThrusterFlameController[] thrusters1 = GameObject.Find("Ship_Body/Module_Engine/Effects_Engine/Thrusters").GetComponentsInChildren<ThrusterFlameController>(true);
                    ThrusterFlameController[] thrusters2 = GameObject.Find("Ship_Body/Module_Supplies/Effects_Supplies/Thrusters").GetComponentsInChildren<ThrusterFlameController>(true);
                    ThrusterFlameController[] thrusters = new ThrusterFlameController[thrusters1.Length + thrusters2.Length];
                    thrusters1.CopyTo(thrusters, 0);
                    thrusters2.CopyTo(thrusters, thrusters1.Length);
                    for (int i = 0; i < thrusters.Length; i++) //10 thrusters
                    {
                        if (Vector3.Dot(shipThrusterModel.GetLocalAcceleration(), thrusters[i]._thrusterFilter) > 0)
                        {
                            data.PutBool("thr," + i, true);
                        }
                        else
                        {
                            data.PutBool("thr," + i, false);
                        }
                    }
                    sfs.Send(new ExtensionRequest("SyncObject", data, sfs.LastJoinedRoom));
                }
                yield return new WaitForSecondsRealtime(0.1f);
            }
        }
    }
}

