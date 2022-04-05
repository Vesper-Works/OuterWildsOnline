var XMLHttpRequest = require('xhr2');
var Octokit = require('octokit');
var http = new XMLHttpRequest();
const octokit = new Octokit.Octokit();

http.open("GET", "http://" + "gameserver.hopto.org", /*async*/true);
http.onreadystatechange = function () {
    if (http.readyState == 4) {
        if(http.status == 200){           
            octokit.request('PATCH /repos/vesper-works/OuterWildsOnline', {
                description: 'An Outer Wilds MMO experience, just connect and play! Server is online.'
              })
            console.log("Sucessfull Ping");
          }
          else{
            octokit.request('PATCH /repos/vesper-works/OuterWildsOnline', {
                description: 'An Outer Wilds MMO experience, just connect and play! Server is offline.'
              })
            console.log("Failed Ping");
          }
    }
};
try {
    http.send(null);
} catch (exception) {
}