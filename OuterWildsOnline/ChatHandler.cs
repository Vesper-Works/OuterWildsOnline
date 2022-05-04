using Sfs2X;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TMPro;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.InputSystem;
using UnityEngine.EventSystems;
using System.Collections;
using Sfs2X.Core;
using Sfs2X.Entities;

namespace OuterWildsOnline
{
    enum ChatMode
    {
        NA,
        Universe,
        TimberHearth,
        BrittleHollow,
        GiantsDeep,
        DarkBramble,
        TheInterloper,
        QuantumMoon,
        TheStranger,
        TheAttlerock,
        HollowsLantern,
        Eye,
        HourglassTwins,
        SunStation,
        DreamWorld,
        WhiteHoleStation,
        Campfire
    }
    class ChatHandler : MonoBehaviour
    {
        private SmartFox sfs { get => ConnectionController.Connection; }

        private Dictionary<ChatMode, bool> allowedChatModes = new Dictionary<ChatMode, bool>();
        private Dictionary<ChatMode, Text> helmetChatBoxes = new Dictionary<ChatMode, Text>();
        private Dictionary<ChatMode, Text> helmetlessChatBoxes = new Dictionary<ChatMode, Text>();

        private bool NoChatsAvailable { get => !allowedChatModes.ContainsValue(true); }
        private Text currentInputField { get => PlayerState.IsWearingSuit() ? helmetInputFieldText : helmetlessInputField; }

        private GameObject helmetInputBox;
        private GameObject helmetInputText;

        private GameObject helmetlessChatParent;

        private Text helmetlessInputField;
        private Text helmetlessNameField;

        private GameObject helmetNameField;

        private Text helmetInputFieldText;
        private Text helmetNameFieldText;

        private NotificationData shipAloneInSpace;

        private bool selected;

        private ScreenPrompt exitChatPrompt;
        private ScreenPrompt enterChatPrompt;

        private InputMode lastInputMode;

        public static ChatMode chatMode;
        private void Start()
        {
            shipAloneInSpace = new NotificationData(NotificationTarget.Ship, "Alone in space", 5f, true);

            enterChatPrompt = new ScreenPrompt("ENTER to start chatting");
            exitChatPrompt = new ScreenPrompt("ESC to stop chatting");

            Locator.GetPromptManager().AddScreenPrompt(enterChatPrompt, PromptPosition.UpperRight, true);

            chatMode = ChatMode.TimberHearth;

            helmetInputBox = Instantiate(GameObject.Find("PlayerHUD/HelmetOnUI/UICanvas/SecondaryGroup/GForce/NumericalReadout/GravityText"), GameObject.Find("PlayerHUD/HelmetOnUI/UICanvas/SecondaryGroup/GForce/NumericalReadout").transform);

            helmetInputText = Instantiate(GameObject.Find("PlayerHUD/HelmetOnUI/UICanvas/SecondaryGroup/GForce/NumericalReadout/GravityText"), helmetInputBox.transform);
            helmetNameField = Instantiate(GameObject.Find("PlayerHUD/HelmetOnUI/UICanvas/SecondaryGroup/GForce/NumericalReadout/GravityText"), helmetInputBox.transform);

            helmetlessChatParent = new GameObject("HelmetlessChatCanvas");
            var helmetlessCanvas = helmetlessChatParent.AddComponent<Canvas>();
            helmetlessCanvas.transform.SetParent(GameObject.Find("PlayerHUD/HelmetOffUI").transform);
            helmetlessCanvas.renderMode = RenderMode.ScreenSpaceOverlay;
            helmetlessCanvas.worldCamera = Locator.GetPlayerCamera().mainCamera;
            helmetlessCanvas.sortingOrder = 0;
            helmetlessCanvas.transform.localPosition = Vector3.forward;
            helmetlessCanvas.gameObject.AddComponent<CanvasScaler>().uiScaleMode = CanvasScaler.ScaleMode.ScaleWithScreenSize;

            helmetlessInputField = new GameObject("HelmetlessInputField").AddComponent<Text>();
            helmetlessInputField.transform.SetParent(helmetlessCanvas.transform, false);

            helmetlessNameField = new GameObject("HelmetlessNameField").AddComponent<Text>();
            helmetlessNameField.transform.SetParent(helmetlessCanvas.transform, false);

            GlobalMessenger.AddListener("PutOnHelmet", new Callback(OnPutOnHelmet));
            GlobalMessenger.AddListener("RemoveHelmet", new Callback(OnRemoveHelmet));

            foreach (ChatMode mode in Enum.GetValues(typeof(ChatMode)))
            {
                allowedChatModes[mode] = false;
                helmetChatBoxes[mode] = Instantiate(GameObject.Find("PlayerHUD/HelmetOnUI/UICanvas/SecondaryGroup/GForce/NumericalReadout/GravityText"), GameObject.Find("PlayerHUD/HelmetOnUI/UICanvas/SecondaryGroup/GForce/NumericalReadout").transform).GetComponent<Text>();
                helmetlessChatBoxes[mode] = new GameObject("HelmetlessChatBox").AddComponent<Text>();
            }
            allowedChatModes[ChatMode.Universe] = true;
            sfs.AddEventListener(Sfs2X.Core.SFSEvent.PUBLIC_MESSAGE, OnPublicMessage);


            SetUpTexts();

        }

