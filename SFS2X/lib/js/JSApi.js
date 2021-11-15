/*
* -----------------------------------------------
* Server-side Javascript Extension API
* @ver 1.0.0
* @since SFS2X 2.13
* -----------------------------------------------
* (c) copyright 2009-2017 GOTOANDPLAY snc
*/

$$API_LIB_PATH = 'lib/js/';

//--- Import SFS2X names from Java scope ---------------------------------------

var $$SfsInstance = com.smartfoxserver.v2.SmartFoxServer.getInstance();
var $$Helper = com.smartfoxserver.v2.extensions.js.JSHelper;
var $$RequestHandlers = new java.util.concurrent.ConcurrentHashMap();
var $$EventHandlers = new java.util.concurrent.ConcurrentHashMap();
var SFSEventType = com.smartfoxserver.v2.core.SFSEventType;
var SFSEventParam = com.smartfoxserver.v2.core.SFSEventParam;

// --- Import API modules ------------------------------------------------------

load($$API_LIB_PATH + 'LibApi.js');
load($$API_LIB_PATH + 'LibUtil.js');

// --- Global classes from Java scope ------------------------------------------

/**
 * Creates a new <em>SFSObject</em> instance.
 *
 * @class
 * <img src="java-icon.png"></img><br>
 * <em>SFSObject</em> and <em>SFSArray</em> classes represent a platform-neutral, high level Java objects that abstract the data transport between client and server.
 * They are used to respectively represent data in form of a map and a list; they can be nested and transport many different data types.</p>
 *
 * <p>These objects provide high speed serialization using the default SmartFoxServer binary protocol and the types distinction grants a fine-grained size control of data sent over the network.</p>
 *
 * <p>The following is a list of types supported by the <em>SFSObject</em> class:</p>
 * <ul>
 * <li>null</li>
 * <li>boolean</li>
 * <li>byte (8 bit integer)</li>
 * <li>short (16 bit integer)</li>
 * <li>int (32 bit integer)</li>
 * <li>long (64 bit integer)</li>
 * <li>float (32 bit floating point number)</li>
 * <li>double (64 bit double precision number)</li>
 * <li>utf-string (UTF-8 encoded string, with length up to 32 KBytes)</li>
 * <li>text (UTF-8 encoded string, with length up to 2 GBytes)</li>
 * <li>boolean array</li>
 * <li>byte array</li>
 * <li>short array</li>
 * <li>int array</li>
 * <li>long array</li>
 * <li>float array</li>
 * <li>double array</li>
 * <li>utf-string array</li>
 * <li>SFSObject</li>
 * <li>SFSArray</li>
 * </ul>
 *
 * <p><em>SFSObjects</em> and <em>SFSArrays</em> can be nested to create complex data structures.</p>
 *
 * <h4>Notes</h4>
 * <ul>
 * <li>For members of the <em>SFSObject</em> class, please [refer to its Javadoc]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/data/SFSObject.html}.</li>
 * <li>Strings are handled via UTF-8 encoding, to support all languages and character sets.</li>
 * <li>In JavaScript, long integer numbers are limited to [Number.MAX_SAFE_INTEGER]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER} (positive and negative, inclusive).
 * This is inconsistent with the max and min Long values available in Java, which are down to <code>-2^63</code> and up to <code>(2^63)-1</code>.</li>
 * </ul>
 *
 * <h4>See also</h4>
 * <ul>
 * <li>{@link SFSArray} class</li>
 * <li><img src="java-icon-small.png"></img> [SFSObject]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/data/SFSObject.html} class</li>
 * </ul>
 *
 * @example
 * <caption>In this simple example we create a new SFSObject to send the data of a combat vehicle to clients in a multiplayer game.<br>
 * We use a single Byte (signed 8-bit) to send the small integer value representing the vehicle's id, a Short (signed 16-bit) for the larger health value and an array of Int to transmit the x/y position of the vehicle.</caption>
 * var sfso = new SFSObject();
 * sfso.putByte("id", 10);                 // the vehicle id
 * sfso.putShort("health", 5000);          // the vehicle current health
 * sfso.putIntArray("pos", [120,150]);     // the vehicle x,y position on the terrain, as a nested array
 * sfso.putUtfString("name", "Hurricane"); // the vehicle name
 */
var SFSObject = Java.type('com.smartfoxserver.v2.extensions.js.SFSObjectJS');

/**
 * Creates a new <em>SFSArray</em> instance.
 *
 * @class
 * <img src="java-icon.png"></img><br>
 * <em>SFSObject</em> and <em>SFSArray</em> classes represent a platform-neutral, high level Java objects that abstract the data transport between client and server.
 * They are used to respectively represent data in form of a map and a list; they can be nested and transport many different data types.</p>
 *
 * <p>These objects provide high speed serialization using the default SmartFoxServer binary protocol and the types distinction grants a fine-grained size control of data sent over the network.</p>
 *
 * <p>The following is a list of types supported by the <em>SFSArray</em> class:</p>
 * <ul>
 * <li>null</li>
 * <li>boolean</li>
 * <li>byte (8 bit integer)</li>
 * <li>short (16 bit integer)</li>
 * <li>int (32 bit integer)</li>
 * <li>long (64 bit integer)</li>
 * <li>float (32 bit floating point number)</li>
 * <li>double (64 bit double precision number)</li>
 * <li>utf-string (UTF-8 encoded string, with length up to 32 KBytes)</li>
 * <li>text (UTF-8 encoded string, with length up to 2 GBytes)</li>
 * <li>boolean array</li>
 * <li>byte array</li>
 * <li>short array</li>
 * <li>int array</li>
 * <li>long array</li>
 * <li>float array</li>
 * <li>double array</li>
 * <li>utf-string array</li>
 * <li>SFSObject</li>
 * <li>SFSArray</li>
 * </ul>
 *
 * <p><em>SFSObjects</em> and <em>SFSArrays</em> can be nested to create complex data structures.<br>
 * Using a <em>SFSArray</em> can help to further reduce to a minimum the amount of bytes sent, because it avoids the overhead of key names for each item like in a <em>SFSObject</em>.</p>
 *
 * <h4>Notes</h4>
 * <ul>
 * <li>For members of the <em>SFSArray</em> class, please [refer to its Javadoc]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/data/SFSArray.html}.</li>
 * <li>Strings are handled via UTF-8 encoding, to support all languages and character sets.</li>
 * <li>In JavaScript, long integer numbers are limited to [Number.MAX_SAFE_INTEGER]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER} (positive and negative, inclusive).
 * This is inconsistent with the max and min Long values available in Java, which are down to <code>-2^63</code> and up to <code>(2^63)-1</code>.</li>
 * </ul>
 *
 * <h4>See also</h4>
 * <ul>
 * <li>{@link SFSObject} class</li>
 * <li><img src="java-icon-small.png"></img> [SFSArray]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/data/SFSArray.html} class</li>
 * </ul>
 *
 * @example
 * <caption>In this simple example we create a new SFSArray to send the data of a combat vehicle to clients in a multiplayer game.<br>
 * We use a single Byte (signed 8-bit) to send the small integer value representing the vehicle's id, a Short (signed 16-bit) for the larger health value and an array of Int to transmit the x/y position of the vehicle.</caption>
 * var sfsa = new SFSArray();
 * sfsa.addByte(10);               // the vehicle id
 * sfsa.addShort(5000);            // the vehicle current health
 * sfsa.addIntArray([120,150]);    // the vehicle x,y position on the terrain, as a nested array
 * sfsa.addUtfString("Hurricane"); // the vehicle name
 */
var SFSArray = Java.type('com.smartfoxserver.v2.extensions.js.SFSArrayJS');

