using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnityEngine;

namespace ModTemplate
{
    class PlayerStateSync : MonoBehaviour
    {
        private void Awake()
        {
            this.Reset();
        }

        // Token: 0x060026F5 RID: 9973 RVA: 0x000C43E4 File Offset: 0x000C25E4
        private void Start()
        {
            //_playerFogWarpDetector = Locator.GetPlayerDetector().GetComponent<PlayerFogWarpDetector>();
            //AstroObject astroObject = Locator.GetAstroObject(AstroObject.Name.QuantumMoon);
            //if (astroObject != null)
            //{
            //	_quantumMoon = astroObject.GetComponent<QuantumMoon>();
            //}
        }

        // Token: 0x060026F6 RID: 9974 RVA: 0x000C441C File Offset: 0x000C261C
        private void OnDestroy()
        {
            this.Reset();
        }

        // Token: 0x060026F7 RID: 9975 RVA: 0x000C492C File Offset: 0x000C2B2C
        private void Reset()
        {
            _hasPlayerEnteredShip = false;
            _isWearingSuit = false;
            _insideShip = false;
            _insideShuttle = false;
            _atFlightConsole = false;
            _isDead = false;
            _isResurrected = false;
            _isAttached = false;
            _usingTelescope = false;
            _usingShipComputer = false;
            _inLandingView = false;
            _inBrambleDimension = false;
            _inGiantsDeep = false;
            _isFlashlightOn = false;
            _inDarkZone = false;
            _inConversation = false;
            _inZeroGTraining = false;
            _isCameraLockedOn = false;
            _isHullBreached = false;
            _usingNomaiRemoteCamera = false;
            _insideTheEye = false;
            _isSleepingAtCampfire = false;
            _isSleepingAtDreamCampfire = false;
            _isFastForwarding = false;
            _inCloakingField = false;
            _inDreamWorld = false;
            _hasPlayerhadLanternBlownOut = false;
            _viewingProjector = false;
            _isPeeping = false;
            _isGrabbedByGhost = false;
            _lastDetachTime = 0f;
            _undertowVolumeCount = 0;
            _playerFogWarpDetector = null;
            _quantumMoon = null;
        }

        // Token: 0x060026F8 RID: 9976 RVA: 0x0001E0F2 File Offset: 0x0001C2F2
        public bool IsPlayerCameraLockingOn()
        {
            return _isCameraLockedOn;
        }

        // Token: 0x060026F9 RID: 9977 RVA: 0x0001E0F9 File Offset: 0x0001C2F9
        public bool InZeroGTraining()
        {
            return _inZeroGTraining;
        }

        // Token: 0x060026FA RID: 9978 RVA: 0x0001E100 File Offset: 0x0001C300
        public bool HasPlayerEnteredShip()
        {
            return _hasPlayerEnteredShip;
        }

        // Token: 0x060026FB RID: 9979 RVA: 0x0001E107 File Offset: 0x0001C307
        public bool InConversation()
        {
            return _inConversation;
        }

        // Token: 0x060026FC RID: 9980 RVA: 0x0001E10E File Offset: 0x0001C30E
        public bool InDarkZone()
        {
            return _inDarkZone;
        }

        // Token: 0x060026FD RID: 9981 RVA: 0x0001E115 File Offset: 0x0001C315
        public bool IsFlashlightOn()
        {
            return _isFlashlightOn;
        }

        // Token: 0x060026FE RID: 9982 RVA: 0x0001E11C File Offset: 0x0001C31C
        public FogWarpVolume GetOuterFogWarpVolume()
        {
            return _playerFogWarpDetector.GetOuterFogWarpVolume();
        }

        // Token: 0x060026FF RID: 9983 RVA: 0x0001E128 File Offset: 0x0001C328
        public bool InZeroG()
        {
            return !_alignedWithField;
        }

        // Token: 0x06002700 RID: 9984 RVA: 0x0001E132 File Offset: 0x0001C332
        public bool InMapView()
        {
            return _mapView;
        }

        // Token: 0x06002701 RID: 9985 RVA: 0x0001E139 File Offset: 0x0001C339
        public bool UsingShipComputer()
        {
            return _usingShipComputer;
        }

        // Token: 0x06002702 RID: 9986 RVA: 0x0001E140 File Offset: 0x0001C340
        public bool InLandingView()
        {
            return _inLandingView;
        }

