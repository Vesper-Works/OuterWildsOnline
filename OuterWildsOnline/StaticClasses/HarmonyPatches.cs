using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using HarmonyLib;
using OuterWildsOnline;
using UnityEngine;

namespace OuterWildsOnline.StaticClasses
{
    [HarmonyPatch]
    internal static class HarmonyPatches
    {
        public static void init()
        {
            Harmony.CreateAndPatchAll(Assembly.GetExecutingAssembly());
        }
        [HarmonyPrefix]
        [HarmonyPatch(typeof(PauseMenuManager), nameof(PauseMenuManager.OnExitToMainMenu))]
        public static void OnExitToMainMenuPatch()
        {
            ConnectionController.Instance.StartCoroutine(ConnectionController.Instance.Disconnect(0.1f));
        }

        [HarmonyPrefix]
        [HarmonyPatch(typeof(PauseMenuManager), nameof(PauseMenuManager.TryOpenPauseMenu))]
        public static void TryOpenPauseMenuPatch()
        {
            if (MonoBehaviour.FindObjectOfType<PauseMenuManager>()._isPaused)
            {
                OWTime.Unpause(OWTime.PauseType.Menu);
            }
        }

        [HarmonyPrefix]
        [HarmonyPatch(typeof(TextTranslation), nameof(TextTranslation._Translate))]
        public static bool _TranslatePatch(TextTranslation __instance, ref string __result, string key)
        {
            if (__instance.m_table == null)
            {
                ConnectionController.Console.WriteLine("TextTranslation not initialized");
                __result = key;
                return false;
            }
            string text = __instance.m_table.Get(key);
            if (text == null)
            {
                //Debug.LogError("String \"" + key + "\" not found in table for language " + TextTranslation.s_langFolder[(int)__instance.m_language]);
                __result = key;
                return false;
            }
            text = text.Replace("\\\\n", "\n");
            if (__instance.m_language == TextTranslation.Language.KOREAN)
            {
                text = text.Replace(" ", "\u3000");
            }
            __result = text;
            return false;
        }
        [HarmonyPostfix]
        [HarmonyPatch(typeof(CharacterDialogueTree), nameof(CharacterDialogueTree.DisplayDialogueBox2))]
        public static void DisplayDialogueBox2(CharacterDialogueTree __instance)
        {
            ConnectionController.Console.WriteLine(__instance.gameObject.name);
            if (Guid.TryParse(__instance.gameObject.name, out Guid result))
            {
                MessageHandler.Instance.PlayerMessageOpened(result.ToString());
            }
        }
    }
}