/**
 * Creates a new <em>CreateRoomSettings</em> instance.
 *
 * @class
 * <img src="java-icon.png"></img><br>
 * The <em>CreateRoomSettings</em> class allows to configure how a new Room will work under many different aspects, from its size to the events it can fire, permissions and a lot more.
 *
 * <h4>Basic settings</h4>
 * <p>A minimal Room configuration should always contain the following parameters:</p>
 * <ul>
 * <li><strong>name</strong>: the name of the Room, must be unique</li>
 * <li><strong>password</strong>: (optional) the password to enter to join the Room, for private Rooms</li>
 * <li><strong>maxUsers</strong>: the maximum number of users allowed to join the Room</li>
 * <li><strong>maxVariablesAllowed</strong>: the maximum number of Room Variables allowed in the Room</li>
 * <li><strong>isGame</strong>: (optional, default <code>false</code>) a flag to indicate if the Room is going to be used for games (it is a "Game Room")</li>
 * <li><strong>maxSpectators</strong>: (optional) in a Game Room, the maximum number of spectators allowed to join it</li>
 * </ul>
 *
 * <h4>More settings</h3
 * <p>The following settings help defining other important features of a Room:</p>
 * <ul>
 * <li><strong>groupId</strong>: the name of the Group to which the Room will be assigned</li>
 * <li><strong>idDynamic</strong>: a flag indicating that the Room is dynamic</li>
 * <li><strong>isHidden</strong>: a flag indicating if the Room should concealed from the Room List sent to clients</li>
 * <li><strong>autoRemoveMode</strong>: a {@link SFSRoomRemoveMode} value to configure when the Room, if dynamic, should be destroyed</li>
 * <li><strong>roomVariables</strong>: an array of {@link SFSRoomVariable} objects that will be added to the Room upon creation</li>
 * <li><strong>extension</strong>: a {@link RoomExtensionSettings} instance defining the server side Extension to be dynamically attached to the Room, to add custom logic for games and applications</li>
 * </ul>
 *
 * <h4>Advanced settings</h4>
 * <p>The following settings help defines the most advanced features of a Room:</p>
 * <ul>
 * <li><strong>roomSettings</strong>: an {@link EnumSet} of {@link SFSRoomSettings} values that specify permissions and events used by the Room</li>
 * <li><strong>useWordsFilter</strong>: a flag to indicate if the bad words filter is enable on the Room</li>
 * <li><strong>customPlayerIdGeneratorClass</strong>: a custom class that handles the generation of player id(s) for Game Rooms</li>
 * <li><strong>allowOwnerOnlyInvitation</strong>: a flag indicating if the Room's owner only is allowed to send invitations to join the Room to other users</li>
 * <li><strong>roomProperties</strong>: a map of custom, server side only properties attached to the Room</li>
 * </ul>
 *
 * <h4>Notes</h4>
 * <ul>
 * <li>For members of the <em>CreateRoomSettings</em> class, please [refer to its Javadoc]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/api/CreateRoomSettings.html}.</li>
 * </ul>
 *
 * <h4>See also</h4>
 * <ul>
 * <li>{@link SFSApi#createRoom} method</li>
 * <li>{@link SFSRoomRemoveMode} enum</li>
 * <li>{@link SFSRoomVariable} class</li>
 * <li>{@link SFSRoomSettings} enum</li>
 * <li><img src="java-icon-small.png"></img> [CreateRoomSettings]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/api/CreateRoomSettings.html} class</li>
 * </ul>
 */
var CreateRoomSettings = Java.type('com.smartfoxserver.v2.api.CreateRoomSettings');

/**
 * Creates a new <em>RoomExtensionSettings</em> instance to be passed to the <em>CreateRoomSettings</em> class.
 *
 * @param	{string} id 		The id of the Extension, corresponding to the Extension folder name.
 * @param	{string} className	The Extension main JavaScript file or Java class.
 *
 * @class
 * <img src="java-icon.png"></img><br>
 * The <em>RoomExtensionSettings</em> class defines the server side Extension to be dynamically attached to a Room, to add custom logic for games and applications.
 *
 * <h4>Notes</h4>
 * <ul>
 * <li>For members of the <em>RoomExtensionSettings</em> class, please [refer to its Javadoc]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/api/CreateRoomSettings.RoomExtensionSettings.html}.</li>
 * </ul>
 *
 * <h4>See also</h4>
 * <ul>
 * <li>{@link CreateRoomSettings} class</li>
 * <li><img src="java-icon-small.png"></img> [CreateRoomSettings.RoomExtensionSettings]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/api/CreateRoomSettings.RoomExtensionSettings.html} class</li>
 * </ul>
 */
var RoomExtensionSettings = Java.type('com.smartfoxserver.v2.api.CreateRoomSettings.RoomExtensionSettings');

/**
 * Creates a new <em>CreateSFSGameSettings</em> instance.
 *
 * @class
 * <img src="java-icon.png"></img><br>
 * The <em>CreateSFSGameSettings</em> class extends the basic [CreateRoomSettings]{@link CreateRoomSettings} class providing all the settings required to create an <strong>SFSGame</strong>.
 *
 * <p>The SFSGame is a specialized Room, part of the SmartFoxServer 2X Game API. This provides many advanced features such as player matching, game invitations, public and private games, quick game joining, etc.<br>
 * For an introduction to the SFSGame features, see the <img src="java-icon-small.png"></img> [SFSGame]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/game/SFSGame.html} class documentation.</p>
 *
 * <h4>SFSGame settings</h4>
 * <p>The following parameters define the special SFSGame features:</p>
 * <ul>
 * <li><strong>isGamePublic</strong>: a flag indicating if the game is public or private. A public game can be joined by any player whose variables match the SFSGame Player Match Expression; private games are based on invitations sent by the SFSGame creator</li>
 * <li><strong>minPlayersToStartGame</strong>: the minimum number of players to start the game</li>
 * <li><strong>invitedPlayers</strong>: (private games only) a list of players to be invited to play the game</li>
 * <li><strong>searchableRooms</strong>: (private games only) a list of Rooms where the Game API should search for more players to invite. The API will look for more players if the number of people invited is smaller than the <em>minPlayersToStartGame</em> setting. This way friends can be added to the game and the system will find the missing players to start it</li>
 * <li><strong>leaveLastJoinedRoom</strong>: auto-remove players from their previous Room/s after successfully joining the new SFSGame</li>
 * <li><strong>playerMatchExpression</strong>: an expression to match players willing to play the game (by default no expression is used)</li>
 * <li><strong>spectatorMatchExpression</strong>: an expression to match spectators willing to attend to the game (by default no expression is used)</li>
 * <li><strong>invitationExpiryTime</strong>: the amount of time allowed for users to accept or refuse an invitation to play a game</li>
 * <li><strong>invitationParameters</strong>: optional custom parameters attached to the invitation. For example these could provide details about the inviter, the game, an invitation message, etc</li>
 * <li><strong>notifyGameStartedViaRoomVariable</strong>: automatically update a reserved Room Variable to signal that the game is started/stopped. The Room Variable uses the <em>global</em> setting to be broadcast outside of the Room; this can be used on the client side to show the game state in the available games list</li>
 * </ul>
 *
 * <h4>Notes</h4>
 * <ul>
 * <li>For members of the <em>CreateSFSGameSettings</em> class, please [refer to its Javadoc]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/game/CreateSFSGameSettings.html}.</li>
 * </ul>
 *
 * <h4>See also</h4>
 * <ul>
 * <li>{@link GameApi#createGame} method</li>
 * <li>{@link MatchExpression} class</li>
 * <li><img src="java-icon-small.png"></img> [CreateSFSGameSettings]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/game/CreateSFSGameSettings.html} class</li>
 * </ul>
 *
 * @extends CreateRoomSettings
 */
var CreateSFSGameSettings = Java.type('com.smartfoxserver.v2.game.CreateSFSGameSettings');