        // Token: 0x06002703 RID: 9987 RVA: 0x0001E147 File Offset: 0x0001C347
        public bool UsingTelescope()
        {
            return _usingTelescope;
        }

        // Token: 0x06002704 RID: 9988 RVA: 0x0001E14E File Offset: 0x0001C34E
        public bool IsAttached()
        {
            return _isAttached;
        }

        // Token: 0x06002704 RID: 9988 RVA: 0x0001E14E File Offset: 0x0001C34E
        public void SetIsAttached(bool isAttached)
        {
            _isAttached = isAttached;
        }

        // Token: 0x06002705 RID: 9989 RVA: 0x0001E155 File Offset: 0x0001C355
        public bool IsDead()
        {
            return _isDead;
        }

        // Token: 0x06002706 RID: 9990 RVA: 0x0001E15C File Offset: 0x0001C35C
        public bool IsResurrected()
        {
            return _isResurrected;
        }

        // Token: 0x06002707 RID: 9991 RVA: 0x0001E163 File Offset: 0x0001C363
        public bool IsWearingSuit()
        {
            return _isWearingSuit;
        }

        // Token: 0x06002708 RID: 9992 RVA: 0x0001E16A File Offset: 0x0001C36A
        public bool IsInsideShip()
        {
            return _insideShip;
        }

        // Token: 0x06002709 RID: 9993 RVA: 0x0001E171 File Offset: 0x0001C371
        public bool IsInsideShuttle()
        {
            return _insideShuttle;
        }

        // Token: 0x0600270A RID: 9994 RVA: 0x0001E178 File Offset: 0x0001C378
        public bool AtFlightConsole()
        {
            return _atFlightConsole;
        }

        // Token: 0x0600270B RID: 9995 RVA: 0x0001E17F File Offset: 0x0001C37F
        public bool IsCameraUnderwater()
        {
            return _isCameraUnderwater;
        }

        // Token: 0x0600270C RID: 9996 RVA: 0x0001E186 File Offset: 0x0001C386
        public bool InBrambleDimension()
        {
            return _inBrambleDimension;
        }

        // Token: 0x0600270D RID: 9997 RVA: 0x0001E18D File Offset: 0x0001C38D
        public bool OnQuantumMoon()
        {
            return !(_quantumMoon == null) && _quantumMoon.IsPlayerInside();
        }

        // Token: 0x0600270E RID: 9998 RVA: 0x0001E1A8 File Offset: 0x0001C3A8
        public bool InGiantsDeep()
        {
            return _inGiantsDeep;
        }

        // Token: 0x0600270F RID: 9999 RVA: 0x0001E1AF File Offset: 0x0001C3AF
        public bool IsHullBreached()
        {
            return _isHullBreached;
        }

        // Token: 0x06002710 RID: 10000 RVA: 0x0001E1B6 File Offset: 0x0001C3B6
        public bool UsingNomaiRemoteCamera()
        {
            return _usingNomaiRemoteCamera;
        }

        // Token: 0x06002711 RID: 10001 RVA: 0x0001E1BD File Offset: 0x0001C3BD
        public bool IsInsideTheEye()
        {
            return _insideTheEye;
        }

        // Token: 0x06002712 RID: 10002 RVA: 0x0001E1C4 File Offset: 0x0001C3C4
        public bool IsSleepingAtCampfire()
        {
            return _isSleepingAtCampfire;
        }

        // Token: 0x06002713 RID: 10003 RVA: 0x0001E1CB File Offset: 0x0001C3CB
        public bool IsSleepingAtDreamCampfire()
        {
            return _isSleepingAtDreamCampfire;
        }

        // Token: 0x06002714 RID: 10004 RVA: 0x0001E1D2 File Offset: 0x0001C3D2
        public bool IsFastForwarding()
        {
            return _isFastForwarding;
        }

        // Token: 0x06002715 RID: 10005 RVA: 0x0001E1D9 File Offset: 0x0001C3D9
        public bool InCloakingField()
        {
            return _inCloakingField;
        }

        // Token: 0x06002716 RID: 10006 RVA: 0x0001E1E0 File Offset: 0x0001C3E0
        public bool InDreamWorld()
        {
            return _inDreamWorld;
        }

        // Token: 0x06002717 RID: 10007 RVA: 0x0001E1E7 File Offset: 0x0001C3E7
        public bool HasPlayerHadLanternBlownOut()
        {
            return _hasPlayerhadLanternBlownOut;
        }

