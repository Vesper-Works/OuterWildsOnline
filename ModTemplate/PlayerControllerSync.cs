using UnityEngine;

namespace ModTemplate
{
    class PlayerControllerSync : MonoBehaviour
    {
        private void Awake()
        {
            this._transform = this.GetRequiredComponent<Transform>();
            this._owRigidbody = this.GetComponentInParent<OWRigidbody>();

            //GlobalMessenger.AddListener("InitPlayerForceAlignment", new Callback(this.OnInitPlayerForceAlignment));
            //GlobalMessenger.AddListener("BreakPlayerForceAlignment", new Callback(this.OnBreakPlayerForceAlignment));
            //GlobalMessenger.AddListener("SuitUp", new Callback(this.OnSuitUp));
            //GlobalMessenger.AddListener("RemoveSuit", new Callback(this.OnRemoveSuit));
            //GlobalMessenger<Signalscope>.AddListener("EnterSignalscopeZoom", new Callback<Signalscope>(this.OnEnterSignalscopeZoom));
            //GlobalMessenger.AddListener("ExitSignalscopeZoom", new Callback(this.OnExitSignalscopeZoom));
            //GlobalMessenger.AddListener("ExitFlightConsole", new Callback(this.OnExitFlightConsole));
            //GlobalMessenger<DeathType>.AddListener("PlayerDeath", new Callback<DeathType>(this.OnPlayerDeath));
            //GlobalMessenger.AddListener("PlayerResurrection", new Callback(this.OnPlayerResurrection));
        }

        // Token: 0x06001795 RID: 6037 RVA: 0x0008EFC8 File Offset: 0x0008D1C8
        private void OnDestroy()
        {
            //GlobalMessenger.RemoveListener("InitPlayerForceAlignment", new Callback(this.OnInitPlayerForceAlignment));
            //GlobalMessenger.RemoveListener("BreakPlayerForceAlignment", new Callback(this.OnBreakPlayerForceAlignment));
            //GlobalMessenger.RemoveListener("SuitUp", new Callback(this.OnSuitUp));
            //GlobalMessenger.RemoveListener("RemoveSuit", new Callback(this.OnRemoveSuit));
            //GlobalMessenger<Signalscope>.RemoveListener("EnterSignalscopeZoom", new Callback<Signalscope>(this.OnEnterSignalscopeZoom));
            //GlobalMessenger.RemoveListener("ExitSignalscopeZoom", new Callback(this.OnExitSignalscopeZoom));
            //GlobalMessenger.RemoveListener("ExitFlightConsole", new Callback(this.OnExitFlightConsole));
            //GlobalMessenger<DeathType>.RemoveListener("PlayerDeath", new Callback<DeathType>(this.OnPlayerDeath));
            //GlobalMessenger.RemoveListener("PlayerResurrection", new Callback(this.OnPlayerResurrection));
        }

        // Token: 0x06001796 RID: 6038 RVA: 0x000130C1 File Offset: 0x000112C1
        public OWRigidbody GetBody()
        {
            return this._owRigidbody;
        }

        // Token: 0x06001797 RID: 6039 RVA: 0x000130C9 File Offset: 0x000112C9
        public bool IsSlidingOnIce()
        {
            return this.IsGrounded() && this._groundSurface == SurfaceType.Ice && this._groundCollider.material.dynamicFriction == 0f;
        }

        // Token: 0x06001798 RID: 6040 RVA: 0x000130F5 File Offset: 0x000112F5
        public bool IsGroundedOnRisingSand()
        {
            return this._groundedOnRisingSand;
        }

        // Token: 0x06001799 RID: 6041 RVA: 0x000130FD File Offset: 0x000112FD
        public SurfaceType GetGroundSurface()
        {
            return this._groundSurface;
        }

        // Token: 0x0600179A RID: 6042 RVA: 0x00013105 File Offset: 0x00011305
        public float GetRunSpeedMagnitude()
        {
            return this._runSpeed;
        }

        // Token: 0x0600179B RID: 6043 RVA: 0x0001310D File Offset: 0x0001130D
        public float GetWalkSpeedMagnitude()
        {
            return this._walkSpeed;
        }

        // Token: 0x0600179C RID: 6044 RVA: 0x00013115 File Offset: 0x00011315
        public bool HasGroundControl()
        {
            return this._isGrounded && this._groundCollider.material.dynamicFriction > 0f && !this._inWarpField;
        }

        // Token: 0x0600179D RID: 6045 RVA: 0x00013141 File Offset: 0x00011341
        public Collider GetAntiSinkingCollider()
        {
            return this._antiSinkingCollider;
        }

        // Token: 0x0600179E RID: 6046 RVA: 0x00013149 File Offset: 0x00011349
        public bool IsGrounded()
        {
            return this._isGrounded;
        }

        // Token: 0x0600179F RID: 6047 RVA: 0x00013151 File Offset: 0x00011351
        public bool AllowMidairWobble()
        {
            return !this._isGrounded && !this._fluidDetector.InFluidType(FluidVolume.Type.TRACTOR_BEAM);
        }

        // Token: 0x060017A0 RID: 6048 RVA: 0x0001316C File Offset: 0x0001136C
        public OWRigidbody GetGroundBody()
        {
            return this._groundBody;
        }

