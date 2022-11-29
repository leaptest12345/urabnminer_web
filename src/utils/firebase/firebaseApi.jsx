import { onValue, ref, set, update } from "firebase/database";
import { auth, database, storage } from "./firebaseConfig";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";

//auth
export const LoginAuth = (email, password) => {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        resolve(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        reject(errorMessage.split(":")[1]);
      });
  });
};
export const sendEmail = (email) => {
  return new Promise((resolve, reject) => {
    sendPasswordResetEmail(auth, email)
      .then((value) => {
        resolve(value);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        reject(errorMessage.split(":")[1]);
      });
  });
};

//realtime database
export const setData = (refPath, data) => {
  return new Promise((resolve, reject) => {
    set(ref(database, refPath), data)
      .then((value) => resolve(value))
      .catch((error) => reject(error));
  });
};

export const updateData = (refPath, data) => {
  return new Promise((resolve, reject) => {
    update(ref(database, refPath), data)
      .then((value) => resolve(value))
      .catch((error) => reject(error));
  });
};

export const getData = (refPath) => {
  return new Promise((resolve, reject) => {
    const starCountRef = ref(database, refPath);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      resolve(data);
    });
  });
};
