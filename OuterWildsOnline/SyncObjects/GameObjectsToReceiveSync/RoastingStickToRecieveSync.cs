using Sfs2X.Entities.Data;
using UnityEngine;

namespace OuterWildsOnline.SyncObjects
{
    public class RoastingStickToRecieveSync : ObjectToRecieveSync
    {
        protected override void Start()
        {
            gameObject.SetActive(ObjectData.GetBool("enable"));
            base.Start();
        }
        public override void UpdateObjectData(ISFSObject objectData)
        {
            gameObject.SetActive(objectData.GetBool("enable"));
            base.UpdateObjectData(objectData);
        }
        protected override void OnExtensionResponse(SFSObject responseParams)
        {
            bool interpolate = !responseParams.ContainsKey("interp") || responseParams.GetBool("interp");

            if (responseParams.ContainsKey("x"))
            {
                GetComponentInChildren<SimpleRemoteInterpolation>().SetPosition(
                new Vector3(responseParams.GetFloat("x"), responseParams.GetFloat("y"), responseParams.GetFloat("z")),
                interpolate,
                responseParams.GetInt("sec"));
            }
            if (responseParams.ContainsKey("rotx"))
            {
                GetComponent<SimpleRemoteInterpolation>().SetRotation(
                Quaternion.Euler(responseParams.GetFloat("rotx"), responseParams.GetFloat("roty"), responseParams.GetFloat("rotz")),
                interpolate,
                responseParams.GetInt("sec"));
            }
        }
    }
}
