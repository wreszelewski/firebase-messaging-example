function initializeMessagingObject() {
    //basic Firebase initialization
    var config = {
        apiKey: "AIzaSyCr4p9qECik04iPO9dKJDWi_z3ApYKzRFo",
        authDomain: "messagingtest-427d6.firebaseapp.com",
        databaseURL: "https://messagingtest-427d6.firebaseio.com",
        projectId: "messagingtest-427d6",
        storageBucket: "messagingtest-427d6.appspot.com",
        messagingSenderId: "827348818915"
    };
    firebase.initializeApp(config);
    return firebase.messaging();
}

function setupMessagingTokenManagement(messaging, tokenAction) {
    //token lifecycle actions registration
    messaging.onTokenRefresh(() => {
        messaging.getToken()
            .then(tokenAction)
            .catch((err) => console.log('Unable to retrieve refreshed token ', err));
    });
}

function grantNotificationPermission(messaging, tokenAction) {
    //granting notification permission
    messaging.requestPermission()
        .then(() => {
            messaging.getToken()
                .then(function (token) {
                    if (token) {
                        tokenAction(token);
                    }
                }).catch(err => console.log('An error occurred while retrieving token. ', err));

        }).catch(err => console.log('Unable to get permission to notify.', err));
}

function startNotifications(serviceWorker, tokenAction, messageAction) {
    //firebase used with custom service worker
    const messaging = initializeMessagingObject();
    setupMessagingTokenManagement(messaging, tokenAction);
    messaging.useServiceWorker(serviceWorker);
    messaging.onMessage(messageAction);
    grantNotificationPermission(messaging, tokenAction);
}