using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnityEngine;

namespace ModTemplate
{
    class ThrusterWashControllerSync : MonoBehaviour
	{
		// Token: 0x0600167C RID: 5756 RVA: 0x0008A99C File Offset: 0x00088B9C
		private void Awake()
		{
			_playerCharacterController = GetComponentInParent<PlayerControllerSync>();
			_particleSystemBySurfaceType = OWML.Utils.TypeExtensions.GetValue<ParticleSystem[]>(FindObjectOfType<ThrusterWashController>(), "_particleSystemBySurfaceType");
			this._defaultParticleSystem = GetComponentInChildren<ParticleSystem>();
			this._defaultMainModule = this._defaultParticleSystem.main;
			this._defaultEmissionModule = this._defaultParticleSystem.emission;
			this._baseDefaultEmissionRate = this._defaultEmissionModule.rateOverTime.constant;
			this._activeSurfaceParticleSystem = null;
			this._baseSurfaceEmissionRate = new float[this._particleSystemBySurfaceType.Length];
			for (int i = 0; i < this._particleSystemBySurfaceType.Length; i++)
			{
				if (this._particleSystemBySurfaceType[i] != null)
				{
					this._baseSurfaceEmissionRate[i] = this._particleSystemBySurfaceType[i].emission.rateOverTimeMultiplier;
				}
			}
			base.enabled = false;
		}

		// Token: 0x0600167D RID: 5757 RVA: 0x000124E2 File Offset: 0x000106E2
		private void OnDestroy()
		{
		}

		// Token: 0x0600167E RID: 5758 RVA: 0x0008AA8C File Offset: 0x00088C8C
		private void Update()
		{
			RaycastHit hitInfo = default(RaycastHit);
			bool flag = false;
			float num = this._emissionThrusterScale.Evaluate(ThrusterModelLocalYAcceleration);
			if (num > 0f)
			{
				flag = Physics.Raycast(base.transform.position, -base.transform.up, out hitInfo, this._raycastDistance, OWLayerMask.physicalMask);
			}
			num = (flag ? (num * this._emissionDistanceScale.Evaluate(hitInfo.distance)) : 0f);
			if (num > 0f)
			{
				Vector3 position = hitInfo.point + hitInfo.normal * 0.25f;
				Quaternion rotation = Quaternion.LookRotation(hitInfo.normal);
				if (!this._defaultParticleSystem.isPlaying)
				{
					this._defaultParticleSystem.Play();
				}
				this._defaultEmissionModule.rateOverTimeMultiplier = this._baseDefaultEmissionRate * num;
				this._defaultParticleSystem.transform.SetPositionAndRotation(position, rotation);
				if (this._defaultMainModule.customSimulationSpace != hitInfo.transform)
				{
					this._defaultMainModule.customSimulationSpace = hitInfo.transform;
					this._defaultParticleSystem.Clear();
				}
				SurfaceType hitSurfaceType = _playerCharacterController.GetGroundSurface();
				ParticleSystem particleSystem = this._particleSystemBySurfaceType[(int)hitSurfaceType];
				if (particleSystem != this._activeSurfaceParticleSystem)
				{
					if (this._activeSurfaceParticleSystem != null)
					{
						this._activeSurfaceParticleSystem.Stop(false, ParticleSystemStopBehavior.StopEmitting);
					}
					if (particleSystem != null)
					{
						particleSystem.Play();
					}
					this._activeSurfaceParticleSystem = particleSystem;
				}
				if (this._activeSurfaceParticleSystem != null)
				{
					var emission = _activeSurfaceParticleSystem.emission;
					emission.rateOverTimeMultiplier = this._baseSurfaceEmissionRate[(int)hitSurfaceType] * num;
					this._activeSurfaceParticleSystem.transform.position = hitInfo.point + hitInfo.normal * 0.25f;
					this._activeSurfaceParticleSystem.transform.rotation = Quaternion.LookRotation(hitInfo.normal);
					ParticleSystem.MainModule main = this._activeSurfaceParticleSystem.main;
					if (main.customSimulationSpace != hitInfo.transform)
					{
						main.customSimulationSpace = hitInfo.transform;
						this._activeSurfaceParticleSystem.Clear();
						return;
					}
				}
			}
			else
			{
				if (this._defaultParticleSystem.isPlaying)
				{
					this._defaultParticleSystem.Stop(false, ParticleSystemStopBehavior.StopEmitting);
				}
				if (this._activeSurfaceParticleSystem != null)
				{
					this._activeSurfaceParticleSystem.Stop(false, ParticleSystemStopBehavior.StopEmitting);
					this._activeSurfaceParticleSystem = null;
				}
			}
		}

		// Token: 0x0600167F RID: 5759 RVA: 0x00003004 File Offset: 0x00001204
		public void OnStartTranslationalThrust()
		{
			ConnectionController.ModHelperInstance.Console.WriteLine("Starting thrust!");
			base.enabled = true;
		}

		// Token: 0x06001680 RID: 5760 RVA: 0x0008AD0C File Offset: 0x00088F0C
		public void OnStopTranslationalThrust()
		{
			if (this._defaultParticleSystem.isPlaying)
			{
				this._defaultParticleSystem.Stop(false, ParticleSystemStopBehavior.StopEmitting);
			}
			if (this._activeSurfaceParticleSystem != null)
			{
				this._activeSurfaceParticleSystem.Stop(false, ParticleSystemStopBehavior.StopEmitting);
				this._activeSurfaceParticleSystem = null;
			}
			base.enabled = false;
		}

		public float ThrusterModelLocalYAcceleration;
		private PlayerControllerSync _playerCharacterController;
		// Token: 0x04001AE3 RID: 6883
		[SerializeField]
		private float _raycastDistance = 10f;

		// Token: 0x04001AE4 RID: 6884
		[SerializeField]
		private AnimationCurve _emissionDistanceScale = AnimationCurve.Linear(0f, 1f, 10f, 0f);

		// Token: 0x04001AE5 RID: 6885
		[SerializeField]
		private AnimationCurve _emissionThrusterScale = AnimationCurve.Linear(0f, 0f, 6f, 1f);

		// Token: 0x04001AE6 RID: 6886
		[SerializeField]
		private ParticleSystem _defaultParticleSystem;

		// Token: 0x04001AE7 RID: 6887
		[SerializeField]
		private ParticleSystem[] _particleSystemBySurfaceType = new ParticleSystem[24];

		// Token: 0x04001AE8 RID: 6888
		private ParticleSystem.MainModule _defaultMainModule;

		// Token: 0x04001AE9 RID: 6889
		private ParticleSystem.EmissionModule _defaultEmissionModule;

		// Token: 0x04001AEA RID: 6890
		private float _baseDefaultEmissionRate;

		// Token: 0x04001AEB RID: 6891
		private ParticleSystem _activeSurfaceParticleSystem;

		// Token: 0x04001AEC RID: 6892
		private float[] _baseSurfaceEmissionRate;
	}

}

