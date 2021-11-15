#
#  _____ _____ ____     _____ _____ ____  _____
# |   __|     |    \   |     |     |    \|   __|
# |  |  |  |  |  |  |  | | | |  |  |  |  |   __|
# |_____|_____|____/   |_|_|_|_____|____/|_____|
#  _____ _____ _____ _____ _____ __    _____
# |     |     |   | |   __|     |  |  |   __|
# |   --|  |  | | | |__   |  |  |  |__|   __|
# |_____|_____|_|___|_____|_____|_____|_____|
#
# SmartFoxServer2X Admin Console Scripts
#
# (c) 2012-2016 gotoAndPlay()
# @author Marco Lapi
#
# Version 2.x
#

# Python Imports
import types
import sys


#
# This global variable allows to lock the Console so that it can't be misused
#
__CONSOLE_LOCK = False

# Java Imports
import java
from com.smartfoxserver.v2.entities.data import *

__scripts = [
				{'name':'version()', 'doc':'Shows the Console extension version'},
				{'name':'reloadScripts()', 'doc':'Reload the dynamic server scripts'},
				{'name':'execute()', 'doc':'Launches the last loaded script again'},
				{'name':'files(path)', 'doc':'Shows the files at the specified path'},
				{'name':'controller(id)', 'doc':'Obtain one of the controllers from its id. 0=System, 1=Extension, 2=Smasher'},
				{'name':'zones()', 'doc':'List of active zones'}
			]

__shortcuts = [
				{'name':'ESC', 'doc':'Clears current command'},
				{'name':'UP ARROW', 'doc':'Previous command in history'},
				{'name':'DOWN ARROW', 'doc':'Next command in history'},
				{'name':'CTRL + SPACE', 'doc':'Show code hinting'},
				{'name':'CTRL + BACKSPACE', 'doc':'Clear console text'}
			]

grid = None

if sfs.isGrid():
	from com.smartfoxserver.grid import SFSGrid
	grid = SFSGrid.manager()
	_2XGlobals_['grid'] = grid


def help():
	"""Shows a list of useful global objects"""
	text = ""
	for (key, value) in _2XGlobals_.items():
		if value != None:
			cl = str(value.getClass())
			text += "<span class='text-highlight'>" + key + "</span>\t\t\t" + cl.split(".")[-1] + "\n"

	text += "\n<span class='text-highlight'>extras()</span>\t\tFor more custom function calls"
	text += "\n<span class='text-highlight'>shortcuts()</span>\tFor keyboard shortcuts details\n"
	return text

def shortcuts():
	"""Shows list of useful keyboard shortcuts"""
	return __showList__(__shortcuts)


def extras():
	"""Shows list of useful methods"""
	return __showList__(__scripts)




# -- == -- == -- == -- == -- == -- == -- == -- == -- == -- == -- == -- == -- == -- == -- == -- == -- == -- == -- == -- == -- == -- ==
# Useful methods
# (can be added dynamically)
# -- == -- == -- == -- == -- == -- == -- == -- == -- == -- == -- == -- == -- == -- == -- == -- == -- == -- == -- == -- == -- == -- ==

def version():
	return __parent__.VER

def controller(id):
	from java.lang import Byte
	bb = Byte(id)
	return eng.controllerManager.getControllerById(bb)

def reloadScripts():
	__parent__.init()
	return "<span class='text-highlight'>[[ Reload success! ]]</span>"

def files(path='.'):
	import os
	return os.listdir(path)

def zones():
	return zm.getZoneList()




# -- == -- == -- == -- == -- == -- == -- == -- == -- == -- == -- == -- == -- == -- == -- == -- == -- == -- == -- == -- == -- == -- ==
# Private methods
# -- == -- == -- == -- == -- == -- == -- == -- == -- == -- == -- == -- == -- == -- == -- == -- == -- == -- == -- == -- == -- == -- ==

def __showList__(someList):
	text = ""

	for item in someList:
		text += "<span class='text-highlight'>" + item['name'] + "</span>"
		text += ":" + __getSpacer__(item['name']) + item['doc'] + "\n"
	return text

def __hints__(obj, target):
	if obj == None:
		return

	#
	# Generate all hints excluding private members
	#
	hints = None

	try:
		hints = [item for item in dir(obj)]
	except:
		pass

	# No hints available
	if hints == None or len(hints) == 0:
		hints = []

	# Send hint list
	from com.smartfoxserver.v2.entities.data import SFSObject

	sfso = SFSObject()
	sfso.putUtfStringArray('h', hints)

	return sfso

def __getSpacer__(inputStr):
	DEFAULT_SPACES = 25
	spacer = " "

	nSpaces = DEFAULT_SPACES - len(inputStr)
	if nSpaces > 0:
		spacer = " " * nSpaces

	return spacer
