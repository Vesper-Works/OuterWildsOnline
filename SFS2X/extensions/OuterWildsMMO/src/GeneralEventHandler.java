import java.io.FileInputStream;
import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Paths;
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
import com.smartfoxserver.v2.entities.User;
import com.smartfoxserver.v2.entities.data.ISFSObject;
import com.smartfoxserver.v2.extensions.BaseClientRequestHandler;
import com.smartfoxserver.v2.mmo.MMORoom;

public class GeneralEventHandler  extends BaseClientRequestHandler {

	@Override
	public void handleClientRequest(User user, ISFSObject data) {

		MMORoom mmoRoom = user.getCurrentMMORoom();
		List<User> recipients =  mmoRoom.getProximityList(user);
		if(recipients == null) {return;}
		data.putInt("userId", user.getId());
		send("GeneralEvent", data, recipients);
		
		if(data.containsKey("debug")) {
			return;
		}
	
		String webhookURL = "";
		try {
			webhookURL = new String(Files.readAllBytes(Paths.get(System.getProperty("user.dir")+"\\extensions\\OuterWildsMMO\\webhookURL.txt")));
		} catch (IOException e) {
			return;
		}
		String jsonMessage = "{\"content\": \"" + "Error!" + "\"}";
				
		if(data.containsKey("jg")) {
			jsonMessage = "{\"embeds\":[{\"title\":\""+user.getName()+" has joined the multiverse\",\"description\":\""+GetRandomDescriptionJoin()+" <:HearthianSmile:930925503098024007>\",\"color\":\"39168\",\"footer\":{\"text\":\"Player Count: "+user.getLastJoinedRoom().getSize().getUserCount()+"\"}}]}";
	
		}
		else if(data.containsKey("lg")) {
			
			Date date = new Date(user.getLoginTime());
			// Get system default time zone id.
			ZoneId defaultZoneId = ZoneId.systemDefault();
			// Convert Date to Instant.
			Instant instant = date.toInstant();
			// Instant + default time zone.
			ZonedDateTime zonedDateTime = instant.atZone(defaultZoneId);
			
			jsonMessage = "{\"embeds\":[{\"title\":\""+user.getName()+" has left the multiverse\",\"description\":\""+GetRandomDescriptionLeave()+" <:HearthianCry:930925503295144027>\",\"color\":\"12059652\",\"footer\":{\"text\":\"Played for: "+Duration.between(zonedDateTime, ZonedDateTime.now()).toMinutes() +" minutes\\nPlayer Count: "+(user.getLastJoinedRoom().getSize().getUserCount()-1)+"\"}}]}";	}
	
		else if(data.containsKey("died")) {
						
			jsonMessage = "{\"embeds\":[{\"title\":\""+user.getName()+" has died!\",\"description\":\""+GetRandomDescriptionDied()+" <:HearthianDead:930925503328710697>\",\"color\":\"0\"}]}";	}
		
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
	        }catch (IOException ex) {
	            ex.printStackTrace();
	            return;
	        }
	        trace(response.getStatusLine());
	}
	private String GetRandomDescriptionLeave() {
		switch(new Random().nextInt(9)) {
		  case 0:
			  	 return "Until next time!";
		  case 1:
			     return "See you next time, Hatchling";
		  case 2:
			     return "The stars were beautiful, weren't they?";
		  case 3:
			     return "We only get so much time, don't we?";
		  case 4:
			     return "I tell you what, this has been really fun.";
		  case 5:
			     return "The past is past, now, but that's...you know, that's okay!";
		  case 6:
			     return "It's the kind of thing that makes you glad you stopped and smelled the pine trees along the way, you know?";
		  case 7:
			     return "Even if it's over now, I had a good time learning.";
		  case 8:
			     return "Perhaps my journey has reached its end.";
		}
		return "Error";
	}
	
	private String GetRandomDescriptionJoin() {
		switch(new Random().nextInt(12)) {
		  case 0:
			  	 return "Be curious on your journey!";
		  case 1:
			     return "Tell me, what's your plan once you're in space?";
		  case 2:
			     return "So it's launch day, eh?";
		  case 3:
			     return "Don't rush! Take your time. It might not even exist here...";
		  case 4:
			     return "Science compels us to explode the sun!";
		  case 5:
			     return "Fear of failure is a poor reason not to try.";
		  case 6:
			     return "I have my clan. I am not alone!";
		  case 7:
			     return "I'm really happy we're all here.";
		  case 8:
			     return "Still, this encounter feels special.";
		  case 9:
			     return "Come, sit with me, my fellow traveler.";
		  case 10:
			     return "Go, find the others. What comes next cannot be done alone.";
		  case 11:
			     return "If space is not filled with friends, then what a waste of space! - Ciborgm9";
		}
		return "Error";
	}
	
	private String GetRandomDescriptionDied() {
		switch(new Random().nextInt(13)) {
		  case 0:
			  	 return "Git gud scrub!";
		  case 1:
			     return "Dear diary, today I died. I leave all I own to my cat Guppy";
		  case 2:
			     return "Whoa, bad dream or something?";
		  case 3:
			     return "Well yeah, it's a death-trap, but a really powerful death trap. What, you suddenly care about safety now?";
		  case 4:
			     return "Had an exciting dream, did you?";
		  case 5:
			     return "You're lucky I don't have you grounded for medical reasons";
		  case 6:
			     return "I am unsure how to survive in this place without you. (I am unsure how to be me without you.)";
		  case 7:
			     return "The pain of your absence is sharp and haunting, and I would give anything not to know it; anything but never knowing you at all (which would be worse).";
		  case 8:
			     return "Is the hardest part of this tragedy not knowing who we may have lost? Or will the hardest part come later, when we learn?";
		  case 9:
			     return "Hypothesis: There can exist too much lava.";
		  case 10:
			     return "Your journey is over now. You did well.";
		  case 11:
			     return "Every decision is made in darkness. Only by making a choice can we learn whether it was right or not. <This was a wrong decision>.";
		  case 12:
			     return "Jammer moment";
	
		}
		return "Error";
	}
}
