# Atlanta Sustainable Fashion Week (ATLSFW) Mobile Application
A mobile application where ATLSFW will gauge user interest on topics related to sustainable fashion and users will have access to educational articles so they can learn how to shop/style sustainably.

# Installation Guide

## Prerequisites
1. MacOS or Linux Laptop connected to a secured wi-fi connection
2. iPhone connected to the same network
3. Docker Desktop (installation instructions for [Mac OS](https://docs.docker.com/desktop/install/mac-install/) and [Linux](https://docs.docker.com/desktop/install/linux-install/))
4. NodeJS (install [here](https://nodejs.org/en/download))
5. An IDE (we recommend [VSCode](https://code.visualstudio.com/download))
6. A Terminal (pre-installed on Mac OS and Linux)
7. Git (installation instructions [here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git))
8. Expo Go App (available on the App Store) and account

## Setting up the database
1. Create a MongoDB Atlas account [here](https://www.mongodb.com/cloud/atlas/register) and login.
2. Navigate to the Database tab under the Deployment section in the left sidebar.
3. Click on the Collections tab.
4. Use the Create Database button to create two databases: `posts` and `users`.
5. Within the `posts` database, create one collection: `articles`.
6. Within the `users` database, create three collections: `vendor_info`, `customer_info`, and `user_login`.

The final structure of your database should look like this:
<insert screenshot of DB structure>

## Setting up the app
1. Open up a terminal window and clone the repository using the following command:
```git clone https://github.com/sanav33/atlsfw_jd.git```
2. Open the cloned repository using VSCode and open up a terminal session in VSCode using `Cmd + Shift + \``.
3. Create a `password.mjs` file with the following content:
```
export getMongoPasscode() {
    return "<password>"
}
export default getMongoPasscode;
```

## Setting up the server
1. Open up a second terminal window in the cloned repository within VSCode.
2. Run `cd server` in the terminal to change the directory to the `server` directory.
3. Open Docker Desktop and leave it running in the background.
4. Run `./run_server.sh`. You should see `Server is running on port: 5050`.

## Setting up client
1. Open up a second terminal window in the cloned repository within VSCode.
2. Run `cd client` in the terminal to change the directory to the `client` directory.
4. Run `npm install`.
5. Open up the Expo Go app on your phone.
6. Run `npx expo login` in your terminal and login using your Expo Go account credentials (you only have to do this the first time you run the app).
7. Run `npx expo start`
8. Run `./run_client.sh`. The app instance will show up in the Expo Go app.

# Release Notes
## Version 0.4.0
### Features
1. User Profile Page now gives the user the option to edit their contact information and select interests.
2. Admin Profile Page now shows statistics about the top 3 saved and top 3 liked articles.
3. Profile Page allows user to add and change profile pictures.
4. Heart icon in navbar has been changed to bookmark icon, reflecting new functionality of the Saved Articles page. 
5. Saved button in navbar leads to saved articles for logged-in users and Login Page for guest users.
6. Tag selection UI has been improved to change color to indicate which tags are currently selected.
7. Header has been changed to green to reflect client branding.
8. Admin users are able to view save counts for articles in the Community screen which are hidden from non-admin users.

### Bug Fixes
1. Clicking the Profile button in the navigation bar twice when not logged in returns the user to the Login Page and not the Profile page.
2. Signup Page is no longer cut off by the header and navbar.
3. Login button on Signup Screen has been fixed and now leads the user to the Login screen.
4. Signup Page no longer displays an error for signups that do not include input in the optional fields which should go through as a valid signup.

### Known Issues
1. MasonryList usage is causing a bug, and its implementation is only visible when there is originally a FlatList in its place when the app is run. While the app is running, the FlatList tag can be changed to MasonryList and after saving this change, the layout displays correctly on the app.

## Version 0.3.0
### Features
1. Content Page (Community Page) includes a filter feature button at the top of the screen.
2. Filter Button prompts a pop-up (Filter Modal) that displays a set of tags for filtering the articles.
3. Users are able to select the tags of their choosing to be displayed in the input field above the tag options.
4. Search Button (that looks the same as the larger Filter Button) within the Filter Modal that displays the Filtered Articles (articles that associate with the chosen tags).
5. Login Page includes a check for validity of email and password formatting with a Login Error popup.
6. Admin Profile has been created.
7. Authorize Vendor Button has been created to be verified by Admin on Admin Profile.
8. Author names are clickable and lead to a general author bio page, currently not displaying specific author content.
9. Like Button functionality is implemented with the newly implemented redux state management.
10. Articles on the Content Page are displayed via Webview pulling up the article content when the thumbnail image is pressed on the Content Page.
### Bug Fixes
1. Articles display their respective content using webview now instead of all articles displaying the first article’s content when pressed.
### Known Issues
1. MasonryList usage is causing a bug, and its implementation is only visible when there is originally a FlatList in its place and once pulled from master, it can be changed to MasonryList to be displayed correctly on the app.
2. Signup Page displays an error for signups that do not include input in the optional fields, even though it should go through as a valid signup.


## Version 0.2.0
### Features
1. Home page is now the new Content Page that contains article components.
2. Article components are scrollable on the page.
3. Articles are dynamically produced from content that is retrieved from endpoint.
4. Each article has a like button that is functional.
5. Content Page contains a COMMUNITY header.
6. Content Page contains a navigation bar with the home, events, and search buttons that navigate to the Home Page (Content Page) and likes, shop, and profile buttons that navigate to the Signup Page.
7. Author title exists for the content page (currently one for all of the articles).
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