        private void SetUpTexts()
        {
            helmetInputFieldText = helmetInputText.GetComponent<Text>();
            helmetInputFieldText.horizontalOverflow = HorizontalWrapMode.Overflow;
            helmetInputFieldText.verticalOverflow = VerticalWrapMode.Overflow;
            helmetInputFieldText.alignByGeometry = false;
            helmetInputFieldText.alignment = TextAnchor.LowerLeft;
            Destroy(helmetInputText.GetComponent<LocalizedText>());
            helmetInputFieldText.text = "";

            helmetNameField.transform.localPosition += new Vector3(-0.15f, 0, 0);
            helmetNameFieldText = helmetNameField.GetComponent<Text>();
            helmetNameFieldText.horizontalOverflow = HorizontalWrapMode.Overflow;
            helmetNameFieldText.verticalOverflow = VerticalWrapMode.Overflow;
            helmetNameFieldText.alignByGeometry = false;
            helmetNameFieldText.alignment = TextAnchor.UpperRight;
            Destroy(helmetNameField.GetComponent<LocalizedText>());
            helmetNameFieldText.text = chatMode.ToString() + " (" + sfs.MySelf.Name + "):";

            helmetInputBox.transform.position += new Vector3(1, -0.15f, 0);

            helmetlessInputField.horizontalOverflow = HorizontalWrapMode.Overflow;
            helmetlessInputField.verticalOverflow = VerticalWrapMode.Overflow;
            helmetlessInputField.alignByGeometry = false;
            helmetlessInputField.alignment = TextAnchor.LowerLeft;
            helmetlessInputField.text = "";
            helmetlessInputField.font = FindObjectOfType<DialogueBoxVer2>().GetComponentInChildren<Text>().font;
            helmetlessInputField.fontSize = 10;
            helmetlessInputField.transform.localPosition = new Vector3(210f, -105f, 0);


            helmetlessNameField = helmetlessNameField.GetComponent<Text>();
            helmetlessNameField.horizontalOverflow = HorizontalWrapMode.Overflow;
            helmetlessNameField.verticalOverflow = VerticalWrapMode.Overflow;
            helmetlessNameField.alignByGeometry = false;
            helmetlessNameField.alignment = TextAnchor.LowerRight;
            helmetlessNameField.text = chatMode.ToString() + " (" + sfs.MySelf.Name + "):";
            helmetlessNameField.font = FindObjectOfType<DialogueBoxVer2>().GetComponentInChildren<Text>().font;
            helmetlessNameField.fontSize = 10;
            helmetlessNameField.transform.localPosition = new Vector3(105f, -105f, 0);

            foreach (var chatBoxText in helmetChatBoxes.Values)
            {
                Destroy(chatBoxText.gameObject.GetComponent<LocalizedText>());
                chatBoxText.transform.position += new Vector3(1, -0.1f, 0);
                chatBoxText.horizontalOverflow = HorizontalWrapMode.Overflow;
                chatBoxText.verticalOverflow = VerticalWrapMode.Overflow;
                chatBoxText.alignByGeometry = false;
                chatBoxText.alignment = TextAnchor.LowerLeft;
                chatBoxText.text = "";
                chatBoxText.gameObject.SetActive(false);
            }
            foreach (var chatBoxText in helmetlessChatBoxes.Values)
            {
                chatBoxText.transform.localPosition = new Vector3(210f, -90f, 0);
                chatBoxText.transform.SetParent(GameObject.Find("PlayerHUD/HelmetOffUI/HelmetlessChatCanvas").transform);
                chatBoxText.horizontalOverflow = HorizontalWrapMode.Overflow;
                chatBoxText.verticalOverflow = VerticalWrapMode.Overflow;
                chatBoxText.alignByGeometry = false;
                chatBoxText.alignment = TextAnchor.LowerLeft;
                chatBoxText.font = FindObjectOfType<DialogueBoxVer2>().GetComponentInChildren<Text>().font;
                chatBoxText.fontSize = 10;
                chatBoxText.text = "";
                chatBoxText.gameObject.SetActive(false);
            }
            helmetlessChatBoxes[ChatMode.TimberHearth].gameObject.SetActive(true);
            helmetChatBoxes[ChatMode.TimberHearth].gameObject.SetActive(true);
            StartCoroutine(GetAllowedChatModes());

            Destroy(helmetInputBox.GetComponent<Text>());

            ChatNoOpacity();
        }

