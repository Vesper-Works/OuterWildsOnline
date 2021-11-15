/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 *
 * See: http://ejohn.org/blog/simple-javascript-inheritance/
 */
 (function()
 {
  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

  // The base Class implementation (does nothing)
  this.Class = function(){};

  // Create a new Class that inherits from this class
  Class.extend = function(prop) {
    var _super = this.prototype;

    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;

    // Copy the properties over onto the new prototype
    for (var name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] == "function" &&
        typeof _super[name] == "function" && fnTest.test(prop[name]) ?
        (function(name, fn){
          return function() {
            var tmp = this._super;

            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[name];

            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            var ret = fn.apply(this, arguments);
            this._super = tmp;

            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }

    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if ( !initializing && this.init )
        this.init.apply(this, arguments);
    }

    // Populate our constructed prototype object
    Class.prototype = prototype;

    // Enforce the constructor to be what we expect
    Class.prototype.constructor = Class;

    // And make this class extendable
    Class.extend = arguments.callee;

    return Class;
  };
})();

//--- Import SFS2X names from Java scope ---------------------------------------

/**
 * <img src="java-icon.png"></img><br>
 * The <em>BanMode</em> enum lists all possible user banning modes.
 *
 * <p>Available <em>BanMode</em> values are:</p>
 * <ul>
 * <li><strong>BY_ADDRESS</strong>: ban by IP address</li>
 * <li><strong>BY_NAME</strong>: ban by user name</li>
 * </ul>
 *
 * <h5>Notes:</h5>
 * <ul>
 * <li>For members of the <em>BanMode</em> enum, please [refer to its Javadoc]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/managers/BanMode.html}.</li>
 * </ul>
 *
 * <h5>See also</h5>
 * <ul>
 * <li>{@link SFSApi#banUser} method</li>
 * </ul>
 *
 * @enum
 */
var BanMode = Java.type('com.smartfoxserver.v2.entities.managers.BanMode');

var MatchExpression = Java.type('com.smartfoxserver.v2.entities.match.MatchExpression');
var $$TimeUnit = Java.type('java.util.concurrent.TimeUnit');

//==============================================================================
//--- Main API class -----------------------------------------------------------
//==============================================================================

/**
 * <b>Developers never istantiate the <em>SFSApi</em> class</b>: this is done internally by the SmartFoxServer 2X API; get a reference to it using the Extension's {@link getApi} method.
 *
 * @class
 * The <em>SFSApi</em> class provides the central access to the main SmartFoxServer 2X server side API.
 * It contains all basic methods for interacting with the server: creating Rooms, joining them, logging in/out, handling messages, creating User/Room Variables and much more.
 *
 * <p>In addition to this API, a number of other specialized APIs provide the following features:</p>
 * <ul>
 * <li>Game API: quick games, challenges, invitations, etc</li>
 * <li>Buyddy List API: managing buddy lists</li>
 * <li>MMO API: MMORoom creation, MMOItems, positioning, Area of Interest, etc</li>
 * <li>File API: access to files and directories</li>
 * </ul>
 *
 * <h4>See also</h4>
 * <ul>
 * <li>{@link BuddyApi} class</li>
 * <li>{@link GameApi} class</li>
 * <li>{@link MMOApi} class</li>
 * <li>{@link FileApi} class</li>
 * </ul>
 */
SFSApi = function()
{
	this._javaApi = $$WrapperExt.getApi();
	this._sfs = $$SfsInstance;
}

//--- Inner members: HttpRequest -----------------------------------------------

/**
 * The <em>HttpMode</em> enum lists the POST and GET request modes.
 *
 * <h5>See:</h5>
 * <ul>
 * <li>{@link SFSApi.HttpRequest} class</li>
 * </ul>
 *
 * @enum
 */
SFSApi.HttpMode = {
	/**
	 * HTTP request mode is POST.
	 * @type {string}
	 */
	POST: "post",

	/**
	 * HTTP request mode is GET.
	 * @type {string}
	 */
	GET: "get"
};

/**
 * Creates a new <em>HttpRequest</em> instance.
 *
 * <p>Using the {@link SFSApi#newHttpGetRequest} or {@link SFSApi#newHttpPostRequest} factory methods instead of this constructor is recommended. See the methods description for usage examples.</p>
 *
 * @param	{string} url					The address of the HTTP server to make the request to.
 * @param	{object} params					An object containing the parameters to send to the HTTP server.
 * @param	{SFSApi.HttpMode} mode			The HTTP request mode (GET or POST).
 * @param	{httpCallbackFn} httpCallbackFn	The callback function that will process the response sent by the HTTP server.
 *
 * @class
 * The <em>HttpRequest</em> class represents a request to be sent to an external HTTP/HTTPS server.
 *
 * <p>HTTP/S requests can be of type POST or GET. They are useful to retrieve data from or send data to external services.</p>
 *
 * <h4>See also</h4>
 * <ul>
 * <li>{@link SFSApi#newHttpGetRequest} method</li>
 * <li>{@link SFSApi#newHttpPostRequest} method</li>
 * </ul>
 */
SFSApi.HttpRequest = function(url, params, mode, httpCallbackFn)
{
	var PostRequest = Java.type('com.smartfoxserver.v2.util.http.PostRequest');
	var GetRequest = Java.type('com.smartfoxserver.v2.util.http.GetRequest');

	this._url = url;
	this._params = this._processParams(params);
	this._client = null;
	this._callback = httpCallbackFn;

	// If no "mode", use POST as default
	if (mode == null)
		this._client = new PostRequest(this._url, this._params);

	else
	{
		mode = mode.toLowerCase();

		if (mode == SFSApi.HttpMode.POST)
			this._client = new PostRequest(this._url, this._params);

		else if (mode == SFSApi.HttpMode.GET)
			this._client = new GetRequest(this._url, this._params);

		else
			throw new java.lang.IllegalArgumentException("Invalid HTTP mode: " + mode + ". Must be either 'get' or 'post'");
	}
}

/**
 * This callback function is called when the Extension receives the response to an HTTP request sent using the {@link SFSApi.HttpRequest#execute} method.
 *
 * @callback httpCallbackFn
 *
 * @param	{object} result	An object providing the result of the HTTP request.<br>
 *                        	The object contains the following parameters:
 *                        	<ul>
 *                        	<li>statusCode (number) - The status code of the request</li>
 *                        	<li>html (string) - The content of the response (it could be HTML, JSON, XML, etc)</li>
 *                        	<li>error (string - The error message (if the request failed)</li>
 *                        	</ul>
 */

/**
 * Sets the HTTP request timeout seconds.
 *
 * @param	{number} value	The number of seconds after which the HTTP request will be considered failed.
 */
SFSApi.HttpRequest.prototype.setConnectionTimeoutSeconds = function(value)
{
	this._client.setConnectionTimeoutSeconds(value);
}

/**
 * Gets the HTTP request timeout seconds.
 *
 * @return {number} The number of seconds after which the HTTP request will be considered failed.
 */
SFSApi.HttpRequest.prototype.getConnectionTimeoutSeconds = function()
{
	return this._client.getConnectionTimeoutSeconds(value);
}

/**
 * Executes the HTTP request and calls the {@link httpCallbackFn} callback function passed to the constructor.
 */
SFSApi.HttpRequest.prototype.execute = function()
{
	function __dispatch__(resObj, context)
	{
		var exLock = $$WrapperExt.getExtensionLock();

		try
		{
			// Lock if necessary
			if ($$WrapperExt.isThreadSafe())
				exLock.lock();

			context._callback(resObj);
		}

		finally
		{
			// Release lock
			if ($$WrapperExt.isThreadSafe())
				exLock.unlock();
		}

	}

	var runner = function()
	{
		var resObj;

		try
		{
			var httpRes = this._client.execute();

			resObj = {};
			resObj.html = org.apache.http.util.EntityUtils.toString(httpRes.getEntity());
			resObj.statusCode = httpRes.getStatusLine().getStatusCode();
		}
		catch(ex)
		{
			resObj = { error: ex.getMessage() };
		}

		__dispatch__(resObj, this);
	};

	var context = this;
	var wrapper = function()
	{
		runner.apply(context, []);
	};

	// Delegate to SFSWorker:Ext
	$$SfsInstance.getEventManager().getThreadPool().execute( wrapper );
};

/**
 * @private
 */
SFSApi.HttpRequest.prototype._processParams = function(params)
{
	var list = new java.util.ArrayList();

	for (var key in params)
	{
		list.add( new org.apache.http.message.BasicNameValuePair(key, params[key]) );
	}

	return list;
}

/**
 * Creates a new <em>TaskScheduler</em> instance.
 *
 * <p>Using the {@link SFSApi#newScheduler} factory method instead of this constructor is recommended. See the method description for a usage example.</p>
 *
 * @param	{number} threadPoolSize	The number of threads backing the scheduler (recommended value between 1 and 4).
 *
 * @class
 * The <em>TaskScheduler</em> class allows to manage multiple delayed or repeating activities.
 *
 * <p>In games, a delayed scheduled task can be useful to set the duration of a match, or set a time limit to a user action, etc.
 * An interval-based task instead can be used to spawn new NPC enemies on a time basis, or divide the game in rounds, etc.</p>
 *
 * <h4>Notes</h4>
 * <ul>
 * <li>In general it is recommended to use one TaskScheduler per application/Zone. If this needs to be accessed in different parts of the code, a reference should be mantained in a Zone-level Extension and accessed from any other Extension(s) attached to Rooms in the same Zone.</li>
 * <li>It is advisable to avoid spawning very large thread pools, unless there are specific reasons for doing so. A setting of 1-4 threads is usually sufficient to handle any number of concurrent delayed events. The only exception to this is when the tasks to be executed are long-running such as accessing a database, a remote web-service or HTTP server, etc.</li>
 * <li>Any runtime exception will stop the execution of the task, so it is strongly recommended to always add a try/catch block to prevent this from happening.</li>
 * </ul>
 *
 * <h4>See also</h4>
 * <ul>
 * <li>{@link SFSApi#newScheduler} method</li>
 * </ul>
 */
SFSApi.TaskScheduler = function(threadPoolSize)
{
	this._sched = new com.smartfoxserver.v2.util.TaskScheduler(threadPoolSize);
}

/**
 * Destroys the <em>TaskScheduler</em> instance and all the tasks that are currently running.
 */
SFSApi.TaskScheduler.prototype.destroy = function()
{
	this._sched.destroy(null);
}

/**
 * Returns the size of the thread pool handling the tasks.
 *
 * @return {number} The number of threads backing the scheduler.
 */
SFSApi.TaskScheduler.prototype.getThreadPoolSize = function()
{
	return this._sched.getThreadPoolSize();
}

/**
 * Schedules a new task to be executed in the future, once.
 *
 * @param	{function} runnerFn	The function to be executed after the provided time delay has passed.
 * @param	{number} delay		The amount of time before the runner function is executed.
 * @param	{object} [context]	An object representing the scope of the runner function (also known as the "this" object).
 *
 * @return {ScheduledFuture} A reference to the <em>ScheduledFuture</em> Java class representing the scheduled task; it is useful to keep a reference to this object, in case the task execution needs to be cancelled later.
 *
 * @throws An <em>IllegalArgumentException</em> Java exception if the delay is lower than or equal to 0.
 */
SFSApi.TaskScheduler.prototype.schedule = function(runnerFn, delay, context)
{
	if (delay == null || delay <= 0)
		throw new java.lang.IllegalArgumentException("Scheduled task delay must be > 0");

	var targetFn = runnerFn;

	// If a context is passed wrap and call using the provided context
	if (context != null)
	{
		targetFn = function()
		{
			var exLock = $$WrapperExt.getExtensionLock();

			try
			{
				// Lock if necessary
				if ($$WrapperExt.isThreadSafe())
					exLock.lock();

				runnerFn.apply(context, []);
			}

			finally
			{
				// Release lock
				if ($$WrapperExt.isThreadSafe())
					exLock.unlock();
			}
		};
	}

	return this._sched.schedule(targetFn, delay, $$TimeUnit.MILLISECONDS);
}

/**
 * Schedules a new task to be executed periodically.
 *
 * @param	{function} runnerFn	The function to be executed at each interval.
 * @param	{number} interval	The interval at which the runner function should be executed.
 * @param	{number} [delay=0]	The initial amount of time before the runner function is executed for the first time.
 * @param	{object} [context]	An object representing the scope of the runner function (also known as the "this" object).
 *
 * @return {ScheduledFuture} A reference to the <em>ScheduledFuture</em> Java class representing the scheduled task; it is useful to keep a reference to this object, in case the task execution needs to be cancelled later.
 *
 * @throws An <em>IllegalArgumentException</em> Java exception if the interval is lower than or equal to 0.
 */
SFSApi.TaskScheduler.prototype.scheduleAtFixedRate = function(runnerFn, interval, delay, context)
{
	if (interval == null || interval <= 0)
		throw new java.lang.IllegalArgumentException("Scheduled task fixed interval must be > 0")

	if (delay == null)
		delay = 0;

	var targetFn = runnerFn;

	// If a context is passed wrap and call using the provided context
	if (context != null)
	{
		targetFn = function()
		{
			var exLock = $$WrapperExt.getExtensionLock();

			try
			{
				// Lock if necessary
				if ($$WrapperExt.isThreadSafe())
					exLock.lock();

				runnerFn.apply(context, []);
			}

			finally
			{
				// Release lock
				if ($$WrapperExt.isThreadSafe())
					exLock.unlock();
			}
		};
	}

	return this._sched.scheduleAtFixedRate(targetFn, delay, interval, $$TimeUnit.MILLISECONDS);
}

//--- Public methods -----------------------------------------------------------

/**
 * Returns a reference to the <img src="java-icon-small.png"></img> [SFSZone]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSZone.html} object corresponding to the passed Zone name.
 *
 * @param	{string} zoneName	The name of the <em>SFSZone</em> object to be retrieved.
 *
 * @return {SFSZone} A reference to a <img src="java-icon-small.png"></img> [SFSZone]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSZone.html} class instance.
 */
SFSApi.prototype.getZoneByName = function(zoneName)
{
	return this._sfs.getZoneManager().getZoneByName(zoneName);
}

/**
 * Creates and returns a new <em>TaskScheduler</em> instance.
 *
 * <p>This is a factory method to create a {@link SFSApi.TaskScheduler} instance.</p>
 *
 * <h5>See also:</h5>
 * <ul>
 * <li>{@link SFSApi.TaskScheduler} class</li>
 * </ul>
 *
 * @param	{number} [threadPoolSize=1]	The number of threads backing the scheduler (recommended value between 1 and 4).
 *
 * @example
 * <caption>In this example we create a dummy task in the Extension's <em>init</em> method; the task runs every 3 seconds and prints how many times it was executed. A try/catch block makes sure that the execution never stops, even if an error occurs in the task.</caption>
 * var stepCount = 0;
 * var scheduler;
 * var taskHandle;
 *
 * // Initialize the Extension
 * function init()
 * {
 * 	// Initialize the scheduler and schedule the task
 * 	scheduler = getApi().newScheduler();
 * 	taskHandle = scheduler.scheduleAtFixedRate(runner, 3000);
 * }
 *
 * // Destroy the Extension
 * function destroy()
 * {
 * 	if (taskHandle != null)
 * 		taskHandle.cancel(true);
 * }
 *
 * function runner()
 * {
 * 	try
 * 	{
 * 		stepCount++;
 * 		trace("I was called: ", stepCount, " times");
 * 	}
 * 	catch(err)
 * 	{
 * 		trace("An error occurred: ", err);
 * 	}
 * }
 *
 * @return {SFSApi.TaskScheduler} A new instance of the <em>TaskScheduler</em> class.
 */
SFSApi.prototype.newScheduler = function(threadPoolSize)
{
	if (threadPoolSize == null)
		threadPoolSize = 1;

	return new SFSApi.TaskScheduler(threadPoolSize);
}

/**
 * Creates and returns a new <em>HttpRequest</em> instance of type GET.
 *
 * <p>This is a factory method to create a {@link SFSApi.HttpRequest} instance.</p>
 *
 * <h5>See also:</h5>
 * <ul>
 * <li>{@link SFSApi.HttpRequest} class</li>
 * </ul>
 *
 * @param	{string} url					The address of the HTTP server to make the request to.
 * @param	{object} params					An object containing the parameters to send to the HTTP server.
 * @param	{httpCallbackFn} httpCallbackFn	The callback function that will process the response sent by the HTTP server.
 *
 * @example
 * <caption>In this example we make an HTTP request to a dummy URL, passing an "id" parameter. We then process the response in the callback function.</caption>
 * function sendHttpRequest()
 * {
 * 	var reqParams = { id: 25 };
 * 	var httpReq = getApi().newHttpGetRequest('http://some.host.com/', reqParams, httpCallback);
 * 	httpReq.execute();
 * }
 *
 * function httpCallback(result)
 * {
 * 	if (result.error)
 * 		trace("HTTP request failed: " + result.error);
 * 	else
 * 	{
 * 		trace("HTTP request successful: " + result.statusCode);
 * 		trace(result.html);
 * 	}
 * }
 *
 * @return {SFSApi.HttpRequest} A new instance of the <em>HttpRequest</em> class.
 */
SFSApi.prototype.newHttpGetRequest = function(url, params, httpCallbackFn)
{
	return new SFSApi.HttpRequest(url, params, SFSApi.HttpMode.GET, httpCallbackFn);
}

/**
 * Creates and returns a new <em>HttpRequest</em> instance of type POST.
 *
 * <p>This is a factory method to create a {@link SFSApi.HttpRequest} instance.</p>
 *
 * <h5>See also:</h5>
 * <ul>
 * <li>{@link SFSApi.HttpRequest} class</li>
 * </ul>
 *
 * @param	{string} url					The address of the HTTP server to make the request to.
 * @param	{object} params					An object containing the parameters to send to the HTTP server.
 * @param	{httpCallbackFn} httpCallbackFn	The callback function that will process the response sent by the HTTP server.
 *
 * @example
 * <caption>In this example we make an HTTP request to a dummy URL, passing an "id" parameter. We then process the response in the callback function.</caption>
 * function sendHttpRequest()
 * {
 * 	var reqParams = { id: 25 };
 * 	var httpReq = getApi().newHttpPostRequest('http://some.host.com/', reqParams, httpCallback);
 * 	httpReq.execute();
 * }
 *
 * function httpCallback(result)
 * {
 * 	if (result.error)
 * 		trace("HTTP request failed: " + result.error);
 * 	else
 * 	{
 * 		trace("HTTP request successful: " + result.statusCode);
 * 		trace(result.html);
 * 	}
 * }
 *
 * @return {SFSApi.HttpRequest} A new instance of the <em>HttpRequest</em> class.
 */
SFSApi.prototype.newHttpPostRequest = function(url, params, httpCallbackFn)
{
	return new SFSApi.HttpRequest(url, params, SFSApi.HttpMode.POST, httpCallbackFn);
}

/**
 * Checks the encrypted password sent by a user at login time against the one registered in the system (typically in the users database).
 *
 * @param	{Session} session		The client's <img src="java-icon-small.png"></img> [Session]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/bitswarm/sessions/Session.html} object, usually provided by the <img src="java-icon-small.png"></img> [SFSEventType.USER_LOGIN]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/core/SFSEventType.html#USER_LOGIN} event.
 * @param	{string} originalPass	The original, un-encrypted password.
 * @param	{string} encryptedPass	The encrypted password sent by the client.
 *
 * @return {boolean} <code>true</code> if the password is correct, <code>false</code> otherwise.
 */
SFSApi.prototype.checkSecurePassword = function(session, originalPass, encryptedPass)
{
	return this._javaApi.checkSecurePassword(session, originalPass, encryptedPass);
}

/*
 * Logs a client into a Zone, turning its <em>Session</em> object into a <em>SFSUser</em> object.
 *
 * @param	{Session} session		The client's <img src="java-icon-small.png"></img> [Session]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/bitswarm/sessions/Session.html} object, usually provided by the <img src="java-icon-small.png"></img> [SFSEventType.USER_LOGIN]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/core/SFSEventType.html#USER_LOGIN} event.
 * @param	{string} name			The user name.
 * @param	{string} pass			The user password.
 * @param	{string} zoneName		The name of the Zone to join.
 * @param	{SFSObject} params		A <em>SFSObject</em> containing the custom parameters to be sent back to the client, attached to the client-side <em>LOGIN</em> event.
 * @param	{boolean} forceLogout	If a user with the same name is already logged in the system and <code>true</code> is passed, that user will be disconnected before logging in the new user.
 *
 * @return {SFSUser} The <img src="java-icon-small.png"></img> [SFSUser]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSUser.html} object representing the logged-in user.
 */
/*
SFSApi.prototype.login = function(session, name, pass, zoneName, params, forceLogout)
{
	return this._javaApi.login(session, name, pass, zoneName, params, forceLogout)
}
*/

/**
 * Logs a user out of the current Zone.
 *
 * <p>This method can be useful to force a user leave the current Zone and join a new one.</p>
 *
 * @param	{SFSUser} user	The <img src="java-icon-small.png"></img> [SFSUser]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSUser.html} object representing the user to be logged out.
 */
SFSApi.prototype.logout = function(user)
{
	this._javaApi.logout(user);
}

/**
 * Creates a connection-less Non-Player Character (NPC).
 *
 * <p>The server handles NPCs just like any other regular user, although there is no real, physical connection to the server (in other words no TCP connection is established).<br>
 * NPCs can be recognized from the <em>isNpc</em> flag on the <em>SFSUser</em> object representing them, which is always set to <code>true</code>.</p>
 *
 * <h5>Notes:</h5>
 * <ul>
 * <li>NPCs must be created once the server engine is up and running. As the <em>init</em> method of the Extension runs before the engine is ready, you will need to wait for
 * the <img src="java-icon-small.png"></img> [SFSEventType.SERVER_READY]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/core/SFSEventType.html#SERVER_READY} event before being able to instantiate any NPC.</li>
 * </ul>
 *
 * @param	{string} userName		The name of the Non-Player Charachter.
 * @param	{SFSZone} zone			The <img src="java-icon-small.png"></img> [SFSZone]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSZone.html} object representing the Zone the NPC should be created into.
 * @param	{boolean} forceLogin	If a user with the same name is already logged in the system and <code>true</code> is passed, that user will be disconnected before creating the NPC.
 *
 * @return {SFSUser} The <img src="java-icon-small.png"></img> [SFSUser]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSUser.html} object representing the NPC.
 *
 * @throws A <img src="java-icon-small.png"></img> [SFSLoginException]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/exceptions/SFSLoginException.html} exception if an error occurs during the NPC creation.
 */
SFSApi.prototype.createNPC = function(userName, zone, forceLogin)
{
	return this._javaApi.createNPC(userName, zone, forceLogin);
}

/**
 * Kicks a user out of the server.
 *
 * <p>This operation allows to send a moderator message to the client, providing a number of seconds for reading it before the connection is closed.</p>
 *
 * @param	{SFSUser} userToKick	The <img src="java-icon-small.png"></img> [SFSUser]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSUser.html} object representing the user to be kicked out.
 * @param	{SFSUser} modUser		The <img src="java-icon-small.png"></img> [SFSUser]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSUser.html} object representing a moderator/administrator user executing the action; can be <code>null</code> to indicate the "Server" generically.
 * @param	{string} kickMessage	A message from the moderator/administrator to be displayed to the user right before kicking him.
 * @param	{number} delaySeconds	The delay in seconds before the disconnection is executed.
 */
SFSApi.prototype.kickUser = function(userToKick, modUser, kickMessage, delaySeconds)
{
	this._javaApi.kickUser(userToKick, modUser, kickMessage, delaySeconds);
}

/**
 * Bans a user, preventing his reconnection for a configurable amount of time.
 *
 * <p>This operation allows to send a moderator message to the client, providing a number of seconds for reading it before the connection is closed.<br>
 * The length of the banishment and the rules under which the ban can be removed are specified in the Zone configuration.</p>
 *
 * @param	{SFSUser} userToBan		The <img src="java-icon-small.png"></img> [SFSUser]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSUser.html} object representing the user to be banished.
 * @param	{SFSUser} modUser		The <img src="java-icon-small.png"></img> [SFSUser]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSUser.html} object representing a moderator/administrator user executing the action; can be <code>null</code> to indicate the "Server" generically.
 * @param	{string} banMessage		A message from the moderator/administrator to be displayed to the user right before banishing him.
 * @param	{BanMode} mode			A ban mode among those provided by the <em>BanMode</em> enum.
 * @param	{number} delaySeconds	The delay in seconds before the disconnection is executed.
 */
SFSApi.prototype.banUser = function(userToBan, modUser, banMessage, mode, durationMinutes, delaySeconds)
{
	this._javaApi.banUser(userToBan, modUser, banMessage, mode, durationMinutes, delaySeconds);
}

/**
 * Disconnect a user from the server.
 *
 * @param	{SFSUser} user							The <img src="java-icon-small.png"></img> [SFSUser]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSUser.html} object representing the user to be disconnected.
 * @param	{ClientDisconnectionReason} [reason]	One of the disconnection reasons provided in the <em>ClientDisconnectionReason</em> enum; the reason will be provided to the client in the client-side <em>CONNECTION_LOST</em> event.
 */
SFSApi.prototype.disconnectUser = function(user, reason)
{
	if (reason == null)
		this._javaApi.disconnectUser(user);
	else
		this._javaApi.disconnectUser(user, reason);
}

/**
 * Removes a <em>Session</em> object, disconnecting the user associated with it (if one exists).
 *
 * @param	{Session} session	The client's <img src="java-icon-small.png"></img> [Session]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/bitswarm/sessions/Session.html} object to be disconnected.
 */
SFSApi.prototype.disconnectSession = function(session)
{
	this._javaApi.disconnect(session);
}

/**
 * Creates a new Room.
 *
 * <p>This method can create both regular Rooms and MMO Rooms, depending on the passed settings object.</p>
 *
 * <h5>See also:</h5>
 * <ul>
 * <li>{@link CreateRoomSettings} class</li>
 * <li>{@link CreateMMORoomSettings} class</li>
 * <li>{@link GameApi#createGame} method</li>
 * </ul>
 *
 * @param	{SFSZone} zone										The <img src="java-icon-small.png"></img> [SFSZone]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSZone.html} object representing the Zone the Room should be created into.
 * @param	{CreateRoomSettings|CreateMMORoomSettings} settings	The Room configuration object.
 * @param	{SFSUser} [owner=null]								The <img src="java-icon-small.png"></img> [SFSUser]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSUser.html} object representing the owner of the Room; if <code>null</code> is passed, the "Server" will be the owner.
 * @param	{boolean} [joinIt=false]							If <code>true</code>, the Room will be joined by the owner right after the creation.
 * @param	{SFSRoom} [roomToLeave=null]						The <img src="java-icon-small.png"></img> [SFSRoom]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSRoom.html} object representing the Room to leave if the owner is supposed to join the new one; if <code>null</code> is passed, no previous Room will be left.
 * @param	{boolean} [fireClientEvent=false]					If <code>true</code>, a client-side <em>ROOM_ADD</em> event will be fired to notify the Room creation.
 * @param	{boolean} [fireServerEvent=false]					If <code>true</code>, a server-side event of type <img src="java-icon-small.png"></img> [SFSEventType.ROOM_ADDED]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/core/SFSEventType.html#ROOM_ADDED} will be fired to notify the Room creation.
 *
 * @example
 * <caption>In this simple example we create an hidden, private chat Room.<br>
 * In particular we also set a Room Variable and enable three specific events for the Room.</caption>
 * var crs = new CreateRoomSettings();
 * crs.setName("chat#371");
 * crs.setPassword("&12faGG");
 * crs.setGroupId("chats");
 * crs.setHidden(true);
 * crs.setMaxUsers(10);
 *
 * // Set Room Variable
 * crs.setRoomVariables([new SFSRoomVariable("topic", "Board Games")]);
 *
 * // Set Room permissions
 * crs.setRoomSettings(EnumSet.of(SFSRoomSettings.USER_ENTER_EVENT, SFSRoomSettings.USER_EXIT_EVENT, SFSRoomSettings.PUBLIC_MESSAGES));
 *
 * // Create the Room
 * getApi().createRoom(getParentZone(), crs, null, false, null, true, true);
 *
 * @example
 * <caption>In this example we create an MMORoom for the SpaceWar game.<br>
 * In particular we assign a Room Extension and configure the MMO-related features.</caption>
 * var crs = new CreateMMORoomSettings();
 * crs.setName("Sol");
 * crs.setMaxUsers(10000);
 * crs.setMaxSpectators(0);
 * crs.setGame(true);
 *
 * // Set Room permissions
 * crs.setRoomSettings(EnumSet.of(SFSRoomSettings.USER_ENTER_EVENT, SFSRoomSettings.USER_EXIT_EVENT, SFSRoomSettings.USER_COUNT_CHANGE_EVENT, SFSRoomSettings.USER_VARIABLES_UPDATE_EVENT));
 *
 * // Set the Extension attached to the Room
 * crs.setExtension(new CreateRoomSettings.RoomExtensionSettings("SpaceWar", "sfs2x.extensions.games.spacewar.SpaceWarRoomExtension"));
 *
 * // Set MMORoom features
 * crs.setDefaultAOI(Vectors.newVec3D(900, 750));
 * crs.setUserMaxLimboSeconds(30);
 * crs.setProximityListUpdateMillis(20);
 * crs.setSendAOIEntryPoint(false);
 *
 * // Create the Room
 * getApi().createRoom(getParentZone(), crs, null, false, null, true, true);
 *
 * @return {SFSRoom} The <img src="java-icon-small.png"></img> [SFSRoom]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSRoom.html} object representing the Room just created.
 *
 * @throws A <img src="java-icon-small.png"></img> [SFSCreateRoomException]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/exceptions/SFSCreateRoomException.html} exception if an error occurs during the Room creation.
 */
SFSApi.prototype.createRoom = function(zone, settings, owner, joinIt, roomToLeave, fireClientEvent, fireServerEvent)
{
	return this._javaApi.createRoom(zone, settings, owner, joinIt, roomToLeave, fireClientEvent, fireServerEvent);
}

/**
 * Find one or more users in a list of users matching the conditions set in a Match Expression.
 *
 * @param	{SFSUser[]} userList			An array of <img src="java-icon-small.png"></img> [SFSUser]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSUser.html} objects to search in.
 * @param	{MatchExpression} expression	The Match Expression setting the conditions to match.
 * @param	{number} [limit=10]				When this limit is reached, the search is stopped; if set to <code>0</code>, all matching users are returned.
 *
 * @return {ArrayList} A <em>java.util.ArrayList</em> Java collection containing the list of matching <img src="java-icon-small.png"></img> [SFSUser]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSUser.html} objects. This can be treated like native JavaScript array.
 */
SFSApi.prototype.findUsers = function(userList, expression, limit)
{
	if (limit == null)
		limit = 10;

	// Convert native JS array
	if (userList instanceof Array)
		userList = $$Util.toList(userList);

	return this._javaApi.findUsers(userList, expression, limit);
}

/**
 * Find one or more Rooms in a list of Rooms matching the conditions set in a Match Expression.
 *
 * @param	{SFSRoom[]} roomList			An array of <img src="java-icon-small.png"></img> [SFSRoom]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSRoom.html} objects to search in.
 * @param	{MatchExpression} expression	The Match Expression setting the conditions to match.
 * @param	{number} [limit=10]				When this limit is reached, the search is stopped; if set to <code>0</code>, all matching Rooms are returned.
 *
 * @return {ArrayList} A <em>java.util.ArrayList</em> Java collection containing the list of matching <img src="java-icon-small.png"></img> [SFSRoom]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSRoom.html} objects. This can be treated like native JavaScript array.
 */
SFSApi.prototype.findRooms = function(roomList, expression, limit)
{
	if (limit == null)
		limit = 10;

	// Convert native JS array
	if (roomList instanceof Array)
		roomList = $$Util.toList(roomList);

	return this._javaApi.findRooms(roomList, expression, limit);
}

/**
 * Retrieves a <em>SFSUser</em> object from its <em>id</em> property.
 *
 * @param	{number} userId	The id of the user to be retrieved.
 *
 * @return {SFSUser} The <img src="java-icon-small.png"></img> [SFSUser]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSUser.html} object representing the requested user.
 */
SFSApi.prototype.getUserById = function(userId)
{
	return this._javaApi.getUserById(userId);
}

/**
 * Retrieves a <em>SFSUser</em> object in a Zone from its <em>name</em> property.
 *
 * @param	{SFSZone} zone	The <img src="java-icon-small.png"></img> [SFSZone]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSZone.html} object representing the Zone from which to retrieve the user.
 * @param	{string} name	The name of the user to be retrieved.
 *
 * @return {SFSUser} The <img src="java-icon-small.png"></img> [SFSUser]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSUser.html} object representing the requested user.
 */
SFSApi.prototype.getUserByName = function(zone, name)
{
	return zone.getUserByName(name);
}

/**
 * Retrieves a <em>SFSUser</em> object from its client session.
 *
 * @param	{Session} session		The <img src="java-icon-small.png"></img> [Session]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/bitswarm/sessions/Session.html} object of the user to be retrieved.
 *
 * @return {SFSUser} The <img src="java-icon-small.png"></img> [SFSUser]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSUser.html} object representing the requested user.
 */
SFSApi.prototype.getUserBySession = function(session)
{
	return this._javaApi.getUserBySession(session);
}

/**
 * Joins a user in a Room.
 *
 * @param	{SFSUser} user						The <img src="java-icon-small.png"></img> [SFSUser]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSUser.html} object representing the user to join in the Room.
 * @param	{SFSRoom} roomToJoin				The <img src="java-icon-small.png"></img> [SFSRoom]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSRoom.html} object representing the Room to make the user join.
 * @param	{string} [password=null]			The Room password, in case it is a private Room.
 * @param	{boolean} [asSpectator=false]		If <code>true</code>, the user will join the Room as a spectator.
 * @param	{SFSRoom} [roomToLeave=null]		The <img src="java-icon-small.png"></img> [SFSRoom]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSRoom.html} object representing the Room that the user must leave after joining the new one; if <code>null</code> is passed, no previous Room is left.
 * @param	{boolean} [fireClientEvent=false]	If <code>true</code>, the client-side <em>ROOM_JOIN</em> and <em>USER_ENTER_ROOM</em> events will be fired to notify the Room joining.
 * @param	{boolean} [fireServerEvent=false]	If <code>true</code>, a server-side event of type <img src="java-icon-small.png"></img> [SFSEventType.USER_JOIN_ROOM]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/core/SFSEventType.html#USER_JOIN_ROOM} will be fired to notify the Room joining.
 *
 * @example
 * <caption>In this example we retrieve a user by his name and join him in the "Lobby" Room available in the Extension's parent Zone.</caption>
 * // Get the target user and Room
 * var user = getApi().getUserbyName("bax");
 * var room = getParentZone().getRoomByName("Lobby");
 *
 * // Make the user join the Room
 * getApi().joinRoom(user, room);
 *
 * @throws A <img src="java-icon-small.png"></img> [SFSJoinRoomException]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/exceptions/SFSJoinRoomException.html} exception if an error occurs during the Room joining process.
 */
SFSApi.prototype.joinRoom = function(user, roomToJoin, password, asSpectator, roomToLeave, fireClientEvent, fireServerEvent)
{
	// Switch from JS undefined to Java null
	if (roomToLeave == undefined)
		roomToLeave = null;

	this._javaApi.joinRoom(user, roomToJoin, password, asSpectator, roomToLeave, fireClientEvent, fireServerEvent);
}

/**
 * Makes a user leave a Room he joined previously.
 *
 * @param	{SFSUser} user						The <img src="java-icon-small.png"></img> [SFSUser]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSUser.html} object representing the user that should leave the Room.
 * @param	{SFSRoom} room						The <img src="java-icon-small.png"></img> [SFSRoom]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSRoom.html} object representing the Room that the user is going to leave.
 * @param	{boolean} [fireClientEvent=false]	If <code>true</code>, a client-side <em>USER_EXIT_ROOM</em> event will be fired to notify the action.
 * @param	{boolean} [fireServerEvent=false]	If <code>true</code>, a server-side event of type <img src="java-icon-small.png"></img> [SFSEventType.USER_LEAVE_ROOM]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/core/SFSEventType.html#USER_LEAVE_ROOM} will be fired to notify the action.
 */
SFSApi.prototype.leaveRoom = function(user, room, fireClientEvent, fireServerEvent)
{
	this._javaApi.leaveRoom(user, room, fireClientEvent, fireServerEvent);
}

/**
 * Removes a Room from its Zone.
 *
 * @param	{SFSRoom} room						The <img src="java-icon-small.png"></img> [SFSRoom]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSRoom.html} object representing the Room that the user is going to leave.
 * @param	{boolean} [fireClientEvent=false]	If <code>true</code>, a client-side <em>ROOM_REMOVE</em> event will be fired to notify the Room removal.
 * @param	{boolean} [fireServerEvent=false]	If <code>true</code>, a server-side event of type <img src="java-icon-small.png"></img> [SFSEventType.ROOM_REMOVED]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/core/SFSEventType.html#ROOM_REMOVED} will be fired to notify the Room removal.
 */
SFSApi.prototype.removeRoom = function(room, fireClientEvent, fireServerEvent)
{
	this._javaApi.removeRoom(room, fireClientEvent, fireServerEvent);
}

/**
 * Sends a public chat message from a user.
 *
 * <p>The message is broadcast to all users in the target Room, including the sender himself.</p>
 *
 * @param	{SFSRoom} targetRoom	The <img src="java-icon-small.png"></img> [SFSRoom]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSRoom.html} object representing the Room to send the message to.
 * @param	{SFSUser} sender		The <img src="java-icon-small.png"></img> [SFSUser]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSUser.html} object representing the user sending the message to the target Room.
 * @param	{string} message		The chat message to send.
 * @param	{SFSObject} [params]	A <em>SFSObject</em> containing custom parameters to be attached to the message (e.g. text color, font size, etc).
 */
SFSApi.prototype.sendPublicMessage = function(targetRoom, sender, message, params)
{
	this._javaApi.sendPublicMessage(targetRoom, sender, message, params);
}

/**
 * Sends a private chat message from a user to another one.
 *
 * <p>The message is sent to both the sender and the recipient. The sender and recipient can be in any Room, or even not joined in any Room at all.</p>
 *
 * @param	{SFSUser} sender		The <img src="java-icon-small.png"></img> [SFSUser]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSUser.html} object representing the user sending the message.
 * @param	{SFSUser} recipient		The <img src="java-icon-small.png"></img> [SFSUser]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSUser.html} object representing the message recipient.
 * @param	{string} message		The chat message to send.
 * @param	{SFSObject} [params]	A <em>SFSObject</em> containing custom parameters to be attached to the message (e.g. text color, font size, etc).
 */
SFSApi.prototype.sendPrivateMessage = function(sender, recipient, message, params)
{
	this._javaApi.sendPrivateMessage(sender, recipient, message, params);
}

/**
 * Sends a message from a moderator to a list of clients.
 *
 * <p>The sender must be either an actual user with "Super User" privileges, or <code>null</code>. In this case the sender becomes the "Server" itself.</p>
 *
 * @param	{SFSUser} sender		The <img src="java-icon-small.png"></img> [SFSUser]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSUser.html} object representing the moderator sending the message; if <code>null</code>, the sender is the "server" itself.
 * @param	{string} message		The message to send.
 * @param	{SFSObject} params		A <em>SFSObject</em> containing custom parameters to be attached to the message.
 * @param	{Session[]} recipients	An array of <img src="java-icon-small.png"></img> [Session]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/bitswarm/sessions/Session.html} objects representing the clients to deliver the message to.
 */
SFSApi.prototype.sendModeratorMessage = function(sender, message, params, recipients)
{
	// Convert native JS array
	if (recipients instanceof Array)
		recipients = $$Util.toList(recipients);

	this._javaApi.sendModeratorMessage(sender, message, params, recipients);
}

/**
 * Sends a message from an administrator to a list of clients.
 *
 * <p>The sender must be either an actual user with "Super User" privileges, or <code>null</code>. In this case the sender becomes the "Server" itself.</p>
 *
 * @param	{SFSUser} sender		The <img src="java-icon-small.png"></img> [SFSUser]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSUser.html} object representing the administrator sending the message; if <code>null</code>, the sender is the "server" itself.
 * @param	{string} message		The message to send.
 * @param	{SFSObject} params		A <em>SFSObject</em> containing custom parameters to be attached to the message.
 * @param	{Session[]} recipients	An array of <img src="java-icon-small.png"></img> [Session]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/bitswarm/sessions/Session.html} objects representing the clients to deliver the message to.
 */
SFSApi.prototype.sendAdminMessage = function(sender, message, params, recipients)
{
	// Convert native JS array
	if (recipients instanceof Array)
		recipients = $$Util.toList(recipients);

	this._javaApi.sendAdminMessage(sender, message, params, recipients);
}

/**
 * Sends a data object from a user to a list of other users in a Room.
 *
 * <p>This method sends a custom <em>SFSObject</em> that can contain any data. Typically this is used to send game moves to players or other game/app related updates.<br>
 * By default the message is sent to all users in the specified target Room, but a list of <em>SFSUser</em> object can be passed to specify which user in that Room should receive the message. The sender must be joined in the target Room too.</p>
 *
 * @param	{SFSRoom} targetRoom		The <img src="java-icon-small.png"></img> [SFSRoom]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSRoom.html} object representing the Room to send the data to.
 * @param	{SFSUser} sender			The <img src="java-icon-small.png"></img> [SFSUser]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSUser.html} object representing the user sending the data to the target Room.
 * @param	{SFSObject} message			The data object to send.
 * @param	{SFSUser[]} [recipients]	An array of <img src="java-icon-small.png"></img> [SFSUser]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSUser.html} objects representing the recipients to deliver the data to.
 */
SFSApi.prototype.sendObjectMessage = function(targetRoom, sender, message, recipients)
{
	// Convert native JS array
	if (recipients instanceof Array)
		recipients = $$Util.toList(recipients);

	this._javaApi.sendObjectMessage(targetRoom, sender, message, recipients);
}

/**
 * @private
 */
SFSApi.prototype.sendExtensionResponse = function(cmdName, params, recipients, room, useUDP)
{
	// Convert native JS array
	if (recipients instanceof Array)
		recipients = $$Util.toList(recipients);

	this._javaApi.sendExtensionResponse(cmdName, params, recipients, room, useUDP);
}

/**
 * Sets the Room Variables for the passed Room.
 *
 * <p>Only new/updated variables are broadcast to the users in the target Room. A variable can also be deleted by setting it to <code>null</code>.</p>
 *
 * @example
 * <caption>In this example we set a Room Variable for the "chat37" Room. The variable is set as "global", so its value is visible to users outside the Room too.</caption>
 * // Create Room Variable
 * var topicRoomVar = new SFSRoomVariable("topic", "Tabletop games", VariableType.STRING);
 * topicRoomVar.setGlobal(true);
 *
 * // Get Room
 * var targetRoom = getParentZone().getRoomByName("chat37");
 *
 * // Set Room Variable
 * getApi().setRoomVariables(null, targetRoom, [topicRoomVar], true);
 *
 * @param	{SFSUser} user						The <img src="java-icon-small.png"></img> [SFSUser]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSUser.html} object representing the owner of the Room Variables; if <code>null</code>, the ownership is assigned to the "Server" itself.
 * @param	{SFSRoom} targetRoom				The <img src="java-icon-small.png"></img> [SFSRoom]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSRoom.html} object representing the Room in which to set the Room Variables.
 * @param	{SFSRoomVariable[]} variables		An array of {@link SFSRoomVariable} objects to set.
 * @param	{boolean} [fireClientEvent=false]	If <code>true</code>, a client-side <em>ROOM_VARIABLES_UPDATE</em> event will be fired to notify the Room Variables creation/update.
 * @param	{boolean} [fireServerEvent=false]	If <code>true</code>, a server-side event of type <img src="java-icon-small.png"></img> [SFSEventType.ROOM_VARIABLES_UPDATE]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/core/SFSEventType.html#ROOM_VARIABLES_UPDATE} will be fired to notify the Room Variables creation/update.
 * @param	{boolean} [overrideOwnership=false]	If <code>true</code>, the ownership of variables can be overridden.
 */
SFSApi.prototype.setRoomVariables = function(user, targetRoom, variables, fireClientEvent, fireServerEvent, overrideOwnership)
{
	// Convert native JS array
	if (variables instanceof Array)
		variables = $$Util.toList(variables);

	this._javaApi.setRoomVariables(user, targetRoom, variables, fireClientEvent, fireServerEvent, overrideOwnership);
}

/**
 * Sets the User Variables for the passed user.
 *
 * <p>Only new/updated variables are broadcast to the users that can "see" the owner. A variable can also be deleted by setting it to <code>null</code>.</p>
 *
 * @example
 * <caption>In this example we receive an Extension request which triggers the creation of a couple of User Variables for the requester.<br>
 * Usually an Extension request is not necessary, because User Variables can be set by the client directly, but in this case we want to validate the
 * "age" value sent by the client.</caption>
 * function init()
 * {
 * 	// Register client request handlers
 * 	addRequestHandler("setMyVars", onSetMyVarsRequest);
 * }
 *
 * function onSetMyVarsRequest(inParams, sender)
 * {
 * 	// Get parameters sent by the client
 * 	var userNick = inParams.getUtfString("nick");
 * 	var userAge = inParams.getInt("age");
 *
 * 	// Validate user age
 * 	if (userAge >= 13)
 * 	{
 * 		// Create User Variables
 * 		var userVar1 = new SFSUserVariable("nick", userNick, VariableType.STRING);
 * 		var userVar2 = new SFSUserVariable("age", userAge, VariableType.INT);
 *
 * 		// Set User Variables
 * 		getApi().setUserVariables(sender, [userVar1,userVar2], true);
 * 	}
 * }
 *
 * @param	{SFSUser} user						The <img src="java-icon-small.png"></img> [SFSUser]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSUser.html} object representing the user for which the User Variables are set.
 * @param	{SFSUserVariable[]} variables		An array of {@link SFSUserVariable} objects to set.
 * @param	{boolean} [fireClientEvent=false]	If <code>true</code>, a client-side <em>USER_VARIABLES_UPDATE</em> event will be fired to notify the User Variables creation/update.
 * @param	{boolean} [fireServerEvent=false]	If <code>true</code>, a server-side event of type <img src="java-icon-small.png"></img> [SFSEventType.USER_VARIABLES_UPDATE]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/core/SFSEventType.html#USER_VARIABLES_UPDATE} will be fired to notify the User Variables creation/update.
 */
SFSApi.prototype.setUserVariables = function(owner, variables, fireClientEvent, fireServerEvent)
{
	// Convert native JS array
	if (variables instanceof Array)
		variables = $$Util.toList(variables);

	this._javaApi.setUserVariables(owner, variables, fireClientEvent, fireServerEvent);
}

/**
 * Renames a Room.
 *
 * @param	{SFSUser} owner			The <img src="java-icon-small.png"></img> [SFSUser]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSUser.html} object representing the owner of the Room; if <code>null</code>, the authorization of the user to change the Room name is not checked.
 * @param	{SFSRoom} targetRoom	The <img src="java-icon-small.png"></img> [SFSRoom]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSRoom.html} object representing the Room to change the name to.
 * @param	{string} newName		The new Room name.
 *
 * @throws A <img src="java-icon-small.png"></img> [SFSRoomException]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/exceptions/SFSRoomException.html} exception if the new name is already assigned to another Room, its length is out of the range allowed by the Zone configuration or it contains bad words (if the Words Filter is active).
 */
SFSApi.prototype.changeRoomName = function(owner, targetRoom, newName)
{
	this._javaApi.changeRoomName(owner, targetRoom, newName);
}

/**
 * Changes the Room password and the Room password-protection state.
 *
 * <p>The password-protection state indicates if a Room is private and requires a password to access it. Passing a <code>null</code> or empty string makes the Room public. Passing a valid string as the password makes the Room private.</p>
 *
 * @param	{SFSUser} owner			The <img src="java-icon-small.png"></img> [SFSUser]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSUser.html} object representing the owner of the Room; if <code>null</code>, the authorization of the user to change the Room password-protection state is not checked.
 * @param	{SFSRoom} targetRoom	The <img src="java-icon-small.png"></img> [SFSRoom]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSRoom.html} object representing the Room to change the password-protection state to.
 * @param	{string} newPassword	The new password; <code>null</code> or empty string to remove the password protection.
 *
 * @throws A <img src="java-icon-small.png"></img> [SFSRoomException]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/exceptions/SFSRoomException.html} exception if the password-protection state couldn't be modified.
 */
SFSApi.prototype.changeRoomPassword = function(owner, targetRoom, newPassword)
{
	this._javaApi.changeRoomPassword(owner, targetRoom, newPassword);
}

/**
 * Changes the capacity (maximum number of users/players and spectators) of the Room.
 *
 * <p>In case the Room size is shrunk, extra players or spectators will not be kicked out of the Room.</p>
 *
 * @param	{SFSUser} owner			The <img src="java-icon-small.png"></img> [SFSUser]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSUser.html} object representing the owner of the Room; if <code>null</code>, the authorization of the user to change the Room capacity is not checked.
 * @param	{SFSRoom} targetRoom	The <img src="java-icon-small.png"></img> [SFSRoom]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSRoom.html} object representing the Room to change the capacity to.
 * @param	{number} maxUsers		The new maximum number of users (aka players in Game Rooms).
 * @param	{number} maxSpectators	The new maximum number of spectators (for Game Rooms only).
 *
 * @throws A <img src="java-icon-small.png"></img> [SFSRoomException]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/exceptions/SFSRoomException.html} exception if the Room capacity couldn't be modified.
 */
SFSApi.prototype.changeRoomCapacity = function(owner, targetRoom, maxUsers, maxSpectators)
{
	this._javaApi.changeRoomCapacity(owner, targetRoom, maxUsers, maxSpectators);
}

/**
 * Subscribes a user to a Room Group.
 *
 * <p>This action enables the user to receive events related to the Rooms belonging the passed Group.</p>
 *
 * @param	{SFSUser} user		The <img src="java-icon-small.png"></img> [SFSUser]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSUser.html} object representing the user to subscribe to a Room Group.
 * @param	{string} groupId	The name of the Group to subscribe.
 */
SFSApi.prototype.subscribeRoomGroup = function(user, groupId)
{
	this._javaApi.subscribeRoomGroup(user, groupId);
}

/**
 * Unsubscribes a user from a Room Group.
 *
 * <p>This action disables the user to receive events related to the Rooms belonging the passed Group.</p>
 *
 * @param	{SFSUser} user		The <img src="java-icon-small.png"></img> [SFSUser]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSUser.html} object representing the user to unsubscribe from a Room Group.
 * @param	{string} groupId	The name of the Group to unsubscribe.
 */
SFSApi.prototype.unsubscribeRoomGroup = function(user, groupId)
{
	this._javaApi.unsubscribeRoomGroup(user, groupId);
}

/**
 * Turns a spectator in a Game Room to player.
 *
 * @param	{SFSUser} user						The <img src="java-icon-small.png"></img> [SFSUser]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSUser.html} object representing the user to turn from spectator to player.
 * @param	{SFSRoom} targetRoom				The <img src="java-icon-small.png"></img> [SFSRoom]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSRoom.html} object representing the Room in which the spectator will be turned into a player.
 * @param	{boolean} [fireClientEvent=false]	If <code>true</code>, a client-side <em>SPECTATOR_TO_PLAYER</em> event will be fired to notify the change.
 * @param	{boolean} [fireServerEvent=false]	If <code>true</code>, a server-side event of type <img src="java-icon-small.png"></img> [SFSEventType.SPECTATOR_TO_PLAYER]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/core/SFSEventType.html#SPECTATOR_TO_PLAYER} will be fired to notify the change.
 *
 * @throws A <img src="java-icon-small.png"></img> [SFSRoomException]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/exceptions/SFSRoomException.html} exception if no player slot is available in the Game Room.
 */
SFSApi.prototype.spectatorToPlayer = function(user, targetRoom, fireClientEvent, fireServerEvent)
{
	this._javaApi.spectatorToPlayer(user, targetRoom, fireClientEvent, fireServerEvent);
}

/**
 * Turns a player in a Game Room to spectator.
 *
 * @param	{SFSUser} user						The <img src="java-icon-small.png"></img> [SFSUser]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSUser.html} object representing the user to turn from player to spectator.
 * @param	{SFSRoom} targetRoom				The <img src="java-icon-small.png"></img> [SFSRoom]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSRoom.html} object representing the Room in which the player will be turned into a spectator.
 * @param	{boolean} [fireClientEvent=false]	If <code>true</code>, a client-side <em>PLAYER_TO_SPECTATOR</em> event will be fired to notify the change.
 * @param	{boolean} [fireServerEvent=false]	If <code>true</code>, a server-side event of type <img src="java-icon-small.png"></img> [SFSEventType.PLAYER_TO_SPECTATOR]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/core/SFSEventType.html#PLAYER_TO_SPECTATOR} will be fired to notify the change.
 *
 * @throws A <img src="java-icon-small.png"></img> [SFSRoomException]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/exceptions/SFSRoomException.html} exception if no spectator slot is available in the Game Room.
 */
SFSApi.prototype.playerToSpectator = function(user, targetRoom, fireClientEvent, fireServerEvent)
{
	this._javaApi.playerToSpectator(user, targetRoom, fireClientEvent, fireServerEvent);
}

//==============================================================================
//--- Buddy API class ----------------------------------------------------------
//==============================================================================

/**
 * <b>Developers never istantiate the <em>BuddyApi</em> class</b>: this is done internally by the SmartFoxServer 2X API; get a reference to it using the Extension's {@link getBuddyApi} method.
 *
 * @class
 * The <em>BuddyApi</em> class provides all the features to manage the users' Buddy Lists.
 * It contains methods to initialize the Buddy List of a user, add and remove buddies, set the online status and more.
 *
 * <h4>See also</h4>
 * <ul>
 * <li>{@link SFSApi} class</li>
 * <li>{@link GameApi} class</li>
 * <li>{@link MMOApi} class</li>
 * <li>{@link FileApi} class</li>
 * </ul>
 */
BuddyApi = function()
{
	this._sfs = $$SfsInstance;
	this._javaApi = this._sfs.getAPIManager().getBuddyApi();
}

/**
 * Initializes the Buddy List for the passed user.
 *
 * <p>This causes saved data (the list of buddies and their persistent Buddy Variables) to be loaded from the Buddy List storage.</p>
 *
 * @param	{SFSUser} user		The <img src="java-icon-small.png"></img> [SFSUser]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSUser.html} object representing the user whose Buddy List should be loaded.
 * @param	{boolean} [fireServerEvent=false]	If <code>true</code>, a server-side event of type <img src="java-icon-small.png"></img> [SFSEventType.BUDDY_LIST_INIT]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/core/SFSEventType.html#BUDDY_LIST_INIT} will be fired to notify the Buddy List initialization success.
 *
 * @return {SFSBuddyList} A <img src="java-icon-small.png"></img> [SFSBuddyList]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/buddylist/SFSBuddyList.html} class instance representing the usere's Buddy List.
 *
 * @throws An <em>IOException</em> Java exception if the Buddy List data couldn't be retrieved from the storage.
 */
BuddyApi.prototype.initBuddyList = function(user, fireServerEvent)
{
	return this._javaApi.initBuddyList(user, fireServerEvent);
}

/**
 * Activates/deactivates the ONLINE status of the user in the Buddy List system.
 *
 * <p>All clients who have the user as their Buddy will see him as online or offline respectively.</p>
 *
 * @param	{SFSUser} user						The <img src="java-icon-small.png"></img> [SFSUser]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSUser.html} object representing the user to set online/offline in the Buddy List system.
 * @param	{boolean} online					If <code>true</code>, the user is set as online in the Buddy List system; if <code>false</code>, he is set as offline.
 * @param	{boolean} [fireServerEvent=false]	If <code>true</code>, a server-side event of type <img src="java-icon-small.png"></img> [SFSEventType.BUDDY_ONLINE_STATE_UPDATE]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/core/SFSEventType.html#BUDDY_ONLINE_STATE_UPDATE} will be fired to notify the user's online state change.
 */
BuddyApi.prototype.goOnline = function(user, online, fireServerEvent)
{
	this._javaApi.goOnline(user, online, fireServerEvent);
}

/**
 * Adds a new buddy to the Buddy List of the passed user.
 *
 * @param	{SFSUser} owner						The <img src="java-icon-small.png"></img> [SFSUser]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSUser.html} object representing the owner of the Buddy List to add a new buddy to.
 * @param	{string}  buddyName					The name of the user to add as a buddy.
 * @param	{boolean} isTemp					If <code>true</code>, the buddy is only temporary and will be removed when the owner logs out of the system.
 * @param	{boolean} [fireClientEvent=false]	If <code>true</code>, a client-side <em>BUDDY_ADD</em> event will be fired to notify the action.
 * @param	{boolean} [fireServerEvent=false]	If <code>true</code>, a server-side event of type <img src="java-icon-small.png"></img> [SFSEventType.BUDDY_ADD]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/core/SFSEventType.html#BUDDY_ADD} will be fired to notify the action.
 *
 * @throws A <img src="java-icon-small.png"></img> [SFSBuddyListException]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/exceptions/SFSBuddyListException.html} exception if the Buddy List of the user is full or the buddy is already in the Buddy List.
 */
BuddyApi.prototype.addBuddy = function(owner, buddyName, isTemp, fireClientEvent, fireServerEvent)
{
	this._javaApi.addBuddy(owner, buddyName, isTemp, fireClientEvent, fireServerEvent);
}

/**
 * Sets the Buddy Variables for the passed user.
 *
 * <p>Only new/updated variables are broadcast to the users that have the owner in their Buddy list. A variable can also be deleted by setting it to <code>null</code>.</p>
 *
 * @param	{SFSUser} owner						The <img src="java-icon-small.png"></img> [SFSUser]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSUser.html} object representing the user to set the Buddy Variables for.
 * @param	{SFSBuddyVariable[]} variables		An array of {@link SFSBuddyVariable} objects to set.
 * @param	{boolean} [fireClientEvent=false]	If <code>true</code>, a client-side <em>BUDDY_VARIABLES_UPDATE</em> event will be fired to notify the Buddy Variables creation/update.
 * @param	{boolean} [fireServerEvent=false]	If <code>true</code>, a server-side event of type <img src="java-icon-small.png"></img> [SFSEventType.BUDDY_VARIABLES_UPDATE]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/core/SFSEventType.html#BUDDY_VARIABLES_UPDATE} will be fired to notify the Buddy Variables creation/update.
 *
 * @throws A <img src="java-icon-small.png"></img> [SFSBuddyListException]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/exceptions/SFSBuddyListException.html} exception if the limit on the number of allowed Buddy Variables is exceeded.
 */
BuddyApi.prototype.setBuddyVariables = function(owner, variables, fireClientEvent, fireServerEvent)
{
	// Convert native JS array
	if (variables instanceof Array)
		variables = $$Util.toList(variables);

	this._javaApi.setBuddyVariables(user, variables, fireClientEvent, fireServerEvent);
}

/**
 * Removes a buddy from the Buddy List of the passed user.
 *
 * @param	{SFSUser} owner						The <img src="java-icon-small.png"></img> [SFSUser]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSUser.html} object representing the owner of the Buddy List to remove a buddy from.
 * @param	{string}  buddyName					The name of the buddy to remove.
 * @param	{boolean} [fireClientEvent=false]	If <code>true</code>, a client-side <em>BUDDY_REMOVE</em> event will be fired to notify the buddy removal.
 * @param	{boolean} [fireServerEvent=false]	If <code>true</code>, a server-side event of type <img src="java-icon-small.png"></img> [SFSEventType.BUDDY_REMOVE]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/core/SFSEventType.html#BUDDY_REMOVE} will be fired to notify the buddy removal.
 */
BuddyApi.prototype.removeBuddy = function(owner, buddyName, fireClientEvent, fireServerEvent)
{
	this._javaApi.removeBuddy(owner, buddyName, fireClientEvent, fireServerEvent);
}

/**
 * Blocks/unblocks a buddy in the Buddy List of a user.
 *
 * <p>Blocked buddies won't be able to see the user online status and send him messages or Buddy Variables updates.</p>
 *
 * @param	{SFSUser} owner						The <img src="java-icon-small.png"></img> [SFSUser]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSUser.html} object representing the owner of the Buddy List in which the buddy should be blocked/unblocked.
 * @param	{string}  buddyName					The name of the buddy to block/unblock.
 * @param	{boolean} isBlocked					If <code>true</code>, the buddy will be blocked in the Buddy List of the user; if <code>false</code>, the block will be removed.
 * @param	{boolean} [fireClientEvent=false]	If <code>true</code>, a client-side <em>BUDDY_BLOCK</em> event will be fired to notify the change.
 * @param	{boolean} [fireServerEvent=false]	If <code>true</code>, a server-side event of type <img src="java-icon-small.png"></img> [SFSEventType.BUDDY_BLOCK]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/core/SFSEventType.html#BUDDY_BLOCK} will be fired to notify the change.
 */
BuddyApi.prototype.blockBuddy = function(owner, buddyName, isBlocked, fireClientEvent, fireServerEvent)
{
	this._javaApi.blockBuddy(owner, buddyName, isBlocked, fireClientEvent, fireServerEvent);
}

/**
 * Sends a Buddy Message from a user to one of his buddies.
 *
 * <p>A Buddy Message is similar to a regular private chat message, but it is meant to work with the Buddy List system, taking into account the buddy blocked state, online presence, etc.<br>
 * The message is sent to both the sender and the receiver. The recipient must be in the sender's Buddy List.</p>
 *
 * @param	{SFSUser} sender	The <img src="java-icon-small.png"></img> [SFSUser]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSUser.html} object representing the user sending the message.
 * @param	{SFSUser} recipient	The <img src="java-icon-small.png"></img> [SFSUser]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSUser.html} object representing the message recipient (must be a buddy in the sender's Buddy List).
 * @param	{string} message	The chat message to send.
 * @param	{SFSObject} params	A <em>SFSObject</em> containing custom parameters to be attached to the message (e.g. text color, font size, etc).
 *
 * @throws A <img src="java-icon-small.png"></img> [SFSBuddyListException]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/exceptions/SFSBuddyListException.html} exception if the recipient is not in the sender's Buddy List or if the recipient has blocked the sender.
 */
BuddyApi.prototype.sendBuddyMessage = function(sender, recipient, message, params)
{
	this._javaApi.sendBuddyMessage(sender, recipient, message, params);
}

//==============================================================================
//--- Game API class -----------------------------------------------------------
//==============================================================================

/**
 * <b>Developers never istantiate the <em>GameApi</em> class</b>: this is done internally by the SmartFoxServer 2X API; get a reference to it using the Extension's {@link getGameApi} method.
 *
 * @class
 * The <em>GameApi</em> class provides specialized API calls for advanced game functionalities.
 * It contains methods to search opponents based on matching criteria, challenge other players or send invitations to join a game, start quick games and more.
 *
 * <h4>See also</h4>
 * <ul>
 * <li>{@link SFSApi} class</li>
 * <li>{@link BuddyApi} class</li>
 * <li>{@link MMOApi} class</li>
 * <li>{@link FileApi} class</li>
 * </ul>
 */
GameApi = function()
{
	this._sfs = $$SfsInstance;
	this._javaApi = this._sfs.getAPIManager().getGameApi();
}

/**
 * Creates a new Room of type SFSGame.
 *
 * <p>The SFSGame class extends the normal capabilities of a Room, adding the ability to set the game as private and provide a list of users that the system will invite to play automatically.
 * Additionally the system is be able to invite more users if the number of players is not sufficient to start the game.</p>
 *
 * <h5>See also:</h5>
 * <ul>
 * <li>{@link CreateRoomSettings} class</li>
 * <li>{@link CreateMMORoomSettings} class</li>
 * <li>{@link SFSApi#createRoom} method</li>
 * </ul>
 *
 * @param	{SFSZone} zone						The <img src="java-icon-small.png"></img> [SFSZone]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSZone.html} object representing the Zone the SFSGame should be created into.
 * @param	{CreateSFSGameSettings} settings	The SFSGame configuration object.
 * @param	{SFSUser} [owner=null]				The <img src="java-icon-small.png"></img> [SFSUser]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSUser.html} object representing the owner of the SFSGame; if <code>null</code> is passed, the "Server" will be the owner.
 * @param	{boolean} [fireClientEvent=false]	If <code>true</code>, a client-side <em>ROOM_ADD</em> event will be fired to notify the SFSGame creation.
 * @param	{boolean} [fireServerEvent=false]	If <code>true</code>, a server-side event of type <img src="java-icon-small.png"></img> [SFSEventType.ROOM_ADDED]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/core/SFSEventType.html#ROOM_ADDED} will be fired to notify the SFSGame creation.
 *
 * @example
 * <caption>In this example we create a public SFSGame, using a Match Expression to make the Room joinable by
 * players from United States and with a rank greater than or equal to 50 only.</caption>
 * var cgs = new CreateSFSGameSettings();
 * cgs.setName("battle-room-173");
 * cgs.setMaxUsers(4);
 * cgs.setMaxSpectators(0);
 * cgs.setGame(true);
 * cgs.setGamePublic(true);
 * cgs.setMinPlayersToStartGame(4);
 *
 * // Set a Match Expression to filter players willing to join
 * var exp = new MatchExpression("country", StringMatch.EQUALS, "US");
 * exp.and("rank", NumberMatch.GREATER_THAN_OR_EQUAL_TO, 50);
 * cgs.setPlayerMatchExpression(exp);
 *
 * // Create the SFSGame
 * getGameApi().createGame(getParentZone(), cgs, null, true, true);
 *
 * @return {SFSGame} The <img src="java-icon-small.png"></img> [SFSGame]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/game/SFSGame.html} object representing the Room of type SFSGame just created.
 *
 * @throws A <img src="java-icon-small.png"></img> [SFSCreateRoomException]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/exceptions/SFSCreateRoomException.html} exception if an error occurs during the Room creation.
 * @throws A <img src="java-icon-small.png"></img> [SFSCreateGameException]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/exceptions/SFSCreateGameException.html} exception if the specific settings of the SFSGame are invalid.
 */
GameApi.prototype.createGame = function(zone, settings, owner, fireClientEvent, fireServerEvent)
{
	return this._javaApi.createGame(zone, settings, owner, fireClientEvent, fireServerEvent);
}

/**
 * Quickly joins a user in an Room of type SFSGame.
 *
 * <p>When this method is called, the API:</p>
 * <ul>
 * <li>if a Zone and Group name are passed, matches the provided Match Expression in the scope (Zone+Group) to find a list of possible Rooms that the player can join;</li>
 * <li>matches the user properties with the Match Expression assigned to the SFSGames in the list (if any - see the {@link GameApi#createGame} method).</li>
 * </ul>
 * The first SFSGames that matches the user properties is joined, otherwise an error is returned.
 *
 * @param	{SFSUser} user					The <img src="java-icon-small.png"></img> [SFSUser]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSUser.html} object representing the user to join in the SFSGame.
 * @param	{MatchExpression} expression	A Match Expression containing the Room search criteria to find the appropriate SFSGame to join the user in.
 * @param	{SFSZone} zone					The <img src="java-icon-small.png"></img> [SFSZone]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSZone.html} object representing the Zone where to search available SFSGames in. This is ignored if a list of <em>SFSGame</em> objects is passed as the next parameter.
 * @param	{string|SFSGame[]} searchItem	The name of a Room Group or a list of <img src="java-icon-small.png"></img> [SFSGame]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/game/SFSGame.html} objects where to search an available SFSGame in.
 * @param	{SFSRoom} roomToLeave			A <img src="java-icon-small.png"></img> [SFSRoom]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSRoom.html} object representing the Room to leave after having successfully joined the SFSGame.
 *
 * @return {SFSGame} The <img src="java-icon-small.png"></img> [SFSGame]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/game/SFSGame.html} object representing the SFSGame that was joined.
 *
 * @throws A <img src="java-icon-small.png"></img> [SFSJoinRoomException]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/exceptions/SFSJoinRoomException.html} exception if an error occurs during the SFSGame joining process.
 */
GameApi.prototype.quickJoinGame = function(user, expression, zone, searchItem, roomToLeave)
{
	// Array of searchable rooms?
	if (searchItem instanceof Array)
		return this._javaApi.quickJoinGame(user, expression. $$Util.toList(searchItem), roomToLeave);

	else
		return this._javaApi.quickJoinGame(user, expression, zone, groupId, roomToLeave);
}

/**
 * Sends an invitation to a user.
 *
 * <p>An invitation can be sent for various purposes, such as joining a Room (both regular and game ones), adding a friend to the Buddy List, etc.</p>
 *
 * <h5>See also:</h5>
 * <ul>
 * <li>{@link GameApi#replyToInvitation} method</li>
 * </ul>
 *
 * @param	{SFSUser} inviter						The <img src="java-icon-small.png"></img> [SFSUser]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSUser.html} object representing the user sending the invitation.
 * @param	{SFSUser[]} invitees					A list of <img src="java-icon-small.png"></img> [SFSUser]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSUser.html} objects representing the recipients of the invitation.
 * @param	{number} expirySeconds					The amount of time allowed to each invitee to accept or refuse the invitation.
 * @param	{invCallBackHandler} invCallBackHandler	The object that will handle the reply to the invitation (accept or refuse).
 * @param	{SFSObject} [params]					A <em>SFSObject</em> containing custom parameters to be attached to the invitation (e.g. a message).
 */
GameApi.prototype.sendInvitation = function(inviter, invitees, expirySeconds, invCallBackHandler, params)
{
	// Check implementation of callback handler was done correctly
	if (!invCallBackHandler.onAccepted || !invCallBackHandler.onRefused || !invCallBackHandler.onExpired)
		throw new java.lang.IllegalArgumentException("Callback handler must implement these three methods: onAccepted, onRefused, onExpired");

	var handler = Java.extend(InvitationCallback, invCallBackHandler);
	this._javaApi.sendInvitation(inviter, invitees, expirySeconds, new handler(), params);
}

/**
 * This callback handler is an object containing the <em>onAccepted</em>, <em>onRefused</em> and <em>onExpired</em> methods, respectively called when an invitation sent using the {@link GameApi#sendInvitation} method is accepted, refused or expires before a reply is received.
 *
 * <p></p>
 *
 * <h5>See also:</h5>
 * <ul>
 * <li>{@link GameApi#replyToInvitation} method</li>
 * </ul>
 *
 * @example
 * <caption>This example shows how to create this callback handler.</caption>
 * var invitationCallBackHandler = {
 * 	onAccepted: function(invObj, params)
 * 	{
 * 		// Handle invitation accepted
 * 		...
 * 	},
 *
 * 	onRefused(invObj, params)
 * 	{
 * 		// Handle invitation refused
 * 		...
 * 	},
 *
 * 	onExpired: function(invObj)
 * 	{
 * 		// Handle invitation expired
 * 		...
 * 	}
 * };
 *
 * @callback invCallBackHandler
 *
 * @param	{Invitation} invObj A <img src="java-icon-small.png"></img> [SFSInvitation]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/invitation/SFSInvitation.html} object representing the invitation sent to the recipient(s).
 * @param	{SFSObject} params	The <em>SFSObject</em> containing the custom parameters attached to the invitation reply, if any. This parameter is passed to <em>onAccepted</em> and <em>onRefused</em> functions only.
 */

/**
 * Sends a reply to an invitation.
 *
 * <p>Replying to an invitation means to accept or refuse it.</p>
 *
 * <h5>See also:</h5>
 * <ul>
 * <li>{@link GameApi#sendInvitation} method</li>
 * </ul>
 *
 * @param	{SFSUser} invitedUser				The <img src="java-icon-small.png"></img> [SFSUser]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSUser.html} object representing the user who received the invitation.
 * @param	{number} invitationId				The id of the invitation, which can be retrieved from the <em>SFSInvitation</em> object received by the invited client.
 * @param	{InvitationResponse} reply			One of the invitation replies provided in the <em>InvitationResponse</em> enum; only <em>ACCEPT<em> and <em>REFUSE</em> are valid replies, while <em>EXPIRED</em> is reserved to the system.
 * @param	{SFSObject} [params]				A <em>SFSObject</em> containing custom parameters to be attached to the reply.
 * @param	{boolean} [fireClientEvent=false]	If <code>true</code>, a client-side <em>INVITATION_REPLY</em> event will be fired to notify the reply.
 */
GameApi.prototype.replyToInvitation = function(invitedUser, invitationId, reply, params, fireClientEvent)
{
	this._javaApi.replyToInvitation(invitedUser, invitationId, reply, params, fireClientEvent);
}

/**
 * Invites a user to join an existing Room of any type.
 *
 * <p>If the invitation is accepted, the invitee will be automatically joined in the target Room.</p>
 *
 * @param	{SFSRoom} target						A <img src="java-icon-small.png"></img> [SFSRoom]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSRoom.html} object representing the Room to invite the invitees to.
 * @param	{SFSUser} inviter						The <img src="java-icon-small.png"></img> [SFSUser]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSUser.html} object representing the user sending the invitation.
 * @param	{SFSUser[]} invitees					A list of <img src="java-icon-small.png"></img> [SFSUser]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSUser.html} objects representing the recipients of the invitation.
 * @param	{number} expirySeconds					The amount of time allowed to each invitee to accept or refuse the invitation.
 * @param	{boolean} [asSpect=false]				If <code>true</code>, the provided list of invitees will be joined as spectators (where applicable, i.e. Rooms of type game).
 * @param	{boolean} [leaveLastJoinedRoom=false]	If <code>true</code>, the users joining the target Room will leave the previously joined Room.
 * @param	{SFSObject} [params]					A <em>SFSObject</em> containing custom parameters to be attached to the invitation (e.g. a message).
 */
GameApi.prototype.sendJoinRoomInvitation = function(target, inviter, invitees, expirySeconds, asSpect, leaveLastJoinedRoom, params)
{
	if (invitees instanceof Array)
		invitees = $$Util.toList(invitees);

	this._javaApi.sendJoinRoomInvitation(target, inviter, invitees, expirySeconds, asSpect, leaveLastJoinedRoom, params);
}

//==============================================================================
//--- MMO API class ------------------------------------------------------------
//==============================================================================

/**
 * <b>Developers never istantiate the <em>MMOApi</em> class</b>: this is done internally by the SmartFoxServer 2X API; get a reference to it using the Extension's {@link getMMOApi} method.
 *
 * @class
 * The <em>MMOApi</em> class provides specialized API calls for advanced MMO-related functionalities.
 * All the methods are targeted at an MMORoom and take its Area of Interest into account in order to dispatch events to the clients.
 *
 * <h4>Notes</h4>
 * <ul>
 * <li>Whenever a <em>Vec3D</em> object must be passed to a method of this API, use the {@link Vectors.newVec3D} helper method to generate it.
 * The reason is that this class is not available in JavaScript due to constructor overloading in the corresponding <img src="java-icon-small.png"></img> [Vec3D]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/mmo/Vec3D.html} class.</li>
 * </ul>
 *
 * <h4>See also</h4>
 * <ul>
 * <li>{@link SFSApi} class</li>
 * <li>{@link BuddyApi} class</li>
 * <li>{@link GameApi} class</li>
 * <li>{@link FileApi} class</li>
 * </ul>
 */
MMOApi = function()
{
	this._sfs = $$SfsInstance;
	this._javaApi = this._sfs.getAPIManager().getMMOApi()
}

/**
 * Sends a data object from a user to all the other users in his Area of Interest (AOI).
 *
 * <p>This method sends a custom <em>SFSObject</em> that can contain any data. Typically this is used to send game moves to players or other game/app related updates.<br>
 * The difference with the regular version of this method (see {@link SFSApi#sendObjectMessage} method) is that it works with the AOI set for the target MMORoom.
 * Also, instead of using the default AOI, a custom AOI can be provided. This must be smaller than the default one; attempting to use a larger AOI is not possible.<br>
 * The sender must be joined in the target MMORoom too.</p>
 *
 * @param	{MMORoom} targetRoom		The <img src="java-icon-small.png"></img> [MMORoom]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/mmo/MMORoom.html} object representing the MMORoom to send the data to.
 * @param	{SFSUser} sender			The <img src="java-icon-small.png"></img> [SFSUser]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSUser.html} object representing the user sending the data to the target MMORoom.
 * @param	{SFSObject} message			The data object to send.
 * @param	{Vec3D} [aoi]				A <img src="java-icon-small.png"></img> [Vec3D]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/mmo/Vec3D.html} instance representing a custom AOI.<br>Read the notes in the {@link MMOApi} class description.
 */
MMOApi.prototype.sendObjectMessage = function(targetRoom, sender, message, aoi)
{
	this._javaApi.sendObjectMessage(targetRoom, sender, message, aoi);
}

/**
 * Sends a public chat message from user to all the other users in his Area of Interest (AOI).
 *
 * <p>The difference with the regular version of this method (see {@link SFSApi#sendPublicMessage} method) is that it works with the AOI set for the target MMORoom.
 * Also, instead of using the default AOI, a custom AOI can be provided. This must be smaller than the default one; attempting to use a larger AOI is not possible.<br>
 * The sender must be joined in the target MMORoom too.</p>
 *
 * @param	{MMORoom} targetRoom	The <img src="java-icon-small.png"></img> [MMORoom]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/mmo/MMORoom.html} object representing the MMORoom to send the message to.
 * @param	{SFSUser} sender		The <img src="java-icon-small.png"></img> [SFSUser]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSUser.html} object representing the user sending the message to the target MMORoom.
 * @param	{string} message		The chat message to send.
 * @param	{SFSObject} [params]	A <em>SFSObject</em> containing custom parameters to be attached to the message (e.g. text color, font size, etc).
 * @param	{Vec3D} [aoi]			A <img src="java-icon-small.png"></img> [Vec3D]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/mmo/Vec3D.html} instance representing a custom AOI.<br>Read the notes in the {@link MMOApi} class description.
 */
MMOApi.prototype.sendPublicMessage = function(targetRoom, sender, message, params, aoi)
{
	this._javaApi.sendPublicMessage(targetRoom, sender, message, params, aoi);
}

/**
 * Sets the position of a user inside an MMORoom.
 *
 * @param	{SFSuser} user			The <img src="java-icon-small.png"></img> [SFSUser]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSUser.html} object representing the user to set the position of.
 * @param	{Vec3D} pos				A <img src="java-icon-small.png"></img> [Vec3D]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/mmo/Vec3D.html} instance representing the user position in the target MMORoom.<br>Read the notes in the {@link MMOApi} class description.
 * @param	{MMORoom} targetRoom	The <img src="java-icon-small.png"></img> [MMORoom]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/mmo/MMORoom.html} object representing the MMORoom where to set the user position.
 */
MMOApi.prototype.setUserPosition = function(user, pos, targetRoom)
{
	this._javaApi.setUserPosition(user, pos, targetRoom);
}

/**
 * Sets the position of an MMOItem inside an MMORoom.
 *
 * @param	{MMOItem} item			The <em>MMOItem</em> object representing the MMOItem to set the position of.
 * @param	{Vec3D} pos				A <img src="java-icon-small.png"></img> [Vec3D]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/mmo/Vec3D.html} instance representing the MMOItem position in the target MMORoom.<br>Read the notes in the {@link MMOApi} class description.
 * @param	{MMORoom} targetRoom	The <img src="java-icon-small.png"></img> [MMORoom]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/mmo/MMORoom.html} object representing the MMORoom where to set the MMOItem position.
 */
MMOApi.prototype.setMMOItemPosition = function(item, pos, targetRoom)
{
	this._javaApi.setMMOItemPosition(item, pos, targetRoom);
}

/**
 * Removes an MMOItem from an MMORoom.
 *
 * <p>The target MMORoom is not required by this method because the system already keeps track of which MMOItem belongs to which MMORoom.</p>
 *
 * @param	{MMOItem} item The <em>MMOItem</em> object representing the MMOItem to be removed from the MMORoom where it is located.
 */
MMOApi.prototype.removeMMOItem = function(item)
{
	this._javaApi.removeMMOItem(item);
}

/**
 * Sets the MMOItem Variables for the passed MMOItem.
 *
 * <p>Only new/updated variables are broadcast to the users that are within the range defined by the MOORoom's Area of Interest from the target MMOItem. A variable can also be deleted by setting it to <code>null</code>.</p>
 *
 * @param	{MMOItem} item						The <em>MMOItem</em> object representing the MMOItem for which the MMOItem Variables are set.
 * @param	{MMOItemVariable[]} variables		An array of {@link MMOItemVariable} objects to set.
 * @param	{boolean} [fireClientEvent=false]	If <code>true</code>, a client-side <em>MMOITEM_VARIABLES_UPDATE</em> event will be fired to notify the MMOItem Variables creation/update.
 */
MMOApi.prototype.setMMOItemVariables = function(item, variables, fireClientEvent)
{
	// Convert native JS array
	if (variables instanceof Array)
		variables = $$Util.toList(variables);

	this._javaApi.setMMOItemVariables(item, variables, fireClientEvent);
}

//--- MMOApi helper object -----------------------------------------------------

/**
 * A factory object containing an helper method to generate <img src="java-icon-small.png"></img> [Vec3D]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/mmo/Vec3D.html} instances.
 * @namespace
 */
Vectors = {}

/**
 * Creates an instance of <img src="java-icon-small.png"></img> [Vec3D]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/mmo/Vec3D.html}, which defines a set of coordinates in a virtual world represented by a MMORoom.
 *
 * @param  {number}  x       The position along the X axis.
 * @param  {number}  y       The position along the Y axis.
 * @param  {number}  z       The position along the Z axis.
 * @param  {boolean} isFloat Force the coordinates to be treated as floating point numbers (even if integers are passed).
 *
 * @return {Vec3D} A <img src="java-icon-small.png"></img> [Vec3D]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/mmo/Vec3D.html} instance.
 *
 * @static
 */
Vectors.newVec3D = function (x, y, z, isFloat)
{
	if (isFloat)
		return $$Helper.makeFloatVector(x, y, z);

	else
		return $$Helper.makeIntVector(x, y, z);
}

//==============================================================================
//--- File API class -----------------------------------------------------------
//==============================================================================

/**
 * <b>Developers never istantiate the <em>FileApi</em> class</b>: this is done internally by the SmartFoxServer 2X API; get a reference to it using the Extension's {@link getFileApi} method.
 *
 * @class
 * The <em>FileApi</em> class provides specialized API calls to interact with the file system.
 *
 * <h4>See also</h4>
 * <ul>
 * <li>{@link SFSApi} class</li>
 * <li>{@link BuddyApi} class</li>
 * <li>{@link GameApi} class</li>
 * <li>{@link MMOApi} class</li>
 * </ul>
 */
FileApi = function()
{
	this._javaApi = org.apache.commons.io.FileUtils
}

/**
 * Reads the contents of a file into a string using the default encoding for the Java Virtual Machine. The file is always closed.
 *
 * @param	{string} filePath	The path of the file to read.
 *
 * @return {string} The file contents.
 *
 * @throws An <em>IOException</em> Java exception in case of an I/O error.
 */
FileApi.prototype.readTextFile = function(filePath)
{
	return this._javaApi.readFileToString(new java.io.File(filePath));
}

/**
 * Writes a string to a file using the default encoding for the Java Virtual Machine, creating the file if it does not exist.
 *
 * @param	{string} filePath	The path of the file to write.
 * @param	{string} data		The content to write to the file.
 *
 * @throws An <em>IOException</em> Java exception in case of an I/O error.
 */
FileApi.prototype.writeTextFile = function(filePath, data)
{
	this._javaApi.writeStringToFile(new java.io.File(filePath), data);
}

/**
 * Returns the relative path to the current Extension folder.
 *
 * <p>Typically this method will return a string like "extensions/{name-of-extension}/".
 * The path is relative to the server root folder and it can be used to load external data files that are stored together with the Extension's JavaScript file(s).</p>
 *
 * @return {string} The path of the current Extension folder.
 */
FileApi.prototype.getCurrentFolder = function()
{
	return $$WrapperExt.getCurrentFolder();
}

/**
 * Copies a file to a new location.
 *
 * <p>This method copies the contents of the specified source path to the specified destination path.
 * The folder holding the destination file is created if it does not exist. If the destination file exists, then this method will overwrite it.</p>
 *
 * @param	{string} srcPath	The path to an existing file to copy.
 * @param	{string} destPath	The path of the destination file.
 *
 * @throws An <em>IOException</em> Java exception in case the source or destination is invalid, or an IO error occurs during copying.
 */
FileApi.prototype.copyFile = function(srcPath, destPath)
{
	this._javaApi.copyFile(new java.io.File(srcPath), new java.io.File(destPath));
}

/**
 * Moves a file to a new location.
 *
 * @param	{string} srcPath	The path to an existing file to be moved.
 * @param	{string} destPath	The path of the destination file.
 *
 * @throws An <em>IOException</em> Java exception in case the source or destination is invalid, or an IO error occurs during copying.
 * @throws An <em>FileExistsException</em> Java exception in case the destination file already exists.
 */
FileApi.prototype.moveFile = function(srcPath, destPath)
{
	this._javaApi.moveFile(new java.io.File(srcPath), new java.io.File(destPath));
}

/**
 * Deletes a file, never throwing an exception.
 *
 * @param	{string} filePath	The path of the file to delete.
 *
 * @return {boolean} <code>true</code> if the file was deleted, <code>false</code> otherwise.
 */
FileApi.prototype.deleteFile = function(filePath)
{
	return this._javaApi.deleteQuietly(new java.io.File(filePath));
}

/**
 * Deletes a folder including all its sub-folders, never throwing an exception.
 *
 * @param	{string} dirPath	The path of the folder to delete.
 *
 * @return {boolean} <code>true</code> if the folder was deleted, <code>false</code> otherwise.
 */
FileApi.prototype.deleteDirectory = function(dirPath)
{
	return this.deleteFile(dirPath);
}

/**
 * Makes a directory, including any necessary but nonexistent parent directories.
 *
 * @param	{string} fullPath	The path of the direcotry to create.
 *
 * @throws An <em>IOException</em> Java exception in case the directory cannot be created or the file already exists but is not a directory.
 */
FileApi.prototype.makeDirectory = function(fullPath)
{
	this._javaApi.forceMkdir(new java.io.File(fullPath));
}

/**
 * Reads the contents of a file into an array of bytes. The file is always closed.
 *
 * @param	{string} filePath	The path of the file to read.
 *
 * @return {byte[]} The file contents as a Java byte array (byte[]). The content of the array can be accessed using the methods of native JavaScript arrays.
 *
 * @throws An <em>IOException</em> Java exception in case of an I/O error.
 */
FileApi.prototype.readBinaryFile = function(filePath)
{
	return this._javaApi.readFileToByteArray(new java.io.File(filePath));
}

/**
 * Writes a Java byte array (byte[]) to a file, creating the file if it does not exist.
 *
 * @param	{string} filePath	The path of the file to write.
 * @param	{byte[]} data		The Java byte array to write to the file.
 *
 * @throws An <em>IOException</em> Java exception in case of an I/O error.
 */
FileApi.prototype.writeBinaryFile = function(filePath, data)
{
	this._javaApi.writeByteArrayToFile(new java.io.File(filePath), data);
}

/**
 * Tests whether the file denoted by the passed path is a normal file.
 *
 * @param	{string} filePath	The path of the file to check.
 *
 * @return {boolean} <code>true</code> if and only if the file denoted by the passed path exists and is a normal file; <code>false</code> otherwise.
 */
FileApi.prototype.isFile = function(filePath)
{
	return (new java.io.File(filePath).isFile());
}

/**
 * Tests whether the file denoted by the passed path is a directory.
 *
 * @param	{string} filePath	The path of the file to check.
 *
 * @return {boolean} <code>true</code> if and only if the file denoted by the passed path exists and is directory; <code>false</code> otherwise.
 */
FileApi.prototype.isDirectory = function(filePath)
{
	return (new java.io.File(filePath).isDirectory());
}

/**
 * Returns the length of the file denoted by the passed path.
 *
 * @param	{string} filePath	The path of the file to get the size of.
 *
 * @return {number} The length, in bytes, of the file denoted by the passed path.
 */
FileApi.prototype.getFileSize = function(filePath)
{
	return (new java.io.File(filePath).length());
}
