using Sfs2X.Core;
using Sfs2X.Entities.Data;

namespace OuterWildsOnline.SyncObjects
{
    public class ProbeToReceiveSync : ObjectToRecieveSync
    {
        protected override void OnExtensionResponse(SFSObject responseParams)
        {
            base.OnExtensionResponse(responseParams);
            if (responseParams.ContainsKey("enable"))
            {
                transform.GetChild(0).gameObject.SetActive(responseParams.GetBool("enable"));
            }
        }
    }
}
