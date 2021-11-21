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

        public void SetPosition(Vector3 pos, bool interpolate, int sectorID)
        {
            if(pos == null || SFSSectorManager.Instance == null) { return; }
            if (transform.parent != SFSSectorManager.Instance.Sectors[sectorID].transform)
            { transform.SetParent(SFSSectorManager.Instance.Sectors[sectorID].transform); }

            if (interpolate)
            {
                desiredPos = pos; 
            }
            else
            {
                this.transform.localPosition = pos;
            }
        }
        public void SetRotation(Quaternion rot, bool interpolate, int sectorID)
        {
            if (rot == null || SFSSectorManager.Instance == null) { return; }
            if (transform.parent != SFSSectorManager.Instance.Sectors[sectorID].transform)
            { transform.SetParent(SFSSectorManager.Instance.Sectors[sectorID].transform); }

            if (interpolate)
            {
                desiredRot = rot;

            }
            else
            {
                this.transform.localRotation = rot;
            }
        }

        void Update()
        {
            this.transform.localPosition = Vector3.Lerp(transform.localPosition, desiredPos, Time.deltaTime * dampingFactor);
            this.transform.localRotation = Quaternion.Slerp(transform.localRotation, desiredRot, Time.deltaTime * dampingFactor);
        }
    }
}