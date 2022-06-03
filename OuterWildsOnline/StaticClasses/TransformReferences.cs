using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnityEngine;

namespace OuterWildsOnline.StaticClasses
{
    public static class TransformReferences
    {
        public static Dictionary<Transform, string> TransformPaths = new Dictionary<Transform, string>();

        public static void AddTransforms(Transform[] transforms)
        {
            for (int i = 0; i < transforms.Length; i++)
            {
                TransformPaths.Add(transforms[i], transforms[i].GetPath());
            }
        }
    }
}
