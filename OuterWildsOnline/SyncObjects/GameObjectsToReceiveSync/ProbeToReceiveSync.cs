using Sfs2X.Core;
using Sfs2X.Entities.Data;

namespace OuterWildsOnline.SyncObjects
{
    public class ProbeToReceiveSync : ObjectToRecieveSync
    {
        //TODO trocar onde se usava apenas ObjectToRecieveSync para usar essas classes mais especializadas
        protected override void OnExtensionResponse(SFSObject responseParams)
        {
            if (responseParams.ContainsKey("enable"))
            {
                transform.GetChild(0).gameObject.SetActive(responseParams.GetBool("enable"));
            }
        }
    }
}
