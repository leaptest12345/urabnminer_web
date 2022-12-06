import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
  uploadString,
} from "firebase/storage";
import { storage } from "./firebaseConfig";

//storage
export const uploadCustomerImage = async (imgfile, userid, customerID) => {
  console.log("file :::", imgfile);
  return new Promise((resolve, reject) => {
    const storageRef = ref(
      storage,
      `Customer_Image/user:${userid}/customer:${customerID}/${imgfile.name}`
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
export const uploadInvoiceImages = async (
  imgfile,
  userid,
  customerID,
  invoiceId,
  invoiceNumber
) => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(
      storage,
      `InvoiceImages/user:${userid}/customer:${customerID}/invoice:${invoiceId}/${invoiceNumber}`
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
          resolve([downloadURL, imgfile.name]);
        });
      }
    );
  });
};
export const uploadProfileImage = async (imgfile) => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, `/UserProfileImage/${imgfile.name}`);
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
          resolve([downloadURL, imgfile.name]);
        });
      }
    );
  });
};
export const deleteProfileImage = async (name) => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, `/UserProfileImage/${name}`);
    deleteObject(storageRef)
      .then(() => {
        resolve(" File deleted successfully");
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const uploadPdf = async (imgfile) => {
  return new Promise((resolve, reject) => {
    const metadata = {
      contentType: "application/pdf",
    };
    const storageRef = ref(
      storage,
      `/PDF/user:${25}/customer:${25}/invoice:${25}/${"invoice.pdf"}`
    );
    // uploadString(storageRef, imgfile, "data_url", metadata).then((value) => {
    //   resolve(value);
    // });
    const uploadTask = uploadBytesResumable(storageRef, imgfile, metadata);
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
          resolve([downloadURL, imgfile.name]);
        });
      }
    );
  });
};
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
