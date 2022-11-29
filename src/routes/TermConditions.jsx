import React, { useEffect, useState } from "react";
import LoaderSpinner from "../components/Loader";
import { getData } from "../utils/firebase/firebaseApi";
import { Text, Title, Wrapper } from "../utils/GlobalStyles";

export default function TermConditions() {
  const [termDetail, setTermDetail] = useState(null);
  const [loading, setLoading] = useState(false);

  const getTermDetail = async () => {
    try {
      const detail = await getData(`ADMIN/termAndcondition`);
      setTermDetail(detail);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true);
    getTermDetail();
  }, []);
  return (
    <Wrapper>
      <LoaderSpinner visible={loading} isCenter={true} />
      <div
        style={{
          display: "grid",
        }}
      >
        <Title>Term And Conditions</Title>
        <Text
          style={{
            marginTop: "35px",
          }}
        >
          {termDetail?.Description}
        </Text>
      </div>
    </Wrapper>
  );
}
