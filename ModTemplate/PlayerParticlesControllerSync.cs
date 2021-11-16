using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnityEngine;

namespace ModTemplate
{
    class PlayerParticlesControllerSync : MonoBehaviour
    {
        // Token: 0x06001656 RID: 5718 RVA: 0x000898E8 File Offset: 0x00087AE8
        private void Awake()
        {
            OWRigidbody attachedOWRigidbody = this.GetAttachedOWRigidbody(false);

            this._playerCharacterController = attachedOWRigidbody.GetRequiredComponentInChildren<PlayerControllerSync>();
            this._playerAnimController = attachedOWRigidbody.GetRequiredComponentInChildren<PlayerAnimationSync>();
            this._impactSensor = attachedOWRigidbody.GetRequiredComponent<ImpactSensor>();
            //this._playerFluidDetector = attachedOWRigidbody.GetRequiredComponent<FluidDetector>();
            this._particleSystemPoolRoot = new GameObject("ParticleSystemPool").transform;
            this._particleSystemPoolRoot.SetParent(base.transform.parent);
            this._particleSystemPoolRoot.transform.localPosition = Vector3.zero;
            this._particleSystemPoolRoot.transform.localRotation = Quaternion.identity;
            this._footstepParticleSystems = new ParticleSystemPool[24];
            this._impactParticleSystems = new ParticleSystemPool[24];
            _footstepParticlePrefabs = OWML.Utils.TypeExtensions.GetValue<GameObject[]>(FindObjectOfType<PlayerParticlesController>(), "_footstepParticlePrefabs");
            _impactParticlePrefabs = OWML.Utils.TypeExtensions.GetValue<GameObject[]>(FindObjectOfType<PlayerParticlesController>(), "_impactParticlePrefabs");
          
            for (int i = 0; i < 24; i++)
            {
                if (this._footstepParticlePrefabs[i] != null)
                {
                    this._footstepParticleSystems[i] = new ParticleSystemPool(this._footstepParticlePrefabs[i], 8, this._particleSystemPoolRoot);
                }
                if (this._impactParticlePrefabs[i] != null)
                {
                    this._impactParticleSystems[i] = new ParticleSystemPool(this._impactParticlePrefabs[i], 8, this._particleSystemPoolRoot);
                }
            }
            Animator component = this._playerAnimController.GetComponent<Animator>();
            this._leftFootTransform = component.GetBoneTransform(HumanBodyBones.LeftFoot);
            this._rightFootTransform = component.GetBoneTransform(HumanBodyBones.RightFoot);
            this._playerAnimController.OnLeftFootGrounded += this.OnLeftFootGrounded;
            this._playerAnimController.OnRightFootGrounded += this.OnRightFootGrounded;
            this._impactSensor.OnImpact += this.OnImpact;
        }

        // Token: 0x06001657 RID: 5719 RVA: 0x00089A78 File Offset: 0x00087C78
        private void OnDestroy()
        {
            if (this._playerAnimController != null)
            {
                this._playerAnimController.OnLeftFootGrounded -= this.OnLeftFootGrounded;
                this._playerAnimController.OnRightFootGrounded -= this.OnRightFootGrounded;
            }
            if (this._impactSensor != null)
            {
                this._impactSensor.OnImpact -= this.OnImpact;
            }
        }

        // Token: 0x06001658 RID: 5720 RVA: 0x00089AE8 File Offset: 0x00087CE8
        private void Update()
        {
            for (int i = 0; i < 24; i++)
            {
                if (this._footstepParticleSystems[i] != null)
                {
                    this._footstepParticleSystems[i].Update();
                }
                if (this._impactParticleSystems[i] != null)
                {
                    this._impactParticleSystems[i].Update();
                }
            }
        }

