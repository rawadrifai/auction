import * as functions from "firebase-functions";
import * as express from "express";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const app = express();
app.get("/rawad", (request, response) => {
    response.send("kiki");
});

exports.app = functions.https.onRequest(app);
