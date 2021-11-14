using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnityEngine;

namespace ModTemplate
{
    class SFSSectorManager : MonoBehaviour
    {
        public static SFSSectorManager Instance { get; set; }

        public Dictionary<int, Sector> Sectors = new Dictionary<int, Sector>();

        private void Awake()
        {
            if(Instance == null)
            {
                Instance = this;
            }
            else
            {
                Destroy(this);
            }
        }

        private void Update()
        {
            if(Sectors.Count == 0)
            {
                if(FindObjectOfType<Sector>() == null) { return; }
         
                foreach (var sector in FindObjectsOfType<Sector>())
                {
                    Sectors[Sectors.Count] = sector;
                }
            }
        }
    }
}
