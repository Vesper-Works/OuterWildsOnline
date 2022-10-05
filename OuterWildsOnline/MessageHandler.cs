using OuterWildsOnline.StaticClasses;
using Sfs2X.Entities.Data;
using Sfs2X.Entities.Variables;
using Sfs2X.Requests;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnityEngine;

namespace OuterWildsOnline
{
    public class MessageHandler : MonoBehaviour
    {
        bool placing = false;
        bool writing = false;
        int currentPage = 0;
        string appraisalCount
        {
            get
            {
                if (currentPlayerMessageRoomVariable == null)
                {
                    return "";
                }
                else
                {
                    return "Appraisals: " + Instance.currentPlayerMessageRoomVariable.GetSFSObjectValue().GetInt("apr").ToString();
                }
            }
        }
        RoomVariable currentPlayerMessageRoomVariable;
        GameObject currentMessageGameObject;
        Transform ghost;
        DialogueBoxVer2 dialog;
        List<string> pages = new List<string>() { "" };
        ScreenPrompt startPlacingPrompt = new ScreenPrompt(InputLibrary.interactSecondary, "Start Placing Message");
        ScreenPrompt startWritingPrompt = new ScreenPrompt(InputLibrary.lockOn, "Start Writing");
        ScreenPrompt stopWritingPrompt = new ScreenPrompt(InputLibrary.enter, "Finish And Place Message");
        ScreenPrompt nextPagePrompt = new ScreenPrompt(InputLibrary.right2, "Next Page");
        ScreenPrompt previousPagePrompt = new ScreenPrompt(InputLibrary.left2, "Previous Page");
        ScreenPrompt cancelMessagePrompt = new ScreenPrompt(InputLibrary.escape, "Cancel");
        ScreenPrompt appraisePrompt = new ScreenPrompt(InputLibrary.up2, "Appraise");
        ScreenPrompt hidePrompt = new ScreenPrompt(InputLibrary.down2, "Hide");
        ScreenPrompt appraiseUnavailablePrompt = new ScreenPrompt("Already Appraised");
        ScreenPrompt appraisalCountPrompt;
        LayerMask placementLayerMask = OWLayerMask.physicalMask;
        public static MessageHandler Instance { get; private set; }
        private void Start()
        {
            Instance = this;
            GlobalMessenger.AddListener("SuitUp", new Callback(this.OnSuitUp));
            GlobalMessenger.AddListener("RemoveSuit", new Callback(this.OnRemoveSuit));
            GlobalMessenger.AddListener("ExitConversation", new Callback(this.OnConversationEnded));

        }
        private void OnDestroy()
        {
            Locator.GetPromptManager().RemoveScreenPrompt(startPlacingPrompt);
            Locator.GetPromptManager().RemoveScreenPrompt(startWritingPrompt);
            Locator.GetPromptManager().RemoveScreenPrompt(stopWritingPrompt);
            Locator.GetPromptManager().RemoveScreenPrompt(nextPagePrompt);
            Locator.GetPromptManager().RemoveScreenPrompt(previousPagePrompt);
            Locator.GetPromptManager().RemoveScreenPrompt(cancelMessagePrompt);
            Locator.GetPromptManager().RemoveScreenPrompt(appraisePrompt);
            Locator.GetPromptManager().RemoveScreenPrompt(hidePrompt);
            Locator.GetPromptManager().RemoveScreenPrompt(appraiseUnavailablePrompt);
            Locator.GetPromptManager().RemoveScreenPrompt(appraisalCountPrompt);
            GlobalMessenger.RemoveListener("SuitUp", new Callback(this.OnSuitUp));
            GlobalMessenger.RemoveListener("RemoveSuit", new Callback(this.OnRemoveSuit));
            GlobalMessenger.RemoveListener("ExitConversation", new Callback(this.OnConversationEnded));
        }
        public void PlayerMessageOpened(string roomVariableName, GameObject messageGameObject)
        {
            if (currentPlayerMessageRoomVariable != null && currentPlayerMessageRoomVariable.Name == roomVariableName) { return; }
            currentPlayerMessageRoomVariable = ConnectionController.Connection.LastJoinedRoom.GetVariable(roomVariableName);
            currentMessageGameObject = messageGameObject;
            if (currentPlayerMessageRoomVariable.GetSFSObjectValue().GetIntArray("aprlist").Contains(ConnectionController.Connection.MySelf.PlayerId))
            {
                Locator.GetPromptManager().AddScreenPrompt(appraiseUnavailablePrompt, PromptPosition.UpperRight, true);
            }
            else
            {
                Locator.GetPromptManager().AddScreenPrompt(appraisePrompt, PromptPosition.UpperRight, true);
            }
            Locator.GetPromptManager().AddScreenPrompt(hidePrompt, PromptPosition.UpperRight, true);
            appraisalCountPrompt = new ScreenPrompt(Instance.appraisalCount);
            Locator.GetPromptManager().AddScreenPrompt(appraisalCountPrompt, PromptPosition.UpperRight, true);
        }
        private void OnConversationEnded()
        {
            currentPlayerMessageRoomVariable = null;
            currentMessageGameObject = null;
            Locator.GetPromptManager().RemoveScreenPrompt(appraiseUnavailablePrompt);
            Locator.GetPromptManager().RemoveScreenPrompt(appraisePrompt);
            Locator.GetPromptManager().RemoveScreenPrompt(hidePrompt);
            Locator.GetPromptManager().RemoveScreenPrompt(appraisalCountPrompt);
        }
        private void OnSuitUp()
        {
            Locator.GetPromptManager().AddScreenPrompt(startPlacingPrompt, PromptPosition.UpperRight, true);
        }

