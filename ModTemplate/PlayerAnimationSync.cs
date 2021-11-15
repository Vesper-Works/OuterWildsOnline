using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnityEngine;

namespace ModTemplate
{
	// Token: 0x0200000C RID: 12
	[RequireComponent(typeof(Animator))]
	public class PlayerAnimationSync : MonoBehaviour
	{
	
		public event PlayerAnimController.PlayerAnimationEvent OnLeftFootGrounded;
		public event PlayerAnimController.PlayerAnimationEvent OnLeftFootLift;
		public event PlayerAnimController.PlayerAnimationEvent OnRightFootGrounded;
		public event PlayerAnimController.PlayerAnimationEvent OnRightFootLift;

		private bool grounded;
		// Token: 0x04000032 RID: 50
		private Animator _animator;

		// Token: 0x04000033 RID: 51
		private RuntimeAnimatorController _baseAnimController;

		// Token: 0x04000034 RID: 52
		private PlayerControllerSync _playerController;

		// Token: 0x04000035 RID: 53
		private PlayerResources _playerResources;

		// Token: 0x04000036 RID: 54
		private ThrusterModel _playerJetpack;

		// Token: 0x04000037 RID: 55
		[SerializeField]
		private GameObject _unsuitedGroup;

		// Token: 0x04000038 RID: 56
		[SerializeField]
		private GameObject _suitedGroup;

		// Token: 0x04000039 RID: 57
		[SerializeField]
		private GameObject[] _rightArmObjects;

		// Token: 0x0400003A RID: 58
		[SerializeField]
		private AnimatorOverrideController _unsuitedAnimOverride;

		// Token: 0x0400003F RID: 63
		private bool _leftFootGrounded;

		// Token: 0x04000040 RID: 64
		private bool _rightFootGrounded;

		// Token: 0x04000041 RID: 65
		private float _ungroundedTime;

		// Token: 0x04000042 RID: 66
		private bool _justBecameGrounded;

		// Token: 0x04000043 RID: 67
		private bool _justTookFallDamage;

		// Token: 0x04000044 RID: 68
		private bool _rightArmHidden;

		// Token: 0x04000045 RID: 69
		private int _defaultLayer;

		// Token: 0x04000046 RID: 70
		private int _probeOnlyLayer;
		
		private PlayerStateSync _playerStateSync;

		// Token: 0x0200000D RID: 13
		// (Invoke) Token: 0x06000048 RID: 72
		public delegate void PlayerAnimationEvent();

		private GameObject remotePlayer;
		private void Awake()
		{
			this._animator = base.GetComponent<Animator>();
			this._baseAnimController = this._animator.runtimeAnimatorController;
			this._leftFootGrounded = false;
			this._rightFootGrounded = false;
			this._ungroundedTime = 0f;
			this._justBecameGrounded = false;
			this._justTookFallDamage = false;
			this._rightArmHidden = false;
			this._defaultLayer = LayerMask.NameToLayer("Default");
			this._probeOnlyLayer = LayerMask.NameToLayer("VisibleToProbe");
	
		}

		private void Start()
		{
            this._playerController = gameObject.GetComponent<PlayerControllerSync>();
			_unsuitedGroup = transform.Find("player_mesh_noSuit:Traveller_HEA_Player").gameObject;
			_suitedGroup = transform.Find("Traveller_Mesh_v01:Traveller_Geo").gameObject;
			_playerStateSync = GetComponentInParent<PlayerStateSync>();
		}

		// Token: 0x0600003B RID: 59 RVA: 0x00033324 File Offset: 0x00031524
		private void OnDestroy()
		{ 
			if (this._playerResources)
			{
				this._playerResources.OnInstantDamage -= this.OnInstantDamage;
			}
		}

