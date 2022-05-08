using Sfs2X.Core;
using Sfs2X.Entities.Data;

namespace OuterWildsOnline.SyncObjects
{
    public class ShipToReceiveSync : ObjectToRecieveSync
    {
        public override void Init(string objectName, int userID, int objectId)
        {
            base.Init(objectName, userID, objectId);
            Utils.MakeReferenceFrameVolume(gameObject, GetComponent<OWRigidbody>(), 3f);
            ConnectionController.ModHelperInstance.HarmonyHelper.AddPrefix<ReferenceFrame>("GetHUDDisplayName", typeof(ShipToReceiveSync), "GetHUDDisplayNamePatch");
        }
        public static bool GetHUDDisplayNamePatch(ReferenceFrame __instance, ref string __result)
        {
            ShipToReceiveSync shipToReceiveSync;
            if (__instance.GetOWRigidBody().TryGetComponent<ShipToReceiveSync>(out shipToReceiveSync))
            {
                __result = ConnectionController.Connection.LastJoinedRoom.GetUserById(shipToReceiveSync.UserId).Name;
                return false;
            }
            return true;
        }
        protected override void OnExtensionResponse(SFSObject responseParams)
        {
            base.OnExtensionResponse(responseParams);
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
        }
    }
}
