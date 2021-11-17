using Sfs2X;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TMPro;
using UnityEngine;
using UnityEngine.UI;
using Gizmos = Popcron.Gizmos;
using UnityEngine.InputSystem;
using UnityEngine.EventSystems;
using System.Collections;
using Sfs2X.Core;
using Sfs2X.Entities;

namespace ModTemplate
{
    enum ChatMode
    {
        NA,
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
        private Dictionary<ChatMode, Text> chatBoxes = new Dictionary<ChatMode, Text>();



        private GameObject inputBox;
        private GameObject inputText;

        private GameObject nameField;

        private Text inputFieldText;
        private Text nameFieldText;

        private bool selected;

        public static ChatMode chatMode;
        private void Start()
        {

            chatMode = ChatMode.TimberHearth;

            inputBox = Instantiate(GameObject.Find("PlayerHUD/HelmetOnUI/UICanvas/SecondaryGroup/GForce/NumericalReadout/GravityText"), GameObject.Find("PlayerHUD/HelmetOnUI/UICanvas/SecondaryGroup/GForce/NumericalReadout").transform);

            inputText = Instantiate(GameObject.Find("PlayerHUD/HelmetOnUI/UICanvas/SecondaryGroup/GForce/NumericalReadout/GravityText"), inputBox.transform);
            nameField = Instantiate(GameObject.Find("PlayerHUD/HelmetOnUI/UICanvas/SecondaryGroup/GForce/NumericalReadout/GravityText"), inputBox.transform);

            Invoke("LateStart", 2f);

            int count = 0;
            foreach (ChatMode mode in Enum.GetValues(typeof(ChatMode)))
            {
                allowedChatModes.Add(mode, false);
                chatBoxes[mode] = Instantiate(GameObject.Find("PlayerHUD/HelmetOnUI/UICanvas/SecondaryGroup/GForce/NumericalReadout/GravityText"), GameObject.Find("PlayerHUD/HelmetOnUI/UICanvas/SecondaryGroup/GForce/NumericalReadout").transform).GetComponent<Text>();
                count++;
            }
            sfs.AddEventListener(Sfs2X.Core.SFSEvent.PUBLIC_MESSAGE, OnPublicMessage);


        }
        private void Update()
        {
            if (OWInput.GetInputMode() != InputMode.Character && OWInput.GetInputMode() != InputMode.Roasting && OWInput.GetInputMode() != InputMode.KeyboardInput) { return; }

            if (selected)
            {
                if (Keyboard.current.enterKey.wasPressedThisFrame)
                {
                    sfs.Send(new Sfs2X.Requests.PublicMessageRequest(chatMode.ToString() + "ʣ" + inputFieldText.text));
                    inputFieldText.text = "";
                }
                foreach (var key in Keyboard.current.allKeys)
                {
                    if (key.wasPressedThisFrame && key.displayName.Length == 1)
                    {
                        inputFieldText.text += key.displayName;
                        FormatText(inputFieldText);
                    }
                }
                if (Keyboard.current.backspaceKey.wasPressedThisFrame)
                {
                    inputFieldText.text = inputFieldText.text.Remove(inputFieldText.text.Length - 1);
                }
                if (Keyboard.current.spaceKey.wasPressedThisFrame)
                {
                    inputFieldText.text += " ";
                }
                if (Keyboard.current.tabKey.wasPressedThisFrame)
                {
                    chatBoxes[chatMode].gameObject.SetActive(false);
                    IterateChatMode();
                    nameFieldText.text = chatMode.ToString() + " (" + sfs.MySelf.Name + "):";
                    chatBoxes[chatMode].gameObject.SetActive(true);
                }
            }

            if (Keyboard.current.enterKey.wasPressedThisFrame && !selected)
            {
                OWInput.ChangeInputMode(InputMode.KeyboardInput);
                foreach (var chatText in chatBoxes.Values)
                {
                    chatText.color = Color.white;
                }
                selected = true;

            }
            if (Keyboard.current.escapeKey.wasPressedThisFrame && selected)
            {
                OWInput.ChangeInputMode(InputMode.Character);              
                foreach (var chatText in chatBoxes.Values)
                {
                    chatText.color = new Color(1, 1, 1, 0.5f);
                }
                selected = false;
            }
        }
        private void IterateChatMode()
        {
            chatMode++;
            if (((int)chatMode) == 16)
            {
                chatMode = 0;
            }
            if (!allowedChatModes[chatMode]) { IterateChatMode(); }
        }
        private IEnumerator GetAllowedChatModes()
        {
            while (true)
            {
                foreach (var astroObject in FindObjectsOfType<AstroObject>())
                {
                    ChatMode astroChatMode = GetChatModeFromAstroObjectName(astroObject.GetAstroObjectName().ToString());
                    if (Mathf.Abs(Vector3.Distance(Locator.GetPlayerTransform().position, astroObject.transform.position)) < 520)
                    {
                        allowedChatModes[astroChatMode] = true;
                    }
                    else
                    {
                        allowedChatModes[astroChatMode] = false;
                        if (chatMode == astroChatMode)
                        {
                            IterateChatMode();
                        }
                    }
                }                
                foreach (var campfire in FindObjectsOfType<Campfire>())
                {
                    ChatMode astroChatMode = ChatMode.Campfire;
                    if (Mathf.Abs(Vector3.Distance(Locator.GetPlayerTransform().position, campfire.transform.position)) < 5)
                    {
                        allowedChatModes[astroChatMode] = true;
                    }
                    else
                    {
                        allowedChatModes[astroChatMode] = false;
                        if (chatMode == astroChatMode)
                        {
                            IterateChatMode();
                        }
                    }
                }
                if (PlayerState.InDreamWorld())
                {
                    allowedChatModes[ChatMode.DreamWorld] = true;
                }    
                if (PlayerState.InBrambleDimension())
                {
                    allowedChatModes[ChatMode.DarkBramble] = true;
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
                    if (Enum.TryParse(astroObjectName, out tempChatMode))
                    {
                        return tempChatMode;
                    }
                    return ChatMode.NA;
            }
        }
        private void LateStart()
        {
            StartCoroutine(GetAllowedChatModes());

            inputFieldText = inputText.GetComponent<Text>();
            inputFieldText.horizontalOverflow = HorizontalWrapMode.Overflow;
            inputFieldText.verticalOverflow = VerticalWrapMode.Overflow;
            inputFieldText.alignByGeometry = false;
            inputFieldText.alignment = TextAnchor.LowerLeft;
            inputFieldText.text = "";

            nameField.transform.localPosition += new Vector3(-0.15f, 0, 0);
            nameFieldText = nameField.GetComponent<Text>();
            nameFieldText.horizontalOverflow = HorizontalWrapMode.Overflow;
            nameFieldText.verticalOverflow = VerticalWrapMode.Overflow;
            nameFieldText.alignByGeometry = false;
            nameFieldText.alignment = TextAnchor.UpperRight;
            nameFieldText.text = chatMode.ToString() + " (" + sfs.MySelf.Name + "):";

            inputBox.transform.position += new Vector3(1, -0.15f, 0);
            foreach (var chatBoxText in chatBoxes.Values)
            {
                chatBoxText.transform.position += new Vector3(1, -0.1f, 0);
                chatBoxText.horizontalOverflow = HorizontalWrapMode.Overflow;
                chatBoxText.verticalOverflow = VerticalWrapMode.Overflow;
                chatBoxText.alignByGeometry = false;
                chatBoxText.alignment = TextAnchor.LowerLeft;
                chatBoxText.text = "";
            }

            Destroy(inputBox.GetComponent<Text>());
        }

        private void FormatText(Text text)
        {
            if (text.text.Length == 20) { text.text = text.text.Insert(19, Environment.NewLine); ; }
        }
        private string FormatTextFirstTime(string text)
        {
            if (text.Length < 21) { return text; }
            for (int i = 21; i < text.Length; i += 20)
            {
                text = text.Insert(i, Environment.NewLine);
            }
            return text;
        }

        private void OnPublicMessage(BaseEvent evt)
        {
            User sender = (User)evt.Params["sender"];
            string[] message = ((string)evt.Params["message"]).Split('ʣ');
            ChatMode chatmode = (ChatMode)Enum.Parse(typeof(ChatMode), message[0]);
            ConnectionController.ModHelperInstance.Console.WriteLine(chatmode.ToString());
            chatBoxes[chatMode].text += FormatTextFirstTime("\n" + sender.Name + ": " + message[1]);
        }
    }
}