        private void LateUpdate()
        {
            bool flag = grounded;
            bool flag2 = _playerStateSync.IsAttached();
            bool flag3 = _playerStateSync.InZeroG();
            bool flag4 = true;
			
            Vector3 vector = Vector3.zero;
            if (!flag2)
            {
                vector = this._playerController.GetRelativeGroundVelocity();
            }
            if (Mathf.Abs(vector.x) < 0.05f)
            {
                vector.x = 0f;
            }
            if (Mathf.Abs(vector.z) < 0.05f)
            {
                vector.z = 0f;
            }
            //if (flag4)
            //{
            //    this._ungroundedTime = Time.time;
            //}
            float num = 0f;
            float num2 = 0f;
            OWRigidbody lastGroundBody = this._playerController.GetLastGroundBody();
            if (!flag && !flag2 && !flag3 && lastGroundBody != null)
            {
                num = (this._playerController.GetAttachedOWRigidbody(false).GetVelocity() - lastGroundBody.GetPointVelocity(this._playerController.transform.position)).magnitude;
                num2 = Time.time - this._ungroundedTime;
            }
            this._animator.SetFloat("RunSpeedX", vector.x / 3f);
            this._animator.SetFloat("RunSpeedY", vector.z / 3f);
            this._animator.SetFloat("TurnSpeed", this._playerController.GetTurning());
            this._animator.SetBool("Grounded", flag || flag2 || _playerStateSync.IsRecentlyDetached());
            this._animator.SetLayerWeight(1, this._playerController.GetJumpCrouchFraction());
            this._animator.SetFloat("FreefallSpeed", num / 15f * (num2 / 3f));
			this._animator.SetBool("InZeroG", flag3); //|| flag4);
            this._animator.SetBool("UsingJetpack", flag3 && _playerStateSync.IsWearingSuit());
            if (this._justBecameGrounded)
            {
                if (this._justTookFallDamage)
                {
                    this._animator.SetTrigger("LandHard");
                }
                else
                {
                    this._animator.SetTrigger("Land");
                }
            }
            if (flag)
            {
                float @float = this._animator.GetFloat("LeftFootLift");
                if (!this._leftFootGrounded && @float < 0.333f)
                {
                    this._leftFootGrounded = true;
                    if (this.OnLeftFootGrounded != null)
                    {
                        this.OnLeftFootGrounded();
                    }
                }
                else if (this._leftFootGrounded && @float > 0.666f)
                {
                    this._leftFootGrounded = false;
                    if (this.OnLeftFootLift != null)
                    {
                        this.OnLeftFootLift();
                    }
                }
                float float2 = this._animator.GetFloat("RightFootLift");
                if (!this._rightFootGrounded && float2 < 0.333f)
                {
                    this._rightFootGrounded = true;
                    if (this.OnRightFootGrounded != null)
                    {
                        this.OnRightFootGrounded();
                    }
                }
                else if (this._rightFootGrounded && float2 > 0.666f)
                {
                    this._rightFootGrounded = false;
                    if (this.OnRightFootLift != null)
                    {
                        this.OnRightFootLift();
                    }
                }
            }
            this._justBecameGrounded = false;
            this._justTookFallDamage = false;
            bool flag5 = Locator.GetToolModeSwapper().GetToolMode() > ToolMode.None;
            if ((flag5 && !this._rightArmHidden) || (!flag5 && this._rightArmHidden))
            {
                this._rightArmHidden = flag5;
                for (int i = 0; i < this._rightArmObjects.Length; i++)
                {
                    this._rightArmObjects[i].layer = (this._rightArmHidden ? this._probeOnlyLayer : this._defaultLayer);
                }
            }
        }

        // Token: 0x0600003D RID: 61 RVA: 0x00002C06 File Offset: 0x00000E06
        public void OnPlayerJump()
		{
			this._ungroundedTime = Time.time;
			if (!base.isActiveAndEnabled)
			{
				return;
			}
			this._animator.SetTrigger("Jump");
		}

		// Token: 0x0600003E RID: 62 RVA: 0x00002C2C File Offset: 0x00000E2C
		public void OnPlayerGrounded()
		{
			if (!base.isActiveAndEnabled || _playerStateSync.IsRecentlyDetached())
			{
				return;
			}
			this._justBecameGrounded = true;
			grounded = true;
		}

		// Token: 0x0600003F RID: 63 RVA: 0x00002C45 File Offset: 0x00000E45
		public void OnPlayerUngrounded()
		{
			this._ungroundedTime = Time.time;
			grounded = false;
		}

		// Token: 0x06000040 RID: 64 RVA: 0x00002C52 File Offset: 0x00000E52
		private void OnInstantDamage(float instantDamage, InstantDamageType damageType)
		{
			if (!base.isActiveAndEnabled)
			{
				return;
			}
			if (damageType == InstantDamageType.Impact)
			{
				this._justTookFallDamage = true;
			}
		}

		// Token: 0x06000041 RID: 65 RVA: 0x00002C67 File Offset: 0x00000E67
		public void OnPutOnSuit()
		{
            this._animator.runtimeAnimatorController = this._baseAnimController;
            this._unsuitedGroup.SetActive(false);
			//this._suitedGroup.SetActive(!_playerStateSync.InMapView());
			this._suitedGroup.SetActive(true);
        }

		// Token: 0x06000042 RID: 66 RVA: 0x00002C99 File Offset: 0x00000E99
		public void OnRemoveSuit()
		{
            this._animator.runtimeAnimatorController = this._unsuitedAnimOverride;
			//this._unsuitedGroup.SetActive(!_playerStateSync.InMapView());
			this._unsuitedGroup.SetActive(true);
            this._suitedGroup.SetActive(false);
        }

		// Token: 0x06000043 RID: 67 RVA: 0x00002CCB File Offset: 0x00000ECB
		public void OnEnterMapView()
		{
			this._unsuitedGroup.SetActive(false);
			this._suitedGroup.SetActive(false);
		}

		// Token: 0x06000044 RID: 68 RVA: 0x00002CE5 File Offset: 0x00000EE5
		public void OnExitMapView()
		{
			if (Locator.GetPlayerSuit().IsWearingSuit(true))
			{
				this._suitedGroup.SetActive(true);
				return;
			}
			this._unsuitedGroup.SetActive(true);
		}

		// Token: 0x06000045 RID: 69 RVA: 0x00033770 File Offset: 0x00031970
		private void OnDrawGizmosSelected()
		{
			if (this._animator == null)
			{
				return;
			}
			Transform boneTransform = this._animator.GetBoneTransform(HumanBodyBones.LeftToes);
			if (boneTransform)
			{
				Gizmos.color = (this._leftFootGrounded ? Color.blue : Color.red);
				OWGizmos.DrawWireArc(boneTransform.position, base.transform.up, base.transform.forward, -180f, 0.25f);
			}
			Transform boneTransform2 = this._animator.GetBoneTransform(HumanBodyBones.RightToes);
			if (boneTransform2)
			{
				Gizmos.color = (this._rightFootGrounded ? Color.blue : Color.red);
				OWGizmos.DrawWireArc(boneTransform2.position, base.transform.up, base.transform.forward, 180f, 0.25f);
			}
		}

	}

}
