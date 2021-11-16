using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnityEngine;

namespace ModTemplate
{
    class ThrusterFlameControllerSync : MonoBehaviour
	{
		// Token: 0x06002572 RID: 9586 RVA: 0x000BFAB0 File Offset: 0x000BDCB0
		private void Awake()
		{
			this._thrusterRenderer = base.GetComponent<MeshRenderer>();
			this._fluidDetector = base.gameObject.GetAttachedOWRigidbody(false).GetComponentInChildren<FluidDetector>();
			this._rulesetDetector = base.gameObject.GetAttachedOWRigidbody(false).GetComponentInChildren<RulesetDetector>();
			_light = GetComponentInChildren<Light>();
			this._thrustersFiring = false;
			this._underwater = false;
			this._baseLightRadius = this._light.range;
			this._currentScale = 0f;
			this._thrusterRenderer.enabled = false;
			this._light.enabled = false;
			base.enabled = false;
			if (this._fluidDetector != null)
			{
				this._fluidDetector.OnEnterFluidType += this.OnEnterExitFluidType;
				this._fluidDetector.OnExitFluidType += this.OnEnterExitFluidType;
			}
		}

		// Token: 0x06002573 RID: 9587 RVA: 0x000BFBD4 File Offset: 0x000BDDD4
		private void OnDestroy()
		{
			if (this._fluidDetector != null)
			{
				this._fluidDetector.OnEnterFluidType -= this.OnEnterExitFluidType;
				this._fluidDetector.OnExitFluidType -= this.OnEnterExitFluidType;
			}
		}

		// Token: 0x06002574 RID: 9588 RVA: 0x000BFC5C File Offset: 0x000BDE5C
		private void Update()
		{
			float num = this._underwater ? 0f : this._scaleByThrust.Evaluate(_thrustersFiring ? 1 : 0);
			if (this._belowMaxThrustScalar < 1f && this._rulesetDetector.GetThrustLimit() < 9f)
			{
				num *= this._belowMaxThrustScalar;
			}
			this._currentScale = this._scaleSpring.Update(this._currentScale, num, Time.deltaTime);
			if (this._currentScale < 0f)
			{
				this._currentScale = 0f;
				this._scaleSpring.ResetVelocity();
			}
			if ((!this._thrustersFiring || this._underwater) && this._currentScale <= 0.001f)
			{
				this._currentScale = 0f;
				this._scaleSpring.ResetVelocity();
				base.enabled = false;
			}
			base.transform.localScale = Vector3.one * this._currentScale;
			this._light.range = this._baseLightRadius * this._currentScale;
			this._thrusterRenderer.enabled = (this._currentScale > 0f);
			this._light.enabled = (this._currentScale > 0f);
		}

		// Token: 0x06002575 RID: 9589 RVA: 0x0001D2B1 File Offset: 0x0001B4B1
		public void OnStartTranslationalThrust()
		{
			this._thrustersFiring = true;
			if (!this._underwater)
			{
				base.enabled = true;
			}
		}

		// Token: 0x06002576 RID: 9590 RVA: 0x0001D2C9 File Offset: 0x0001B4C9
		public void OnStopTranslationalThrust()
		{
			this._thrustersFiring = false;
		}

		// Token: 0x06002577 RID: 9591 RVA: 0x0001D2D2 File Offset: 0x0001B4D2
		private void OnEnterExitFluidType(FluidVolume.Type type)
		{
			this._underwater = this._fluidDetector.InFluidType(FluidVolume.Type.WATER);
			if (!this._underwater && this._thrustersFiring)
			{
				base.enabled = true;
			}
		}

		// Token: 0x04002600 RID: 9728
		[SerializeField]
		private Light _light;

		// Token: 0x04002601 RID: 9729
		[SerializeField]
		private AnimationCurve _scaleByThrust = AnimationCurve.Linear(0f, 0f, 1f, 1f);

		// Token: 0x04002602 RID: 9730
		[SerializeField]
		private DampedSpring _scaleSpring = new DampedSpring();

		// Token: 0x04002603 RID: 9731
		[SerializeField]
		private float _belowMaxThrustScalar = 1f;

		// Token: 0x04002604 RID: 9732
		private MeshRenderer _thrusterRenderer;

		// Token: 0x04002606 RID: 9734
		private FluidDetector _fluidDetector;

		// Token: 0x04002607 RID: 9735
		private RulesetDetector _rulesetDetector;

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