/**
 * Creates a new <em>CreateMMORoomSettings</em> instance.
 *
 * @class
 * <img src="java-icon.png"></img><br>
 * The <em>CreateMMORoomSettings</em> class extends the basic [CreateRoomSettings]{@link CreateRoomSettings} class adding new functionalities that are unique to an MMORoom.
 *
 * <p>For a full discussion of the MMORoom features, see the <img src="java-icon-small.png"></img> [MMORoom]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/mmo/MMORoom.html} class documentation.</p>
 *
 * <h4>MMORoom settings</h4>
 * <p>The following parameters define the MMORoom features:</p>
 * <ul>
 * <li><strong>defaultAOI</strong>: a <img src="java-icon-small.png"></img> [Vec3D]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/mmo/Vec3D.html} instance setting the 2D/3D positional range within which events are broadcast</li>
 * <li><strong>mapLimits</strong>: (optional) a {@link MapLimits} instance setting the upper and lower limits (along the X,Y,Z axes) of the virtual world represented by the MMORoom</li>
 * <li><strong>userMaxLimboSeconds</strong>: (optional, default <code>50</code>) the number of seconds a user can remain in the MMORoom without setting his initial position</li>
 * <li><strong>proximityListUpdateMillis</strong>: (optional, default <code>250</code>) the number of milliseconds between each proximity list update event sent to clients</li>
 * <li><strong>sendAOIEntryPoint</strong>: (optional, default <code>true</code>) a flag to indicate if the entry position of a user inside another player's Area of Interest should be sent in the proximity list update event</li>
 * </ul>
 *
 * <h4>Notes</h4>
 * <ul>
 * <li>Coordinates in <em>defaultAOI</em> and <em>mapLimits</em> settings must be passed as a <img src="java-icon-small.png"></img> [Vec3D]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/mmo/Vec3D.html} instances, but this class is not available in JavaScript due to constructor overloading in Java.
 * You can use the {@link Vectors.newVec3D} helper method to generate a <em>Vec3D</em> object as appropriate.</li>
 * <li>For members of the <em>CreateMMORoomSettings</em> class, please [refer to its Javadoc]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/mmo/CreateMMORoomSettings.html}.</li>
 * </ul>
 *
 * <h4>See also</h4>
 * <ul>
 * <li>{@link SFSApi#createRoom} method</li>
 * <li><img src="java-icon-small.png"></img> [CreateSFSGameSettings]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/mmo/CreateMMORoomSettings.html} class</li>
 * </ul>
 *
 * @extends CreateRoomSettings
 */
var CreateMMORoomSettings = Java.type('com.smartfoxserver.v2.mmo.CreateMMORoomSettings');

/**
 * Creates a new <em>MapLimits</em> instance to be passed to the <em>CreateMMORoomSettings</em> class.
 *
 * <p>The <em>MapLimits</em> parameters must be passed as a <img src="java-icon-small.png"></img> [Vec3D]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/mmo/Vec3D.html} instances, but this class is not available in JavaScript due to constructor overloading in Java.
 * You can use the {@link Vectors.newVec3D} helper method to generate a <em>Vec3D</em> object as appropriate.</p>
 *
 * @param	{Vec3D} low 	The lower coordinate limits.
 * @param	{Vec3D} high	The higher coordinate limits.
 *
 * @class
 * <img src="java-icon.png"></img><br>
 * The <em>MapLimits</em> class is a data container that holds the upper and lower limits (along the X,Y,Z axes) of the virtual world represented by an MMORoom.
 *
 * <h4>Notes</h4>
 * <ul>
 * <li>For members of the <em>MapLimits</em> class, please [refer to its Javadoc]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/mmo/CreateMMORoomSettings.MapLimits.html}.</li>
 * </ul>
 *
 * <h4>See also</h4>
 * <ul>
 * <li>{@link CreateMMORoomSettings} class</li>
 * <li><img src="java-icon-small.png"></img> [CreateMMORoomSettings.MapLimits]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/mmo/CreateMMORoomSettings.MapLimits.html} class</li>
 * </ul>
 */
var MapLimits = Java.type('com.smartfoxserver.v2.mmo.CreateMMORoomSettings.MapLimits');

/**
 * Creates a new <em>SFSUserVariable</em> instance.
 *
 * <p>Although the third parameter is optional, it is strongly recommended to use it. The reason is type autodetection of numbers (being integers or double precision numbers)
 * may fail in some corner cases (for example <code>n = Math.floor(100.0 - 99.0)</code> will be treated as a double instead of an integer as expected).</p>
 *
 * @param	{string} name 										The name of the User Variable.
 * @param	{boolean|number|string|SFSObject|SFSArray} value	The value of the User Variable; it can also be <code>null</code>.
 * @param	{VariableType} [type=null]	 						The type of the User Variable's value, among those listed in the <em>VariableType</em> enum; if <code>null</code>, type is autodetected.
 *
 * @class
 * <img src="java-icon.png"></img><br>
 * The <em>SFSUserVariable</em> class represents a User Variable, a custom value attached to each User object that gets automatically updated between client and server on every change.
 *
 * <p>User Variables are particularly useful to assign any custom data to a user, such as his current in-game status, profile data, scoring, etc.<br>
 * They support basic data types and nested complex objects:</p>
 * <ul>
 * <li>null</li>
 * <li>boolean</li>
 * <li>int (32 bit integer)</li>
 * <li>double (64 bit double precision number)</li>
 * <li>utf-string (UTF-8 encoded string, with length up to 32 KBytes)</li>
 * <li>SFSObject</li>
 * <li>SFSArray</li>
 * </ul>
 *
 * <p>User Variables are visibile to all users in the same Room. In other words all users in the same Room are able to read all other players' variables with the exclusion of those marked as hidden or private:</p>
 * <ul>
 * <li>an <strong>hidden</strong> User Variable is only available on the server-side and never transmitted to other clients, including its owner;</li>
 * <li>a <strong>private</strong> User Variable is only visible to its owner and never transmitted to other clients, including those in the same Room of the owner.</li>
 * </ul>
 *
 * <h4>Notes</h4>
 * <ul>
 * <li>For members of the <em>SFSUserVariable</em> class, please [refer to its Javadoc]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/variables/SFSUserVariable.html}.</li>
 * </ul>
 *
 * <h4>See also</h4>
 * <ul>
 * <li>{@link SFSApi#setUserVariables} method</li>
 * <li><img src="java-icon-small.png"></img> [SFSUserVariable]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/variables/SFSUserVariable.html} class</li>
 * </ul>
 */
var SFSUserVariable = Java.type('com.smartfoxserver.v2.extensions.js.SFSUserVariableJS');

/**
 * Creates a new <em>SFSRoomVariable</em> instance.
 *
 * <p>Although the third parameter is optional, it is strongly recommended to use it. The reason is type autodetection of numbers (being integers or double precision numbers)
 * may fail in some corner cases (for example <code>n1 = Math.floor(100.0 - 99.0)</code> will be treated as a double instead of an integer as expected).</p>
 *
 * @param	{string} name 										The name of the Room Variable.
 * @param	{boolean|number|string|SFSObject|SFSArray} value	The value of the Room Variable; it can also be <code>null</code>.
 * @param	{VariableType} [type=null]	 						The type of the Room Variable's value, among those listed in the <em>VariableType</em> enum; if <code>null</code>, type is autodetected.
 *
 * @class
 * <img src="java-icon.png"></img><br>
 * The <em>SFSRoomVariable</em> class represents a Room Variable, a custom value attached to a Room object that gets automatically updated between client and server on every change.
 *
 * <p>Room Variables are particularly useful to "attach" any custom data to a Room, such as the current game status in a game Room, the topic in chat Room, other Room-specific properties, etc.<br>
 * They support basic data types and nested complex objects:</p>
 * <ul>
 * <li>null</li>
 * <li>boolean</li>
 * <li>int (32 bit integer)</li>
 * <li>double (64 bit double precision number)</li>
 * <li>utf-string (UTF-8 encoded string, with length up to 32 KBytes)</li>
 * <li>SFSObject</li>
 * <li>SFSArray</li>
 * </ul>
 *
 * <p>Room Variables support a few different flags:</p>
 * <ul>
 * <li>a <strong>private</strong> Room Variable can only be modified by its creator;</li>
 * <li>a <strong>persisten</strong> Room Variable continues to exist even if its creator has left the Room; server-created Room Variables are removed;</li>
 * <li>a <strong>global</strong> Room Variable change causes an update event to be sent not only to all users in the Room, but also to all users in the Room Group to which the Room belongs;</li>
 * <li>an <strong>hidden</strong> Room Variable is only available on the server-side and never transmitted to the clients.</li>
 * </ul>
 *
 * <h4>Notes</h4>
 * <ul>
 * <li>For members of the <em>SFSRoomVariable</em> class, please [refer to its Javadoc]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/variables/SFSRoomVariable.html}.</li>
 * </ul>
 *
 * <h4>See also</h4>
 * <ul>
 * <li>{@link SFSApi#setRoomVariables} method</li>
 * <li><img src="java-icon-small.png"></img> [SFSRoomVariable]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/variables/SFSRoomVariable.html} class</li>
 * </ul>
 */
var SFSRoomVariable = Java.type('com.smartfoxserver.v2.extensions.js.SFSRoomVariableJS');