        // Token: 0x060017A1 RID: 6049 RVA: 0x00013174 File Offset: 0x00011374
        public OWRigidbody GetLastGroundBody()
        {
            return this._lastGroundBody;
        }

        // Token: 0x060017A2 RID: 6050 RVA: 0x0001317C File Offset: 0x0001137C
        public Vector3 GetGroundContactPoint()
        {
            return this._groundContactPt;
        }

        // Token: 0x060017A3 RID: 6051 RVA: 0x00013184 File Offset: 0x00011384
        public float GetTurning()
        {
            if (!this._isTurningLocked && !this._isTumbling)
            {
                return this._lastTurnInput;
            }
            return 0f;
        }

        // Token: 0x060017A4 RID: 6052 RVA: 0x000131A2 File Offset: 0x000113A2
        public Vector3 GetRelativeGroundVelocity()
        {
            return _relativeGroundVelocity;
        }
        public void SetRelativeGroundVelocity(Vector3 relativeGroundVelocity)
        {
            _relativeGroundVelocity = relativeGroundVelocity;
        }

        // Token: 0x060017A6 RID: 6054 RVA: 0x000131E1 File Offset: 0x000113E1
        public Vector3 GetNormalAcceleration()
        {
            if (!this._isGrounded)
            {
                return Vector3.zero;
            }
            return this._normalAcceleration;
        }

        // Token: 0x060017A7 RID: 6055 RVA: 0x000131F7 File Offset: 0x000113F7
        public float GetNormalAccelerationScalar()
        {
            if (!this._isGrounded)
            {
                return 0f;
            }
            return this._normalAcceleration.magnitude * Mathf.Sign(Vector3.Dot(this._normalAcceleration, this._transform.up));
        }

        // Token: 0x060017A8 RID: 6056 RVA: 0x0008F190 File Offset: 0x0008D390
        public float GetJumpCrouchFraction()
        {
            return _jumpCrouchFraction;
        }

        //// Token: 0x060017A9 RID: 6057 RVA: 0x0008F1F0 File Offset: 0x0008D3F0
        //private float CalculateJumpSpeed()
        //{
        //    if (!this._useChargeJump)
        //    {
        //        return this._maxJumpSpeed;
        //    }
        //    float num = Mathf.InverseLerp(0.033f, 0.19f, this._jumpChargeTime);
        //    if (this._useChargeCurve)
        //    {
        //        num = Mathf.Clamp01(this._jumpChargeCurve.Evaluate(this._jumpChargeTime));
        //        return Mathf.Lerp(this._minJumpSpeed, this._maxJumpSpeed, num);
        //    }
        //    return Mathf.Lerp(this._minJumpSpeed, this._maxJumpSpeed, num * num);
        //}
        public void SetJumpCrouchFraction(float jumpCrouchFraction)
        {
            _jumpCrouchFraction = jumpCrouchFraction;
        }

        private Vector3 _relativeGroundVelocity;

        // Token: 0x04001BC5 RID: 7109
        [SerializeField]
        private Collider _antiSinkingCollider;

        // Token: 0x04001BC6 RID: 7110
        [SerializeField]
        private float _runSpeed = 6f;

        // Token: 0x04001BC7 RID: 7111
        [SerializeField]
        private float _walkSpeed = 3f;

        // Token: 0x04001BCC RID: 7116
        [SerializeField]
        private float _minJumpSpeed = 3f;

        // Token: 0x04001BCD RID: 7117
        [SerializeField]
        private float _maxJumpSpeed = 6f;

        // Token: 0x04001BCE RID: 7118
        [Space]
        [SerializeField]
        private bool _useChargeJump = true;

        // Token: 0x04001BCF RID: 7119
        [SerializeField]
        private bool _useChargeCurve;

        // Token: 0x04001BD0 RID: 7120
        [SerializeField]
        private AnimationCurve _jumpChargeCurve;

        // Token: 0x04001BDD RID: 7133
        private bool _isTurningLocked;

        // Token: 0x04001BDF RID: 7135
        private bool _isGrounded;

        // Token: 0x04001BE3 RID: 7139
        private bool _isTumbling;

        // Token: 0x04001BE6 RID: 7142
        private bool _inWarpField;


        private float _jumpCrouchFraction;

        // Token: 0x04001BF1 RID: 7153
        private float _lastTurnInput;

        // Token: 0x04001BF2 RID: 7154
        private Transform _transform;

        // Token: 0x04001BF3 RID: 7155
        private OWRigidbody _owRigidbody;

        // Token: 0x04001BF4 RID: 7156
        private OWRigidbody _groundBody;

        // Token: 0x04001BF5 RID: 7157
        private OWRigidbody _lastGroundBody;

        // Token: 0x04001BF6 RID: 7158
        private Collider _groundCollider;

        // Token: 0x04001BF8 RID: 7160
        private MovingPlatform _movingPlatform;

        private Vector3 _localGroundFrameVelocity;

        // Token: 0x04001BFA RID: 7162
        private bool _groundedOnRisingSand;

        // Token: 0x04001BFC RID: 7164
        private FluidDetector _fluidDetector;

        // Token: 0x04001BFD RID: 7165
        private Vector3 _groundContactPt = Vector3.zero;

        // Token: 0x04001BFF RID: 7167
        private Vector3 _normalAcceleration = Vector3.zero;

        // Token: 0x04001C01 RID: 7169
        private SurfaceType _groundSurface;
    }

}
