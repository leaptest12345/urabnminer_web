import React, { useEffect, useState } from "react";
import LoaderSpinner from "../components/Loader";
import { getData } from "../utils/firebase/firebaseApi";
import { Text_reg, Title, Wrapper } from "../utils/GlobalStyles";

export default function PrivacyPolicy() {
  const [privacyDetail, setPrivacyDetail] = useState(null);
  const [loading, setLoading] = useState(false);

  const getPrivacyDetail = async () => {
    try {
      const detail = await getData(`ADMIN/privacyPolicy`);
      setPrivacyDetail(detail);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true);
    getPrivacyDetail();
  }, []);
  return (
    <Wrapper>
      <LoaderSpinner visible={loading} isCenter={true} />
      <div
        style={{
          display: "grid",
        }}
      >
        <Title>Privacy Policy</Title>
        <Text_reg
          style={{
            marginTop: "35px",
          }}
        >
          {privacyDetail?.Description}
        </Text_reg>
      </div>
    </Wrapper>
  );
}
