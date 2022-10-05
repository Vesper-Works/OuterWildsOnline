import java.util.Arrays;

import com.smartfoxserver.v2.entities.User;
import com.smartfoxserver.v2.entities.data.ISFSObject;
import com.smartfoxserver.v2.entities.variables.RoomVariable;
import com.smartfoxserver.v2.entities.variables.SFSRoomVariable;
import com.smartfoxserver.v2.extensions.BaseClientRequestHandler;

public class PersistantDataHandler  extends BaseClientRequestHandler {

	@Override
	public void handleClientRequest(User user, ISFSObject data) {

	    RoomVariable dataObject = new SFSRoomVariable(data.getUtfString("name"), data.getSFSObject("data"));
	    dataObject.setPersistent(true);
	    getApi().setRoomVariables(null, user.getLastJoinedRoom(), Arrays.asList(dataObject));
	}
}
