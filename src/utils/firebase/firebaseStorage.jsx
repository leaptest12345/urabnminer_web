import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "./firebaseConfig";

//storage
export const uploadCustomerImage = async (imgfile, userid, customerID) => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(
      storage,
      `Customer_Image/user:${userid}/customer:${customerID}/${imgfile}`
    );
    const uploadTask = uploadBytesResumable(storageRef, imgfile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          resolve(downloadURL);
        });
      }
    );
  });
};

// export const uploadPdf = async (url, name, user, customer, invoice) => {
//   return new Promise((resolve, reject) => {
//     const uploadTask = storage()
//       .ref()
//       .child(
//         `/PDF/user:${user}/customer:${customer}/invoice:${invoice}/${name}`
//       )
//       .putFile(url);
//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//       },
//       (error) => {
//         reject(error);
//       },
//       () => {
//         uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
//           resolve(downloadURL);
//         });
//       }
//     );
//   });
// };
// export const uploadImage = async (value) => {
//   return new Promise((resolve, reject) => {
//     const { uri } = value;
//     const filename = uri.substring(uri.lastIndexOf("/") + 1);
//     const uploadUri = Platform.OS === "ios" ? uri.replace("file://", "") : uri;
//     const uploadTask = storage()
//       .ref()
//       .child(`/UserProfileImage/${filename}`)
//       .putFile(uploadUri);
//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//       },
//       (error) => {
//         reject(error);
//       },
//       () => {
//         uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
//           resolve([downloadURL, filename]);
//         });
//       }
//     );
//   });
// };
// export const uploadImage1 = async (value, userid, customerID, id, id1) => {
//   return new Promise((resolve, reject) => {
//     const { uri } = value;
//     const filename = uri.substring(uri.lastIndexOf("/") + 1);
//     const uploadUri = Platform.OS === "ios" ? uri.replace("file://", "") : uri;
//     const uploadTask = storage()
//       .ref(`InvoiceImages/user:${userid}`)
//       .child(`customer:${customerID}`)
//       .child(`invoice:${id}/${id1}`)
//       .putFile(uploadUri);
//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//       },
//       (error) => {
//         reject(error);
//       },
//       () => {
//         uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
//           resolve([downloadURL, filename]);
//         });
//       }
//     );
//   });
// };
// export const deleteInvoiceImage = async (userid, customerID, invoiceID, id) => {
//   storage()
//     .ref(`InvoiceImages/user:${userid}`)
//     .child(`customer:${customerID}`)
//     .child(`invoice:${invoiceID}`)
//     .delete()
//     .then(function () {
//       console.log("invoiceImages deleted succesffully:");
//     })
//     .catch(function (error) {
//       console.log("file delete error", error);
//     });
// };

// export const deleteUserProfile = (photoName) => {
//   let desertRef = storage().ref().child(`/UserProfileImage/${photoName}`);
//   desertRef
//     .delete()
//     .then(function () {
//       console.log("file deleted succesffully:");
//     })
//     .catch(function (error) {
//       console.log("file delete error", error);
//     });
// };
