import { onValue, ref, set, update } from "firebase/database";
import { auth, database } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateEmail,
} from "firebase/auth";
import { ArrayConverter } from "../ArrayConverter";

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

export const SignUpAuth = (email, password) => {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
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

export const changeEmail = (email) => {
  return new Promise((resolve, reject) => {
    updateEmail(auth.currentUser, email)
      .then(() => {
        resolve("Email updated!");
      })
      .catch((error) => {
        reject(error);
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

export const getCustomerList = async () => {
  try {
    const id = localStorage.getItem("userID");
    const customerDetail = await getData(`USER_CUSTOMER/${id}/CUSTOMER`);
    let arr = [];
    ArrayConverter(customerDetail).map((item) => {
      arr.push({
        ...item,
        label:
          item.UserFirstName +
          " " +
          item.UserLastName +
          `(${item.BusinessName})`,
      });
    });
    return arr;
  } catch (error) {
    console.log(error);
  }
};
