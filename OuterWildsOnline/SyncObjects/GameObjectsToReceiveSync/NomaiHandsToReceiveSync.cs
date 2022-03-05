using Sfs2X.Core;
using Sfs2X.Entities.Data;

namespace OuterWildsOnline.SyncObjects.GameObjectsToReceiveSync
{
    public class NomaiHandsToReceiveSync : ObjectToRecieveSync
    {
        protected override void OnExtensionResponse(SFSObject responseParams)
        {
            base.OnExtensionResponse(responseParams);
            if (responseParams.ContainsKey("nx")) //Special nomai coords
            {
                //Use an overloaded SetPostition
            }
        }
    }
}
