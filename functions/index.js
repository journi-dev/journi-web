const functions = require("firebase-functions");
const {
  createPromotion,
  getPromotion,
  getPromotions,
  pinPromotion,
  unpinPromotion,
  deletePromotion,
} = require("./handlers/promotions");
const {
  signUp,
  uploadImage,
  addUserDetails,
  getAuthenticatedUser,
  getUserDetails,
  markNotificationsRead,
  getUsers,
  updateUser,
  logInWithGoogle,
  logInWithCredentials,
} = require("./handlers/users");
const handleFirebaseAuth = require("./util/handleFirebaseAuth");
const { db } = require("./util/admin");
const {
  addMultipleToMenu,
  getMenu,
  deleteMenuItem,
  deleteCategory,
  renameCategory,
} = require("./handlers/menu");
const app = require("express")();

// "Promotions" Routes
app.post("/promotion", handleFirebaseAuth, createPromotion);
app.get("/promotions", getPromotions);
app.get("/promotion/:promotionId", getPromotion);
app.delete("/promotion/:promotionId", handleFirebaseAuth, deletePromotion);
app.get("/promotion/:promotionId/pin", handleFirebaseAuth, pinPromotion);
app.get("/promotion/:promotionId/unpin", handleFirebaseAuth, unpinPromotion);

// "Users" Routes
app.post("/login/email", logInWithCredentials);
app.post("/signup", signUp);
app.post("/user", handleFirebaseAuth, addUserDetails);
app.post("/user/avatar", handleFirebaseAuth, uploadImage);
app.get("/user", handleFirebaseAuth, getAuthenticatedUser);
app.get("/user/:username", getUserDetails);
app.post("/user/:username/update", updateUser);
app.get("/notifications", handleFirebaseAuth, markNotificationsRead);
app.get("/users", getUsers);

// "Menu" Routes
// app.post("/addMultipleToMenu", handleFirebaseAuth, addMultipleToMenu);
app.post("/addMultipleToMenu", addMultipleToMenu);
app.get("/menu", getMenu);
app.delete("/menu/:menuItemId", deleteMenuItem);
app.delete("/menu/:menuItems/delete", deleteCategory);
app.post("/menu/:category/rename", renameCategory);

exports.api = functions.https.onRequest(app);

exports.createNotificationOnPin = functions.firestore
  .document("organizations/uncle-johns/pinnedUpdates/{id}")
  .onCreate((snapshot) => {
    return db
      .doc(
        `/organizations/uncle-johns/promotions/${snapshot.data().promotionId}`
      )
      .get()
      .then((doc) => {
        if (doc.exists && doc.data().username !== snapshot.data().username) {
          return db
            .doc(`/organizations/uncle-johns/notifications/${snapshot.id}`)
            .set({
              recipient: doc.data().username,
              sender: snapshot.data().username,
              isRead: false,
              promotionId: doc.id,
              type: "pin",
              createdAt: new Date(),
            });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  });

exports.deleteNotificationOnUnpin = functions.firestore
  .document("organizations/uncle-johns/pinnedUpdates/{id}")
  .onDelete((snapshot) => {
    return db
      .doc(`/organizations/uncle-johns/notifications/${snapshot.id}`)
      .delete()
      .catch((err) => {
        console.error(err);
        return;
      });
  });

exports.onUserImageChange = functions.firestore
  .document("/organizations/uncle-johns/users/{userId}")
  .onUpdate((change) => {
    console.log(change.before.data());
    console.log(change.after.data());

    if (change.before.data().imageUrl !== change.after.data().imageUrl) {
      console.log("The user's profile image has changed.");
      const batch = db.batch();

      return db
        .collection("organizations/uncle-johns/promotions")
        .where("username", "==", change.before.data().username)
        .get()
        .then((data) => {
          data.forEach((doc) => {
            const promotion = db.doc(
              `/organizations/uncle-johns/promotions/${doc.id}`
            );
            batch.update(promotion, {
              userImage: change.after.data().imageUrl,
            });
          });

          // return batch.commit();
        });
    }
  });

exports.onPromotionDelete = functions.firestore
  .document("/organizations/uncle-johns/promotions/{promotionId}")
  .onDelete((snapshot, context) => {
    const promotionId = context.params.promotionId;
    const batch = db.batch();
    return db
      .collection("organizations/uncle-johns/pinnedUpdates")
      .where("promotionId", "==", promotionId)
      .get()
      .then((data) => {
        data.forEach((doc) => {
          batch.delete(
            db.doc(`/organizations/uncle-johns/pinnedUpdates/${doc.id}`)
          );
        });

        return db
          .collection("organizations/uncle-johns/notifications")
          .where("promotionId", "==", promotionId)
          .get();
      })
      .then((data) => {
        data.forEach((doc) => {
          batch.delete(
            db.doc(`/organizations/uncle-johns/notifications/${doc.id}`)
          );
        });

        return batch.commit();
      })
      .catch((err) => {
        console.error(err);
      });
  });
