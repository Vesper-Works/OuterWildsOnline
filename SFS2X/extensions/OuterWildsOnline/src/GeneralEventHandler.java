import java.io.IOException;
import java.time.Duration;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.List;
import java.util.Random;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClients;

/*import java.io.FileInputStream;
import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.Duration;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.Random;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClients;*/
import com.smartfoxserver.v2.entities.User;
import com.smartfoxserver.v2.entities.data.ISFSObject;
import com.smartfoxserver.v2.extensions.BaseClientRequestHandler;
import com.smartfoxserver.v2.mmo.MMORoom;

public class GeneralEventHandler extends BaseClientRequestHandler {

	@Override
	public void handleClientRequest(User user, ISFSObject data) {

		MMORoom mmoRoom = user.getCurrentMMORoom();
		List<User> recipients = mmoRoom.getProximityList(user);
		if (recipients == null) {
			return;
		}
		data.putInt("userId", user.getId());
		send("GeneralEvent", data, recipients);

		if (data.containsKey("jg")) {
			trace("Join Game");
		}
		if (data.containsKey("lg")) {
			trace("Leave Game");
		}
		if (data.containsKey("died")) {
			trace("Died");
		}

		String webhookURL = "https://discord.com/api/webhooks/957332933281185854/HhnSDNO563PyqLG6rYgmkGzRr8MzERBmRjQ-e5dtgILHY47Z5Hx5UzN_2sSPRgbQgsir";
		String jsonMessage = "{\"content\": \"" + "Error!" + "\"}";

		if (data.containsKey("jg")) {
			jsonMessage = "{\"embeds\":[{\"title\":\"" + user.getName()
					+ " has joined the multiverse\",\"description\":\"" + GetRandomDescriptionJoin()
					+ " <:HearthianSmile:930925503098024007>\",\"color\":\"39168\",\"footer\":{\"text\":\"Player Count: "
					+ user.getLastJoinedRoom().getSize().getUserCount() + "\"}}]}";

		} else if (data.containsKey("lg")) {

			Date date = new Date(user.getLoginTime()); // Get system default time zone
			ZoneId defaultZoneId = ZoneId.systemDefault(); // Convert Date to
			Instant instant = date.toInstant(); // Instant + default time zone.
			ZonedDateTime zonedDateTime = instant.atZone(defaultZoneId);

			jsonMessage = "{\"embeds\":[{\"title\":\"" + user.getName()
					+ " has left the multiverse\",\"description\":\"" + GetRandomDescriptionLeave()
					+ " <:HearthianCry:930925503295144027>\",\"color\":\"12059652\",\"footer\":{\"text\":\"Played for: "
					+ Duration.between(zonedDateTime, ZonedDateTime.now()).toMinutes() + " minutes\\nPlayer Count: "
					+ (user.getLastJoinedRoom().getSize().getUserCount() - 1) + "\"}}]}";
		}

		else if (data.containsKey("died")) {
			jsonMessage = "{\"embeds\":[{\"title\":\"" + user.getName() + " has died!\",\"description\":\""
					+ GetRandomDescriptionDied()
					+ " <:HearthianDead:930925503328710697>\",\"color\":\"0\",\"footer\":{\"text\":\""
					+ GetRandomFooterDied(data.getInt("died")) + "\"}}]}";
		}

		else {
			return;
		}
		HttpClient httpclient = HttpClients.createDefault();
		HttpResponse response;
		HttpPost post = new HttpPost(webhookURL);
		post.addHeader("Content-Type", "application/json");

		try {
			StringEntity params = new StringEntity(jsonMessage);
			post.setEntity(params);
			response = httpclient.execute(post);
		} catch (IOException ex) {
			ex.printStackTrace();
			return;
		}
		trace(response.getStatusLine());

	}

	private String GetRandomDescriptionLeave() {
		switch (new Random().nextInt(7)) {
		case 0:
			return "The stars were beautiful, weren't they? - Chert";
		case 1:
			return "We only get so much time, don't we? - Chert";
		case 2:
			return "I tell you what, this has been really fun. - Gabbro";
		case 3:
			return "The past is past, now, but that's...you know, that's okay! - Riebeck";
		case 4:
			return "It's the kind of thing that makes you glad you stopped and smelled the pine trees along the way, you know? - Gabbro";
		case 5:
			return "Even if it's over now, I had a good time learning. - Chert";
		case 6:
			return "Perhaps my journey has reached its end. - Solanum";
		}
		return "Error";
	}

	private String GetRandomDescriptionJoin() {
		switch (new Random().nextInt(12)) {
		case 0:
			return "Be curious on your journey! - Bells";
		case 1:
			return "Tell me, what's your plan once you're in space? - Hornfels";
		case 2:
			return "So it's launch day, eh? - Slate";
		case 3:
			return "No rush! Take your time. It might not even exist here... - Riebeck";
		case 4:
			return "Science compels us to explode the sun! - Pye";
		case 5:
			return "Fear of failure is a poor reason not to try. - Poke";
		case 6:
			return "I have my clan. I am not alone! - Poke";
		case 7:
			return "I'm really happy we're all here. - Esker";
		case 8:
			return "Still, this encounter feels special. - Solanum";
		case 9:
			return "Come, sit with me, my fellow traveler. - Chert";
		case 10:
			return "Go, find the others. What comes next cannot be done alone. - The Prisoner";
		case 11:
			return "If space is not filled with friends, then what a waste of space! - Ciborgm9";
		}
		return "Error";
	}

