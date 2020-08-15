using OWML.ModHelper;
using OWML.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ModTemplate
{
    public class ModTemplate : ModBehaviour
    {
        private void Awake()
        {
            // You won't be able to access OWML's mod helper in Awake.
            // So you probably don't want to do anything here.
            // Use Start() instead.
        }

        private void Start()
        {
            // Starting here, you'll have access to OWML's mod helper.
            ModHelper.Console.WriteLine($"My mod {nameof(ModTemplate)} is loaded!", MessageType.Success);
        }
    }
}
