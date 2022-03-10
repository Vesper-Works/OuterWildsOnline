using OuterWildsOnline.SyncObjects;
using UnityEngine;
namespace OuterWildsOnline
{
    public class PlayerFlashlightSync : MonoBehaviour
    {
        PlayerToReceiveSync remotePlayer;

		bool flashlightOn = false;

		public OWLight2[] lights;

        public Transform root;

        public Transform basePivot;

        public Transform wobblePivot;

        public Vector3 baseForward;

        public Quaternion baseRotation;

        //TODO adicionar audio da luz ligando e apagando
		public void Start()
        {
            remotePlayer = transform.parent.GetComponentInParent<PlayerToReceiveSync>();


            baseForward = basePivot.forward;
            baseRotation = basePivot.rotation;

        }
        //private void FixedUpdate()
        //{
        //    Quaternion b = Quaternion.FromToRotation(basePivot.up, root.up) * Quaternion.FromToRotation(baseForward, root.forward) * baseRotation;
        //    baseRotation = Quaternion.Slerp(baseRotation, b, 6f * Time.deltaTime);
        //    basePivot.rotation = baseRotation;
        //    baseForward = basePivot.forward;
        //    if (wobblePivot != null)
        //       wobblePivot.localRotation = OWUtilities.GetWobbleRotation(0.3f, 0.15f) * Quaternion.identity;

        //}

        public void Update()
        {
			if (remotePlayer.IsFlashlightOn != flashlightOn)
			{
				flashlightOn = remotePlayer.IsFlashlightOn;

				if (flashlightOn)
					TurnOn(true);
				else
					TurnOff(true);
			}
        }

		public void TurnOn(bool playAudio = true)
        {
            for (int i = 0; i < lights.Length; i++)
                lights[i].SetActivation(true);

            //if (playAudio)
            //{
            //	Locator.GetPlayerAudioController().PlayTurnOnFlashlight();
            //}
            baseRotation = basePivot.rotation = root.rotation;
            baseForward = basePivot.forward;
            //lightSourceVolume.SetVolumeActivation(flashlightOn);
        }

		public void TurnOff(bool playAudio)
		{
				for (int i = 0; i < lights.Length; i++)
					lights[i].SetActivation(false);

            //if (playAudio)
            //{
            //	Locator.GetPlayerAudioController().PlayTurnOffFlashlight();
            //}

            //lightSourceVolume.SetVolumeActivation(flashlightOn);
        }
	}
}
