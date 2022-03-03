require("dotenv").config();
const readline = require("readline");
const app = require("facebook-chat-api");
const fs = require("fs");
const login = require("./login.js");

// populate teams obj
var team = {
  name: "Incubation",
  threadID: process.env.THREAD_ID,
  file: "./members.txt",
};

// create appstate.json file
login.getAppstate(process.env.EMAIL, process.env.PASSWORD, (prompt, err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  // log login.js prompt
  console.log(prompt);
  app(
    { appState: JSON.parse(fs.readFileSync("appstate.json", "utf8")) },
    (err, api) => {
      fs.writeFileSync("appstate.json", JSON.stringify(api.getAppState()));

      api.setOptions({
        selfListen: true,
        logLevel: "warn",
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
            // if error, save profile to textfile
            // get info of user
            api.getUserInfo(member_id, (err, ret) => {
              let fbName = ret[Object.keys(ret)[0]].name; // returns name
              let profileUrl = ret[Object.keys(ret)[0]].profileUrl; // returns url
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
                "error: " +
                err +
                "; \n";

              fs.appendFile("unhandled.txt", member, (err) => {
                console.log(`wrote ${fbName} to unhandled.`);
              });
            });
          }
        });
      });
    }
  );
});