        private void OnRemoveSuit()
        {
            Locator.GetPromptManager().RemoveScreenPrompt(startPlacingPrompt);
        }

        private void Update()
        {
            if (OWInput.IsNewlyPressed(appraisePrompt.GetInputCommandList()[0]) &&
                currentPlayerMessageRoomVariable != null &&
                !currentPlayerMessageRoomVariable.GetSFSObjectValue().GetIntArray("aprlist").Contains(ConnectionController.Connection.MySelf.PlayerId))
            {
                var variable = new SFSObject();
                currentPlayerMessageRoomVariable.GetSFSObjectValue().PutInt("apr", currentPlayerMessageRoomVariable.GetSFSObjectValue().GetInt("apr") + 1);
                currentPlayerMessageRoomVariable.GetSFSObjectValue().PutIntArray("aprlist", currentPlayerMessageRoomVariable.GetSFSObjectValue().GetIntArray("aprlist").Append(ConnectionController.Connection.MySelf.PlayerId).ToArray());
                variable.PutUtfString("name", currentPlayerMessageRoomVariable.Name);
                variable.PutSFSObject("data", currentPlayerMessageRoomVariable.GetSFSObjectValue());
                ConnectionController.Connection.Send(new ExtensionRequest("SetPersistantData", variable, ConnectionController.Connection.LastJoinedRoom)); Locator.GetPromptManager().AddScreenPrompt(appraiseUnavailablePrompt, PromptPosition.UpperRight, true);
                Locator.GetPromptManager().RemoveScreenPrompt(appraisalCountPrompt);
                appraisalCountPrompt = new ScreenPrompt(Instance.appraisalCount);
                Locator.GetPromptManager().AddScreenPrompt(appraisalCountPrompt, PromptPosition.UpperRight, true);

                Locator.GetPromptManager().RemoveScreenPrompt(appraisePrompt);
            }
            if (OWInput.IsNewlyPressed(hidePrompt.GetInputCommandList()[0]) &&
                currentPlayerMessageRoomVariable != null)
            {
                currentMessageGameObject.SetActive(false);
                currentMessageGameObject.GetComponent<CharacterDialogueTree>().EndConversation();       
            }
            if (OWInput.IsNewlyPressed(cancelMessagePrompt.GetInputCommandList()[0]) && (writing || placing))
            {
                Cancel();
                GlobalMessenger.FireEvent("FinishedMessage");
            }
            if (OWInput.IsNewlyPressed(startWritingPrompt.GetInputCommandList()[0]) && !writing && placing)
            {
                StartWriting();
            }
            if (OWInput.IsNewlyPressed(startPlacingPrompt.GetInputCommandList()[0]) &&
                !writing &&
                !placing &&
                PlayerState.IsWearingSuit() &&
                OWInput.GetInputMode() == InputMode.Character &&
                Physics.Raycast(Locator.GetPlayerCamera().transform.position, Locator.GetPlayerCamera().transform.forward, 10, placementLayerMask))
            {
                StartPlacing();
                GlobalMessenger.FireEvent("WritingMessage");
            }
            if (writing)
            {
                dialog._mainTextField.text = TextInputHandler.Instance.WrittenText;
                pages[currentPage] = TextInputHandler.Instance.WrittenText;
                if (OWInput.IsNewlyPressed(nextPagePrompt.GetInputCommandList()[0]))
                {
                    if (++currentPage == pages.Count)
                    {
                        if (pages[currentPage - 1] == "")
                        {
                            currentPage--;
                            return;
                        }
                        pages.Add("");
                        TextInputHandler.Instance.ClearText();
                    }
                    else
                    {
                        TextInputHandler.Instance.SetText(pages[currentPage]);
                    }

                }
                if (OWInput.IsNewlyPressed(previousPagePrompt.GetInputCommandList()[0]))
                {
                    if (--currentPage < 0)
                    {
                        currentPage = 0;
                        TextInputHandler.Instance.SetText(pages[currentPage]);
                    }
                    else
                    {
                        TextInputHandler.Instance.SetText(pages[currentPage]);
                    }
                }
                if (OWInput.IsNewlyPressed(stopWritingPrompt.GetInputCommandList()[0]))
                {
                    if (pages[currentPage].Trim() == "")
                    {
                        pages.RemoveAt(currentPage);
                    }
                    StopWriting();
                    GlobalMessenger.FireEvent("FinishedMessage");
                }
            }
            if (placing)
            {
                if (Physics.Raycast(Locator.GetPlayerCamera().transform.position, Locator.GetPlayerCamera().transform.forward, out RaycastHit hit, 10, placementLayerMask))
                {
                    ghost.SetParent(hit.collider.transform);
                    ghost.position = hit.point;
                    ghost.rotation = Quaternion.Euler(Quaternion.LookRotation(hit.normal).eulerAngles + new Vector3(90, 0, 0));
                }
            }

        }
        private void StartPlacing()
        {
            placing = true;
            GameObject ghostGameObject = Instantiate(RemoteObjects.CloneStorage["Message"]);
            ghostGameObject.SetActive(true);
            ghostGameObject.layer = LayerMask.NameToLayer("Default");
            ghost = ghostGameObject.transform;
            Utils.RemoveCollisionFromObjectRecursively(ghost);
            Utils.MakeObjectAcceptTransparencyRecursive(ghost);
            Utils.UpdateColourRecursive(new Color(0, 0, 0, 0.001f), ghost);
            Locator.GetPromptManager().AddScreenPrompt(startWritingPrompt, PromptPosition.UpperRight, true);
            Locator.GetPromptManager().AddScreenPrompt(cancelMessagePrompt, PromptPosition.UpperRight, true);
            Locator.GetPromptManager().RemoveScreenPrompt(startPlacingPrompt);
            Locator.GetPauseCommandListener().AddPauseCommandLock();
        }
        private void StartWriting()
        {
            Locator.GetToolModeSwapper().UnequipTool();
            GlobalMessenger.FireEvent("EnterConversation");
            Locator.GetFlashlight().TurnOff(false);
            dialog = GameObject.FindWithTag("DialogueGui").GetRequiredComponent<DialogueBoxVer2>();
            dialog.SetVisible(true);
            dialog.SetDialogueText("", new List<DialogueOption>());
            dialog.SetNameFieldVisible(false);
            writing = true;
            placing = false;
            TextInputHandler.Instance.BeginRecording(true);
            Locator.GetPromptManager().AddScreenPrompt(stopWritingPrompt, PromptPosition.UpperRight, true);
            Locator.GetPromptManager().AddScreenPrompt(nextPagePrompt, PromptPosition.UpperRight, true);
            Locator.GetPromptManager().AddScreenPrompt(previousPagePrompt, PromptPosition.UpperRight, true);
            Locator.GetPromptManager().RemoveScreenPrompt(startWritingPrompt);

        }
        private void StopWriting()
        {
            var variable = new SFSObject();
            var data = new SFSObject();

            if (ghost.ObjectOrParentsHaveComponent(out SyncObjects.ObjectToSendSync localObject))
            {
                data.PutUtfString("type", localObject.ObjectName);
                data.PutInt("objID", localObject.ObjectId);

                Vector3 pos = ghost.parent.InverseTransformPoint(ghost.position);
                data.PutFloat("posx", pos.x);
                data.PutFloat("posy", pos.y);
                data.PutFloat("posz", pos.z);

                var rot = ghost.parent.InverseTransformRotation(ghost.rotation).eulerAngles;
                data.PutFloat("rotx", rot.x);
                data.PutFloat("roty", rot.y);
                data.PutFloat("rotz", rot.z);
            }
            else
            {
                Vector3 pos = ghost.parent.InverseTransformPoint(ghost.position);
                data.PutFloat("posx", pos.x);
                data.PutFloat("posy", pos.y);
                data.PutFloat("posz", pos.z);

                var rot = ghost.parent.InverseTransformRotation(ghost.rotation).eulerAngles;
                data.PutFloat("rotx", rot.x);
                data.PutFloat("roty", rot.y);
                data.PutFloat("rotz", rot.z);
         
            }
            data.PutUtfString("path", TransformReferences.TransformPaths[ghost.parent]);
            data.PutUtfString("time", DateTime.Now.ToUniversalTime().Date.ToString("yyyy/MM/dd"));
            data.PutInt("apr", 1);
            data.PutUtfString("user", Utils.GetPlayerProfileName());
            data.PutUtfStringArray("mes", pages.ToArray());
            data.PutIntArray("aprlist", new int[] { ConnectionController.Connection.MySelf.PlayerId });

            variable.PutUtfString("name", Guid.NewGuid().ToString());
            variable.PutSFSObject("data", data);
            ConnectionController.Connection.Send(new ExtensionRequest("SetPersistantData", variable, ConnectionController.Connection.LastJoinedRoom));

            Locator.GetPlayerTransform().GetRequiredComponent<PlayerLockOnTargeting>().BreakLock();
            GlobalMessenger.FireEvent("ExitConversation");
            GameObject.FindWithTag("DialogueGui").GetRequiredComponent<DialogueBoxVer2>().OnEndDialogue();
            if (PlayerState.InZeroG())
            {
                Autopilot component = Locator.GetPlayerBody().GetComponent<Autopilot>();
                if (component.enabled)
                {
                    component.Abort();
                }
            }
            writing = false;
            placing = false;
            Destroy(ghost.gameObject);
            TextInputHandler.Instance.StopRecording();
            Locator.GetPromptManager().RemoveScreenPrompt(startWritingPrompt);
            Locator.GetPromptManager().RemoveScreenPrompt(stopWritingPrompt);
            Locator.GetPromptManager().RemoveScreenPrompt(nextPagePrompt);
            Locator.GetPromptManager().RemoveScreenPrompt(previousPagePrompt);
            Locator.GetPromptManager().RemoveScreenPrompt(cancelMessagePrompt);
            Locator.GetPromptManager().AddScreenPrompt(startPlacingPrompt, PromptPosition.UpperRight, true);
            Locator.GetPauseCommandListener().RemovePauseCommandLock();
            currentPage = 0;
            pages = new List<String>() { "" };
        }
        private void Cancel()
        {
            if (placing)
            {
                placing = false;
            }
            if (writing)
            {
                writing = false;
                Locator.GetPlayerTransform().GetRequiredComponent<PlayerLockOnTargeting>().BreakLock();
                GlobalMessenger.FireEvent("ExitConversation");
                GameObject.FindWithTag("DialogueGui").GetRequiredComponent<DialogueBoxVer2>().OnEndDialogue();
                if (PlayerState.InZeroG())
                {
                    Autopilot component = Locator.GetPlayerBody().GetComponent<Autopilot>();
                    if (component.enabled)
                    {
                        component.Abort();
                    }
                }
            }
            Destroy(ghost.gameObject);
            TextInputHandler.Instance.StopRecording();
            Locator.GetPromptManager().RemoveScreenPrompt(startWritingPrompt);
            Locator.GetPromptManager().RemoveScreenPrompt(stopWritingPrompt);
            Locator.GetPromptManager().RemoveScreenPrompt(nextPagePrompt);
            Locator.GetPromptManager().RemoveScreenPrompt(previousPagePrompt);
            Locator.GetPromptManager().RemoveScreenPrompt(cancelMessagePrompt);
            Locator.GetPromptManager().AddScreenPrompt(startPlacingPrompt, PromptPosition.UpperRight, true);
            Locator.GetPauseCommandListener().RemovePauseCommandLock();
            currentPage = 0;
            pages = new List<String>() { "" };
        }
    }
}