/**
 * Creates a new <em>SFSBuddyVariable</em> instance.
 *
 * <p>Although the third parameter is optional, it is strongly recommended to use it. The reason is type autodetection of numbers (being integers or double precision numbers)
 * may fail in some corner cases (for example <code>n1 = Math.floor(100.0 - 99.0)</code> will be treated as a double instead of an integer as expected).</p>
 *
 * @param	{string} name 										The name of the Buddy Variable.
 * @param	{boolean|number|string|SFSObject|SFSArray} value	The value of the Buddy Variable; it can also be <code>null</code>.
 * @param	{VariableType} [type=null]	 						The type of the Buddy Variable's value, among those listed in the <em>VariableType</em> enum; if <code>null</code>, type is autodetected.
 *
 * @class
 * <img src="java-icon.png"></img><br>
 * The <em>SFSBuddyVariable</em> class represents a Buddy Variable, a custom value attached to a Buddy in a Buddy List.
 *
 * <p>Buddy Variables work with the same principle of the User/Room Variables. The only difference is the logic by which they get propagated to other users: while Room Variables are broadcast to all clients in the same Room, Buddy Variables are sent to all users who have the variable owner in their Buddy Lists.<br>
 * They support basic data types and nested complex objects:</p>
 * <ul>
 * <li>null</li>
 * <li>boolean</li>
 * <li>int (32 bit integer)</li>
 * <li>double (64 bit double precision number)</li>
 * <li>utf-string (UTF-8 encoded string, with length up to 32 KBytes)</li>
 * <li>SFSObject</li>
 * <li>SFSArray</li>
 * </ul>
 *
 * <h4>Notes</h4>
 * <ul>
 * <li>For members of the <em>SFSBuddyVariable</em> class, please [refer to its Javadoc]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/buddylist/SFSBuddyVariable.html}.</li>
 * <li>Buddy Variables provide a special convention that allows variables to be "seen" by the buddies even if the owner is not online. All variable names starting with a dollar sign ($) will be <strong>persistent</strong> and available at any time whether the owner is online or not.</li>
 * </ul>
 *
 * <h4>See also</h4>
 * <ul>
 * <li>{@link BuddyApi#setBuddyVariables} method</li>
 * <li><img src="java-icon-small.png"></img> [SFSBuddyVariable]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/buddylist/SFSBuddyVariable.html} class</li>
 * </ul>
 */
var SFSBuddyVariable = Java.type('com.smartfoxserver.v2.extensions.js.SFSBuddyVariableJS');

/**
 * Creates a new <em>MMOItemVariable</em> instance.
 *
 * <p>Although the third parameter is optional, it is strongly recommended to use it. The reason is type autodetection of numbers (being integers or double precision numbers)
 * may fail in some corner cases (for example <code>n1 = Math.floor(100.0 - 99.0)</code> will be treated as a double instead of an integer as expected).</p>
 *
 * @param	{string} name 										The name of the MMOItem Variable.
 * @param	{boolean|number|string|SFSObject|SFSArray} value	The value of the MMOItem Variable; it can also be <code>null</code>.
 * @param	{VariableType} [type=null]	 						The type of the MMOItem Variable's value, among those listed in the <em>VariableType</em> enum; if <code>null</code>, type is autodetected.
 *
 * @class
 * <img src="java-icon.png"></img><br>
 * The <em>MMOItemVariable</em> class represents an MMOItem Variable, a custom value attached to an MMOItem inside an MMORoom.
 *
 * <p>MMOItem Variables behave exactly like User Variables, but can be updated or removed on the server side only.<br>
 * They support basic data types and nested complex objects:</p>
 * <ul>
 * <li>null</li>
 * <li>boolean</li>
 * <li>int (32 bit integer)</li>
 * <li>double (64 bit double precision number)</li>
 * <li>utf-string (UTF-8 encoded string, with length up to 32 KBytes)</li>
 * <li>SFSObject</li>
 * <li>SFSArray</li>
 * </ul>
 *
 * <h4>Notes</h4>
 * <ul>
 * <li>For members of the <em>MMOItemVariable</em> class, please [refer to its Javadoc]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/mmo/MMOItemVariable.html}.</li>
 * </ul>
 *
 * <h4>See also</h4>
 * <ul>
 * <li>{@link MMOItem}</li>
 * <li>{@link MMOApi#setMMOItemVariables} method</li>
 * <li><img src="java-icon-small.png"></img> [MMOItemVariable]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/mmo/MMOItemVariable.html} class</li>
 * </ul>
 */
var MMOItemVariable = Java.type('com.smartfoxserver.v2.extensions.js.MMOItemVariableJS');

/**
 * Creates a new <em>MatchExpression</em> instance.
 *
 * @param	{string} varName 								The name of the User/Room Variable or one of the properties listed in <em>RoomProperties</em> or <em>UserProperties</em> enums.
 * @param	{BoolMatch|NumberMatch|StringMatch} condition 	A matching condition among those provided by the <em>BoolMatch</em>, <em>NumberMatch</em> and <em>StringMatch</em> enums.
 * @param	{boolean|number|string} value					The value to compare against the User/Room Variable or property during the matching.
 *
 * @class
 * <img src="java-icon.png"></img><br>
 * The <em>MatchExpression</em> class represents a Match Expression, a querying system to search for Rooms or Users using custom criteria.
 *
 * <p>Match Expressions are built like "if" conditions in any common programming language. They work like queries in a database and can be used to search for Rooms or Users using custom criteria.
 * These expressions are extremely easy to create and concatenate and they can be used for many different filtering operations within the SFS2X framework.</p>
 *
 * <h4>Overview</h4>
 * <p>Match Expressions are made of three elements: a User/Room Variable name or property to query, a match operator expressing the required condition and the value to match the Variable or property against.
 * Additionally, any number of expressions can be linked together with the logical operators AND and OR, just like in regular "if" expressions.</p>
 * <p>The search options are not just limited to User/Room Variables names: the Match Expressions engine provides two extra classes, <em>RoomProperties</em> and <em>UserProperties</em>, where many specific attributes of the Room and User classes can be accessed.</p>
 *
 * <h4>Advanced features</h4>
 * <p>The Match Expressions offer advanced capabilities of searching through nested data structures such as <em>SFSObject</em> and <em>SFSArray</em>. This is done via a very simple dot-syntax as shown in a couple of the examples below.</p>
 * <p>The power of Match Expression doesn't end here. You can run multiple passes of matching if you need complex searches to be performed. For example you can run a first match and obtain a list of filtered Rooms and then use it to apply another expression to further refine your search, and so on and so forth.</p>
 *
 * <h4>Notes</h4>
 * <ul>
 * <li>For members of the <em>MatchExpression</em> class, please [refer to its Javadoc]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/match/MatchExpression.html}.</li>
 * </ul>
 *
 * <h4>See also</h4>
 * <ul>
 * <li>{@link SFSApi#findRooms} method</li>
 * <li>{@link SFSApi#findUsers} method</li>
 * <li>{@link GameApi#createGame} method</li>
 * <li>{@link RoomProperties}, {@link UserProperties} objects</li>
 * <li>{@link BoolMatch}, {@link NumberMatch}, {@link StringMatch} enums</li>
 * <li><img src="java-icon-small.png"></img> [MatchExpression]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/match/MatchExpression.html} class</li>
 * </ul>
 *
 * @example
 * <caption>In this example we create an expression that will look for users from Italy with a rank greater than 5.<br>
 * Both "rank" and "country" are User Variables set in our game.</caption>
 * var exp = new MatchExpression('rank', NumberMatch.GREATER_THAN, 5).and('country', StringMatch.EQUALS, 'Italy');
 *
 * @example
 * <caption>In this example, using some Room properties and a Room Variable name, we retrieve a list of Rooms that a user could join to play chess.</caption>
 * // Prepare a Match Expression
 * var exp = new MatchExpression(RoomProperties.IS_GAME, BoolMatch.EQUALS, true)
 * 			 .and(RoomProperties.HAS_FREE_PLAYER_SLOTS, BoolMatch.EQUALS, true)
 * 			 .and("isGameStarted", BoolMatch.EQUALS, false);
 * // Search Rooms
 * var joinableRooms = getApi().findRooms(getParentZone().getRoomListFromGroup("chess"), exp, 0);
 *
 * @example
 * <caption>In this example we traverse a Room Variable of type <em>SFSObject</em> via a very simple dot-syntax.<br>
 * The expression goes down deep into an <em>SFSObject</em> called "europe", taking the "italy" object (another <em>SFSObject</em>) and finally reading its "capital" field and matching it with another string.</caption>
 * var exp = new MatchExpression("europe.italy.capital", StringMatch.EQUALS, "Rome");
 *
 * @example
 * <caption>The following is another example involving <em>SFSObject</em> and <em>SFSArray</em> type Variables.<br>
 * From the "italy" <em>SFSObject</em> we obtain a "majorCities" <em>SFSArray</em> and we grab the third item in it (the ".3" expression means "give me the element at index == 3"). The item is again a <em>SFSObject</em> whose "name" property we finally compare to a the passed string.</caption>
 * var exp = new MatchExpression("europe.italy.majorCities.3.name", StringMatch.EQUALS, "Milan");
 */
