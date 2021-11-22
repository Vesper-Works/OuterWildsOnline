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

        public static Sector ClosestSectorToPlayer { get => closestSectorToPlayer; }
        public static int ClosestSectorToPlayerID { get => closestSectorToPlayerID; }

        private static Sector closestSectorToPlayer;
        private static int closestSectorToPlayerID;

        public static void RefreshSectors()
        {
            if (UnityEngine.Object.FindObjectsOfType<Sector>().Length == 0) { ConnectionController.ModHelperInstance.Console.WriteLine("NoSectorsFound"); return; }
            Sector[] sectorsFound = UnityEngine.Object.FindObjectsOfType<Sector>();
            for (int i = 0; i < sectorsFound.Length; i++)
            {
                Sectors[i] = sectorsFound[i];
            }
        }

        public static void FindClosestSectorToPlayer()
        {
            float closestDistance = float.MaxValue;
            float currentDistance;

            foreach (var sector in SFSSectorManager.Sectors)
            {
                if (!Locator.GetPlayerSectorDetector().IsWithinSector(sector.Value.GetName()) || sector.Value.GetName() == Sector.Name.Ship) { continue; }
                currentDistance = Vector3.Distance(sector.Value.transform.position, Locator.GetPlayerTransform().position);
                if (currentDistance < closestDistance)
                {
                    closestDistance = currentDistance;
                    closestSectorToPlayer = sector.Value;
                    closestSectorToPlayerID = sector.Key;
                }
            }
        }
    }
}
