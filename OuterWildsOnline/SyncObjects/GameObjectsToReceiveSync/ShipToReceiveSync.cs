using Sfs2X.Core;
using Sfs2X.Entities.Data;

namespace OuterWildsOnline.SyncObjects
{
    public class ShipToReceiveSync : ObjectToRecieveSync
    {
        protected override void OnExtensionResponse(SFSObject responseParams)
        {
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