        // Token: 0x06001659 RID: 5721 RVA: 0x00089B30 File Offset: 0x00087D30
        private void PlayFootstepParticles(Vector3 position, SurfaceType surfaceType)
        {
            if (this._footstepParticleSystems[(int)surfaceType] != null)
            {
                ParticleSystem particleSystem = this._footstepParticleSystems[(int)surfaceType].Instantiate(null, position, this._playerCharacterController.transform.rotation);
                //if (particleSystem != null && particleSystem.forceOverLifetime.enabled)
                //{
                //    Vector3 vector = this._playerForceDetector.GetForceAcceleration() + this._playerFluidDetector.GetLinearFluidAcceleration();
                //    Vector3 vector2 = particleSystem.transform.InverseTransformVector(vector);
                //    ParticleSystem.ForceOverLifetimeModule forceOverLifetime = particleSystem.forceOverLifetime;
                //    forceOverLifetime.x = vector2.x;
                //    forceOverLifetime.y = vector2.y;
                //    forceOverLifetime.z = vector2.z;
                //}
            }
        }

        // Token: 0x0600165A RID: 5722 RVA: 0x00089BEC File Offset: 0x00087DEC
        private void OnLeftFootGrounded()
        {
         
            if (this._leftFootTransform == null)
            {
                this._leftFootTransform = this._playerAnimController.GetComponent<Animator>().GetBoneTransform(HumanBodyBones.LeftFoot);
            }
            this.PlayFootstepParticles(this._leftFootTransform.position, this._playerCharacterController.GetGroundSurface());

        }

        // Token: 0x0600165B RID: 5723 RVA: 0x00089C58 File Offset: 0x00087E58
        private void OnRightFootGrounded()
        {
            if (this._rightFootTransform == null)
            {
                this._rightFootTransform = this._playerAnimController.GetComponent<Animator>().GetBoneTransform(HumanBodyBones.RightFoot);
            }
            this.PlayFootstepParticles(this._rightFootTransform.position, this._playerCharacterController.GetGroundSurface());

        }

        // Token: 0x0600165C RID: 5724 RVA: 0x00089CC4 File Offset: 0x00087EC4
        private void OnImpact(ImpactData impact)
        {
            ConnectionController.ModHelperInstance.Console.WriteLine("Impact!");
            if (impact.speed < this._impactParticleMinSpeed)
            {
                return;
            }
            SurfaceType surfaceType = impact.contactSurfaceTypes[0];
            if (this._impactParticleSystems[(int)surfaceType] != null)
            {
                ParticleSystem particleSystem = this._impactParticleSystems[(int)surfaceType].Instantiate(impact.otherBody.transform, impact.point, Quaternion.LookRotation(impact.normal));
                //if (particleSystem.forceOverLifetime.enabled)
                //{
                //    Vector3 vector = this._playerForceDetector.GetForceAcceleration() + this._playerFluidDetector.GetLinearFluidAcceleration();
                //    Vector3 vector2 = particleSystem.transform.InverseTransformVector(vector);
                //    ParticleSystem.ForceOverLifetimeModule forceOverLifetime = particleSystem.forceOverLifetime;
                //    forceOverLifetime.x = vector2.x;
                //    forceOverLifetime.y = vector2.y;
                //    forceOverLifetime.z = vector2.z;
                //}
            }
        }

        // Token: 0x04001AA1 RID: 6817
        private const int _kParticlePoolSize = 8;

        // Token: 0x04001AA2 RID: 6818
        private PlayerControllerSync _playerCharacterController;

        // Token: 0x04001AA3 RID: 6819
        private PlayerAnimationSync _playerAnimController;

        // Token: 0x04001AA4 RID: 6820
        private ImpactSensor _impactSensor;

        // Token: 0x04001AA6 RID: 6822
        private FluidDetector _playerFluidDetector;

        // Token: 0x04001AA7 RID: 6823
        [SerializeField]
        private GameObject[] _footstepParticlePrefabs = new GameObject[24];

        // Token: 0x04001AA8 RID: 6824
        [SerializeField]
        private float _impactParticleMinSpeed = 30f;

        // Token: 0x04001AA9 RID: 6825
        [SerializeField]
        private GameObject[] _impactParticlePrefabs = new GameObject[24];

        // Token: 0x04001AAA RID: 6826
        private Transform _particleSystemPoolRoot;

        // Token: 0x04001AAB RID: 6827
        private ParticleSystemPool[] _footstepParticleSystems;

        // Token: 0x04001AAC RID: 6828
        private Transform _leftFootTransform;

        // Token: 0x04001AAD RID: 6829
        private Transform _rightFootTransform;

        // Token: 0x04001AAE RID: 6830
        private ParticleSystemPool[] _impactParticleSystems;
    }
}