var MatchExpression = Java.type('com.smartfoxserver.v2.entities.match.MatchExpression');

/**
 * Creates a new <em>MMOItem</em> instance.
 *
 * @param	{MMOItemVariable[]} [variables=null]	A list of <em>MMOItemVariable</em> objects assigned to the <em>MMOItem</em> upon creation.
 *
 * @class
 * The <em>MMOItem</em> class represents a non-player entity inside an MMORoom.
 *
 * <p>MMOItems can represent bonuses, triggers, bullets or any other non-player entites inside an MMORoom; these will be handled with the same Area of Interest (AOI) rules applicable to users.
 * This means that whenever one or more MMOItems fall within the AOI of a player, their presence will be notified to the client via a <em>PROXIMITY_LIST_UPDATE</em> event together with their id(s) and MMOItem Variables.</p>
 *
 * <h4>Notes</h4>
 * <ul>
 * <li>For members of the <em>MMOItem</em> class, please [refer to its Javadoc]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/mmo/MMOItem.html}.</li>
 * </ul>
 *
 * <h4>See also</h4>
 * <ul>
 * <li>{@link MMOApi#setMMOItemPosition} method</li>
 * <li>{@link MMOItemVariable} class</li>
 * <li><img src="java-icon-small.png"></img> [MMOItem]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/mmo/MMOItem.html} class</li>
 * </ul>
 *
 * @example
 * <caption>In this example we create a new <em>MMOItem</em>, attaching a couple of MMOItem Variables to it.</caption>
 * // Prepare the variables
 * var vars = [
 * 		new MMOItemVariable("type", "1"), // identifies the type of bonus based on our game rules
 * 		new MMOitemVariable("val", 100)   // the value of the bonus
 * 	   ];
 *
 * // Create the item
 * var bonus = new MMOItem(vars);
 *
 * // Add the MMOItem to the MMORoom at specific coordinates
 * getMMOApi().setMMOItemPosition(bonus, Vectors.newVec3D(10, 20, 5, false), theMMORoom);
 */
var MMOItem = Java.type('com.smartfoxserver.v2.mmo.MMOItem');

/**
 * <em>EnumSet</em> is an abstract Java class. Do not instantiate it and use its static methods instead.
 *
 * @class
 * <img src="java-icon.png"></img><br>
 * The <em>EnumSet</em> class is a specialized collection to use when an API method requires a list of enum values to be passed.
 *
 * <p></p>
 *
 * <h4>Notes</h4>
 * <ul>
 * <li>For members of the <em>EnumSet</em> class, please [refer to its Javadoc]{@link http://docs.oracle.com/javase/8/docs/api/java/util/EnumSet.html}.</li>
 * </ul>
 *
 * @example
 * <caption>In this simple example we create a Room, setting its permissions by means of an <em>EnumSet</em>.</caption>
 * var crs = new CreateRoomSettings();
 * crs.setName("chat#371");
 * crs.setMaxUsers(10);
 *
 * // Set Room permissions
 * crs.setRoomSettings(EnumSet.of(SFSRoomSettings.USER_ENTER_EVENT, SFSRoomSettings.USER_EXIT_EVENT, SFSRoomSettings.PUBLIC_MESSAGES));
 *
 * // Create the Room
 * getApi().createRoom(getParentZone(), crs, null, false, null, true, true);
 */
var EnumSet = Java.type('java.util.EnumSet');

// JSDoc not needed for this interface (never implemented by developers directly)
var InvitationCallback = Java.type('com.smartfoxserver.v2.entities.invitation.InvitationCallback');

// --- Global enums from Java scope --------------------------------------------

/**
 * <img src="java-icon.png"></img><br>
 * The <em>SFSRoomRemoveMode</em> enum lists all possible auto-removal modes of dynamically created Rooms.
 *
 * <p>Available <em>SFSRoomRemoveMode</em> values are:</p>
 * <ul>
 * <li><strong>DEFAULT</strong>: a regular Room is removed when it is empty and its creator is not connected anymore, while instead a game Room is removed when it is empty</li>
 * <li><strong>NEVER_REMOVE</strong>: the Room is never removed (use with caution)</li>
 * <li><strong>WHEN_EMPTY</strong>: the Room is removed immediately when the last user leaves it</li>
 * <li><strong>WHEN_EMPTY_AND_CREATOR_IS_GONE</strong>: the Room is removed when it is empty and its creator is not connected anymore</li>
 * </ul>
 *
 * <h5>Notes:</h5>
 * <ul>
 * <li>For members of the <em>SFSRoomRemoveMode</em> enum, please [refer to its Javadoc]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/variables/VariableType.html}.</li>
 * </ul>
 *
 * @enum
 */
var SFSRoomRemoveMode = Java.type('com.smartfoxserver.v2.entities.SFSRoomRemoveMode');

/**
 * <img src="java-icon.png"></img><br>
 * The <em>SFSRoomSettings</em> enum lists all valid data types for User, Room, Buddy and MMOItem Variables.
 *
 * <p>Available <em>SFSRoomSettings</em> values are:</p>
 * <ul>
 * <li><strong>ROOM_NAME_CHANGE</strong>: toggles the ability to change the name of the Room at runtime</li>
 * <li><strong>CAPACITY_CHANGE</strong>: toggles the ability to change the capacity of the Room at runtime</li>
 * <li><strong>PASSWORD_STATE_CHANGE</strong>: toggles the ability to change the password of the Room at runtime</li>
 * <li><strong>PUBLIC_MESSAGES</strong>: toggles the ability to send public messages in the Room</li>
 * <li><strong>USER_COUNT_CHANGE_EVENT</strong>: toggles the notification of changes in the count of users and spectators in the Room</li>
 * <li><strong>USER_ENTER_EVENT</strong>: toggles the notification of users entering the Room</li>
 * <li><strong>USER_EXIT_EVENT</strong>: toggles the notification of users leaving the Room</li>
 * <li><strong>USER_VARIABLES_UPDATE_EVENT</strong>: toggles the notification of User Variables changes the Room</li>
 * </ul>
 *
 * <h5>Notes:</h5>
 * <ul>
 * <li>For members of the <em>SFSRoomSettings</em> enum, please [refer to its Javadoc]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/variables/VariableType.html}.</li>
 * </ul>
 *
 * @enum
 */
var SFSRoomSettings = Java.type('com.smartfoxserver.v2.entities.SFSRoomSettings');

/**
 * <img src="java-icon.png"></img><br>
 * The <em>VariableType</em> enum lists all valid data types for User, Room, Buddy and MMOItem Variables.
 *
 * <p>Available <em>VariableType</em> values are:</p>
 * <ul>
 * <li><strong>NULL</strong>: a null Variable</li>
 * <li><strong>BOOL</strong>: a boolean Variable</li>
 * <li><strong>INT</strong>: an int Variable (32 bit integer)</li>
 * <li><strong>DOUBLE</strong>: a double Variable (64 bit double precision number)</li>
 * <li><strong>STRING</strong>: an utf-string Variable (UTF-8 encoded string, with length up to 32 KBytes)</li>
 * <li><strong>OBJECT</strong>: a Variable of type {@link SFSObject}</li>
 * <li><strong>ARRAY</strong>: a Variable of type {@link SFSArray}</li>
 * </ul>
 *
 * <h5>Notes:</h5>
 * <ul>
 * <li>For members of the <em>VariableType</em> enum, please [refer to its Javadoc]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/variables/VariableType.html}.</li>
 * </ul>
 *
 * @enum
 */
var VariableType = Java.type('com.smartfoxserver.v2.entities.variables.VariableType');

