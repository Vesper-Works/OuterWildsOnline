using Sfs2X.Entities.Data;
using Sfs2X.Requests;

namespace OuterWildsOnline.SyncObjects
{
    public class ProbeToSendSync : ObjectToSendSync
    {
        protected override void Awake()
        {
            interpolate = false;
            GlobalMessenger<SurveyorProbe>.AddListener("LaunchProbe", new Callback<SurveyorProbe>(this.OnLaunchProbe));
            GlobalMessenger<SurveyorProbe>.AddListener("RetrieveProbe", new Callback<SurveyorProbe>(this.OnAnyProbeRetrieved));

            SetObjectName("Probe");
            base.Awake();
        }

        private void OnAnyProbeRetrieved(SurveyorProbe probe)
        {
            if (gameObject.GetComponent<SurveyorProbe>() == probe)
            {
                var data = new SFSObject();                     
                data.PutBool("enable", false);
                data.PutUtfString("objectName", base.ObjectName);
                data.PutInt("objectId", ObjectId);
                sfs.Send(new ExtensionRequest("SyncObject", data, sfs.LastJoinedRoom));
            }
        }

        private void OnLaunchProbe(SurveyorProbe probe)
        {
            if (gameObject.GetComponent<SurveyorProbe>() == probe)
            {
                var data = new SFSObject();
                data.PutBool("enable", true);
                data.PutUtfString("objectName", base.ObjectName);
                data.PutInt("objectId", ObjectId);
                sfs.Send(new ExtensionRequest("SyncObject", data, sfs.LastJoinedRoom));
            }
        }
    }
}
