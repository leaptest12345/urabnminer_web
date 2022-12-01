import React, { useEffect, useState } from "react";
import InvoiceSentBox from "../components/InvoiceSentBox";
import LoaderSpinner from "../components/Loader";
import { InvoiceView } from "../styles/Invoice_Draft_Sent";
import { ArrayConverter } from "../utils/ArrayConverter";
import { getData } from "../utils/firebase/firebaseApi";
import { Title, Wrapper } from "../utils/GlobalStyles";
import {useNavigate} from 'react-router-dom'
export default function Invoice_Draft_Sent() {
  const [invoiceList, setInvoiceList] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate=useNavigate()
  const getInvoiceList = async () => {
    const id = localStorage.getItem("userID");
    const detail = await getData(`INVOICE_LIST`);
    const result = ArrayConverter(detail).filter((item) => item.userId == id);
    setInvoiceList(result);
    setLoading(false);
    try {
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true);
    getInvoiceList();
  }, []);
  return (
    <Wrapper>
      <LoaderSpinner visible={loading} isCenter={true} />
      <Title>Invoice</Title>
      <InvoiceView>
        {invoiceList.map((item, index) => {
          return (
            <InvoiceSentBox
             onClick={()=>navigate('/product')}
              key={index + 1 + "*"}
              userName={item.UserName}
              date={new Date(item.invoiceDate).toString().slice(0, 15)}
              totalItems={item.totalItems}
            />
          );
        })}
      </InvoiceView>
    </Wrapper>
  );
}