        // Token: 0x06002718 RID: 10008 RVA: 0x0001E1EE File Offset: 0x0001C3EE
        public bool IsViewingProjector()
        {
            return _viewingProjector;
        }

        // Token: 0x06002719 RID: 10009 RVA: 0x0001E1F5 File Offset: 0x0001C3F5
        public bool IsPeeping()
        {
            return _isPeeping;
        }

        // Token: 0x0600271A RID: 10010 RVA: 0x0001E1FC File Offset: 0x0001C3FC
        public bool IsRecentlyDetached()
        {
            return Time.time < _lastDetachTime + 0.5f;
        }

        // Token: 0x0600271B RID: 10011 RVA: 0x0001E210 File Offset: 0x0001C410
        public bool InUndertowVolume()
        {
            return _undertowVolumeCount > 0 && !IsRidingRaft(true);
        }

        // Token: 0x0600271C RID: 10012 RVA: 0x0001E225 File Offset: 0x0001C425
        public bool IsRidingRaft(bool raftMustBeInWater = true)
        {
            return !(Locator.GetOccupiedRaft() == null) && Locator.GetOccupiedRaft().IsPlayerRiding(raftMustBeInWater);
        }

        // Token: 0x0600271D RID: 10013 RVA: 0x0001E241 File Offset: 0x0001C441
        public bool IsGrabbedByGhost()
        {
            return _isGrabbedByGhost;
        }

        // Token: 0x0600271E RID: 10014 RVA: 0x000C4A0C File Offset: 0x000C2C0C
        public bool CheckShipOutsideSolarSystem()
        {
            Transform sunTransform = Locator.GetSunTransform();
            OWRigidbody shipBody = Locator.GetShipBody();
            return sunTransform != null && shipBody != null && (sunTransform.position - shipBody.transform.position).sqrMagnitude > 900000000f;
        }

        // Token: 0x0600271F RID: 10015 RVA: 0x0001E248 File Offset: 0x0001C448
        private void OnPlayerCameraLockOn()
        {
            _isCameraLockedOn = true;
        }

        // Token: 0x06002720 RID: 10016 RVA: 0x0001E250 File Offset: 0x0001C450
        private void OnPlayerCameraBreakLock()
        {
            _isCameraLockedOn = false;
        }

        // Token: 0x06002721 RID: 10017 RVA: 0x0001E258 File Offset: 0x0001C458
        private void OnEnterZeroGTraining()
        {
            _inZeroGTraining = true;
        }

        // Token: 0x06002722 RID: 10018 RVA: 0x0001E260 File Offset: 0x0001C460
        private void OnExitZeroGTraining()
        {
            _inZeroGTraining = false;
        }

        // Token: 0x06002723 RID: 10019 RVA: 0x0001E268 File Offset: 0x0001C468
        private void OnEnterConversation()
        {
            _inConversation = true;
        }

        // Token: 0x06002724 RID: 10020 RVA: 0x0001E270 File Offset: 0x0001C470
        private void OnExitConversation()
        {
            _inConversation = false;
        }

        // Token: 0x06002725 RID: 10021 RVA: 0x0001E278 File Offset: 0x0001C478
        private void OnEnterDarkZone()
        {
            _inDarkZone = true;
        }

        // Token: 0x06002726 RID: 10022 RVA: 0x0001E280 File Offset: 0x0001C480
        private void OnExitDarkZone()
        {
            _inDarkZone = false;
        }

        // Token: 0x06002727 RID: 10023 RVA: 0x0001E288 File Offset: 0x0001C488
        private void OnFlashlightOn()
        {
            _isFlashlightOn = true;
        }

        // Token: 0x06002728 RID: 10024 RVA: 0x0001E290 File Offset: 0x0001C490
        private void OnFlashlightOff()
        {
            _isFlashlightOn = false;
        }

        // Token: 0x06002729 RID: 10025 RVA: 0x0001E298 File Offset: 0x0001C498
        private void OnPlayerEnterBrambleDimension()
        {
            _inBrambleDimension = true;
        }

        // Token: 0x0600272A RID: 10026 RVA: 0x0001E2A0 File Offset: 0x0001C4A0
        private void OnPlayerExitBrambleDimension()
        {
            _inBrambleDimension = false;
        }

        // Token: 0x0600272B RID: 10027 RVA: 0x0001E2A8 File Offset: 0x0001C4A8
        private void OnPlayerEnterGiantsDeep()
        {
            _inGiantsDeep = true;
        }