        private IEnumerator FadeOutChatAfterDisuse()
        {
            yield return new WaitForSecondsRealtime(5f);
            FadeChatOut(1);
        }
        private void FadeChatOut(float duration)
        {
            foreach (var item in helmetlessChatParent.GetComponentsInChildren<Text>())
            {
                item.CrossFadeAlpha(0, duration, false);
            }
            foreach (var item in helmetInputBox.GetComponentsInChildren<Text>())
            {
                item.CrossFadeAlpha(0, duration, false);
            }
            foreach (var item in helmetChatBoxes.Values)
            {
                item.CrossFadeAlpha(0, duration, false);
            }
        }
        private void ChatFullOpacity()
        {
            foreach (var item in helmetlessChatParent.GetComponentsInChildren<Text>())
            {
                item.CrossFadeAlpha(1, 0, false);
            }
            foreach (var item in helmetInputBox.GetComponentsInChildren<Text>())
            {
                item.CrossFadeAlpha(1, 0, false);
            }
            foreach (var item in helmetChatBoxes.Values)
            {
                item.CrossFadeAlpha(1, 0, false);
            }
        }
        private void ChatNoOpacity()
        {
            foreach (var item in helmetlessChatParent.GetComponentsInChildren<Text>())
            {
                item.CrossFadeAlpha(0, 0, false);
            }
            foreach (var item in helmetInputBox.GetComponentsInChildren<Text>())
            {
                item.CrossFadeAlpha(0, 0, false);
            }
            foreach (var item in helmetChatBoxes.Values)
            {
                item.CrossFadeAlpha(0, 0, false);
            }
        }

        private void OnPutOnHelmet()
        {
            if (helmetlessChatParent != null)
            {
                helmetlessChatParent.gameObject.SetActive(false);
            }
        }
        private void OnRemoveHelmet()
        {
            if(helmetlessChatParent != null)
            {
                helmetlessChatParent.gameObject.SetActive(true);
            }
        }

