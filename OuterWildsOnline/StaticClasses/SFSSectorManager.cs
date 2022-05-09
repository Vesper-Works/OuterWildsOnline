using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnityEngine;

namespace OuterWildsOnline
{
    static class SFSSectorManager
    {
        public static Dictionary<string, Sector> Sectors = new Dictionary<string, Sector>();

        public static Sector ClosestSectorToPlayer { get => closestSectorToPlayer; }
        public static string ClosestSectorToPlayerID { get => closestSectorToPlayerID; }

        private static Sector closestSectorToPlayer;
        private static string closestSectorToPlayerID;
        public static void RefreshSectors()
        {
            if (UnityEngine.Object.FindObjectsOfType<Sector>().Length == 0) { ConnectionController.ModHelperInstance.Console.WriteLine("No Sectors Found"); return; }
            Sector[] sectorsFound = UnityEngine.Object.FindObjectsOfType<Sector>();
            sectorsFound.OrderBy(sector => sector.GetName());
            sectorsFound.OrderBy(sector => sector.GetName() == Sector.Name.DreamWorld || sector.GetName() == Sector.Name.Vessel || sector.GetName() == Sector.Name.VesselDimension || sector.GetName() == Sector.Name.InvisiblePlanet);

            for (int i = 0; i < sectorsFound.Length; i++)
            {
                if (sectorsFound[i].transform.parent == null || Sectors.ContainsKey(sectorsFound[i].transform.parent.gameObject.name))
                {
                    Sectors[i.ToString()] = sectorsFound[i];
                }
                else
                {
                    Sectors[sectorsFound[i].transform.parent.gameObject.name] = sectorsFound[i];
                }

            }
        }

        public static void FindClosestSectorToPlayer()
        {
            float closestDistance = float.MaxValue;
            float currentDistance;

            foreach (var sector in SFSSectorManager.Sectors)
            {
                if (sector.Value == null)
                    continue;

                if (!Locator.GetPlayerSectorDetector().IsWithinSector(sector.Value.GetName()) || sector.Value.GetName() == Sector.Name.Ship) { continue; }

                currentDistance = Vector3.Distance(sector.Value.transform.position, Locator.GetPlayerTransform().position);

                if (Locator.GetPlayerController()._lastGroundBody == sector.Value.GetOWRigidbody())
                {
                    currentDistance /= 2;
                }

                if (currentDistance < closestDistance)
                {
                    closestDistance = currentDistance;
                    closestSectorToPlayer = sector.Value;
                    closestSectorToPlayerID = sector.Key;
                }
            }
            if(closestDistance > 2000)
            {
                GlobalMessenger.FireEvent("PlayerFarFromSector");
            }
            else
            {
                GlobalMessenger.FireEvent("PlayerCloseToSector");
            }
        }
    }
}
