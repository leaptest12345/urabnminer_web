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
        switch (snapshot.state) {
          case "paused":
            break;
          case "running":
            break;
        }
      },
      (error) => {
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
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
        switch (snapshot.state) {
          case "paused":
            break;
          case "running":
            break;
        }
      },
      (error) => {
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
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

        switch (snapshot.state) {
          case "paused":
            break;
          case "running":
            break;
        }
      },
      (error) => {
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
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
    const uploadTask = uploadBytesResumable(storageRef, imgfile, metadata);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        switch (snapshot.state) {
          case "paused":
            break;
          case "running":
            break;
        }
      },
      (error) => {
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve([downloadURL, imgfile.name]);
        });
      }
    );
  });
};
