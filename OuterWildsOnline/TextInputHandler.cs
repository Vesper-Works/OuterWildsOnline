using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnityEngine;
namespace OuterWildsOnline
{
    internal class TextInputHandler : MonoBehaviour
    {
        public string WrittenText { get; private set; }
        public static TextInputHandler Instance { get; private set;}
        private void Start()
        {          
            Instance = this;
        }
        private void OnTextInput(char character)
        {
            if (!char.IsControl(character))
            {
                WrittenText += character;
            }
        }
        private void Update()
        {            
            if (UnityEngine.InputSystem.Keyboard.current.backspaceKey.wasPressedThisFrame)
            {
                if(WrittenText.Length > 0)
                {
                    WrittenText = WrittenText.Remove(WrittenText.Length - 1);
                    StartCoroutine(DeleteCharacters(0.75f));
                }        
            }
        }
        private IEnumerator DeleteCharacters(float delay)
        {
            yield return new WaitForSeconds(delay);

            while (UnityEngine.InputSystem.Keyboard.current.backspaceKey.isPressed)
            {
                if (WrittenText.Length > 0)
                {
                    WrittenText = WrittenText.Remove(WrittenText.Length - 1);
                    yield return new WaitForSeconds(0.1f);
                }
            
            }
        }
        public void BeginRecording(bool clear)
        {
            if (clear)
            {
                WrittenText = "";
            }
            UnityEngine.InputSystem.Keyboard.current.onTextInput += OnTextInput;
        }
        public void StopRecording()
        {
            UnityEngine.InputSystem.Keyboard.current.onTextInput -= OnTextInput;
        }
        public void ClearText()
        {
            WrittenText = "";
        }
        public void SetText(string text)
        {
            WrittenText = text;
        }
    }
}
