using OWML.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OuterWildsOnline
{
    public static class Log
    {
        public static void Message(string message, MessageType messageType = MessageType.Message)
        {
            ConnectionController.Console.WriteLine(message, messageType);
        }
    }
}
