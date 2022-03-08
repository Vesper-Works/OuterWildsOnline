using Sfs2X.Protocol.Serialization;

namespace OuterWildsOnline.SyncObjects
{
    public class ObjectToSyncStaticData : SerializableSFSType
    {
        private string objectName;
        private int objectId;

        public string ObjectName { get => objectName; }
        public int ObjectId { get => objectId; }

        public ObjectToSyncStaticData(string objectName, int objectId)
        {
            this.objectName = objectName;
            this.objectId = objectId;
        }
    }
}
