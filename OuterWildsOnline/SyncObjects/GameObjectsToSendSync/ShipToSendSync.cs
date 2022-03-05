using Sfs2X.Entities.Data;
using Sfs2X.Requests;
using System.Collections;
using UnityEngine;

namespace OuterWildsOnline.SyncObjects
{
    public class ShipToSendSync : ObjectToSendSync
    {
        private ShipThrusterModel shipThrusterModel;
        public ShipToSendSync Init()
        {
            shipThrusterModel = gameObject.GetComponent<ShipThrusterModel>();
            shipThrusterModel.OnStartTranslationalThrust += ShipStartedTranslationalThrust;
            shipThrusterModel.OnStopTranslationalThrust += ShipStoppedTranslationalThrust;
            StartCoroutine(SyncShipVisuals());
            StartCoroutine(SyncShipTransformOccasionally());
            Init("Ship");
            return this;
        }
        private void ShipStartedTranslationalThrust()
        {
            var data = new SFSObject();
            data.PutBool("tt", true);
            data.PutUtfString("objectName", ObjectName);
            sfs.Send(new ExtensionRequest("SyncObject", data, sfs.LastJoinedRoom));
        }
        private void ShipStoppedTranslationalThrust()
        {
            var data = new SFSObject();
            data.PutBool("tt", false);
            data.PutUtfString("objectName", ObjectName);
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
        private IEnumerator SyncShipTransformOccasionally()
        {
            while (true)
            {
                if (SFSSectorManager.ClosestSectorToPlayer == null)
                {
                    yield return new WaitForSecondsRealtime(0.5f);
                    continue;
                }

                var data = new SFSObject();

                var pos = SFSSectorManager.ClosestSectorToPlayer.transform.InverseTransformPoint(transform.position);
                data.PutFloat("x", pos.x);
                data.PutFloat("y", pos.y);
                data.PutFloat("z", pos.z);

                var rot = SFSSectorManager.ClosestSectorToPlayer.transform.InverseTransformRotation(transform.rotation).eulerAngles;
                data.PutFloat("rotx", rot.x);
                data.PutFloat("roty", rot.y);
                data.PutFloat("rotz", rot.z);

                data.PutBool("interp", true);
                data.PutInt("sec", SFSSectorManager.ClosestSectorToPlayerID);
                data.PutUtfString("objectName", ObjectName);
                sfs.Send(new ExtensionRequest("SyncObject", data, sfs.LastJoinedRoom));
                yield return new WaitForSecondsRealtime(1f);
            }
        }
    }
}

