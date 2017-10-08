const functions = require('firebase-functions');
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

exports.notificationPage = functions.https.onRequest((req, res) => {
  res.status(200).send(`<!doctype html>
    <head>
      <title>${req.query.title}</title>
    </head>
    <body>
      ${req.query.body}
    </body>
  </html>`);
});

exports.sendSingleNotification = functions.https.onRequest((req, res) => {
  const payload = prepareMessage(req);

  return admin.messaging().sendToDevice(req.query.to, payload)
    .then(response => {
      res.status(200).send("OK");
    })

});

exports.sendNotificationToTopic = functions.https.onRequest((req, res) => {
  const topic = req.query.topic;
  let payload = prepareMessage(req);

    payload.data.title = topic + ': ' + payload.data.title;
    admin.messaging().sendToTopic(topic, payload)
    .then(function(response) {
      res.status(200).send("OK");
    })
    .catch(function(error) {
      res.status(400).send("Bad Request");
    });
  
});

function prepareMessage(req) {
  return {
    data: {
      title: req.query.title,
      body: req.query.body,
      click_action: req.query.click_action
    }
  };
}

exports.subscribeToTopic = functions.https.onRequest((req, res) => {
  const token = req.query.token,
        topic = req.query.topic;

  admin.messaging().subscribeToTopic(token, topic)
     .then(function(response) {
          res.status(200).send('OK');
        })
        .catch(function(error) {
          res.status(400).send('Bad request');
        });
      
});

exports.unsubscribeFromTopic = functions.https.onRequest((req, res) => {
  const token = req.query.token,
        topic = req.query.topic;

  admin.messaging().unsubscribeFromTopic(token, topic)
     .then(function(response) {
          res.status(200).send('OK');
        })
        .catch(function(error) {
          res.status(400).send('Bad request');
        });
      
});