        // Token: 0x0600272C RID: 10028 RVA: 0x0001E2B0 File Offset: 0x0001C4B0
        private void OnPlayerExitGiantsDeep()
        {
            _inGiantsDeep = false;
        }

        // Token: 0x0600272D RID: 10029 RVA: 0x0001E2B8 File Offset: 0x0001C4B8
        public void OnInitPlayerForceAlignment()
        {
            _alignedWithField = true;
        }

        // Token: 0x0600272E RID: 10030 RVA: 0x0001E2C0 File Offset: 0x0001C4C0
        public void OnBreakPlayerForceAlignment()
        {
            _alignedWithField = false;
        }

        // Token: 0x0600272F RID: 10031 RVA: 0x0001E2C8 File Offset: 0x0001C4C8
        private void OnEnterSignalscopeZoom(Signalscope telescope)
        {
            _usingTelescope = true;
        }

        // Token: 0x06002730 RID: 10032 RVA: 0x0001E2D0 File Offset: 0x0001C4D0
        private void OnExitSignalscopeZoom()
        {
            _usingTelescope = false;
        }

        // Token: 0x06002731 RID: 10033 RVA: 0x0001E2D8 File Offset: 0x0001C4D8
        private void OnEnterShipComputer()
        {
            _usingShipComputer = true;
        }

        // Token: 0x06002732 RID: 10034 RVA: 0x0001E2E0 File Offset: 0x0001C4E0
        private void OnExitShipComputer()
        {
            _usingShipComputer = false;
        }

        // Token: 0x06002733 RID: 10035 RVA: 0x0001E2E8 File Offset: 0x0001C4E8
        private void OnEnterLandingView()
        {
            _inLandingView = true;
        }

        // Token: 0x06002734 RID: 10036 RVA: 0x0001E2F0 File Offset: 0x0001C4F0
        private void OnExitLandingView()
        {
            _inLandingView = false;
        }

        // Token: 0x06002735 RID: 10037 RVA: 0x0001E2F8 File Offset: 0x0001C4F8
        private void OnEnterShip()
        {
            _insideShip = true;
            _hasPlayerEnteredShip = true;
        }

        // Token: 0x06002736 RID: 10038 RVA: 0x0001E306 File Offset: 0x0001C506
        private void OnExitShip()
        {
            _insideShip = false;
        }

        // Token: 0x06002737 RID: 10039 RVA: 0x0001E30E File Offset: 0x0001C50E
        public void OnSuitUp()
        {
            _isWearingSuit = true;
        }

        // Token: 0x06002738 RID: 10040 RVA: 0x0001E316 File Offset: 0x0001C516
        public void OnRemoveSuit()
        {
            _isWearingSuit = false;
        }

        // Token: 0x06002739 RID: 10041 RVA: 0x0001E31E File Offset: 0x0001C51E
        private void OnEnterShuttle()
        {
            _insideShuttle = true;
        }

        // Token: 0x0600273A RID: 10042 RVA: 0x0001E326 File Offset: 0x0001C526
        private void OnExitShuttle()
        {
            _insideShuttle = false;
        }

        // Token: 0x0600273B RID: 10043 RVA: 0x0001E32E File Offset: 0x0001C52E
        private void OnEnterMapView()
        {
            _mapView = true;
        }

        // Token: 0x0600273C RID: 10044 RVA: 0x0001E336 File Offset: 0x0001C536
        private void OnExitMapView()
        {
            _mapView = false;
        }

        // Token: 0x0600273D RID: 10045 RVA: 0x0001E33E File Offset: 0x0001C53E
        private void OnEnterFlightConsole(OWRigidbody shipBody)
        {
            _atFlightConsole = true;
        }

        // Token: 0x0600273E RID: 10046 RVA: 0x0001E346 File Offset: 0x0001C546
        private void OnExitFlightConsole()
        {
            _atFlightConsole = false;
        }

        // Token: 0x0600273F RID: 10047 RVA: 0x0001E34E File Offset: 0x0001C54E
        private void OnCameraEnterWater(float relativeSpeed)
        {
            _isCameraUnderwater = true;
        }

        // Token: 0x06002740 RID: 10048 RVA: 0x0001E356 File Offset: 0x0001C556
        private void OnCameraExitWater()
        {
            _isCameraUnderwater = false;
        }

