using Sfs2X.Core;
using Sfs2X.Entities.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnityEngine;

namespace OuterWildsOnline.SyncClasses
{
    public class GhostObjectToSync : MonoBehaviour
    {
        private string objectName;
        protected void Start()
        {
        }

        public void Init(string objectName)
        {
            this.objectName = objectName;
        }

       
    }
}
