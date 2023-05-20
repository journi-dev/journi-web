const { db } = require("../util/admin");

exports.createPromotion = (request, response) => {
  if (request.body.promoName.trim() === "")
    return response
      .status(400)
      .json({ promoName: "Promotion name field must not be empty." });

  const newPromotion = {
    createdAt: new Date(),
    username: request.user.username,
    userImage: request.user.imageUrl,
    promoName: request.body.promoName,
    promoCode: request.body.promoCode,
    promoDesc: request.body.promoDesc,
    isPinned: false,
  };

  db.collection("organizations/uncle-johns/promotions")
    .add(newPromotion)
    .then((doc) => {
      const responsePromotion = newPromotion;
      responsePromotion.promotionId = doc.id;
      return response.json(responsePromotion);
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: "Something went wrong." });
    });
};

exports.getPromotion = (request, response) => {
  let promotionData = {};
  db.doc(`/organizations/uncle-johns/promotions/${request.params.promotionId}`)
    .get()
    .then((doc) => {
      if (!doc.exists)
        return response.status(404).json({ error: "Promotion not found." });
      promotionData = doc.data();
      promotionData.promoId = doc.id;
      return response.json(promotionData);
    })
    .catch((err) => {
      console.error(err);
      response.status(500).json({ error: err.code });
    });
};

exports.getPromotions = (request, response) => {
  db.collection("organizations/uncle-johns/promotions")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      const promotions = [];
      data.forEach((doc) => {
        promotions.push({
          promoId: doc.id,
          createdAt: doc.data().createdAt,
          username: doc.data().username,
          userImage: doc.data().userImage,
          promoName: doc.data().promoName,
          promoCode: doc.data().promoCode,
          promoDesc: doc.data().promoDesc,
        });
      });
      return response.json(promotions);
    })
    .catch((err) => {
      console.error(err);
    });
};

exports.pinPromotion = (request, response) => {
  const pinDoc = db
    .collection("organizations/uncle-johns/pinnedUpdates/")
    .where("username", "==", request.user.username)
    .where("promotionId", "==", request.params.promotionId)
    .limit(1);

  const promoDoc = db.doc(
    `organizations/uncle-johns/promotions/${request.params.promotionId}`
  );

  let promotionData;

  promoDoc
    .get()
    .then((doc) => {
      if (doc.exists) {
        promotionData = doc.data();
        promotionData.promotionId = doc.id;
        return pinDoc.get();
      } else
        return response.status(404).json({ error: "Promotion not found." });
    })
    .then((data) => {
      if (data.empty) {
        return db
          .collection("organizations/uncle-johns/pinnedUpdates/")
          .add({
            promotionId: request.params.promotionId,
            username: request.user.username,
          })
          .then(() => {
            promotionData.isPinned = true;
            return promoDoc.update({ isPinned: promotionData.isPinned });
          })
          .then(() => {
            return response.json(promotionData);
          });
      } else {
        return response
          .status(400)
          .json({ error: "Promotion is already pinned." });
      }
    })
    .catch((err) => {
      response.status(500).json({ error: err.code });
    });
};

exports.unpinPromotion = (request, response) => {
  const pinDoc = db
    .collection("organizations/uncle-johns/pinnedUpdates/")
    .where("username", "==", request.user.username)
    .where("promotionId", "==", request.params.promotionId)
    .limit(1);

  const promoDoc = db.doc(
    `organizations/uncle-johns/promotions/${request.params.promotionId}`
  );

  let promotionData;

  promoDoc
    .get()
    .then((doc) => {
      if (doc.exists) {
        promotionData = doc.data();
        promotionData.promotionId = doc.id;
        return pinDoc.get();
      } else
        return response.status(404).json({ error: "Promotion not found." });
    })
    .then((data) => {
      if (data.empty) {
        return response.status(400).json({ error: "Promotion is not pinned." });
      } else {
        return db
          .doc(`organizations/uncle-johns/pinnedUpdates/${data.docs[0].id}`)
          .delete()
          .then(() => {
            promotionData.isPinned = false;
            return promoDoc.update({ isPinned: promotionData.isPinned });
          })
          .then(() => {
            response.json(promotionData);
          });
      }
    })
    .catch((err) => {
      response.status(500).json({ error: err.code });
    });
};

exports.deletePromotion = (request, response) => {
  const document = db.doc(
    `/organizations/uncle-johns/promotions/${request.params.promotionId}`
  );

  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return response.status(404).json({ error: "Promotion not found." });
      } else {
        return document.delete();
      }
    })
    .then(() => {
      response.json({ message: "Promotion deleted successfully." });
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};
