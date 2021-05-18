const login = require("facebook-chat-api");
const readline = require("readline");
const fs = require("fs");

// populate teams array
var team = {
  name: "Incubation",
  threadID: "4028064160609756", // change to accurate thread ID
  file: "./members.txt",
};

login(
  { appState: JSON.parse(fs.readFileSync("appstate.json", "utf8")) },
  (err, api) => {
    if (err) return console.error(err);

    // set log options
    api.setOptions({
      selfListen: true,
      logLevel: "silent",
    });

    // set stream config
    let readInterface = readline.createInterface({
      input: fs.createReadStream(team.file),
    });

    // read file for member_id line by line
    readInterface.on("line", (member_id) => {
      // attempt to add member_id to group chat
      api.addUserToGroup(member_id, team.threadID, (err) => {
        if (err) {
          // if error, attempt to send the member a message
          let message = {
            body: "Hello, I'm a member of OpenMindsClub and this is an automatic message. Excuse the message we sent earlier, it was a running test. Our bot tried to add you to your new team's chat group but if you're reading this message, that means it ran on some trouble, probably your account is privated. Try contacting me or the club's page for more information. ",
          };

          // get name of user
          api.getUserInfo(member_id, (err, ret) => {
            let fbName = ret[Object.keys(ret)[0]].name; // returns name 
            let profileUrl = ret[Object.keys(ret)[0]].profileUrl // returns url
            api.sendMessage(message, member_id, (err, messageInfo) => {
              console.log(fbName);
              // if error, write member history to unhandled list
              if (err) {
                let member =
                  "userID: " +
                  member_id +
                  ", " +
                  "fbName: " +
                  fbName +
                  ", " +
                  "profileUrl: " +
                  profileUrl +
                  ", " +
                  "team: " +
                  team.name +
                  ", " +
                  "messaged: false, " +
                  "error: " +
                  messageInfo +
                  "; \n";
  
                fs.appendFile("unhandled.txt", member, (err) => {
                  if (err) return console.log(err);
                  console.log("wrote to unhandled.");
                });
              } else {
                // if success, write member history to contacted list
                let member =
                  "userID: " +
                  member_id +
                  ", " +
                  "fbName: " +
                  fbName +
                  ", " +
                  "profileUrl: " +
                  profileUrl +
                  ", " +
                  "team: " +
                  team.name +
                  ", " +
                  "messaged: true; \n";
                fs.appendFile("contacted.txt", member, (err) => {
                  if (err) return console.log(err);
                  console.log("wrote to contacted.");
                });
              }
           
            });

          });



        }
      });
    });
  }
);
