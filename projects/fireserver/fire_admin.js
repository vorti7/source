var admin = require("firebase-admin");
var serviceAccount = require("serviceAccountKey");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fireserver-15378.firebaseio.com"
});

var db = admin.database();
var ref = db.ref("restricted_access/secret_document");

var usersRef = ref.child("users");
usersRef.set({
  alanisawesome: {
    date_of_birth: "June 23, 1912",
    full_name: "Alan Turing"
  },
  gracehop: {
    date_of_birth: "December 9, 1906",
    full_name: "Grace Hopper"
  }
});
