function sendNotification() {
  const form = document.getElementById('notificationForm');
  const notificationTo = form.notificationRecipient.value;

  const payload = preparePayload();

  const submitActionUrl = "https://messagingtest-427d6.firebaseapp.com/sendSingleNotification?to=" +
    encodeURIComponent(notificationTo) + '&' +
    payload;

  fetch(submitActionUrl)
    .then(() => {
      console.log("Sent");
    });
}

function sendNotificationToTopics() {
  const form = document.getElementById('notificationForm');

  const payload = preparePayload();

  const topics = Array.from(document.getElementsByClassName('topicSelector'));

  topics.forEach(topic => {
    if(!topic.checked) return;
    const submitActionUrl = "https://messagingtest-427d6.firebaseapp.com/sendNotificationToTopic?topic=" +
    encodeURIComponent(topic.name) + '&' +
    payload;

  fetch(submitActionUrl)
    .then(() => {
      console.log("Sent");
    });
  })
  
}

function preparePayload() {
  const form = document.getElementById('notificationForm');
  const notificationTitle = form.notificationTitle.value;
  const notificationBody = form.notificationBody.value;
  const siteContent = form.siteBody.value;

  const clickAction = 'https://messagingtest-427d6.firebaseapp.com/notification/?title=' +
    encodeURIComponent(notificationTitle) + '&body=' +
    encodeURIComponent(siteContent);

  const payload = 
    "title=" + encodeURIComponent(notificationTitle) +
    '&body=' + encodeURIComponent(notificationBody) +
    '&click_action=' + encodeURIComponent(clickAction);

  return payload;
}