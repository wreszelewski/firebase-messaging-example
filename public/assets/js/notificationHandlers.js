function browserNotificationHandler(payload) {
  console.log("Message received. ", payload);
  const clickAction = () => {
    window.open(payload.data.click_action, '_self');
  }
  Notifier.notify(payload.data.title, payload.data.body, '/assets/img/pushIconWhite.png', 30000, clickAction);
}

function getBackgroundNotificationHandler(cacheName) {

  return (payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = payload.data.title;
    const notificationOptions = {
      body: payload.data.body,
      icon: '/assets/img/pushIcon.png',
      data: {
        click_action: payload.data.click_action
      }
    };
    //Before displaying notification load linked page
    return caches.open(cacheName)
      .then(cache => {
        return fetch(payload.data.click_action).then(response => {
          cache.put(payload.data.click_action, response.clone());
          return self.registration.showNotification(notificationTitle, notificationOptions);
        });
      });
  }

}