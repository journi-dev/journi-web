import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser, logOut } from "../utils/redux/features/User";
import { auth, db, googleProvider } from "../utils/Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { /* collection, */ doc, setDoc } from "firebase/firestore";

export default function Auth() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  // const usersCollectionsRef = collection(db, "organizations/uncle-johns/users");
  const appearance = useSelector((state) => state.appearance.value);
  // const user = useSelector((state) => state.user.value);

  const createFirebaseUser = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        (res) => {
          const docData = {
            firstName,
            lastName,
            displayName: `${firstName} ${lastName}`,
            email,
            password,
            userId: res.user.uid,
            phoneNumber: "+11234567890",
            emailVerified: false,
            disabled: false,
            accessLevel: "user",
            appearancePreferance: appearance,
            createdAt: new Date(),
          };

          setDoc(
            doc(db, "organizations/uncle-johns/users", res.user.uid),
            docData
          );
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  const logInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  const logOutUser = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  // console.log(auth?.currentUser?.email);
  // console.log(auth?.currentUser?.photoURL);

  return (
    <div>
      <input
        placeholder="First Name"
        value={firstName}
        type="text"
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        placeholder="Last Name"
        value={lastName}
        type="text"
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={() => {
          createFirebaseUser(firstName, lastName, email, password).then(() => {
            dispatch(createUser({ firstName, lastName, email, password }));
            console.log(`New user created: ${email}!`);
          });
        }}
      >
        Sign up
      </button>

      <button
        onClick={() => {
          logInWithGoogle().then(() => {
            const displayName = auth.currentUser.displayName;
            const email = auth.currentUser.email;
            dispatch(createUser({ displayName, email }));
            console.log(`Successfully logged in with Google as ${email}!`);
          });
        }}
      >
        Log in with Google
      </button>

      <button
        onClick={() => {
          logOutUser().then(() => {
            dispatch(logOut());
            console.log("Successfully logged out!");
          });
        }}
      >
        Log Out
      </button>
    </div>
  );
}
