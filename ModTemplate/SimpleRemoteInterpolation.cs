using UnityEngine;
using System.Collections;
using System.Linq;

namespace ModTemplate
{
    public class SimpleRemoteInterpolation : MonoBehaviour
    {


        private Vector3 desiredPos;
        private Quaternion desiredRot;

        private float dampingFactor = 5f;

        void Start()
        {
            desiredPos = this.transform.position;
            desiredRot = this.transform.rotation;
        }

        public void SetTransform(Vector3 pos, Quaternion rot, bool interpolate, int sectorID)
        {
            if (transform.parent != SFSSectorManager.Instance.Sectors[sectorID].transform)
            { transform.SetParent(SFSSectorManager.Instance.Sectors[sectorID].transform); }

            if (interpolate)
            {
                desiredPos = pos;
                desiredRot = rot;
            }
            else
            {
                this.transform.localPosition = pos;
                this.transform.rotation = rot;
            }
        }

        void Update()
        {
            this.transform.localPosition = Vector3.Lerp(transform.localPosition, desiredPos, Time.deltaTime * dampingFactor);
            this.transform.rotation = Quaternion.Slerp(transform.rotation, desiredRot, Time.deltaTime * dampingFactor);
        }
    }
}