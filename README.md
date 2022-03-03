# Add New Members To Team Chat

This is a messenger-chat-bot that adds multiple people to a chat group. An `unhandled.txt` file will be created at the end of the script that will contain all the people who couldn't have been added.

# Requirements

[nodejs](https://nodejs.org/en/)

[facebook-chat-api](https://github.com/Schmavery/facebook-chat-api)

[puppeteer](https://www.npmjs.com/package/puppeteer)

[dotenv](https://www.npmjs.com/package/dotenv)

# Install

To install nodejs on Debian-based:

```
sudo apt install nodejs
```

Then clone this repo, and install the dependencies with

```
git clone https://github.com/cr105ph1nx/add-to-chat.git
cd add-to-chat/
npm ci
```

# Usage

1- First, add a `.env` file and save in it the following information:

```
EMAIL = your fb email
PASSWORD = your fb password
THREAD_ID = id of the chat group you want to add people in
```

2- Add a file `members.txt` containing the IDs of the people you want to add, separated by a new line

3- Then, execute the script with with:

```
npm run start
```

# Note

For security reasons, make sure to check the [password safety](https://github.com/Schmavery/facebook-chat-api/blob/master/DOCS.md#password-safety)
section in the [facebook-chat-api](https://github.com/Schmavery/facebook-chat-api) repo.