        // Token: 0x06002741 RID: 10049 RVA: 0x0001E35E File Offset: 0x0001C55E
        private void OnPlayerDeath(DeathType deathType)
        {
            _isDead = true;
        }

        // Token: 0x06002742 RID: 10050 RVA: 0x0001E366 File Offset: 0x0001C566
        private void OnPlayerResurrection()
        {
            _isDead = false;
            _isResurrected = true;
        }

        // Token: 0x06002743 RID: 10051 RVA: 0x0001E374 File Offset: 0x0001C574
        private void OnAttachPlayerToPoint(OWRigidbody attachBody)
        {
            _isAttached = true;
        }

        // Token: 0x06002744 RID: 10052 RVA: 0x0001E37C File Offset: 0x0001C57C
        private void OnDetachPlayerFromPoint()
        {
            _isAttached = false;
            _lastDetachTime = Time.time;
        }

        // Token: 0x06002745 RID: 10053 RVA: 0x0001E38E File Offset: 0x0001C58E
        private void OnShipHullBreach()
        {
            _isHullBreached = true;
        }

        // Token: 0x06002746 RID: 10054 RVA: 0x0001E396 File Offset: 0x0001C596
        private void OnEnterNomaiRemoteCamera()
        {
            _usingNomaiRemoteCamera = true;
        }

        // Token: 0x06002747 RID: 10055 RVA: 0x0001E39E File Offset: 0x0001C59E
        private void OnExitNomaiRemoteCamera()
        {
            _usingNomaiRemoteCamera = false;
        }

        // Token: 0x06002748 RID: 10056 RVA: 0x0001E3A6 File Offset: 0x0001C5A6
        private void OnEyeStateChanged(EyeState state)
        {
            if (Locator.GetEyeStateManager().IsInsideTheEye())
            {
                _insideTheEye = true;
            }
        }

        // Token: 0x06002749 RID: 10057 RVA: 0x0001E3BA File Offset: 0x0001C5BA
        private void OnStartSleepingAtCampfire(bool isDreamCampfire)
        {
            _isSleepingAtCampfire = true;
            _isSleepingAtDreamCampfire = isDreamCampfire;
        }

        // Token: 0x0600274A RID: 10058 RVA: 0x0001E3C8 File Offset: 0x0001C5C8
        private void OnStopSleepingAtCampfire()
        {
            _isSleepingAtCampfire = false;
            _isSleepingAtDreamCampfire = false;
        }

        // Token: 0x0600274B RID: 10059 RVA: 0x0001E3D6 File Offset: 0x0001C5D6
        private void OnStartFastForward()
        {
            _isFastForwarding = true;
        }

        // Token: 0x0600274C RID: 10060 RVA: 0x0001E3DE File Offset: 0x0001C5DE
        private void OnEndFastForward()
        {
            _isFastForwarding = false;
        }

        // Token: 0x0600274D RID: 10061 RVA: 0x0001E3E6 File Offset: 0x0001C5E6
        private void OnEnterCloak()
        {
            _inCloakingField = true;
        }

        // Token: 0x0600274E RID: 10062 RVA: 0x0001E3EE File Offset: 0x0001C5EE
        private void OnExitCloak()
        {
            _inCloakingField = false;
        }

        // Token: 0x0600274F RID: 10063 RVA: 0x0001E3F6 File Offset: 0x0001C5F6
        private void OnEnterDreamWorld()
        {
            _inDreamWorld = true;
        }

        // Token: 0x06002750 RID: 10064 RVA: 0x0001E3FE File Offset: 0x0001C5FE
        private void OnExitDreamWorld()
        {
            _inDreamWorld = false;
            if (!_hasPlayerhadLanternBlownOut && Locator.GetDreamWorldController().GetLastDreamWakeType() == DreamWakeType.LanternBlownOut)
            {
                _hasPlayerhadLanternBlownOut = true;
            }
        }

        // Token: 0x06002751 RID: 10065 RVA: 0x0001E41F File Offset: 0x0001C61F
        private void OnStartViewingProjector()
        {
            _viewingProjector = true;
        }

        // Token: 0x06002752 RID: 10066 RVA: 0x0001E427 File Offset: 0x0001C627
        private void OnEndViewingProjector()
        {
            _viewingProjector = false;
        }

        // Token: 0x06002753 RID: 10067 RVA: 0x0001E42F File Offset: 0x0001C62F
        private void OnStartPeeping(Peephole peephole)
        {
            _isPeeping = true;
        }