/**
 * <img src="java-icon.png"></img><br>
 * The <em>ClientDisconnectionReason</em> enum lists all possible disconnection reasons provided by the <em>USER_DISCONNECT</em> event.
 *
 * <p>Possible <em>ClientDisconnectionReason</em> values are:</p>
 * <ul>
 * <li><strong>IDLE</strong>: the client was disconnected because he was idle for longer than the time configured in the Zone as (<em>maxUserIdleTime</em> setting)</li>
 * <li><strong>KICK</strong>: the client was kicked</li>
 * <li><strong>BAN</strong>: the client was banned</li>
 * <li><strong>UNKNOWN</strong>: the disconnection reason was not detected</li>
 * </ul>
 *
 * <h5>Notes:</h5>
 * <ul>
 * <li>For members of the <em>ClientDisconnectionReason</em> enum, please [refer to its Javadoc]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/util/ClientDisconnectionReason.html}.</li>
 * </ul>
 *
 * <h5>See also:</h5>
 * <ul>
 * <li><img src="java-icon-small.png"></img> [SFSEventType.USER_DISCONNECT]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/core/SFSEventType.html#USER_DISCONNECT} event type</li>
 * </ul>
 *
 * @enum
 */
var ClientDisconnectionReason = Java.type('com.smartfoxserver.v2.util.ClientDisconnectionReason');

/**
 * <img src="java-icon.png"></img><br>
 * The <em>InvitationResponse</em> enum lists all possible replies to an invitation.
 *
 * <p>Possible <em>InvitationResponse</em> values are:</p>
 * <ul>
 * <li><strong>ACCEPT</strong>: accept the invitation</li>
 * <li><strong>REFUSE</strong>: refuse the invitation</li>
 * <li><strong>EXPIRED</strong>: the invitation expired before a reply was sent</li>
 * </ul>
 *
 * <h5>Notes:</h5>
 * <ul>
 * <li>For members of the <em>InvitationResponse</em> enum, please [refer to its Javadoc]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/invitation/InvitationResponse.html}.</li>
 * </ul>
 *
 * <h5>See also:</h5>
 * <ul>
 * <li>{@link GameApi#replyToInvitation} method</li>
 * </ul>
 *
 * @enum
 */
var InvitationResponse = Java.type('com.smartfoxserver.v2.entities.invitation.InvitationResponse');

/**
 * <img src="java-icon.png"></img><br>
 * The <em>RoomProperties</em> object lists all Room properties that can be queried using a Match Expression.
 *
 * <p>Available <em>RoomProperties</em> fields are:</p>
 * <ul>
 * <li><strong>GROUP_ID</strong>: the id of Group to which the Room belongs</li>
 * <li><strong>HAS_FREE_PLAYER_SLOTS</strong>: the Room has at least one free player slot</li>
 * <li><strong>IS_GAME</strong>: the Room's <em>isGame</em> flag</li>
 * <li><strong>IS_PRIVATE</strong>: the Room's <em>isPrivate</em> flag</li>
 * <li><strong>IS_TYPE_SFSGAME</strong>: the Room is of type SFSGame</li>
 * <li><strong>MAX_SPECTATORS</strong>: the Room's max number of spectators</li>
 * <li><strong>MAX_USERS</strong>: the Room's max number of users</li>
 * <li><strong>NAME</strong>: the name of the Room</li>
 * <li><strong>SPECTATOR_COUNT</strong>: the number of spectators in the Room</li>
 * <li><strong>USER_COUNT</strong>: the number of users in the Room</li>
 * </ul>
 *
 * <h5>Notes:</h5>
 * <ul>
 * <li>For members of the <em>RoomProperties</em> object, please [refer to its Javadoc]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/match/RoomProperties.html}.</li>
 * </ul>
 *
 * <h5>See also:</h5>
 * <ul>
 * <li>{@link MatchExpression} class</li>
 * </ul>
 *
 * @enum
 */
var RoomProperties = Java.type('com.smartfoxserver.v2.entities.match.RoomProperties');

/**
 * <img src="java-icon.png"></img><br>
 * The <em>UserProperties</em> object lists all User properties that can be queried using a Match Expression.
 *
 * <p>Available <em>UserProperties</em> fields are:</p>
 * <ul>
 * <li><strong>IS_IN_ANY_ROOM</strong>: the user is currently joined in at least one Room</li>
 * <li><strong>IS_NPC</strong>: the user is a Non-Player Charachter</li>
 * <li><strong>IS_PLAYER</strong>: the user is a player in the joined Room</li>
 * <li><strong>IS_SPECTATOR</strong>: the user is a spectator in the joined Room</li>
 * <li><strong>NAME</strong>: the name of the user</li>
 * <li><strong>PRIVILEGE_ID</strong>: the user's privilege id</li>
 * </ul>
 *
 * <h5>Notes:</h5>
 * <ul>
 * <li>For members of the <em>UserProperties</em> object, please [refer to its Javadoc]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/match/UserProperties.html}.</li>
 * </ul>
 *
 * <h5>See also:</h5>
 * <ul>
 * <li>{@link MatchExpression} class</li>
 * </ul>
 *
 * @enum
 */
var UserProperties = Java.type('com.smartfoxserver.v2.entities.match.UserProperties');

/**
 * <img src="java-icon.png"></img><br>
 * The <em>BoolMatch</em> enum lists all boolean conditions that can be used in a Match Expression.
 *
 * <p>Available <em>BoolMatch</em> values are:</p>
 * <ul>
 * <li><strong>EQUALS</strong>: the <code>bool1 == bool2</code> condition</li>
 * <li><strong>NOT_EQUALS</strong>: the <code>bool1 != bool2</code> condition</li>
 * </ul>
 *
 * <h5>Notes:</h5>
 * <ul>
 * <li>For members of the <em>BoolMatch</em> enum, please [refer to its Javadoc]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/match/BoolMatch.html}.</li>
 * </ul>
 *
 * <h5>See also:</h5>
 * <ul>
 * <li>{@link MatchExpression} class</li>
 * <li>{@link NumberMatch} enum</li>
 * <li>{@link StringMatch} enum</li>
 * </ul>
 *
 * @enum
 */
var BoolMatch = Java.type('com.smartfoxserver.v2.entities.match.BoolMatch');

/**
 * <img src="java-icon.png"></img><br>
 * The <em>NumberMatch</em> enum lists all numeric conditions that can be used in a Match Expression.
 *
 * <p>Available <em>NumberMatch</em> values are:</p>
 * <ul>
 * <li><strong>EQUALS</strong>: the <code>num1 == num2</code> condition</li>
 * <li><strong>GREATER_THAN</strong>: the <code>num1 > num2</code> condition</li>
 * <li><strong>GREATER_THAN_OR_EQUAL_TO</strong>: the <code>num1 >= num2</code> condition</li>
 * <li><strong>LESS_THAN</strong>: the <code>num1 < num2</code> condition</li>
 * <li><strong>LESS_THAN_OR_EQUAL_TO</strong>: the <code>num1 <= num2</code> condition</li>
 * <li><strong>NOT_EQUALS</strong>: the <code>num1 != num2</code> condition</li>
 * </ul>
 *
 * <h5>Notes:</h5>
 * <ul>
 * <li>For members of the <em>NumberMatch</em> enum, please [refer to its Javadoc]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/match/NumberMatch.html}.</li>
 * </ul>
 *
 * <h5>See also:</h5>
 * <ul>
 * <li>{@link MatchExpression} class</li>
 * <li>{@link BoolMatch} enum</li>
 * <li>{@link StringMatch} enum</li>
 * </ul>
 *
 * @enum
 */
var NumberMatch = Java.type('com.smartfoxserver.v2.entities.match.NumberMatch');

/**
 * <img src="java-icon.png"></img><br>
 * The <em>StringMatch</em> enum lists all string-related conditions that can be used in a Match Expression.
 *
 * <p>Available <em>StringMatch</em> values are:</p>
 * <ul>
 * <li><strong>CONTAINS</strong>: the <code>str1.indexOf(str2) > -1</code> condition</li>
 * <li><strong>ENDS_WITH</strong>: the <code>str1.endsWith(str2)</code> condition</li>
 * <li><strong>EQUALS</strong>: the <code>str1.equals(str2)</code> condition</li>
 * <li><strong>NOT_EQUALS</strong>: the <code>!str1.equals(str2)</code> condition</li>
 * <li><strong>STARTS_WITH</strong>: the <code>str1.startsWith(str2)</code> condition</li>
 * </ul>
 *
 * <h5>Notes:</h5>
 * <ul>
 * <li>For members of the <em>StringMatch</em> enum, please [refer to its Javadoc]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/match/StringMatch.html}.</li>
 * </ul>
 *
 * <h5>See also:</h5>
 * <ul>
 * <li>{@link MatchExpression} class</li>
 * <li>{@link BoolMatch} enum</li>
 * <li>{@link NumberMatch} enum</li>
 * </ul>
 *
 * @enum
 */
