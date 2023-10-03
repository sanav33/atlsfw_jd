# Atlanta Sustainable Fashion Week (ATLSFW) Mobile Application
A mobile application where ATLSFW will gauge user interest on topics related to sustainable fashion and users will have access to educational articles so they can learn how to shop/style more sustainably.

# Release Notes
## Version 0.2.0
### Features
1. Home page is now the new Content Page that contains article components.
2. Article components are scrollable on the page.
3. Articles are dynamically produced from content that is retrieved from endpoint.
4. Each article has a like button that is functional.
5. Content Page contains a COMMUNITY header.
6. Content Page contains a navigation bar with the home, events, and search buttons that navigate to the Home Page (Content Page) and likes, shop, and profile buttons that navigate to the Signup Page.
8. Author title exists for the content page (currently one for all of the articles).
### Bug Fixes
1. N/A
### Known Issues
1. Save button only changes color to indicate saving an article, but it is not functional as of yet.
2. Author Page is currently dummy data and not actual author's bio.

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