	private String GetRandomDescriptionDied() {
		switch (new Random().nextInt(10)) {
		case 0:
			return "Whoa, bad dream or something? - Slate";
		case 1:
			return "Well yeah, it's a death-trap, but a really powerful death trap. What, you suddenly care about safety now? - Slate";
		case 2:
			return "Had an exciting dream, did you? - Slate";
		case 3:
			return "You're lucky I don't have you grounded for medical reasons - Slate";
		case 4:
			return "I am unsure how to survive in this place without you. (I am unsure how to be me without you.) - Foli";
		case 5:
			return "The pain of your absence is sharp and haunting, and I would give anything not to know it; anything but never knowing you at all (which would be worse). - Keek";
		case 6:
			return "Is the hardest part of this tragedy not knowing who we may have lost? Or will the hardest part come later, when we learn? - Thatch";
		case 7:
			return "Hypothesis: There can exist too much lava. - Filix";
		case 8:
			return "Your journey is over now. You did well. - The Protagonist";
		case 9:
			return "Every decision is made in darkness. Only by making a choice can we learn whether it was right or not. - The Prisoner.";

		}
		return "Error";
	}

	private String GetRandomFooterDied(int deathType) {
		switch (deathType) {
		case 0:
			switch (new Random().nextInt(2)) {
			case 0:
				return "Don't worry, you'll come back around! | Standard death";
			case 1:
				return "Thank goodness death isn't a constant anymore. | Standard death";
			}
		case 1:
			switch (new Random().nextInt(2)) {
			case 0:
				return "Extreme relative motion during impact = ouchies. | Impact";
			case 1:
				return "They went out with a THWACK. | Impact";
			}
		case 2:
			switch (new Random().nextInt(2)) {
			case 0:
				return "They couldn't hold their breath any longer... | Asphyxiation";
			case 1:
				return "Alas, the vacuum of space allows no deep breaths. | Asphyxiation";
			}
		case 3:
			switch (new Random().nextInt(2)) {
			case 0:
				return "Turned into an incandescent light bulb. | Energy";
			case 1:
				return "Experiment concluded: bright lights are attractive to both moths and Hearthians. | Energy";
			}
		case 4:
			switch (new Random().nextInt(2)) {
			case 0:
				return "Vaporized by an angry blue sun. | Supernova";
			case 1:
				return "Super nova be like: | Supernova";
			}
		case 5:
			switch (new Random().nextInt(2)) {
			case 0:
				return "DON'T PET THE BIG FISH! | Digestion";
			case 1:
				return "Please don't feed the fish, thank you. | Digestion";
			}
		case 6:
			switch (new Random().nextInt(2)) {
			case 0:
				return "Well done! | Big Bang";
			case 1:
				return "A conscious observer entered the Eye. A new universe is born. | Big Bang";
			}
		case 7:
			switch (new Random().nextInt(2)) {
			case 0:
				return "Stuck between a rock and bigger rock. | Crushed";
			case 1:
				return "Compressed into a diamond. | Crushed";
			}
		case 8:
			switch (new Random().nextInt(2)) {
			case 0:
				return "Thank you Gabbro! | Meditation";
			case 1:
				return "Close your eyes, try again. | Meditation";
			}
		case 9:
			switch (new Random().nextInt(2)) {
			case 0:
				return "Time's a real bitch, huh? | Time Loop";
			case 1:
				return "Live. Die. Repeat. | Time Loop";
			}
		case 10:
			switch (new Random().nextInt(2)) {
			case 0:
				return "If it looks hot and feels hot don't touch it! | Lava";
			case 1:
				return "You just had to try and land on Hollow's Lantern, didn't you? | Lava";
			}
		case 11:
			switch (new Random().nextInt(2)) {
			case 0:
				return "Keep it going and you'll have an army of you! | Black Hole";
			case 1:
				return "Jumping into ATP's black hole, now that's an experiment! | Black Hole";
			}
		case 12:
			switch (new Random().nextInt(2)) {
			case 0:
				return "Dream dream dream dream dreeEeeEEEeeaam. | Dream";
			case 1:
				return "Keep on dreamin', kid. | Dream";
			}
		case 13:
			switch (new Random().nextInt(2)) {
			case 0:
				return "Dream explosion, the worst way to wake up! | Dream Explosion";
			case 1:
				return "Dream... Explosion..? | Dream Explosion";
			}
		case 14:
			switch (new Random().nextInt(2)) {
			case 0:
				return "Look up! | Crushed By Elevator";
			case 1:
				return "Elevator forced them to become smol | Crushed By Elevator";
			}
		}
		return "Error";
	}
}
