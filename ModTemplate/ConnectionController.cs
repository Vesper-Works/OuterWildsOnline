using OWML.ModHelper;
using OWML.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Sfs2X;
using Sfs2X.Core;
using Sfs2X.Util;
using Sfs2X.Entities.Data;
using OWML.ModHelper.Events;
using Sfs2X.Requests;
using Sfs2X.Requests.MMO;
using UnityEngine.SceneManagement;
using UnityEngine;
using Sfs2X.Entities;
using Sfs2X.Entities.Variables;
using System.Collections;

namespace ModTemplate
{
    public class ConnectionController : ModBehaviour
    {
        private SmartFox sfs;

        private Dictionary<User, GameObject> remotePlayers = new Dictionary<User, GameObject>();

        private Sector closestSectorToPlayer;
        private int closestSectorToPlayerID;

        private Vector3 lastPos;
        void Start()
        {
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
        }
        private void DoMainMenuStuff()
        {
            var button = ModHelper.Menus.MainMenu.NewExpeditionButton.Duplicate("CONNECT TO SERVER");
            button.OnClick += StartUpConnection;
        }
        private void OnCompleteSceneChange(OWScene oldScene, OWScene newScene)
        {
            if (newScene == OWScene.SolarSystem || newScene == OWScene.EyeOfTheUniverse)
            {
                LoadedGame();
            }
        }

        void FixedUpdate()
        {
            if (sfs != null)
            {
                sfs.ProcessEvents();

                  //On the server side the UserVariable event is captured and the coordinates are also passed to the MMOApi.SetUserPosition(...) method to update our position in the Room's map.
                  //This in turn will keep us in sync with all the other players within our Area of Interest (AoI).

                if (Locator.GetPlayerTransform() != null && closestSectorToPlayer != null)
                {
                    if (lastPos.ApproxEquals(Locator.GetPlayerTransform().position)) { return; }

                    lastPos = Locator.GetPlayerTransform().position;

                    Vector3 pos = closestSectorToPlayer.transform.InverseTransformPoint(Locator.GetPlayerTransform().position);
                    List<UserVariable> userVariables = new List<UserVariable>();
                    userVariables.Add(new SFSUserVariable("x", (double)pos.x));
                    userVariables.Add(new SFSUserVariable("y", (double)pos.y));
                    userVariables.Add(new SFSUserVariable("z", (double)pos.z));
                    userVariables.Add(new SFSUserVariable("rot", (double)Locator.GetPlayerTransform().rotation.eulerAngles.y));
                    userVariables.Add(new SFSUserVariable("sec", closestSectorToPlayerID));
                    sfs.Send(new SetUserVariablesRequest(userVariables));
                }
            }
        }
        IEnumerator GetClosestSector()
        {
            yield return new WaitForSeconds(2f);
            while (true)
            {
                int closestSectorID = -1;
                Sector closestSector = null;
                float closestDistance = float.MaxValue;
                float currentDistance;
               
                foreach (var sector in SFSSectorManager.Instance.Sectors)
                {
                    if (!Locator.GetPlayerSectorDetector().IsWithinSector(sector.Value.GetName())) { continue; } //If the player is in the sector
                    currentDistance = Vector3.Distance(sector.Value.transform.position, transform.position);
                    if (currentDistance < closestDistance)
                    {
                        closestDistance = currentDistance;
                        closestSector = sector.Value;
                        closestSectorID = sector.Key;
                    }
                }
                closestSectorToPlayer = closestSector;
                closestSectorToPlayerID = closestSectorID;
                yield return new WaitForSeconds(3f);
            }
        }
        private void SpawnRemotePlayer(SFSUser user, Vector3 vector3, Quaternion quaternion)
        {
            ModHelper.Console.WriteLine("Spawned: " + user);
            GameObject remotePlayer = new GameObject(user.Name);
            remotePlayer.AddComponent<SimpleRemoteInterpolation>();
            remotePlayer.AddComponent<MeshFilter>();
            remotePlayer.AddComponent<OWRenderer>();

            //closestSectorToPlayer = FindObjectOfType<Sector>();

            var light = remotePlayer.AddComponent<Light>();
            light.renderingLayerMask = FindObjectOfType<Light>().renderingLayerMask;

            light.type = LightType.Point;
            light.intensity = 5;
            light.range = 10;

            remotePlayer.transform.position = vector3;
            remotePlayer.transform.rotation = quaternion;
            remotePlayers.Add(user, remotePlayer);
        }
        private void RemoveRemotePlayer(SFSUser user)
        {
            ModHelper.Console.WriteLine("Removed: " + user);
            Destroy(remotePlayers[user]);
            remotePlayers.Remove(user);
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
                SpawnRemotePlayer(
                    (SFSUser)user,
                    new Vector3(user.AOIEntryPoint.FloatX, user.AOIEntryPoint.FloatY, user.AOIEntryPoint.FloatZ),
                    Quaternion.Euler(0, (float)user.GetVariable("rot").GetDoubleValue(), 0)
                );
            }

