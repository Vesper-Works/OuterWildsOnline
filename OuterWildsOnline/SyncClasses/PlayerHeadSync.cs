using OuterWildsOnline.SyncObjects;
using UnityEngine;
namespace OuterWildsOnline
{
    public class PlayerHeadSync : MonoBehaviour
    {
        PlayerToReceiveSync remotePlayer;
        public void Start() 
        {
            remotePlayer = GetComponentInParent<PlayerToReceiveSync>();
        }

        public void FixedUpdate() 
        {
            transform.localEulerAngles = remotePlayer.LocalHeadRotation;
        }
    }
}
