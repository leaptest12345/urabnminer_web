import React, { useEffect, useState } from "react";
import InvoiceSentBox from "../components/InvoiceSentBox";
import LoaderSpinner from "../components/Loader";
import { InvoiceView } from "../styles/Invoice_Draft_Sent";
import { ArrayConverter } from "../utils/ArrayConverter";
import { getData } from "../utils/firebase/firebaseApi";
import { Bold_1, Title, View_6_Row, Wrapper } from "../utils/GlobalStyles";
import { useNavigate } from "react-router-dom";
import { RowView, TouchView } from "../styles/Invoice.styles";
export default function Invoice_Draft_Sent() {
  const [invoiceList, setInvoiceList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [invoiceType, setInvoiceType] = useState("draft");
  const navigate = useNavigate();
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

  const oninvoiceTypeChange = () => {
    if (invoiceType == "draft") setInvoiceType("sent");
    else setInvoiceType("draft");
  };
  const Touch1_click = invoiceType != "draft" ? oninvoiceTypeChange : null;
  const Touch2_click = invoiceType != "sent" ? oninvoiceTypeChange : null;
  const Touch1_color = invoiceType == "draft" ? "#2a547e" : null;
  const Touch2_color = invoiceType == "sent" ? "#2a547e" : null;
  const textColor1 = invoiceType == "draft" ? "white" : "black";
  const textColor2 = invoiceType == "sent" ? "white" : "black";
  return (
    <Wrapper>
      <LoaderSpinner visible={loading} isCenter={true} />
      <Title>Invoice</Title>
      <RowView style={{ marginTop: "20px" }}>
        <Bold_1>InvoiceType </Bold_1>
        <View_6_Row>
          <TouchView
            onClick={Touch1_click}
            background={Touch1_color}
            color={textColor1}
          >
            <Bold_1>Draft</Bold_1>
          </TouchView>
          <TouchView
            onClick={Touch2_click}
            background={Touch2_color}
            color={textColor2}
          >
            <Bold_1>Sent</Bold_1>
          </TouchView>
        </View_6_Row>
      </RowView>
      <InvoiceView>
        {invoiceList.map((item, index) => {
          return item.type == invoiceType ? (
            <InvoiceSentBox
              onClick={() =>
                navigate("/invoice", {
                  state: {
                    invoiceDetail: item,
                  },
                })
              }
              key={index + 1 + "*"}
              userName={item.UserName}
              date={new Date(item.invoiceDate).toString().slice(0, 15)}
              totalItems={item.totalItems}
            />
          ) : null;
        })}
      </InvoiceView>
    </Wrapper>
  );
}
