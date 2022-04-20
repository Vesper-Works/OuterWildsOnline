import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.smartfoxserver.v2.SmartFoxServer;
import com.smartfoxserver.v2.api.ISFSMMOApi;
import com.smartfoxserver.v2.core.ISFSEvent;
import com.smartfoxserver.v2.core.SFSEventParam;
import com.smartfoxserver.v2.core.SFSEventType;
import com.smartfoxserver.v2.entities.User;
import com.smartfoxserver.v2.entities.variables.UserVariable;
import com.smartfoxserver.v2.extensions.BaseServerEventHandler;
import com.smartfoxserver.v2.extensions.SFSExtension;
import com.smartfoxserver.v2.mmo.Vec3D;

public class MainExtension extends SFSExtension {

	private class UserVariablesHandler extends BaseServerEventHandler {
		@Override
		public void handleServerEvent(ISFSEvent event) {
			@SuppressWarnings("unchecked")
			
			List<UserVariable> variables = (List<UserVariable>) event.getParameter(SFSEventParam.VARIABLES);
			User user = (User) event.getParameter(SFSEventParam.USER);

			// Make a map of the variables list
			Map<String, UserVariable> varMap = new HashMap<String, UserVariable>();
			for (UserVariable var : variables) {
				varMap.put(var.getName(), var);
			}

			if (varMap.containsKey("x") && varMap.containsKey("z")) {
				Vec3D pos = new Vec3D(varMap.get("x").getDoubleValue().floatValue(), 1.0f,
						varMap.get("z").getDoubleValue().floatValue());

				mmoAPi.setUserPosition(user, pos, getParentRoom());
			}
		}

	}

	UserVariablesHandler userVariablesHandler;
	ISFSMMOApi mmoAPi;

	@Override
	public void init() {
		
		userVariablesHandler = new UserVariablesHandler();

		mmoAPi = SmartFoxServer.getInstance().getAPIManager().getMMOApi();

		addEventHandler(SFSEventType.USER_VARIABLES_UPDATE, userVariablesHandler);		
		addRequestHandler("SyncPlayerData", PlayerDataSyncHandler.class);
		addRequestHandler("SyncShipData", ShipDataSyncHandler.class);
		addRequestHandler("GeneralEvent", GeneralEventHandler.class);
		addRequestHandler("SyncObject", ObjectSyncHandler.class);
	

	}

}
