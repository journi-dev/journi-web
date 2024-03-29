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
const postmark = require("postmark");
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

exports.createLead = (req, res) => {
  const newLead = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
    email: req.body.email,
    jobTitle: req.body.jobTitle,
    leadSource: req.body.leadSource,
    selectedPlatforms: req.body.selectedPlatforms,
    hasApp: req.body.hasApp,
    hasWeb: req.body.hasWeb,
    isRequestingMarketing: req.body.isRequestingMarketing,
    orgName: req.body.orgName,
    orgSize: req.body.orgSize,
    selectedCategories: req.body.selectedCategories,
    locationCount: req.body.locationCount,
    plan: req.body.plan,
    deadline: req.body.deadline,
    discountMinMonthlyCharge: req.body.discountMinMonthlyCharge,
    discountRate: req.body.discountRate,
    standardMinMonthlyCharge: req.body.standardMinMonthlyCharge,
    standardRate: req.body.standardRate,
    startupFee: req.body.startupFee,
    features: req.body.features,
  };

  db.doc(`/organizations/uncle-johns/leads/${newLead.email}`)
    .get()
    .then(async (doc) => {
      if (doc.exists) {
        // The lead is already in the system.
        return res.status(400).json({
          message: "This lead is already in the system.",
        });
      } else {
        const client = new postmark.ServerClient(
          "43939236-dc23-4859-b2b2-9a8ff052237a"
        );
        const dirUrl = `${__dirname}/emails/leadEmail.ejs`;
        const selectedPlatformsStr = newLead.selectedPlatforms
          .join(" and ")
          .toLowerCase();
        const data = {
          firstName: newLead.firstName,
          orgName: newLead.orgName,
          selectedPlatforms: selectedPlatformsStr,
          plan: newLead.plan,
          deadline: newLead.deadline,
          discountMinMonthlyCharge: newLead.discountMinMonthlyCharge,
          discountRate: newLead.discountRate,
          standardMinMonthlyCharge: newLead.standardMinMonthlyCharge,
          standardRate: newLead.standardRate,
          startupFee: newLead.startupFee,
          features: newLead.features,
        };

        const HtmlBody = await ejs
          .renderFile(dirUrl, data)
          .then((output) => output);
        console.log(HtmlBody);

        client
          .sendEmail({
            From: "hello@journi.dev",
            To: newLead.email,
            Subject: `A${
              selectedPlatformsStr[0] === "a" ||
              selectedPlatformsStr[0] === "e" ||
              selectedPlatformsStr[0] === "i" ||
              selectedPlatformsStr[0] === "o" ||
              selectedPlatformsStr[0] === "u"
                ? "n"
                : ""
            } ${selectedPlatformsStr} just for ${newLead.orgName} 🧑‍💻`,
            HtmlBody,
            MessageStream: "outbound",
          })
          .then(() => console.log("Lead email successfully sent."))
          .catch((err) => console.error("Lead email unsuccessful.", err));

        const timestamp = new Date();
        const leadData = {
          createdAt: timestamp,
          lastUpdated: timestamp,
          firstName: newLead.firstName,
          lastName: newLead.lastName,
          phone: newLead.phone,
          email: newLead.email,
          jobTitle: newLead.jobTitle,
          leadSource: newLead.leadSource,
          selectedPlatforms: newLead.selectedPlatforms,
          hasApp: newLead.hasApp,
          hasWeb: newLead.hasWeb,
          isRequestingMarketing: newLead.isRequestingMarketing,
          orgName: newLead.orgName,
          orgSize: newLead.orgSize,
          selectedCategories: newLead.selectedCategories,
          locationCount: newLead.locationCount,
        };

        return db
          .doc(`/organizations/uncle-johns/leads/${newLead.email}`)
          .set(leadData);
      }
    })
    .then(() => {
      return res
        .status(200)
        .json({ message: "Lead successfully created and emailed." });
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message });
    });
};

exports.getLeads = (req, res) => {
  db.collection("organizations/uncle-johns/leads")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      const leads = [];
      data.forEach((doc) => {
        leads.push({
          id: doc.id,
          createdAt: doc.data().createdAt,
          email: doc.data().email,
          firstName: doc.data().firstName,
          hasApp: doc.data().hasApp,
          hasWeb: doc.data().hasWeb,
          isRequestingMarketing: doc.data().isRequestingMarketing,
          jobTitle: doc.data().jobTitle,
          lastName: doc.data().lastName,
          lastUpdated: doc.data().lastUpdated,
          leadSource: doc.data().leadSource,
          locationCount: doc.data().locationCount,
          orgName: doc.data().orgName,
          orgSize: doc.data().orgSize,
          phone: doc.data().phone,
          selectedCategories: doc.data().selectedCategories,
          selectedPlatforms: doc.data().selectedPlatforms,
        });
      });
      return res.json(leads);
    })
    .catch((err) => {
      return res.status(500).json({ code: err.code });
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
    .then(async (token) => {
      const client = new postmark.ServerClient(
        "43939236-dc23-4859-b2b2-9a8ff052237a"
      );
      const dirUrl = `${__dirname}/emails/test.ejs`;
      const data = { firstName: newUser.firstName };

      const HtmlBody = await ejs
        .renderFile(dirUrl, data)
        .then((output) => output);
      console.log(HtmlBody);

      client
        .sendEmail({
          From: "account@journi.dev",
          To: newUser.email,
          Subject: "Set up your Journi account",
          HtmlBody,
          MessageStream: "outbound",
        })
        .then(() => console.log("Verification email successfully sent."))
        .catch((err) => console.error("Verification email unsuccessful.", err));

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
