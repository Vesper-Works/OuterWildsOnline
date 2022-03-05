using OWML.Common;
using OWML.Common.Menus;
using OWML.ModHelper;
using OWML.ModHelper.Events;
using Sfs2X;
using Sfs2X.Core;
using Sfs2X.Entities;
using Sfs2X.Entities.Data;
using Sfs2X.Entities.Variables;
using Sfs2X.Requests;
using Sfs2X.Requests.MMO;
using Sfs2X.Util;
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace OuterWildsOnline
{
    public class ConnectionController : ModBehaviour
    {
        public static IModHelper ModHelperInstance;
        public static SmartFox Connection { get => Instance.sfs; }

        private SmartFox sfs;

        private bool playerInGame = false;

        private UnityEngine.UI.Text pingText;

        private IModButton connectButton;

        private string serverIP;
        private string roomToJoin = GetRoomNameFromScene(OWScene.SolarSystem);
        private static string GetRoomNameFromScene(OWScene scene) 
        {
            switch (scene) 
            {
                case OWScene.SolarSystem:
                    return "SolarSystem";
                case OWScene.EyeOfTheUniverse:
                    return "EyeOfTheUniverse";
                default:
                    return "";
            }
        }
        private static ConnectionController Instance { get; set; }
        public override void Configure(IModConfig config)
        {
            serverIP = config.GetSettingsValue<string>("serverIP");
        }

        private void Start()
        {
            Instance = this;
            ModHelperInstance = ModHelper;

            Application.runInBackground = true;
            // Skip flash screen.
            var titleScreenAnimation = FindObjectOfType<TitleScreenAnimation>();
            titleScreenAnimation.SetValue("_fadeDuration", 0);
            titleScreenAnimation.SetValue("_gamepadSplash", false);
            titleScreenAnimation.SetValue("_introPan", false);
            titleScreenAnimation.Invoke("FadeInTitleLogo");

            // Skip menu fade.
            var titleAnimationController = FindObjectOfType<TitleAnimationController>();
            titleAnimationController.SetValue("_logoFadeDelay", 0.001f);
            titleAnimationController.SetValue("_logoFadeDuration", 0.001f);
            titleAnimationController.SetValue("_optionsFadeDelay", 0.001f);
            titleAnimationController.SetValue("_optionsFadeDuration", 0.001f);
            titleAnimationController.SetValue("_optionsFadeSpacing", 0.001f);


            ModHelper.Menus.MainMenu.OnInit += DoMainMenuStuff;

            ModHelper.Events.Scenes.OnCompleteSceneChange += OnCompleteSceneChange;

            GlobalMessenger<DeathType>.AddListener("PlayerDeath", new Callback<DeathType>(this.OnPlayerDeath));
        }

        private void OnPlayerDeath(DeathType deathType)
        {
            var data = new SFSObject();
            data.PutInt("died", (int)deathType); //JoinedGame
            sfs.Send(new ExtensionRequest("GeneralEvent", data, sfs.LastJoinedRoom));
        }

        private void DoMainMenuStuff()
        {
            connectButton = ModHelper.Menus.MainMenu.NewExpeditionButton.Duplicate("");
            connectButton.OnClick += StartUpConnection;
            SetButtonConnect();
        }
        private void OnCompleteSceneChange(OWScene oldScene, OWScene newScene)
        {
            if (!sfs.IsConnected) { return; }
            //JoinRoom(roomToJoin);
            //Entrar aqui na nova sala se tiver que mudar
            string currentRoomScene = GetRoomNameFromScene(newScene);

            if (newScene == OWScene.SolarSystem && !playerInGame)
            {
                RemoteObjects.Clear();
                LoadServerThings();
                playerInGame = true;
            }
            else if (newScene == OWScene.SolarSystem && playerInGame)
            {
                RemoteObjects.Clear();
                ReloadServerThings();
            }
        }

        private void FixedUpdate()
        {
            if (sfs != null)
            {
                sfs.ProcessEvents();
                ConnectionController.ModHelperInstance.Console.WriteLine("d");
            }
        }
        private IEnumerator GetClosestSectorToPlayer()
        {
            yield return new WaitForSeconds(2f);
            while (true)
            {
                SFSSectorManager.FindClosestSectorToPlayer();
                yield return new WaitForSecondsRealtime(0.4f);
            }
        }

        private void SpawnRemotePlayer(SFSUser user, Vector3 position, Quaternion rotation)
        {
            //if (!RemoteObjects.CloneStorage.ContainsKey("Player"))
            //{
            //    CreatePlayerRemoteCopy();
            //    CreateShipRemoteCopy();
            //}
            if (RemoteObjects.Players.ContainsKey(user.Id))
            {
                ModHelper.Console.WriteLine("Player " + user + " is already spawned!"); return;
            }

            ModHelper.Console.WriteLine("Spawned: " + user);

            GameObject remotePlayer = Instantiate(RemoteObjects.CloneStorage["Player"], position, rotation);
            remotePlayer.name = user.Name;

            var obj = GameObject.FindWithTag("MapCamera");
            var markerManager = obj.GetRequiredComponent<MapController>().GetMarkerManager();
            var canvasMarker = markerManager.InstantiateNewMarker(true);
            markerManager.RegisterMarker(canvasMarker, remotePlayer.GetComponent<OWRigidbody>());
            canvasMarker.SetLabel(user.Name.ToUpper());
            canvasMarker.SetColor(Color.white);
            canvasMarker.SetVisibility(true);

            remotePlayer.AddComponent<RemotePlayerHUDMarker>().InitCanvasMarker(user.Name);

            remotePlayer.SetActive(true);

            RemoteObjects.Players.Add(user.Id, remotePlayer);
        }
        private void RemoveRemotePlayer(int userID)
        {
            ModHelper.Console.WriteLine("Removed: " + userID);

            foreach (var remoteObject in RemoteObjects.ObjectTypes.Values)
            {
                Destroy(remoteObject[userID]);
                remoteObject.Remove(userID);
            }
        }

        private void SpawnRemoteObject(int userID, string objectType)
        {
            ModHelper.Console.WriteLine($"({sfs.MySelf.Id}) Spawning {objectType} from user {userID}");
            GameObject remoteObject = Instantiate(RemoteObjects.CloneStorage[objectType]);
            var comp = remoteObject.GetComponent<SyncObjects.ObjectToRecieveSync>();
            comp.Init(objectType, userID);
            remoteObject.SetActive(true);
            ModHelper.Console.WriteLine($"New Object is named {comp.name}");
            if (!RemoteObjects.ObjectTypes.ContainsKey(objectType))
            {
                RemoteObjects.AddNewObjectType(objectType);
            }
            RemoteObjects.ObjectTypes[objectType][userID] = remoteObject;
        }
        private void RemoveCollisionFromObjectRecursively(Transform transform)
        {
            foreach (Transform child in transform)
            {
                if (child.gameObject.name.ToLower().Contains("collision")) { child.gameObject.SetActive(false); }
                if (child.childCount > 0)
                {
                    RemoveCollisionFromObjectRecursively(child);
                }
            }
        }

        public static void SetActiveRecursively(Transform transform, bool active)
        {
            transform.gameObject.SetActive(active);
            foreach (Transform child in transform)
            {
                child.gameObject.SetActive(active);
                foreach (var component in child.GetComponents<MonoBehaviour>())
                {
                    component.enabled = active;
                }
                if (child.childCount > 0)
                {
                    SetActiveRecursively(child, active);
                }
            }
        }

        //----------------------------------------------------------
        // SmartFoxServer event listeners
        //----------------------------------------------------------

        /**
         * This is where we receive events about people in proximity (AoI).
         * We get two lists, one of new users that have entered the AoI and one with users that have left our proximity area.
         */
        public void OnProximityListUpdate(BaseEvent evt)
        {
            var addedUsers = (List<User>)evt.Params["addedUsers"];
            var removedUsers = (List<User>)evt.Params["removedUsers"];

            // Handle all new Users
            foreach (User user in addedUsers)
            {
                if (RemoteObjects.Players.ContainsKey(user.Id)) //If the user is already in the game (went far away and came back), enable their remote objects
                {
                    foreach (var syncedObject in RemoteObjects.ObjectTypes.Values)
                    {
                        syncedObject[user.Id].SetActive(true);
                    }
                }
                //else
                //{
                //    SpawnRemotePlayer(
                //        (SFSUser)user,
                //        new Vector3((float)user.GetVariable("x").GetDoubleValue(), (float)user.GetVariable("y").GetDoubleValue(), (float)user.GetVariable("z").GetDoubleValue()),
                //        Quaternion.Euler((float)user.GetVariable("rotx").GetDoubleValue(), (float)user.GetVariable("roty").GetDoubleValue(), (float)user.GetVariable("rotz").GetDoubleValue())
                //    );
                //}
            }

            // Handle removed users
            foreach (User user in removedUsers)
            {
                if (RemoteObjects.Players.ContainsKey(user.Id))
                {
                    foreach (var syncedObject in RemoteObjects.ObjectTypes.Values)
                    {
                        syncedObject[user.Id].SetActive(false);
                    }
                }
            }
        }
        private void LoadServerThings()
        {
            ModHelper.Console.WriteLine("Loaded game scene!");

            sfs.EnableLagMonitor(true, 2, 5);

            // Register callback delegates
            sfs.AddEventListener(SFSEvent.CONNECTION_LOST, OnConnectionLost);
            sfs.AddEventListener(SFSEvent.PROXIMITY_LIST_UPDATE, OnProximityListUpdate);
            sfs.AddEventListener(SFSEvent.EXTENSION_RESPONSE, OnExtensionResponse);
            sfs.AddEventListener(SFSEvent.PING_PONG, PingPongHandler);
            sfs.AddEventListener(SFSEvent.ROOM_VARIABLES_UPDATE, OnRoomVarsUpdate);

            SFSSectorManager.RefreshSectors();

            RemoteObjects.AddNewObjectType("Player");
            RemoteObjects.AddNewObjectType("Ship");
            RemoteObjects.AddNewObjectType("Probe");

            StartCoroutine(GetClosestSectorToPlayer());
            StartCoroutine(SendJoinedGameMessage());
            StartCoroutine(CreateObjectClones(0.7f));
            StartCoroutine(SetObjectsToSync(0.5f));
            StartCoroutine(InstantiateNewSyncObjects(1f));

            gameObject.AddComponent<ChatHandler>();

            ModHelper.HarmonyHelper.AddPostfix<PauseMenuManager>("OnExitToMainMenu", typeof(ConnectionController), "OnExitToMainMenuPatch");
        }
        private void ReloadServerThings()
        {
            ModHelper.Console.WriteLine("Reloaded game scene!");

            sfs.EnableLagMonitor(true, 2, 5);

            sfs.RemoveAllEventListeners();

            // Register callback delegates
            sfs.AddEventListener(SFSEvent.CONNECTION_LOST, OnConnectionLost);
            sfs.AddEventListener(SFSEvent.PROXIMITY_LIST_UPDATE, OnProximityListUpdate);
            sfs.AddEventListener(SFSEvent.EXTENSION_RESPONSE, OnExtensionResponse);
            sfs.AddEventListener(SFSEvent.PING_PONG, PingPongHandler);
            sfs.AddEventListener(SFSEvent.ROOM_VARIABLES_UPDATE, OnRoomVarsUpdate);

            SFSSectorManager.RefreshSectors();

            RemoteObjects.AddNewObjectType("Player");
            RemoteObjects.AddNewObjectType("Ship");
            RemoteObjects.AddNewObjectType("Probe");

            gameObject.AddComponent<ChatHandler>();

            StopAllCoroutines();
            StartCoroutine(GetClosestSectorToPlayer());
            StartCoroutine(SendJoinedGameMessage());
            //StartCoroutine(ReloadAllRemoteUsers(2f));
            StartCoroutine(CreateObjectClones(0.7f));
            StartCoroutine(SetObjectsToSync(0.5f));
            StartCoroutine(InstantiateNewSyncObjects(1f));

        }
        private static void OnExitToMainMenuPatch()
        {
            Instance.playerInGame = false;
            var data = new SFSObject();
            data.PutNull("lg"); //LeftGame
            Connection.Send(new ExtensionRequest("GeneralEvent", data, Connection.LastJoinedRoom));
            Instance.StartCoroutine(Instance.Disconnect(0.1f));
            Destroy(Instance.GetComponent<ChatHandler>());
        }
        public IEnumerator Disconnect(float delay)
        {
            yield return new WaitForSeconds(delay);
            Connection.RemoveAllEventListeners();
            Connection.Disconnect();
            Instance.StopAllCoroutines();
        }
        private IEnumerator ReloadAllRemoteUsers(float delay)
        {
            yield return new WaitForSeconds(delay);
            List<int> userIDs = new List<int>();
            foreach (var userID in RemoteObjects.Players.Keys)
            {
                userIDs.Add(userID);
            }
            foreach (var userID in userIDs)
            {
                RemoveRemotePlayer(userID);
                //SpawnRemotePlayer((SFSUser)sfs.UserManager.GetUserById(userID), Vector3.zero, Quaternion.identity);
            }
        }
        private IEnumerator SendJoinedGameMessage()
        {
            yield return new WaitForSeconds(3f);
            var data = new SFSObject();
            data.PutNull("jg"); //JoinedGame
            sfs.Send(new ExtensionRequest("GeneralEvent", data, sfs.LastJoinedRoom));
        }
        private IEnumerator CreateObjectClones(float delay)
        {
            yield return new WaitForSeconds(delay);
            RemoteObjects.CloneStorage.Add("Player", CreateRemoteCopies.CreatePlayerRemoteCopy());
            ModHelper.Console.WriteLine("Player added to clone bay");
            RemoteObjects.CloneStorage.Add("Ship", CreateRemoteCopies.CreateShipRemoteCopy());
            ModHelper.Console.WriteLine("Ship added to clone bay");
            RemoteObjects.CloneStorage.Add("Probe", CreateRemoteCopies.CreateProbeRemoteCopy());
            ModHelper.Console.WriteLine("Probe added to clone bay");
        }
        private IEnumerator SetObjectsToSync(float delay)
        {
            yield return new WaitForSeconds(delay);
            List<SyncObjects.ObjectToSendSync> objectsToSync = new List<SyncObjects.ObjectToSendSync>
            {
                Locator.GetPlayerTransform().gameObject.AddComponent<SyncObjects.PlayerToSendSync>().Init(),
                Locator.GetShipBody().gameObject.AddComponent<SyncObjects.ShipToSendSync>().Init(),
                Resources.FindObjectsOfTypeAll<SurveyorProbe>()[1].gameObject.AddComponent<SyncObjects.ProbeToSendSync>().Init() //For some reason this syncs all the probes, no idea why!
            };
            //foreach (var probe in Resources.FindObjectsOfTypeAll<SurveyorProbe>())
            //{
            //    ModHelper.Console.WriteLine(probe.gameObject.name);
            //    objectsToSync.Add(probe.gameObject.AddComponent<SyncObjects.ProbeToSendSync>().Init());
            //}
            List<RoomVariable> roomVariables = new List<RoomVariable>();

            ISFSObject nameStorage = new SFSObject();
            List<string> objectNames = new List<string>();

            foreach (var syncObject in objectsToSync)
            {
                objectNames.Add(syncObject.ObjectName);
            }
            nameStorage.PutUtfStringArray("objectNames", objectNames.ToArray());

            roomVariables.Add(new SFSRoomVariable("objects," + sfs.MySelf.Id.ToString(), nameStorage));
            sfs.Send(new SetRoomVariablesRequest(roomVariables));
        }
        private IEnumerator InstantiateNewSyncObjects(float delay)
        {
            yield return new WaitForSeconds(delay);
            foreach (var variable in sfs.LastJoinedRoom.GetVariables())
            {
                if (variable.Name.Contains("objects"))
                {
                    int userID = int.Parse(variable.Name.Split(',')[1]);
                    if (sfs.MySelf.Id == userID) { continue; }

                    string[] objectNames = variable.GetSFSObjectValue().GetUtfStringArray("objectNames");

                    for (int i = 0; i < objectNames.Length; i++)
                    {
                        SpawnRemoteObject(userID, objectNames[i]);
                    }
                }
            }
        }
        private void PingPongHandler(BaseEvent evt)
        {
            if (pingText != null) { pingText.text = (int)evt.Params["lagValue"] + "ms"; }
        }

        #region ConnectButtonEvents
        private void SetButtonConnecting()
        {
            if (connectButton == null) return;
            connectButton.Button.enabled = false;
            connectButton.Title = "CONNECTING...";
        }

        private void SetButtonConnected()
        {
            if (connectButton == null) return;
            connectButton.Button.enabled = false;
            connectButton.Title = "CONNECTED";
        }

        private void SetButtonConnect()
        {
            if (connectButton == null) return;
            connectButton.Button.enabled = true;
            connectButton.Title = "CONNECT TO SERVER";
        }

        private void SetButtonError()
        {
            if (connectButton == null) return;
            connectButton.Button.enabled = true;
            connectButton.Title = "FAILED. TRY AGAIN?";
        }
        #endregion

        private void StartUpConnection()
        {
            SetButtonConnecting();

            // Create SmartFox client instance
            sfs = new SmartFox();

            // Add event listeners
            sfs.AddEventListener(SFSEvent.CONNECTION, OnConnection);
            sfs.AddEventListener(SFSEvent.CONNECTION_LOST, OnConnectionLost);
            sfs.AddEventListener(SFSEvent.LOGIN, OnLogin);
            sfs.AddEventListener(SFSEvent.LOGIN_ERROR, OnLoginError);
            sfs.AddEventListener(SFSEvent.EXTENSION_RESPONSE, OnExtensionResponse);
            sfs.AddEventListener(SFSEvent.ROOM_JOIN, OnRoomJoin);
            sfs.AddEventListener(SFSEvent.ROOM_JOIN_ERROR, OnRoomJoinError);

            // Set connection parameters
            ConfigData cfg = new ConfigData();
#if !DEBUG
            cfg.Host = serverIP;
#else
            cfg.Host = "127.0.0.1";
#endif
            cfg.Port = 9933;
            cfg.Zone = "OuterWildsMMO";

            // Connect to SFS2X
            sfs.Connect(cfg);
        }

        #region ConnectionAndLoginEvent
        private void OnConnection(BaseEvent evt)
        {
            if ((bool)evt.Params["success"])
            {
                ModHelper.Console.WriteLine("Connected");

                // Send login request

#if DEBUG
                sfs.Send(new LoginRequest(""));
#else
                sfs.Send(new LoginRequest(StandaloneProfileManager.SharedInstance.currentProfile.profileName));
#endif
            }
            else
            {
                SetButtonError();
                ModHelper.Console.WriteLine("Connection failed", MessageType.Error);
            }
        }

        private void OnConnectionLost(BaseEvent evt)
        {
            SetButtonConnect();
            sfs.RemoveAllEventListeners();
            ModHelper.Console.WriteLine("Disconnected");
        }

        private void OnLogin(BaseEvent evt)
        {
            // We either create the Game Room or join it if it exists already
            JoinRoom(roomToJoin);
            SetButtonConnected();
        }

        private void JoinRoom(string roomToJoin) 
        {
            if (sfs.RoomManager.ContainsRoom(roomToJoin))
            {
                sfs.Send(new JoinRoomRequest(roomToJoin));
            }
            else
            {
                MMORoomSettings settings = new MMORoomSettings(roomToJoin)
                {
                    DefaultAOI = new Vec3D(1000f, 1000f, 1000f),
                    MaxUsers = 100,
                    Extension = new RoomExtension("OuterWildsMMO", "MainExtension"),
                    IsGame = true,
                    SendAOIEntryPoint = true,
                    UserMaxLimboSeconds = 120,
                    MaxVariables = 10000
                };
                sfs.Send(new CreateRoomRequest(settings, true));
            }
        }

        private void OnLoginError(BaseEvent evt)
        {
            ModHelper.Console.WriteLine("Login error: " + (string)evt.Params["errorMessage"], MessageType.Error);
            SetButtonError();
        }
        #endregion

        private void OnExtensionResponse(BaseEvent evt)
        {
            string cmd = (string)evt.Params["cmd"];

            if (evt.Params == null) { return; }
            if (evt.Params.Count == 0) { return; }
            if (!evt.Params.ContainsKey("params")) { return; }


            SFSObject responseParams = (SFSObject)evt.Params["params"];

            if (responseParams == null) { return; }

            RemotePlayerlessResponses(responseParams, cmd);

            if (RemoteObjects.Players == null || !RemoteObjects.Players.ContainsKey(responseParams.GetInt("userId")))
            {
                //ModHelper.Console.WriteLine("Remote player not found!", MessageType.Warning);
                return;
            }
            RemotePlayerResponses(RemoteObjects.Players[responseParams.GetInt("userId")], responseParams, cmd);
        }
        private void RemotePlayerResponses(GameObject remotePlayer, SFSObject responseParams, string cmd)
        {
            switch (cmd)
            {
                case "GeneralEvent":
                    #region GeneralEvent
                    if (responseParams.ContainsKey("jg"))
                    {
                        if (PlayerState.AtFlightConsole())
                        {
                            var data = new NotificationData(NotificationTarget.Ship, "Hearthian joined: " + remotePlayer.name, 4f, true);
                            NotificationManager.SharedInstance.PostNotification(data, false);
                        }
                        else
                        {
                            var data = new NotificationData(NotificationTarget.Player, "Hearthian joined: " + remotePlayer.name, 4f, true);
                            NotificationManager.SharedInstance.PostNotification(data, false);
                        }
                    }
                    if (responseParams.ContainsKey("lg"))
                    {
                        if (PlayerState.AtFlightConsole())
                        {
                            var data = new NotificationData(NotificationTarget.Ship, "Hearthian left: " + remotePlayer.name, 4f, true);
                            NotificationManager.SharedInstance.PostNotification(data, false);
                        }
                        else
                        {
                            var data = new NotificationData(NotificationTarget.Player, "Hearthian left: " + remotePlayer.name, 4f, true);
                            NotificationManager.SharedInstance.PostNotification(data, false);
                        }
                        RemoveRemotePlayer(responseParams.GetInt("userId"));
                    }
                    if (responseParams.ContainsKey("died"))
                    {
                        if (PlayerState.AtFlightConsole())
                        {
                            var data = new NotificationData(NotificationTarget.Ship, remotePlayer.name + " has died:\n" + Enum.GetName(typeof(DeathType), responseParams.GetInt("died")), 4f, true);
                            NotificationManager.SharedInstance.PostNotification(data, false);
                        }
                        else
                        {
                            var data = new NotificationData(NotificationTarget.Ship, remotePlayer.name + " has died:\n" + Enum.GetName(typeof(DeathType), responseParams.GetInt("died")), 4f, true);
                            NotificationManager.SharedInstance.PostNotification(data, false);
                        }
                    }
                    #endregion
                    break;
            }
        }
        private void RemotePlayerlessResponses(SFSObject responseParams, string cmd)
        {
            switch (cmd)
            {
                case "GeneralEvent":
                    #region GeneralEvent
                    if (responseParams.ContainsKey("jg"))
                    {
                        if (PlayerState.IsWearingSuit())
                        {
                            var data = new SFSObject();
                            data.PutBool("suit", true);
                            sfs.Send(new ExtensionRequest("SyncPlayerData", data, sfs.LastJoinedRoom));
                        }
                        //SyncShipInstant();
                    }
                    #endregion
                    break;
            }
        }
        private void OnRoomJoin(BaseEvent evt)
        {
            // Remove SFS2X listeners and re-enable interface before moving to the main game scene
            sfs.RemoveAllEventListeners();

            // Go to main game scene
            Resume();
        }

        private void OnRoomJoinError(BaseEvent evt)
        {
            // Show error message
            ModHelper.Console.WriteLine("Room join failed: " + (string)evt.Params["errorMessage"]);
        }

        private void OnRoomVarsUpdate(BaseEvent evt)
        {
            if (RemoteObjects.CloneStorage.Count == 0) { return; }
            foreach (var variable in sfs.LastJoinedRoom.GetVariables())
            {
                if (variable.Name.Contains("objects"))
                {
                    int userID = int.Parse(variable.Name.Split(',')[1]);
                    if (sfs.MySelf.Id == userID) { continue; }

                    string[] objectNames = variable.GetSFSObjectValue().GetUtfStringArray("objectNames");

                    for (int i = 0; i < objectNames.Length; i++)
                    {
                        if (!RemoteObjects.CloneStorage.ContainsKey(objectNames[i]))
                        {
                            ModHelper.Console.WriteLine("Clone not spawned yet for: " + objectNames[i]);
                            continue;
                        }
                        SpawnRemoteObject(userID, objectNames[i]);
                    }
                }
            }

        }
        private void Resume()
        {
            // Simulate "resume game" button press.
            var resume = FindObjectOfType<TitleScreenManager>().GetValue<SubmitActionLoadScene>("_resumeGameAction");
            if (resume == null) { resume = FindObjectOfType<TitleScreenManager>().GetValue<SubmitActionLoadScene>("_newGameAction"); }
            resume.Invoke("ConfirmSubmit");

        }

    }
}