            // Handle removed users
            foreach (User user in removedUsers)
            {
                RemoveRemotePlayer((SFSUser)user);
            }
        }

        /**
         * When user variable is updated on any client within the AoI, then this event is received.
         * This is where most of the game logic for this example is contained.
         */
        public void OnUserVariableUpdate(BaseEvent evt)
        {

            List<string> changedVars = (List<string>)evt.Params["changedVars"];

            SFSUser user = (SFSUser)evt.Params["user"];
            if (user == sfs.MySelf) return;

            //ModHelper.Console.WriteLine("Updating " + user.Name + "'s variables");

            changedVars.Contains("x");
            changedVars.Contains("y");
            changedVars.Contains("z");
            changedVars.Contains("rot");

            // Check if the remote user changed his position or rotation
            if (changedVars.Contains("x") || changedVars.Contains("y") || changedVars.Contains("z") || changedVars.Contains("rot"))
            {
                if (remotePlayers.ContainsKey(user))
                {
                    // Move the character to a new position...
                    remotePlayers[user].GetComponent<SimpleRemoteInterpolation>().SetTransform(
                        new Vector3((float)user.GetVariable("x").GetDoubleValue(), 1, (float)user.GetVariable("z").GetDoubleValue()),
                        Quaternion.Euler(0, (float)user.GetVariable("rot").GetDoubleValue(), 0),
                        true,
                        user.GetVariable("sec").GetIntValue()
                    );
                }
            }
        }

        private void LoadedGame()
        {
            ModHelper.Console.WriteLine("Loaded game scene!");
            // Register callback delegates
            sfs.AddEventListener(SFSEvent.CONNECTION_LOST, OnConnectionLost);
            sfs.AddEventListener(SFSEvent.USER_VARIABLES_UPDATE, OnUserVariableUpdate);
            sfs.AddEventListener(SFSEvent.PROXIMITY_LIST_UPDATE, OnProximityListUpdate);
            StartCoroutine(GetClosestSector());
            gameObject.AddComponent<SFSSectorManager>();
        }

        private void StartUpConnection()
        {
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
            cfg.Host = "127.0.0.1";
            cfg.Port = 9933;
            cfg.Zone = "BasicExamples";

            // Connect to SFS2X
            sfs.Connect(cfg);
        }

        private void OnConnection(BaseEvent evt)
        {
            if ((bool)evt.Params["success"])
            {
                ModHelper.Console.WriteLine("Connected");

                // Send login request
                sfs.Send(new Sfs2X.Requests.LoginRequest(""));
            }
            else
                ModHelper.Console.WriteLine("Connection failed", MessageType.Error);
        }

        private void OnConnectionLost(BaseEvent evt)
        {
            sfs.RemoveAllEventListeners();
            ModHelper.Console.WriteLine("Disconnected");
        }

        private void OnLogin(BaseEvent evt)
        {
            string roomName = "UnityMMODemo";

            // We either create the Game Room or join it if it exists already
            if (sfs.RoomManager.ContainsRoom(roomName))
            {
                sfs.Send(new JoinRoomRequest(roomName));
            }
            else
            {
                MMORoomSettings settings = new MMORoomSettings(roomName);
                settings.DefaultAOI = new Vec3D(1000000f, 1000000f, 1000000f);
                //settings.MapLimits = new MapLimits(new Vec3D(-100f, 1f, -100f), new Vec3D(100f, 1f, 100f));
                settings.MaxUsers = 100;
                settings.Extension = new RoomExtension("OuterWildsMMO", "MainExtension");
                sfs.Send(new CreateRoomRequest(settings, true));
            }
        }

        private void OnLoginError(BaseEvent evt)
        {
            ModHelper.Console.WriteLine("Login error: " + (string)evt.Params["errorMessage"], MessageType.Error);
        }

        private void OnExtensionResponse(BaseEvent evt)
        {
            // Retrieve response object
            ISFSObject responseParams = (SFSObject)evt.Params["params"];

            ModHelper.Console.WriteLine("Result: " + responseParams.GetInt("res"));
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

        private void Resume()
        {
            // Simulate "resume game" button press.
            var resume = FindObjectOfType<TitleScreenManager>().GetValue<SubmitActionLoadScene>("_resumeGameAction");
            if (resume == null) { resume = FindObjectOfType<TitleScreenManager>().GetValue<SubmitActionLoadScene>("_newGameAction"); }
            resume.Invoke("ConfirmSubmit");

        }
    }
}