var StringMatch = Java.type('com.smartfoxserver.v2.entities.match.StringMatch');

/**
 * <img src="java-icon.png"></img><br>
 * The <em>SFSEventType</em> object lists all server-side events dispatched to an Extension, provided an handler was registered.
 *
 * <p>Available <em>SFSEventType</em> fields are:</p>
 * <ul>
 * <li><strong>BUDDY_ADD</strong>: the event fired when a user is added in the Buddy List of another client</li>
 * <li><strong>BUDDY_BLOCK</strong>: the event fired when a Buddy is blocked in user's Buddy List</li>
 * <li><strong>BUDDY_LIST_INIT</strong>: the event fired when a user initializes his Buddy List</li>
 * <li><strong>BUDDY_MESSAGE</strong>: the event fired when a Buddy Message is exchanged between two buddies</li>
 * <li><strong>BUDDY_ONLINE_STATE_UPDATE</strong>: the event fired when a buddy changes his online state</li>
 * <li><strong>BUDDY_REMOVE</strong>: the event fired when a user is removed in the Buddy List of another client</li>
 * <li><strong>BUDDY_VARIABLES_UPDATE</strong>: the event fired when one or more Buddy Variables are set by a user</li>
 * <li><strong>FILE_UPLOAD</strong>: the event fired when one or more files have been uploaded by a user connected in the current Zone</li>
 * <li><strong>GAME_INVITATION_FAILURE</strong>: the event fired after a private SFSGame has finished the cycle of invitations with an error</li>
 * <li><strong>GAME_INVITATION_SUCCESS</strong>: the event fired after a private SFSGame has finished the cycle of invitations successfully</li>
 * <li><strong>PLAYER_TO_SPECTATOR</strong>: the event fired when a user joined in a Game Room as a player is turned into a spectator</li>
 * <li><strong>PRIVATE_MESSAGE</strong>: the event fired when a private message is sent by a client</li>
 * <li><strong>PUBLIC_MESSAGE</strong>: the event fired when a public message is sent by a client</li>
 * <li><strong>ROOM_ADDED</strong>: the event fired after a new Room was created in the current Zone</li>
 * <li><strong>ROOM_REMOVED</strong>: the event fired after a Room was removed from the current Zone</li>
 * <li><strong>ROOM_VARIABLES_UPDATE</strong>: the event fired when one or more Room Variables are set</li>
 * <li><strong>SERVER_READY</strong>: the event fired when SmartFoxServer has completed the boot phase</li>
 * <li><strong>SPECTATOR_TO_PLAYER</strong>: the event fired when a user joined in a Game Room as a spectator is turned into a player</li>
 * <li><strong>USER_DISCONNECT</strong>: the event fired after a user disconnects himself or is disconnected</li>
 * <li><strong>USER_JOIN_ROOM</strong>: the event fired after a user has joined a Room</li>
 * <li><strong>USER_JOIN_ZONE</strong>: the event fired after a successful user login</li>
 * <li><strong>USER_LEAVE_ROOM</strong>: the event fired after a user has left a Room</li>
 * <li><strong>USER_LOGIN</strong>: the event fired when a user sends a login request</li>
 * <li><strong>USER_LOGOUT</strong>: the event fired after a user logged out of the current Zone</li>
 * <li><strong>USER_RECONNECTION_SUCCESS</strong>: the event fired when the HRC system is active and a client was successfully reconnected (feature not available for JavaScript clients)</li>
 * <li><strong>USER_RECONNECTION_TRY</strong>: the event fired when the HRC system is active and a client is trying to reconnect (feature not available for JavaScript clients)</li>
 * <li><strong>USER_VARIABLES_UPDATE</strong>: the event fired when one or more User Variables are set</li>
 * </ul>
 *
 * <h5>Notes:</h5>
 * <ul>
 * <li>For members of the <em>SFSEventType</em> object, please [refer to its Javadoc]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/core/SFSEventType.html}.</li>
 * </ul>
 *
 * <h5>See also:</h5>
 * <ul>
 * <li>{@link addEventHandler} method</li>
 * </ul>
 *
 * @enum
 */
var SFSEventType = Java.type('com.smartfoxserver.v2.core.SFSEventType');

// --- Global functions --------------------------------------------------------

var asJavaList = $$Util.toList;
var asArray = $$Util.toArray;

// --- Sub API instances -------------------------------------------------------

var $$Api_Instance = new SFSApi();
var $$GameApi_Instance = new GameApi();
var $$BuddyApi_Instance = new BuddyApi();
var $$MMOApi_Instance = new MMOApi();
var $$FileApi_Instance = new FileApi();

// --- Public methods ----------------------------------------------------------

/**
 * Includes other JavaScript files in the Extension.<br>
 * This helps writing modular code, where classes, functions and other objects are divided into separate folders and/or files.
 *
 * @param	{string} scriptPath	The path of the JavaScript file to be included, relative to the main Extension script's folder.
 */
function include(scriptPath)
{
	var path = 	com.smartfoxserver.v2.config.DefaultConstants.EXTENSION_FOLDER + $$WrapperExt.getName() + "/" + scriptPath;
	load(path);
}

/**
 * Outputs the passed arguments to the console and log file.<br>
 * This is useful for remote debugging when developing Extensions.
 *
 * @param	{...*} arguments	Any number of strings or objects to trace.
 */
function trace()
{
	var args = Array.prototype.slice.call(arguments);
	var message = args.join(" ");

	$$WrapperExt.trace(message);
}

/**
 * Returns a reference to the <em>SFSApi</em> class instance, providing access to the main SmartFoxServer 2X server side API.
 *
 * <h5>See also:</h5>
 * <ul>
 * <li>{@link getBuddyApi} method</li>
 * <li>{@link getGameApi} method</li>
 * <li>{@link getMMOApi} method</li>
 * <li>{@link getFileApi} method</li>
 * </ul>
 *
 * @return {SFSApi} A reference to the <em>SFSApi</em> class instance.
 */
function getApi()
{
	return $$Api_Instance;
}

/**
 * Returns a reference to the <em>BuddyApi</em> class instance, providing access to the specialized server side API related to Buddy List features.
 *
 * @return {BuddyApi} A reference to the <em>BuddyApi</em> class instance.
 */
function getBuddyApi()
{
	return $$BuddyApi_Instance;
}

/**
 * Returns a reference to the <em>GameApi</em> class instance, providing access to the specialized server side API related to SFSGame features.
 *
 * @return {GameApi} A reference to the <em>GameApi</em> class instance.
 */
function getGameApi()
{
	return $$GameApi_Instance;
}

/**
 * Returns a reference to the <em>MMOApi</em> class instance, providing access to the specialized server side API related to MMO features.
 *
 * @return {MMOApi} A reference to the <em>MMOApi</em> class instance.
 */
function getMMOApi()
{
	return $$MMOApi_Instance;
}

/**
 * Returns a reference to the <em>FileApi</em> class instance, providing access to the specialized server side API related to files management.
 *
 * @return {FileApi} A reference to the <em>FileApi</em> class instance.
 */
function getFileApi()
{
	return $$FileApi_Instance;
}

/**
 * Returns a reference to the <img src="java-icon-small.png"></img> [SFSDBManager]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/db/SFSDBManager.html} class instance attached to the Zone to which the Extension belongs.
 *
 * <p>The Database Manager takes care of the connection to a database using either JDBC native drivers or JDBC-ODBC bridge; it provides configurable connection pooling for optimal performance and resource usage.<br>
 * Each Zone runs its own Database Manager, which can be configured via the Zone Configurator module in the SmartFoxServer 2X Administration Tool.</p>
 *
 * @return {SFSDBManager} A reference to the <img src="java-icon-small.png"></img> [SFSDBManager]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/db/SFSDBManager.html} class instance.
 */
function getDBManager()
{
	return $$WrapperExt.getParentZone().getDBManager();
}