        private void Update()
        {
            if (OWInput.GetInputMode() != InputMode.Character &&
                OWInput.GetInputMode() != InputMode.Roasting &&
                OWInput.GetInputMode() != InputMode.KeyboardInput &&
                OWInput.GetInputMode() != InputMode.ShipCockpit) { return; }

            if (selected && chatMode != ChatMode.NA)
            {
                if (Keyboard.current.enterKey.wasPressedThisFrame)
                {
                    if (currentInputField.text.Trim(' ') == "") { return; }
                    sfs.Send(new Sfs2X.Requests.PublicMessageRequest(chatMode.ToString() + "ʣ" + currentInputField.text));
                    currentInputField.text = "";
                }
                foreach (var key in Keyboard.current.allKeys)
                {
                    if (key.wasPressedThisFrame && key.displayName.Length == 1)
                    {
                        if (Keyboard.current.shiftKey.isPressed)
                        {
                            if (Keyboard.current.digit1Key.wasPressedThisFrame)
                            {
                                currentInputField.text += "!";
                            }
                            if (Keyboard.current.slashKey.wasPressedThisFrame)
                            {
                                currentInputField.text += "?";
                            }
                            else
                            {
                                currentInputField.text += key.displayName.ToUpper();
                            }
                        }
                        else
                        {
                            currentInputField.text += key.displayName.ToLower();
                        }
                        FormatText(currentInputField);
                    }
                }
                if (Keyboard.current.backspaceKey.wasPressedThisFrame)
                {
                    currentInputField.text = currentInputField.text.Remove(currentInputField.text.Length - 1);
                    StartCoroutine(DeleteCharacters(0.75f));
                }
                if (Keyboard.current.spaceKey.wasPressedThisFrame)
                {
                    currentInputField.text += " ";
                }
            }
            if (selected)
            {
                if (Keyboard.current.tabKey.wasPressedThisFrame)
                {
                    UpdateOpenChat();
                }
            }
            if (Keyboard.current.enterKey.wasPressedThisFrame && !selected)
            {
                lastInputMode = OWInput.GetInputMode();
                OWInput.ChangeInputMode(InputMode.KeyboardInput);
                Locator.GetPauseCommandListener().AddPauseCommandLock();
                selected = true;
                Locator.GetPromptManager().AddScreenPrompt(exitChatPrompt, PromptPosition.UpperRight, true);
                Locator.GetPromptManager().RemoveScreenPrompt(enterChatPrompt);
                StopCoroutine(FadeOutChatAfterDisuse());
                ChatFullOpacity();
            }
            if (Keyboard.current.escapeKey.wasPressedThisFrame && selected)
            {
                
                OWInput.ChangeInputMode(lastInputMode);
                if (PlayerState.UsingShipComputer()) { OWInput.ChangeInputMode(InputMode.ShipComputer); }
                selected = false;
                Locator.GetPromptManager().AddScreenPrompt(enterChatPrompt, PromptPosition.UpperRight, true);
                Locator.GetPromptManager().RemoveScreenPrompt(exitChatPrompt);
                StopCoroutine(FadeOutChatAfterDisuse());
                StartCoroutine(FadeOutChatAfterDisuse());
                Locator.GetPauseCommandListener().RemovePauseCommandLock();
            }
        }

        private IEnumerator DeleteCharacters(float delay)
        {
            yield return new WaitForSeconds(delay);

            while (Keyboard.current.backspaceKey.isPressed)
            {
                currentInputField.text = currentInputField.text.Remove(currentInputField.text.Length - 1);
                yield return new WaitForSeconds(0.1f);
            }
        }

        private void UpdateOpenChat()
        {
            if (NoChatsAvailable)
            {
                currentInputField.text = "Alone in space";
                if (PlayerState.AtFlightConsole())
                {
                    NotificationManager.SharedInstance.PostNotification(shipAloneInSpace, true);
                }
            }
            else
            {
                helmetChatBoxes[chatMode].gameObject.SetActive(false);
                helmetlessChatBoxes[chatMode].gameObject.SetActive(false);
                NotificationManager.SharedInstance.UnpinNotification(shipAloneInSpace);
                IterateChatMode();
                helmetNameFieldText.text = chatMode.ToString() + " (" + sfs.MySelf.Name + "):";
                helmetlessNameField.text = chatMode.ToString() + " (" + sfs.MySelf.Name + "):";
                helmetChatBoxes[chatMode].gameObject.SetActive(true);
                helmetlessChatBoxes[chatMode].gameObject.SetActive(true);
            }
        }

