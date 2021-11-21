using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnityEngine;

namespace ModTemplate
{
    static class SFSSectorManager
    {
        public static Dictionary<int, Sector> Sectors = new Dictionary<int, Sector>();
        public static void RefreshSectors()
        {
            if (UnityEngine.Object.FindObjectsOfType<Sector>().Length == 0) { ConnectionController.ModHelperInstance.Console.WriteLine("NoSectorsFound"); return; }
            Sector[] sectorsFound = UnityEngine.Object.FindObjectsOfType<Sector>();
            for (int i = 0; i < sectorsFound.Length; i++)
            {
                Sectors[i] = sectorsFound[i];
            }
        }
    }
}
