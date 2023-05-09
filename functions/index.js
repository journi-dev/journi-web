const functions = require("firebase-functions");
const admin = require("firebase-admin");
const firestore = require("@google-cloud/firestore");
const app = require("express")();

admin.initializeApp();
const firebaseConfig = {
  apiKey: "AIzaSyCxtHk0fBgQ6DVLVtMzgUByutDPo_Ld-pY",
  authDomain: "journi-dev.firebaseapp.com",
  projectId: "journi-dev",
  storageBucket: "journi-dev.appspot.com",
  messagingSenderId: "795283889160",
  appId: "1:795283889160:web:4071acbd5e5bf855de85bd",
  measurementId: "G-YMJS42P1GG",
};

// const firebase = require("firebase");
// firebase.initializeApp(firebaseConfig);

app.get("/promotions", (req, res) => {
  admin
    .firestore()
    .collection("organizations/uncle-johns/promotions")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let promotions = [];
      data.forEach((doc) => {
        promotions.push({
          promoId: doc.id,
          promoName: doc.data().promoName,
          promoDesc: doc.data().promoDesc,
          promoCode: doc.data().promoCode,
          createdAt: doc.data().createdAt,
        });
      });
      return res.json(promotions);
    })
    .catch((err) => {
      console.error(err);
    });
});

app.post("/promotion", (req, res) => {
  // const timestamp = firestore.FieldValue.serverTimestamp();
  const newPromotion = {
    promoName: req.body.promoName,
    promoDesc: req.body.promoDesc,
    promoCode: req.body.promoCode,
    createdAt: new Date().toISOString(),
  };

  admin
    .firestore()
    .collection("organizations/uncle-johns/promotions")
    .add(newPromotion)
    .then((doc) => {
      res.json({ message: `Document ${doc.id} created successfully` });
    })
    .catch((err) => {
      res.status(500).json({ error: `Something went wrong` });
      console.error(err);
    });
});

// Signup route
/* app.post("/signup", (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  };

  // TODO: Validate data
  admin
    .auth()
    .createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then((data) => {
      return res
        .status(201)
        .json({ message: `User ${data.user.uid} signed up successfully` })
        .catch((err) => {
          console.error(err);
          return res.status(500).json({ error: err.code });
        });
    });
}); */

exports.api = functions.https.onRequest(app);