        private void IterateChatMode()
        {
            if (NoChatsAvailable) { return; }
            chatMode++;
            if (((int)chatMode) == 17)
            {
                chatMode = 0;
            }
            if (!allowedChatModes[chatMode]) { IterateChatMode(); }
        }
        private IEnumerator GetAllowedChatModes()
        {
            var astroObjects = FindObjectsOfType<AstroObject>();
            while (true)
            {
                foreach (var astroObject in astroObjects)
                {
                    ChatMode astroChatMode = GetChatModeFromAstroObjectName(astroObject.GetAstroObjectName().ToString());
                    if (PlayerState.InBrambleDimension() || PlayerState.InDreamWorld()) { break; }
                    if (Vector3.Distance(Locator.GetPlayerTransform().position, astroObject.transform.position) < 600)
                    {
                        if (allowedChatModes[astroChatMode] == false && astroChatMode != ChatMode.NA)
                        {
                            if (PlayerState.AtFlightConsole())
                            {
                                var data = new NotificationData(NotificationTarget.Ship, "Arrived at: " + astroChatMode.ToString(), 4f, true);
                                NotificationManager.SharedInstance.PostNotification(data, false);
                            }
                            else
                            {
                                var data = new NotificationData(NotificationTarget.Player, "Arrived at: " + astroChatMode.ToString(), 4f, true);
                                NotificationManager.SharedInstance.PostNotification(data, false);
                            }

                        }
                        bool onlyChat = NoChatsAvailable;
                        allowedChatModes[astroChatMode] = true;
                        if (onlyChat)
                        {
                            UpdateOpenChat();
                        }
                    }
                    else
                    {
                        allowedChatModes[astroChatMode] = false;
                        if (chatMode == astroChatMode)
                        {
                            UpdateOpenChat();
                        }
                    }
                }
                //foreach (var campfire in FindObjectsOfType<Campfire>())
                //{
                //    ChatMode astroChatMode = ChatMode.Campfire;
                //    if (Mathf.Abs(Vector3.Distance(Locator.GetPlayerTransform().position, campfire.transform.position)) < 5)
                //    {
                //        allowedChatModes[astroChatMode] = true;
                //    }
                //    else
                //    {
                //        allowedChatModes[astroChatMode] = false;
                //        if (chatMode == astroChatMode)
                //        {
                //            IterateChatMode();
                //        }
                //    }
                //}
                if (PlayerState.InDreamWorld())
                {
                    allowedChatModes[ChatMode.DreamWorld] = true;
                }
                else
                {
                    allowedChatModes[ChatMode.DreamWorld] = false;
                }
                if (PlayerState.InBrambleDimension())
                {
                    allowedChatModes[ChatMode.DarkBramble] = true;
                }
                else
                {
                    allowedChatModes[ChatMode.DarkBramble] = false;
                }

                yield return new WaitForSeconds(2f);
            }
        }
        private ChatMode GetChatModeFromAstroObjectName(string astroObjectName)
        {
            switch (astroObjectName)
            {
                case "Comet":
                    return ChatMode.TheInterloper;
                case "RingWorld":
                    return ChatMode.TheStranger;
                case "TimberMoon":
                    return ChatMode.TheAttlerock;
                case "VolcanicMoon":
                    return ChatMode.HollowsLantern;
                case "WhiteHole":
                    return ChatMode.WhiteHoleStation;
                default:
                    ChatMode tempChatMode;
                    return Enum.TryParse(astroObjectName, out tempChatMode) ? tempChatMode : ChatMode.NA;
            }
        }

        private void FormatText(Text text)
        {
            if (text.text.Length % 40 == 0) { text.text += Environment.NewLine; }
        }
        private string FormatTextFirstTime(string text)
        {
            var numOfLines = Mathf.FloorToInt(text.Length / 40);

            for (int i = 1; i < numOfLines; i++)
            {
                text = text.Insert(i * 40, Environment.NewLine);
            }
            return text;
        }

        private void OnPublicMessage(BaseEvent evt)
        {
            User sender = (User)evt.Params["sender"];
            string[] message = ((string)evt.Params["message"]).Split('ʣ');
            ChatMode recievedChatMode = (ChatMode)Enum.Parse(typeof(ChatMode), message[0]);
            helmetChatBoxes[recievedChatMode].text += "\n" + sender.Name + ": " + message[1];
            helmetlessChatBoxes[recievedChatMode].text += "\n" + sender.Name + ": " + message[1];
            ChatFullOpacity();
            if (!selected)
            {
                ChatFullOpacity();
                StopCoroutine(FadeOutChatAfterDisuse());
                StartCoroutine(FadeOutChatAfterDisuse());
            }
        }
    }
}
