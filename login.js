const fs = require("fs");
const login = require("facebook-chat-api");

var credentials = {email: "FB_EMAIL", password: "FB_PASSWORD"};

login(credentials, (err, api) => {
	if(err) return console.error(err);

	//saves AppState to appstate.json file
	fs.writeFileSync('appstate.json', JSON.stringify(api.getAppState()));
});