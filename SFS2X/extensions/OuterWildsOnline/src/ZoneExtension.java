import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.List;

import com.smartfoxserver.v2.api.CreateRoomSettings;
import com.smartfoxserver.v2.core.ISFSEvent;
import com.smartfoxserver.v2.core.SFSEventParam;
import com.smartfoxserver.v2.core.SFSEventType;
import com.smartfoxserver.v2.entities.Room;
import com.smartfoxserver.v2.entities.variables.RoomVariable;
import com.smartfoxserver.v2.extensions.BaseServerEventHandler;
import com.smartfoxserver.v2.extensions.SFSExtension;
import com.smartfoxserver.v2.persistence.room.FileRoomStorageConfig;
import com.smartfoxserver.v2.persistence.room.RoomStorageMode;
import com.smartfoxserver.v2.persistence.room.SFSStorageException;

public class ZoneExtension extends SFSExtension {

	private class RoomRemovedHandler extends BaseServerEventHandler {
		@Override
		public void handleServerEvent(ISFSEvent event) {

			trace("All players left, storing room");
			try {
				Room roomRemoved = (Room) event.getParameter(SFSEventParam.ROOM);
				getParentZone().getRoomPersistenceApi().saveRoom(roomRemoved);
			} catch (SFSStorageException e) {
				trace(e.getMessage());
				return;
			}
			trace("Room stored successfully");
		}
	}

	private class RoomAddedHandler extends BaseServerEventHandler {
		@Override
		public void handleServerEvent(ISFSEvent event) {
			trace("Room created, restoring room config");
			try {
				Room roomAdded = (Room) event.getParameter(SFSEventParam.ROOM);
				List<RoomVariable> roomVariables = FindRoomInListWithName(roomAdded.getName(),
						getParentZone().getRoomPersistenceApi().loadAllRooms()).getRoomVariables();

				for (RoomVariable roomVariable : roomVariables) {
					LocalDate timeCreated = LocalDate
							.parse(roomVariable.getSFSObjectValue().getUtfString("time").replace('/', '-'));
					int appraisals = roomVariable.getSFSObjectValue().getInt("apr");
					String creator = roomVariable.getSFSObjectValue().getUtfString("user");
					if (timeCreated.plusWeeks(appraisals).isBefore(LocalDate.now(ZoneOffset.UTC))) {
						trace("Removed " + creator + "'s message");
						roomVariables.remove(roomVariable);
					}
				}
				getApi().setRoomVariables(null, roomAdded, roomVariables);
			} catch (SFSStorageException e) {
				trace(e.getMessage());
				return;
			}
			trace("Room restored successfully");
		}
	}

	@Override
	public void init() {

		// Initialise Persistence API
		FileRoomStorageConfig cfg = new FileRoomStorageConfig();
		cfg.storeInactiveRooms = true;
		cfg.storeRoomVariables = true;
		cfg.skipStaticRooms = true;

		getParentZone().initRoomPersistence(RoomStorageMode.FILE_STORAGE, cfg);

		addEventHandler(SFSEventType.ROOM_ADDED, new RoomAddedHandler());
		addEventHandler(SFSEventType.ROOM_REMOVED, new RoomRemovedHandler());
	}

	private CreateRoomSettings FindRoomInListWithName(String name, List<CreateRoomSettings> roomSettings) {

		for (CreateRoomSettings room : roomSettings) {
			if (room.getName().equals(name)) {
				return room;
			}
		}
		return null;
	}

	private DayOfWeek NetDayToJavaDay(int netDay) {
		switch (netDay) {
		case 0:
			return DayOfWeek.SUNDAY;
		case 1:
			return DayOfWeek.MONDAY;
		case 2:
			return DayOfWeek.TUESDAY;
		case 3:
			return DayOfWeek.WEDNESDAY;
		case 4:
			return DayOfWeek.THURSDAY;
		case 5:
			return DayOfWeek.FRIDAY;
		case 6:
			return DayOfWeek.SATURDAY;
		default:
			return DayOfWeek.MONDAY;
		}
	}
}
