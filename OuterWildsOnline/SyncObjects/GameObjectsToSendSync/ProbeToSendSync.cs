namespace OuterWildsOnline.SyncObjects
{
    public class ProbeToSendSync : ObjectToSendSync
    {
        protected override void Awake()
        {
            interpolate = false;
            GlobalMessenger<SurveyorProbe>.AddListener("LaunchProbe", new Callback<SurveyorProbe>(this.OnLaunchProbe));
            GlobalMessenger<SurveyorProbe>.AddListener("RetrieveProbe", new Callback<SurveyorProbe>(this.OnProbeRetrieved));

            SetObjectName("Probe");
            base.Awake();
            ObjectData.PutBool("enable", gameObject.activeSelf);
        }

        private void OnProbeRetrieved(SurveyorProbe probe)
        {
            ObjectData.PutBool("enable",false);
            ConnectionController.Instance.UpdateObjectToSyncData(this);
        }

        private void OnLaunchProbe(SurveyorProbe probe)
        {
            ObjectData.PutBool("enable", true);
            ConnectionController.Instance.UpdateObjectToSyncData(this);
        }
    }
}
