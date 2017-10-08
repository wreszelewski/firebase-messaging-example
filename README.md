# firebase-messaging-example
Implementation of PWA push notifications with Firabase and workbox-sw library.

Features:
* Sending and receiving device <-> device notifications,
* Always Clickable Push - background notification that after it's received it can be opened even without network connection.

## Running

First create a Firebase App from firebase console (https://console.firebase.google.com/), install a command line tool provided by Google and log in to your account:
```
npm install -g firebase-tools
firebase login
```
Change Firebase configuration inside /public/js/messagingBasicSetup.js.

Clone the repository:
```
git clone https://github.com/wreszelewski/firebase-messaging-example.git
cd firebase-messaging-example
```

Run locally (not tested):
```
firebase serve --only functions,hosting
```

Deploy to firebase:
```
firebase deploy
```
Sometimes deploy fails, in my case these two commands were helpful:
```
firebase logout
firebase login
```

## Features description
### Device <-> device communication
It's a basic type of communication in Firebase. Code inside /public/assets/js/messagingBasicSetup.js is responsible for initializing this type of communication.
Code inside /public/assets/js/notificationSender.js and /functions/index.js#16 defines how to send notifications.

### Always clickable push
This feature uses service worker cache to store content from background notification URL. After notification is received service worker downloads content and stores it in cache.
Later the notification is displayed to the user. He may click on it and even without network connection content will load. 
Notification handler is defined inside /assets/js/notificationHandlers.js file. /sw.js file contains event callback registration and cache definition.