/**
 * Sends an Extension message/response to a list of recipients.
 *
 * <p>The Extension response can be sent using the UDP protocol instead of the default TCP protocol. This is an unrealiable network protocol that does not guarantee delivery and ordering of the packets, but it can be useful for fast data transfer speed in real-time type games (typically for position/transformation updates).<br>
 * UDP messages can be sent to clients if: 1) the client technology supports it (for example HTML5 clients DO NOT support UDP); 2) the client has already initialized the UDP protocol transmission.</p>
 *
 * @param	{string} cmdName		The name of the command, which identifies an action that should be executed by the client, or a response that the client is waiting for.
 * @param	{SFSObject} params		An <em>SFSObject</em> containing custom data to be sent to the client. If <code>null</code> is passed, no other data than the command name is sent.
 * @param	{SFSUser[]} recipients	An array of <img src="java-icon-small.png"></img> [SFSUser]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSUser.html} objects identifying the recipients of the message.
 * @param	{boolean} [isUdp=false]	If <code>true</code>, the message will be sent using the UDP protocol.
 *
 * @example
 * <caption>In this example we register a request handler for command "sum" during the Extension initialization.
 * The Extension can then receive the "sum" request containing two integers from any client, calculate their sum and send it back to the requester.</caption>
 * function init()
 * {
 * 	// Register client request handlers
 * 	addRequestHandler("sum", onSumRequest);
 * }
 *
 * function onSumRequest(inParams, sender)
 * {
 * 	var n1 = inParams.getInt("n1");
 * 	var n2 = inParams.getInt("n2");
 *
 * 	var outParams = new SFSObject();
 * 	outParams.putInt("s", n1+n2);
 *
 * 	// Send response
 * 	send("sum", outParams, [sender]);
 * }
 */
function send(cmdName, params, recipients, isUdp)
{
	$$WrapperExt.send(cmdName, params, recipients, isUdp);
}

/**
 * Registers a request handler for a specific command.
 *
 * <p>Request handlers can be registered in the Extension's <em>init</em> method.</p>
 *
 * @param	{string} cmdName			The name of the command, which identifies the request sent by the client.
 * @param	{reqHandlerFn} reqHandlerFn	The function that will handle the incoming request.
 *
 * @example
 * <caption>In this example we register a request handler for command "sum" during the Extension initialization.
 * The Extension can then receive the "sum" request containing two integers from any client, calculate their sum and send it back to the requester.</caption>
 * function init()
 * {
 * 	// Register client request handlers
 * 	addRequestHandler("sum", onSumRequest);
 * }
 *
 * function onSumRequest(inParams, sender)
 * {
 * 	var n1 = inParams.getInt("n1");
 * 	var n2 = inParams.getInt("n2");
 *
 * 	var outParams = new SFSObject();
 * 	outParams.putInt("s", n1+n2);
 *
 * 	// Send response
 * 	send("sum", outParams, [sender]);
 * }
 */
function addRequestHandler(cmdName, reqHandlerFn)
{
	$$RequestHandlers.put(cmdName, reqHandlerFn);
}

/**
 * This callback function is called when the Extension receives a request from a client for which an handler has been registered using the {@link addRequestHandler} method.
 *
 * @callback reqHandlerFn
 *
 * @param	{SFSObject} params	The <em>SFSObject</em> containing the parameters attached to the client request.
 * @param	{SFSUser} sender	The <img src="java-icon-small.png"></img> [SFSUser]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSUser.html} object identifying the sender of the request.
 */

/**
 * Registers an handler for an inner server event.
 *
 * <p>All available event types fired by the server are listed in the <em>SFSEventType</em> enum.<br>
 * Event handlers can be registered in the Extension's <em>init</em> method; they receive an <img src="java-icon-small.png"></img> [SFSEvent]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/core/SFSEvent.html} object as the only parameter.</p>
 *
 * <h5>See also:</h5>
 * <ul>
 * <li>{@link SFSEventType} enum</li>
 * <li><img src="java-icon-small.png"></img> [SFSEvent]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/core/SFSEvent.html} class</li>
 * </ul>
 *
 * @param	{SFSEventType} eventType	One of the event types listed in the <em>SFSEventType</em> enum.
 * @param	{evtHandlerFn} evtHandlerFn	The function that will handle the event.
 *
 * @example
 * <caption>In this example we register an handler for the <em>SERVER_READY</em> event type during the Extension initialization.</caption>
 * function init()
 * {
 * 	// Register event handlers
 * 	addEventHandler(SFSEventType.SERVER_READY, onExtensionReady);
 * }
 *
 * function onExtensionReady(event)
 * {
 * 	trace("Extension is ready");
 * }
 */
function addEventHandler(eventType, evtHandlerFn)
{
	$$EventHandlers.put(eventType, evtHandlerFn);
	$$WrapperExt.addEventListener(eventType, $$WrapperExt);
}

/**
 * This callback function is called when the Extension receives an event fired by the server for which an handler has been registered using the {@link addEventHandler} method.
 *
 * @callback evtHandlerFn
 *
 * @param	{SFSEvent} event	The <img src="java-icon-small.png"></img> [SFSEvent]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/core/SFSEvent.html} object containing the parameters of the specific event.
 */

/**
 * Returns the <img src="java-icon-small.png"></img> [SFSRoom]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSRoom.html} object to which this Extension is attached (for Room-level Extensions only).
 *
 * @return {SFSRoom} The <img src="java-icon-small.png"></img> [SFSRoom]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSRoom.html} object to which the Extension is attached, or <code>null</code> if this is not a Room-level Extension.
 */
function getParentRoom()
{
	return $$WrapperExt.getParentRoom();
}

/**
 * Returns the <img src="java-icon-small.png"></img> [SFSZone]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSZone.html} object which is parent to this Extension.
 *
 * <p>If case of a Zone-level Extension, this method returns its parent Extension; in case of a Room-level Extension, it returns the Zone to which the Room belongs.</p>
 *
 * @return {SFSZone} The <img src="java-icon-small.png"></img> [SFSZone]{@link http://docs2x.smartfoxserver.com/api-docs/javadoc/server/com/smartfoxserver/v2/entities/SFSZone.html} object to which the Extension belongs.
 */
function getParentZone()
{
	return $$WrapperExt.getParentZone();
}

/**
 * Returns the relative path to the current Extension folder.
 *
 * <p>Typically this method will return a string like "extensions/{name-of-extension}/".
 * The path is relative to the server root folder and it can be used to load external data files that are stored together with the Extension's JavaScript file(s).</p>
 *
 * @return {string} The path of the current Extension folder.
 */
function getCurrentFolder()
{
	return $$WrapperExt.getCurrentFolder();
}

/**
 * Changes the thread safety setting of the current Extension. By default thread-safety is enabled.
 *
 * <h5>Important note:</h5>
 * <ul>
 * <li>Disabling the Extension's thread safety can be risky. JavaScript is not a thread-safe language, so disabling the thread safety will introduce concurrency issues that can be solved by using the appropriate Java classes/collections only.<br>
 * Learn more about concurrency in JavaScript Extensions [in this article]{@link http://docs2x.smartfoxserver.com/ServerSideJS/advanced-concepts}.</li>
 * </ul>
 *
 * @param	{boolean} value	If <code>false</code>, the Extension will run as non thread-safe.
 */
function setThreadSafe(value)
{
	$$WrapperExt.setThreadSafe(value);
}

// --- Private methods ---------------------------------------------------------

function $$handleClientRequest(cmd, params, sender)
{
	var handlerFn = $$RequestHandlers.get(cmd);

	if (handlerFn === null)
	{
		$$WrapperExt.getLogger().error
		(
			"No handlers for Extension command: " + cmd +
			", Zone: " + getParentZone() +
			", EXT: " + $$WrapperExt.getName() +
			", Level: " + $$WrapperExt.getLevel()
		);

		return;
	}

	// Invoke request handler
	handlerFn(params, sender);
}

function $$handleServerEvent(sfsEvent)
{
	var evtType = sfsEvent.getType();
	var evtHandler = $$EventHandlers.get(evtType);

	if (evtHandler === null)
	{
		$$WrapperExt.getLogger().error("Unknown SFSEvent handler for type: " + evtType);
		return;
	}

	// Invoke event handler
	evtHandler(sfsEvent);
}

function $$handleInternalMessage(cmd, params)
{
	var targetFn = this.handleInternalMessage;
	var res = null;

	if (targetFn)
		res = targetFn(cmd, params);

	return res;
}

function $$destroy()
{
	// Clear internal data
	$$RequestHandlers.clear();
	$$EventHandlers.clear();

	// Call Extension's own destroy, if available
	if (this.destroy)
		destroy();
}
