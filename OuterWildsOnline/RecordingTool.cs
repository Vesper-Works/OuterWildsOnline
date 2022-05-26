using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnityEngine;

namespace OuterWildsOnline
{
    public class RecordingTool : PlayerTool
	{// Token: 0x060021A8 RID: 8616 RVA: 0x00002FFB File Offset: 0x000011FB
		public override void Start()
		{
			base.enabled = false;
		}

		// Token: 0x060021A9 RID: 8617 RVA: 0x000B4588 File Offset: 0x000B2788
		public override void EquipTool()
		{
			if (!this._isEquipped)
			{
				this._isEquipped = true;
				this._isPuttingAway = false;
				this._isCentered = !this.HasEquipAnimation();
				if (this.HasEquipAnimation())
				{
					base.transform.localRotation = this._stowTransform.localRotation;
				}
				base.enabled = true;
			}
		}

		// Token: 0x060021AA RID: 8618 RVA: 0x0001A060 File Offset: 0x00018260
		public override void UnequipTool()
		{
			if (this._isEquipped)
			{
				this._isEquipped = false;
				if (!this.HasEquipAnimation())
				{
					this._isCentered = false;
					base.enabled = false;
					return;
				}
				if (!this._isPuttingAway)
				{
					this._isPuttingAway = true;
					this._isCentered = false;
				}
			}
		}

		// Token: 0x060021AB RID: 8619 RVA: 0x0001A09E File Offset: 0x0001829E
		public override bool IsEquipped()
		{
			return this._isEquipped;
		}

		// Token: 0x060021AC RID: 8620 RVA: 0x0001A0A6 File Offset: 0x000182A6
		public override bool IsCentered()
		{
			return this._isCentered;
		}

		// Token: 0x060021AD RID: 8621 RVA: 0x0001A0AE File Offset: 0x000182AE
		public override bool IsPuttingAway()
		{
			return this._isPuttingAway;
		}

		// Token: 0x060021AE RID: 8622 RVA: 0x0001A0B6 File Offset: 0x000182B6
		public override bool HasEquipAnimation()
		{
			return this._stowTransform != null && this._holdTransform != null;
		}

		// Token: 0x060021AF RID: 8623 RVA: 0x0001A0D4 File Offset: 0x000182D4
		public void InstantlyCenterTool()
		{
			this._isCentered = true;
			base.transform.localRotation = this._holdTransform.localRotation;
			this._moveSpring.ResetVelocity();
		}

		// Token: 0x060021B0 RID: 8624 RVA: 0x000077D2 File Offset: 0x000059D2
		public override bool AllowEquipAnimation()
		{
			return true;
		}

		// Token: 0x060021B1 RID: 8625 RVA: 0x000B45E0 File Offset: 0x000B27E0
		public override void Update()
		{
			if (this.HasEquipAnimation() && this.AllowEquipAnimation())
			{
				float deltaTime = this._isPuttingAway ? Time.unscaledDeltaTime : Time.deltaTime;
				Quaternion quaternion = this._isPuttingAway ? this._stowTransform.localRotation : this._holdTransform.localRotation;
				base.transform.localRotation = this._moveSpring.Update(base.transform.localRotation, quaternion, deltaTime);
				float num = Quaternion.Angle(base.transform.localRotation, quaternion);
				if (this._isEquipped && !this._isCentered && num <= this._arrivalDegrees)
				{
					this._isCentered = true;
				}
				if (this._isPuttingAway && num <= this._arrivalDegrees)
				{
					this._isEquipped = false;
					this._isPuttingAway = false;
					base.enabled = false;
					this._moveSpring.ResetVelocity();
				}
			}
		}

		// Token: 0x040022C8 RID: 8904
		[SerializeField]
		protected DampedSpringQuat _moveSpring = new DampedSpringQuat();

		// Token: 0x040022C9 RID: 8905
		[SerializeField]
		protected Transform _stowTransform;

		// Token: 0x040022CA RID: 8906
		[SerializeField]
		protected Transform _holdTransform;

		// Token: 0x040022CB RID: 8907
		[SerializeField]
		protected float _arrivalDegrees = 5f;

		// Token: 0x040022CC RID: 8908
		protected bool _isEquipped;

		// Token: 0x040022CD RID: 8909
		protected bool _isCentered;

		// Token: 0x040022CE RID: 8910
		protected bool _isPuttingAway;
	}
}
