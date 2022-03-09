using Sfs2X.Entities.Data;

namespace OuterWildsOnline.SyncObjects
{
    public class ProbeToReceiveSync : ObjectToRecieveSync
    {
        protected override void Start()
        {
            transform.GetChild(0).gameObject.SetActive(ObjectData.GetBool("enable"));
            base.Start();
        }
        public override void UpdateObjectData(ISFSObject objectData)
        {
            transform.GetChild(0).gameObject.SetActive(objectData.GetBool("enable"));
            base.UpdateObjectData(objectData);
        }
    }
}
