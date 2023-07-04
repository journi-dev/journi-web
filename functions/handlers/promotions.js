const { db } = require("../util/admin");

exports.createPromotion = (req, res) => {
  if (req.body.promoName.trim() === "")
    return res
      .status(400)
      .json({ promoName: "Promotion name field must not be empty." });

  const newPromotion = {
    createdAt: new Date(),
    username: req.user.username,
    userImage: req.user.imageUrl,
    promoName: req.body.promoName,
    promoCode: req.body.promoCode,
    promoDesc: req.body.promoDesc,
    isPinned: false,
  };

  db.collection("organizations/uncle-johns/promotions")
    .add(newPromotion)
    .then((doc) => {
      const responsePromotion = newPromotion;
      responsePromotion.promotionId = doc.id;
      return res.json(responsePromotion);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: "Something went wrong." });
    });
};

exports.getPromotion = (req, res) => {
  let promotionData = {};
  db.doc(`/organizations/uncle-johns/promotions/${req.params.promotionId}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Promotion not found." });
      }
      promotionData = doc.data();
      promotionData.promoId = doc.id;
      return res.json(promotionData);
    })
    .catch((err) => {
      return res.status(500).json({ code: err.code });
    });
};

exports.getPromotions = (req, res) => {
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
      return res.json(promotions);
    })
    .catch((err) => {
      return res.status(500).json({ code: err.code });
    });
};

exports.pinPromotion = (req, res) => {
  const pinDoc = db
    .collection("organizations/uncle-johns/pinnedUpdates/")
    .where("username", "==", req.user.username)
    .where("promotionId", "==", req.params.promotionId)
    .limit(1);

  const promoDoc = db.doc(
    `organizations/uncle-johns/promotions/${req.params.promotionId}`
  );

  let promotionData;

  promoDoc
    .get()
    .then((doc) => {
      if (doc.exists) {
        promotionData = doc.data();
        promotionData.promotionId = doc.id;
        return pinDoc.get();
      } else return res.status(404).json({ error: "Promotion not found." });
    })
    .then((data) => {
      if (data.empty) {
        return db
          .collection("organizations/uncle-johns/pinnedUpdates/")
          .add({
            promotionId: req.params.promotionId,
            username: req.user.username,
          })
          .then(() => {
            promotionData.isPinned = true;
            return promoDoc.update({ isPinned: promotionData.isPinned });
          })
          .then(() => {
            return res.json(promotionData);
          });
      } else {
        return res.status(400).json({ error: "Promotion is already pinned." });
      }
    })
    .catch((err) => {
      return res.status(500).json({ code: err.code });
    });
};

exports.unpinPromotion = (req, res) => {
  const pinDoc = db
    .collection("organizations/uncle-johns/pinnedUpdates/")
    .where("username", "==", req.user.username)
    .where("promotionId", "==", req.params.promotionId)
    .limit(1);

  const promoDoc = db.doc(
    `organizations/uncle-johns/promotions/${req.params.promotionId}`
  );

  let promotionData;

  promoDoc
    .get()
    .then((doc) => {
      if (doc.exists) {
        promotionData = doc.data();
        promotionData.promotionId = doc.id;
        return pinDoc.get();
      } else return res.status(404).json({ error: "Promotion not found." });
    })
    .then((data) => {
      if (data.empty) {
        return res.status(400).json({ error: "Promotion is not pinned." });
      } else {
        return db
          .doc(`organizations/uncle-johns/pinnedUpdates/${data.docs[0].id}`)
          .delete()
          .then(() => {
            promotionData.isPinned = false;
            return promoDoc.update({ isPinned: promotionData.isPinned });
          })
          .then(() => {
            res.json(promotionData);
          });
      }
    })
    .catch((err) => {
      return res.status(500).json({ code: err.code });
    });
};

exports.deletePromotion = (req, res) => {
  const document = db.doc(
    `/organizations/uncle-johns/promotions/${req.params.promotionId}`
  );

  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Promotion not found." });
      } else {
        return document.delete();
      }
    })
    .then(() => {
      res.json({ message: "Promotion deleted successfully." });
    })
    .catch((err) => {
      return res.status(500).json({ code: err.code });
    });
};
