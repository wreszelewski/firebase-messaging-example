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

exports.sendNotification = functions.https.onRequest((req, res) => {
  const payload = {
    data: {
      title: req.query.title,
      body: req.query.body,
      click_action: req.query.click_action
    }
  };

  return admin.messaging().sendToDevice(req.query.to, payload)
    .then(response => {
      res.status(200).send("OK");
    })

})
