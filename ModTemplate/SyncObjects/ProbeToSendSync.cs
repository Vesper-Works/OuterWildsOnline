using Sfs2X.Entities.Data;
using Sfs2X.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OuterWildsOnline.SyncObjects
{
    public class ProbeToSendSync : ObjectToSendSync
    {
        public ProbeToSendSync Init()
        {
            base.Init("Probe");
            interpolate = false;
            GlobalMessenger<SurveyorProbe>.AddListener("LaunchProbe", new Callback<SurveyorProbe>(this.OnLaunchProbe));
            GlobalMessenger<SurveyorProbe>.AddListener("RetrieveProbe", new Callback<SurveyorProbe>(this.OnAnyProbeRetrieved));
            return this;
        }

        private void OnAnyProbeRetrieved(SurveyorProbe probe)
        {
            if (gameObject.GetComponent<SurveyorProbe>() == probe)
            {
                var data = new SFSObject();                     
                data.PutBool("enable", false);
                data.PutUtfString("objectName", base.ObjectName);
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
                sfs.Send(new ExtensionRequest("SyncObject", data, sfs.LastJoinedRoom));
            }
        }
    }
}
