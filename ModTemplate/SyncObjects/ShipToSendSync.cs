using Sfs2X.Entities.Data;
using Sfs2X.Requests;
using System.Collections;
using UnityEngine;

namespace OuterWildsOnline.SyncObjects
{
    public class ShipToSendSync : ObjectToSendSync
    {
        ShipThrusterModel shipThrusterModel;
        public ShipToSendSync Init()
        {
            base.Init("Probe");
            shipThrusterModel = Locator.GetShipTransform().GetComponentInChildren<ShipThrusterModel>();
            shipThrusterModel.OnStartTranslationalThrust += ShipStartedTranslationalThrust;
            shipThrusterModel.OnStopTranslationalThrust += ShipStoppedTranslationalThrust;
            StartCoroutine(SyncShipVisuals());
            StartCoroutine(SyncShipTransformOccasionally());
            return this;
        }
        private void ShipStartedTranslationalThrust()
        {
            var data = new SFSObject();
            data.PutBool("tt", true);
            sfs.Send(new ExtensionRequest("SyncObject", data, sfs.LastJoinedRoom));
            ConnectionController.ModHelperInstance.Console.WriteLine("Sending thrusting!");
        }
        private void ShipStoppedTranslationalThrust()
        {
            var data = new SFSObject();
            data.PutBool("tt", false);
            sfs.Send(new ExtensionRequest("SyncObject", data, sfs.LastJoinedRoom));
            ConnectionController.ModHelperInstance.Console.WriteLine("Sending thrusting!");
        }

        private IEnumerator SyncShipVisuals()
        {
            while (true)
            {
                var data = new SFSObject();

                if (shipThrusterModel.IsTranslationalThrusterFiring())
                {
                    data.PutFloat("tmla", shipThrusterModel.GetLocalAcceleration().y);
                }
                data.PutUtfString("objectName", ObjectName);
                sfs.Send(new ExtensionRequest("SyncObject", data, sfs.LastJoinedRoom));
                yield return new WaitForSeconds(0.1f);
            }
        }
        private IEnumerator SyncShipTransformOccasionally()
        {
            while (true)
            {
                var data = new SFSObject();

                var pos = SFSSectorManager.ClosestSectorToPlayer.transform.InverseTransformPoint(transform.position);
                data.PutFloat("x", pos.x);
                data.PutFloat("y", pos.y);
                data.PutFloat("z", pos.z);

                var rot = SFSSectorManager.ClosestSectorToPlayer.transform.InverseTransformRotation(transform.rotation).eulerAngles;
                data.PutFloat("rotx", rot.x);
                data.PutFloat("roty", rot.y);
                data.PutFloat("rotz", rot.z);

                data.PutBool("interp", false);
                data.PutInt("sec", SFSSectorManager.ClosestSectorToPlayerID);
                data.PutUtfString("objectName", ObjectName);
                sfs.Send(new ExtensionRequest("SyncObject", data, sfs.LastJoinedRoom));
                yield return new WaitForSeconds(0.5f);
            }
        }
    }
}

