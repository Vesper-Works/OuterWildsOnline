using UnityEngine;
using Sfs2X;

/**
 * Singleton class with static fields to hold a reference to SmartFoxServer connection.
 * It is useful to access the SmartFox class from anywhere in the game.
 */
public class SmartFoxConnection : MonoBehaviour
{
	private static SmartFoxConnection mInstance; 
	private static SmartFox sfs;

	public static SmartFox Connection {
		get {
            if (mInstance == null) {
                mInstance = new GameObject("SmartFoxConnection").AddComponent(typeof(SmartFoxConnection)) as SmartFoxConnection;
            }
			return sfs;
        }
      set {
            if (mInstance == null) {
                mInstance = new GameObject("SmartFoxConnection").AddComponent(typeof(SmartFoxConnection)) as SmartFoxConnection;
            }
			sfs = value;
        } 
	}

	public static bool IsInitialized {
		get { 
			return (sfs != null); 
		}
	}
	
	// Handle disconnection automagically
	// ** Important for Windows users - can cause crashes otherwise
    void OnApplicationQuit() { 
		if (sfs.IsConnected) {
			sfs.Disconnect();
        }
    } 
}