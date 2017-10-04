function sendNotification(form) {
  const notificationTitle = form.notificationTitle.value;
  const notificationBody = form.notificationBody.value;
  const notificationTo = form.notificationRecipient.value;
  const siteContent = form.siteBody.value;

  const clickAction = 'https://messagingtest-427d6.firebaseapp.com/notification/?title=' +
    encodeURIComponent(notificationTitle) + '&body=' +
    encodeURIComponent(siteContent);



  const submitActionUrl = "https://messagingtest-427d6.firebaseapp.com/sendNotification?title=" +
    encodeURIComponent(notificationTitle) + '&body=' +
    encodeURIComponent(notificationBody) + '&click_action=' +
    encodeURIComponent(clickAction) + '&to=' +
    encodeURIComponent(notificationTo);

  fetch(submitActionUrl)
    .then(() => {
      console.log("Sent");
    });

}
