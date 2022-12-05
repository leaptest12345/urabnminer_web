import database from "@react-native-firebase/database";
import { getData } from "./firebase/firebaseApi";

export const getPdfDetailFromFirebase = (data) => {
  return new Promise((resolve, reject) => {
    const { customerId, userID, invoiceID } = data;
    getData(
      `/PDF/user:${userID}/customer:${customerId}/invoiceid:${invoiceID}`
    );
  });
};