        // Token: 0x06002754 RID: 10068 RVA: 0x0001E437 File Offset: 0x0001C637
        private void OnStopPeeping(Peephole peephole)
        {
            _isPeeping = false;
        }

        // Token: 0x06002755 RID: 10069 RVA: 0x0001E43F File Offset: 0x0001C63F
        private void OnEnterUndertowVolume()
        {
            _undertowVolumeCount++;
        }

        // Token: 0x06002756 RID: 10070 RVA: 0x0001E44D File Offset: 0x0001C64D
        private void OnExitUndertowVolume()
        {
            _undertowVolumeCount--;
            if (_undertowVolumeCount < 0)
            {
                _undertowVolumeCount = 0;
                Debug.LogError("Undertow count should never be less than zero!");
                Debug.Break();
            }
        }

        // Token: 0x06002757 RID: 10071 RVA: 0x0001E478 File Offset: 0x0001C678
        private void OnGrabbedByGhost()
        {
            _isGrabbedByGhost = true;
        }

        // Token: 0x06002758 RID: 10072 RVA: 0x0001E480 File Offset: 0x0001C680
        private void OnReleasedByGhost()
        {
            _isGrabbedByGhost = false;
        }

        // Token: 0x040026E6 RID: 9958
        private bool _hasPlayerEnteredShip;

        // Token: 0x040026E7 RID: 9959
        private bool _isWearingSuit;

        // Token: 0x040026E8 RID: 9960
        private bool _alignedWithField;

        // Token: 0x040026E9 RID: 9961
        private bool _insideShip;

        // Token: 0x040026EA RID: 9962
        private bool _insideShuttle;

        // Token: 0x040026EB RID: 9963
        private bool _atFlightConsole;

        // Token: 0x040026EC RID: 9964
        private bool _isCameraUnderwater;

        // Token: 0x040026ED RID: 9965
        private bool _isDead;

        // Token: 0x040026EE RID: 9966
        private bool _isResurrected;

        // Token: 0x040026EF RID: 9967
        private bool _isAttached;

        // Token: 0x040026F0 RID: 9968
        private bool _usingTelescope;

        // Token: 0x040026F1 RID: 9969
        private bool _usingShipComputer;

        // Token: 0x040026F2 RID: 9970
        private bool _inLandingView;

        // Token: 0x040026F3 RID: 9971
        private bool _mapView;

        // Token: 0x040026F4 RID: 9972
        private bool _inBrambleDimension;

        // Token: 0x040026F5 RID: 9973
        private bool _inGiantsDeep;

        // Token: 0x040026F6 RID: 9974
        private bool _isFlashlightOn;

        // Token: 0x040026F7 RID: 9975
        private bool _inDarkZone;

        // Token: 0x040026F8 RID: 9976
        private bool _inConversation;

        // Token: 0x040026F9 RID: 9977
        private bool _inZeroGTraining;

        // Token: 0x040026FA RID: 9978
        private bool _isCameraLockedOn;

        // Token: 0x040026FB RID: 9979
        private bool _isHullBreached;

        // Token: 0x040026FC RID: 9980
        private bool _usingNomaiRemoteCamera;

        // Token: 0x040026FD RID: 9981
        private bool _insideTheEye;

        // Token: 0x040026FE RID: 9982
        private bool _isSleepingAtCampfire;

        // Token: 0x040026FF RID: 9983
        private bool _isSleepingAtDreamCampfire;

        // Token: 0x04002700 RID: 9984
        private bool _isFastForwarding;

        // Token: 0x04002701 RID: 9985
        private bool _inCloakingField;

        // Token: 0x04002702 RID: 9986
        private bool _inDreamWorld;

        // Token: 0x04002703 RID: 9987
        private bool _hasPlayerhadLanternBlownOut;

        // Token: 0x04002704 RID: 9988
        private bool _viewingProjector;

        // Token: 0x04002705 RID: 9989
        private bool _isPeeping;

        // Token: 0x04002706 RID: 9990
        private bool _isGrabbedByGhost;

        // Token: 0x04002707 RID: 9991
        private float _lastDetachTime;

        // Token: 0x04002708 RID: 9992
        private int _undertowVolumeCount;

        // Token: 0x04002709 RID: 9993
        private PlayerFogWarpDetector _playerFogWarpDetector;

        // Token: 0x0400270A RID: 9994
        private QuantumMoon _quantumMoon;
    }
}
