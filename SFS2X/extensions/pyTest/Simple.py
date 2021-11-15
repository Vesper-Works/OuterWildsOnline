from com.smartfoxserver.v2.core import *
from com.smartfoxserver.v2.exceptions import *
from com.smartfoxserver.v2.entities import *
from com.smartfoxserver.v2.entities.data import *
from com.smartfoxserver.bitswarm.sessions import *
from com.smartfoxserver.v2.api import *
from com.smartfoxserver.v2.util import *

from java.lang import Thread

class ServerEventListener(ISFSEventListener):
	def handleServerEvent(self, event):
		trace("Event: " + event.toString())

sfsEventListener = None
VERSION = "1.0.0"

def init():
	global sfsEventListener
	from java.io import *

	sfsEventListener = ServerEventListener()
	_base.addEventListener(SFSEventType.SERVER_READY, sfsEventListener)
	
	trace("Python extension started: ", _base, _sfsApi)
	trace("Version: ", VERSION)
	trace("Folder: ", _base.getCurrentFolder())

def destroy():
	_base.removeEventListener(SFSEventType.SERVER_READY, sfsEventListener)
	trace("Python extension destroyed: ", _base)
	
def handleClientRequest(cmd, sender, params):
	trace("Request: ", cmd, sender, params)
	
	if cmd == "hello":
		response = SFSObject()
		response.putUtfString("res", "Hello to you, " + sender.getName())	
		_base.send("hello", response, sender)
	
	
	