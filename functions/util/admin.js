const admin = require("firebase-admin");
admin.initializeApp();
const adminAuth = admin.auth();
const db = admin.firestore();

module.exports = { admin, adminAuth, db };
