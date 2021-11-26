using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnityEngine;

namespace OuterWildsOnline
{
    class ThrusterFlameControllerSync : MonoBehaviour
    {
        // Token: 0x06002572 RID: 9586 RVA: 0x000BFAB0 File Offset: 0x000BDCB0
        private void Awake()
        {
            this._thrusterRenderer = base.GetComponent<MeshRenderer>();
           
            _light = GetComponentInChildren<Light>();
            this._baseLightRadius = this._light.range;
            this._thrusterRenderer.enabled = false;
            this._light.enabled = false;
        }


        // Token: 0x06002575 RID: 9589 RVA: 0x0001D2B1 File Offset: 0x0001B4B1
        public void OnStartTranslationalThrust()
        {
            this._thrustersFiring = true;
            StopAllCoroutines();
            StartCoroutine(BuildUpThrust());
        }

        // Token: 0x06002576 RID: 9590 RVA: 0x0001D2C9 File Offset: 0x0001B4C9
        public void OnStopTranslationalThrust()
        {
            this._thrustersFiring = false;
            StopAllCoroutines();
            StartCoroutine(DecreaseThrust());
        }

        private IEnumerator BuildUpThrust()
        {
            this._thrusterRenderer.enabled = true;
            this._light.enabled = true;
            while (_thrustersFiring)
            {
                _currentScale += 0.02f;
                base.transform.localScale = Vector3.one * this._currentScale;
                this._light.range = this._baseLightRadius * this._currentScale;
                yield return new WaitForFixedUpdate();
            }
        }
          
        private IEnumerator DecreaseThrust()
        {
            while (_currentScale > 0)
            {
                _currentScale -= 0.04f;
                base.transform.localScale = Vector3.one * this._currentScale;
                this._light.range = this._baseLightRadius * this._currentScale;
                yield return new WaitForFixedUpdate();
            }
            this._thrusterRenderer.enabled = false;
            this._light.enabled = false;
        }

        // Token: 0x04002600 RID: 9728
        [SerializeField]
        private Light _light;

        // Token: 0x04002604 RID: 9732
        private MeshRenderer _thrusterRenderer;

        // Token: 0x04002609 RID: 9737
        private bool _thrustersFiring;

        // Token: 0x0400260A RID: 9738
        private bool _underwater;

        // Token: 0x0400260B RID: 9739
        private float _baseLightRadius;

        // Token: 0x0400260C RID: 9740
        private float _currentScale;
    }

}
