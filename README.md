# Atlanta Sustainable Fashion Week (ATLSFW) Mobile Application
A mobile application where ATLSFW will gauge user interest on topics related to sustainable fashion and users will have access to educational articles so they can learn how to shop/style more sustainably.

## Version 0.1.0
### Features
1. Login Page including text input fields for username and password
2. Login button on Login page
3. Sign Up link on Login Page for new users
4. Signup Page including text input fields for full name, email, username, password, confirm password
5. Sign Up button on Signup Page that navigates Login page
6. Privacy policy agreement statement checkbox on Signup Page
7. Account type dropdown options of “Customer” and “Vendor” on Login Page
### Bug Fixes
1. N/A
### Known Issues
1. Account login works without encryption of email and password

## Setting up server
1. Clone the repository.
2. Run `cd server`.
3. Create a `password.mjs` file with the following content:
```
export getMongoPasscode() {
    return "<password>"
}
export default getMongoPasscode;
```
4. Run `./run_server.sh`. You should see `Server is running on port: 5050`.

## Setting up client
1. Run `npm install` within the client directory.
2. Install the Expo Go app from the App Store and create an account.
3. Run `npx expo login` in your terminal.
4. Run `./run_client.sh`.

### Troubleshooting
* Can't run `./run_server.sh` or `.run_client.sh` because of a "Permission denied" error?

    Run `sudo chmod +x <name_of_script.sh>`

* Getting "module not found" errors?

    Check your `package.json` file and see if the missing dependency is there. If not, add it in and run `npm install`.


**NOTE:**
2. There is example code for how to hit the endpoints in `client/App.js`.

## Team Links
1. Github: https://github.com/sanav33/atlsfw_jd
2. Jira: https://atlsfw-gatech-jid-3104.atlassian.net/jira/software/projects/SCRUM/boards/1  
