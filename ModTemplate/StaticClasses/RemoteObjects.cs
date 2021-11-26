using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnityEngine;

namespace OuterWildsOnline
{
    public static class RemoteObjects
    {
        public static Dictionary<string, Dictionary<int, GameObject>> ObjectTypes = new Dictionary<string, Dictionary<int, GameObject>>();
      
        public static Dictionary<string, GameObject> CloneStorage = new Dictionary<string, GameObject>();
        public static Dictionary<int, GameObject> Players { get => ObjectTypes["Player"]; }
        public static void AddNewObjectType(string objectTypeName)
        {
            ObjectTypes[objectTypeName] = new Dictionary<int, GameObject>();
        }
    }
}
