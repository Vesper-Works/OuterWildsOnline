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
            // If interpolation, then set the desired pososition+rotation; else force set (for spawning new models)
            if (interpolate)
            {
                desiredPos = SFSSectorManager.Instance.Sectors[sectorID].transform.TransformPoint(pos);
                desiredRot = rot;
            }
            else
            {
                this.transform.position = SFSSectorManager.Instance.Sectors[sectorID].transform.TransformPoint(pos);
                this.transform.rotation = rot;
            }
        }

        void Update()
        {
            this.transform.position = Vector3.Lerp(transform.position, desiredPos, Time.deltaTime * dampingFactor);
            this.transform.rotation = Quaternion.Slerp(transform.rotation, desiredRot, Time.deltaTime * dampingFactor);
        }
    }
}