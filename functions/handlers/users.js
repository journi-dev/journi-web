const { initializeApp } = require("firebase/app");
const {
  getAuth,
  signInWithEmailAndPassword,
  sendEmailVerification,
} = require("firebase/auth");
const { adminAuth, db, admin } = require("../util/admin");
const config = require("../util/config");
const {
  reduceUserDetails,
  validateLoginData,
  validateSignUpData,
} = require("../util/validators");
const firebaseApp = initializeApp(config);
const firebaseAuth = getAuth(firebaseApp);
const ejs = require("ejs");

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

exports.logInWithCredentials = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  const { valid, errors } = validateLoginData(user);
  if (!valid) return res.status(400).json({ errors });

  signInWithEmailAndPassword(firebaseAuth, user.email, user.password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      return res.status(200).json({ token });
    })
    .catch((err) => {
      return res.status(403).json({
        errors: {
          email: "",
          password: "",
          credentials: "Invalid username or password. Please try again!",
        },
      });
    });
};

exports.createUser = (req, res) => {
  const newUser = {
    accessLevel: req.body.accessLevel,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    jobTitle: req.body.jobTitle,
    username: req.body.username,
    redirectUrl: req.body.redirectUrl,
    // phoneNumber: req.body.phoneNumber,
  };

  const { valid, errors } = validateSignUpData(newUser);
  if (!valid) return res.status(400).json({ errors });

  const noImg = "DefaultProfilePicture.jpg";

  db.doc(`/organizations/uncle-johns/users/${newUser.username}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        // The username is already taken
        return res.status(400).json({
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
        accessLevel: newUser.accessLevel,
        appearancePreference: "light",
        createdAt: new Date(user.metadata.creationTime),
        disabled: user.disabled,
        displayName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        userImage: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        jobTitle: newUser.jobTitle,
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
    .then(async (data) => {
      const actionCodeSettings = {
        url: newUser.redirectUrl, // URL you want to be redirected to after email verification
      };

      try {
        const actionLink = await firebaseAuth.generateEmailVerificationLink(
          newUser.email,
          actionCodeSettings
        );
        const template = await ejs.renderFile("../html/verifyEmail.ejs", {
          actionLink,
          randomNumber: Math.random(),
        });
        sendEmailVerification(data.user);
        res.status(200).json({ message: "Email successfully sent" });
        return data.user.getIdToken();
      } catch (error) {
        const message = error.message;
        if (error.code === "auth/user-not-found")
          return res.status(404).json({ message });
        if (error.code === "auth/invalid-continue-uri")
          return res.status(401).json({ message });
        res.status(500).json({ message });
      }
    })
    .then((token) => {
      return res.status(201).json({ token });
    })
    .catch((err) => {
      if (err.code === "auth/email-already-exists")
        return res.status(400).json({
          email:
            "This email is already in use! Log in with that email or try another email.",
        });
      return res
        .status(500)
        .json({ general: "Something went wrong. Please try again." });
    });
};

exports.addUserDetails = (req, res) => {
  let userDetails = reduceUserDetails(req.body);
  db.doc(`/organizations/uncle-johns/users/${req.user.username}`)
    .update(userDetails)
    .then(() => {
      return res.json({ message: "Details updated successfully!" });
    })
    .catch((err) => {
      return res.status(500).json({ code: err.code });
    });
};

exports.getAuthenticatedUser = (req, res) => {
  let userData = {};
  db.doc(`/organizations/uncle-johns/users/${req.user.username}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        userData.credentials = doc.data();
        return db
          .collection(`/organizations/uncle-johns/pinnedUpdates/`)
          .where("username", "==", req.user.username)
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
        .where("recipient", "==", req.user.username)
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
      return res.json(userData);
    })
    .catch((err) => {
      return res.status(500).json({ code: err.code });
    });
};

exports.getUsers = (req, res) => {
  db.collection("organizations/uncle-johns/users")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      const users = [];
      data.forEach((doc) => {
        users.push({
          id: doc.id,
          accessLevel: doc.data().accessLevel,
          createdAt: doc.data().createdAt,
          disabled: doc.data().disabled,
          email: doc.data().email,
          emailVerified: doc.data().emailVerified,
          firstName: doc.data().firstName,
          lastName: doc.data().lastName,
          userImage: doc.data().userImage,
          username: doc.data().username,
        });
      });
      return res.json(users);
    })
    .catch((err) => {
      return res.status(500).json({ code: err.code });
    });
};

exports.updateUser = (req, res) => {
  const { accessLevel, disabled } = req.body;

  db.doc(`/organizations/uncle-johns/users/${req.params.username}`)
    .update({ accessLevel, disabled })
    .then(() => {
      return res.json({ message: "User details updated successfully!" });
    })
    .catch((err) => {
      return res.status(500).json({ code: err.code });
    });
};

exports.uploadImage = (req, res) => {
  const Busboy = require("busboy");
  const path = require("path");
  const os = require("os");
  const fs = require("fs");

  const busboy = Busboy({ headers: req.headers });

  let imageFileName;
  let imageToBeUploaded = {};

  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    // console.log("fieldname:", fieldname);
    // console.log("filename:", filename.filename);
    // console.log("mimetype", mimetype);

    if (mimetype !== "image/jpeg" && mimetype !== "image/png")
      return res.status(400).json({ error: "Incorrect file type." });

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
          .doc(`/organizations/uncle-johns/users/${req.user.username}`)
          .update({ imageUrl });
      })
      .then(() => {
        return res.json({ message: "Image uploaded successfully" });
      })
      .catch((err) => {
        return res.status(500).json({ code: err.code });
      });
  });

  busboy.end(req.rawBody);
};

exports.getUserDetails = (req, res) => {
  let userData = {};
  db.doc(`/organizations/uncle-johns/users/${req.params.username}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        userData.user = doc.data();
        return db
          .collection("organizations/uncle-johns/promotions")
          .where("username", "==", req.params.username)
          .orderBy("createdAt", "desc")
          .get();
      } else {
        return res.status(404).json({ error: "User not found." });
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
      return res.json(userData);
    })
    .catch((err) => {
      return res.status(500).json({ code: err.code });
    });
};

exports.markNotificationsRead = (req, res) => {
  let batch = db.batch();
  req.body.forEach((notifId) => {
    const notification = db.doc(
      `/organizations/uncle-johns/notifications/${notifId}`
    );
    batch.update(notification, { isRead: true });
  });

  batch
    .commit()
    .then(() => {
      return res.json({
        message: "Notifications successfully marked read.",
      });
    })
    .catch((err) => {
      return res.status(500).json({ code: err.code });
    });
};
