import java.util.List;

import com.smartfoxserver.v2.entities.User;
import com.smartfoxserver.v2.entities.data.ISFSObject;
import com.smartfoxserver.v2.extensions.BaseClientRequestHandler;
import com.smartfoxserver.v2.mmo.MMORoom;

public class ObjectSyncHandler extends BaseClientRequestHandler {

	@Override
	public void handleClientRequest(User user, ISFSObject data) {

		MMORoom mmoRoom = user.getCurrentMMORoom();
		List<User> recipients =  mmoRoom.getProximityList(user);
		if(recipients == null) {return;}
		data.putInt("userId", user.getId());
		send("SyncObject", data, recipients);
	
	}
}
	