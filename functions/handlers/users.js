const { initializeApp } = require("firebase/app");
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");
const { adminAuth, db, admin } = require("../util/admin");
const config = require("../util/config");
const {
  reduceUserDetails,
  validateLoginData,
  validateSignUpData,
} = require("../util/validators");
const firebaseApp = initializeApp(config);
const firebaseAuth = getAuth(firebaseApp);

const generateSequence = (length) => {
  let string = "";
  let numArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let abcLowercaseArr = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  let abcUppercaseArr = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  let fullArr = [...numArr, ...abcLowercaseArr, ...abcUppercaseArr];

  for (let i = 0; i < length; i++) {
    let randomChar = fullArr[Math.floor(Math.random() * fullArr.length)];
    string += randomChar;
  }
  return string;
};

exports.logIn = (request, response) => {
  const user = {
    email: request.body.email,
    password: request.body.password,
  };

  const { valid, errors } = validateLoginData(user);
  if (!valid) return response.status(400).json({ errors });

  signInWithEmailAndPassword(firebaseAuth, user.email, user.password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      return response.status(200).json({ token });
    })
    .catch((err) => {
      return response.status(403).json({
        errors: {
          email: "",
          password: "",
          credentials: "Invalid username or password. Please try again!",
        },
      });
    });
};

exports.signUp = (request, response) => {
  const newUser = {
    email: request.body.email,
    password: request.body.password,
    confirmPassword: request.body.confirmPassword,
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    username: request.body.username,
    // phoneNumber: request.body.phoneNumber,
  };

  const { valid, errors } = validateSignUpData(newUser);
  if (!valid) return response.status(400).json({ errors });

  const noImg = "DefaultProfilePicture.jpg";

  db.doc(`/organizations/uncle-johns/users/${newUser.username}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        // The username is already taken
        return response.status(400).json({
          username:
            "This username is already in use! Please try another username.",
        });
      } else {
        return adminAuth.createUser({
          uid: newUser.username,
          email: newUser.email,
          emailVerified: false,
          // phoneNumber: newUser.phoneNumber,
          password: newUser.password,
          displayName: `${newUser.firstName} ${newUser.lastName}`,
          disabled: false,
        });
      }
    })
    .then((user) => {
      const userCredentials = {
        accessLevel: "user",
        appearancePreferance: "light",
        createdAt: user.metadata.creationTime,
        disabled: user.disabled,
        displayName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        userImage: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        username: user.uid,
        // phoneNumber: user.phoneNumber,
      };
      return db
        .doc(`/organizations/uncle-johns/users/${newUser.username}`)
        .set(userCredentials);
    })
    .then(() => {
      return signInWithEmailAndPassword(
        firebaseAuth,
        newUser.email,
        newUser.password
      );
    })
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      return response.status(201).json({ token });
    })
    .catch((err) => {
      if (err.code === "auth/email-already-exists")
        return response.status(400).json({
          email:
            "This email is already in use! Log in with that email or try another email.",
        });
      return response
        .status(500)
        .json({ general: "Something went wrong. Please try again." });
    });
};

exports.addUserDetails = (request, response) => {
  let userDetails = reduceUserDetails(request.body);
  db.doc(`/organizations/uncle-johns/users/${request.user.username}`)
    .update(userDetails)
    .then(() => {
      return response.json({ message: "Details updated successfully!" });
    })
    .catch((err) => {
      return response.status(500).json({ error: err.code });
    });
};

exports.getAuthenticatedUser = (request, response) => {
  let userData = {};
  db.doc(`/organizations/uncle-johns/users/${request.user.username}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        userData.credentials = doc.data();
        return db
          .collection(`/organizations/uncle-johns/pinnedUpdates/`)
          .where("username", "==", request.user.username)
          .get();
      }
    })
    .then((data) => {
      userData.pinnedUpdates = [];
      data.forEach((doc) => {
        userData.pinnedUpdates.push(doc.data());
      });
      return db
        .collection("organizations/uncle-johns/notifications")
        .where("recipient", "==", request.user.username)
        .orderBy("createdAt", "desc")
        .limit(10)
        .get();
    })
    .then((data) => {
      userData.notifications = [];
      data.forEach((doc) => {
        userData.notifications.push({
          recipient: doc.data().recipient,
          sender: doc.data().sender,
          isRead: doc.data().isRead,
          promotionId: doc.data().promotionId,
          type: doc.data().type,
          createdAt: doc.data().createdAt,
          notificationId: doc.id,
        });
      });
      return response.json(userData);
    })
    .catch((err) => {
      return response.status(500).json({ error: err.code });
    });
};

exports.uploadImage = (request, response) => {
  const Busboy = require("busboy");
  const path = require("path");
  const os = require("os");
  const fs = require("fs");

  const busboy = Busboy({ headers: request.headers });

  let imageFileName;
  let imageToBeUploaded = {};

  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    // console.log("fieldname:", fieldname);
    // console.log("filename:", filename.filename);
    // console.log("mimetype", mimetype);

    if (mimetype !== "image/jpeg" && mimetype !== "image/png")
      return response.status(400).json({ error: "Incorrect file type." });

    let splitFileName = filename.filename.split(".");
    const imageExtension = splitFileName[splitFileName.length - 1];
    imageFileName = `${generateSequence(25)}.${imageExtension}`;
    const filepath = path.join(os.tmpdir(), imageFileName);

    imageToBeUploaded = { filepath, mimetype };
    file.pipe(fs.createWriteStream(filepath));
  });

  busboy.on("finish", () => {
    admin
      .storage()
      .bucket()
      .upload(imageToBeUploaded.filepath, {
        resumable: false,
        metadata: {
          metadata: {
            contentType: imageToBeUploaded.mimetype,
          },
        },
      })
      .then(() => {
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;
        return db
          .doc(`/organizations/uncle-johns/users/${request.user.username}`)
          .update({ imageUrl });
      })
      .then(() => {
        return response.json({ message: "Image uploaded successfully" });
      })
      .catch((err) => {
        return response.status(500).json({ error: err.code });
      });
  });

  busboy.end(request.rawBody);
};

exports.getUserDetails = (request, response) => {
  let userData = {};
  db.doc(`/organizations/uncle-johns/users/${request.params.username}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        userData.user = doc.data();
        return db
          .collection("organizations/uncle-johns/promotions")
          .where("username", "==", request.params.username)
          .orderBy("createdAt", "desc")
          .get();
      } else {
        return response.status(404).json({ error: "User not found." });
      }
    })
    .then((data) => {
      userData.promotions = [];
      data.forEach((doc) => {
        userData.promotions.push({
          createdAt: doc.data().createdAt,
          promoName: doc.data().promoName,
          promoCode: doc.data().promoCode,
          promoDesc: doc.data().promoDesc,
          username: doc.data().username,
          userImage: doc.data().userImage,
          promotionId: doc.id,
        });
      });
      return response.json(userData);
    })
    .catch((err) => {
      return response.status(500).json({ error: err.code });
    });
};

exports.markNotificationsRead = (request, response) => {
  let batch = db.batch();
  request.body.forEach((notifId) => {
    const notification = db.doc(
      `/organizations/uncle-johns/notifications/${notifId}`
    );
    batch.update(notification, { isRead: true });
  });

  batch
    .commit()
    .then(() => {
      return response.json({
        message: "Notifications successfully marked read.",
      });
    })
    .catch((err) => {
      return response.status(500).json({ error: err.code });
    });
};
