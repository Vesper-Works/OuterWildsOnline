using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OuterWildsOnline.SyncClasses
{
    public class ProbeToSync : SyncObjectViaGhost
    {
        public ProbeToSync Init()
        {
            base.Init("Probe");
            GlobalMessenger<SurveyorProbe>.AddListener("LaunchProbe", new Callback<SurveyorProbe>(this.OnLaunchProbe));
            return this;
        }
        private void OnLaunchProbe(SurveyorProbe probe)
        {
           if(gameObject.GetComponent<SurveyorProbe>() == probe)
            {
               
            }
        }
    }
}
