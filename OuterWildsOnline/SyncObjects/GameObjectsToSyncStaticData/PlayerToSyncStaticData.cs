namespace OuterWildsOnline.SyncObjects
{
    public class PlayerToSyncStaticData : ObjectToSyncStaticData
    {
        public bool isWearingSuit;
        public PlayerToSyncStaticData(string objectName, int objectId) : base(objectName, objectId)
        {
        }
    }
}
