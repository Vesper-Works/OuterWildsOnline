using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnityEngine;

namespace OuterWildsOnline
{
    class RemotePlayerHUDMarker : HUDDistanceMarker
    {
        private bool _needsInitializing;
        // Token: 0x06000AD8 RID: 2776 RVA: 0x0000A7F8 File Offset: 0x000089F8
        public override void Awake()
        {
            base.Awake();
        }

        // Token: 0x06000AD9 RID: 2777 RVA: 0x0005CE08 File Offset: 0x0005B008
        public override void Start()
        {
            base.Start();

        }

        // Token: 0x06000ADA RID: 2778 RVA: 0x0005CF04 File Offset: 0x0005B104
        public override void OnDestroy()
        {
            base.OnDestroy();
            if (this._canvasMarker != null)
            {
                this.DestroyMarker();
            }
        }

        // Token: 0x06000ADB RID: 2779 RVA: 0x0005D040 File Offset: 0x0005B240
        public RemotePlayerHUDMarker InitCanvasMarker(string playerName)
        {
            _markerLabel = playerName;
            _needsInitializing = true;
            return this;
        }

        public override void InitCanvasMarker()
        {
            _markerRadius = 10f;

            _markerTarget = new GameObject().transform;
            _markerTarget.parent = transform;

            _markerTarget.localPosition = Vector3.zero;
        }

        private void Update()
        {
            if (_needsInitializing)
            {
                Initialize();
            }

            if (_canvasMarker != null)
            {
                //_canvasMarker.SetVisibility(true);// && Vector3.Distance(Locator.GetPlayerCamera().transform.position, this._markerTarget.position) < 300);
            }
            else
            {
                ConnectionController.Console.WriteLine($"Warning - _canvasMarker for {gameObject.name} is null!", OWML.Common.MessageType.Warning);
            }
        }
        private void Initialize()
        {
            _needsInitializing = false;
            base.InitCanvasMarker();
            _canvasMarker.SetVisibility(true);
        }


        // Token: 0x06000ADC RID: 2780 RVA: 0x0000A838 File Offset: 0x00008A38
        private void DestroyMarker()
        {
            this._canvasMarker.DestroyMarker();
        }


        // Token: 0x06000ADE RID: 2782 RVA: 0x0000A88D File Offset: 0x00008A8D
        public void DestroyFogMarkersOnRetrieve()
        {
            this._canvasMarker.NotifyResetPosition();
        }

        public void SetMarkerText(string text)
        {
            if (_canvasMarker != null)
            {
                _canvasMarker.SetLabel(text);
            }
            _markerLabel = text;
        }
        public void SetHazard(bool hazard)
        {
            if (_canvasMarker == null) { return; }
            if (hazard)
            {
                _canvasMarker.SetSecondaryLabel(CanvasMarker.SecondaryLabelType.DANGER);
            }
            else
            {
                _canvasMarker.SetSecondaryLabel(CanvasMarker.SecondaryLabelType.NONE);
            }
        }
        public void SetVisible(bool visible)
        {
            if (_canvasMarker == null) { return; }
            _canvasMarker._visible = visible; 
        }
    }
}
