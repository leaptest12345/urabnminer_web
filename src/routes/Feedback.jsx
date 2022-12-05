import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import LoaderSpinner from "../components/Loader";
import { getData, setData } from "../utils/firebase/firebaseApi";
import { TextArea, Title, Wrapper } from "../utils/GlobalStyles";
import { toastAlert } from "../utils/toastAlert";
import { uniqueId } from "../utils/uniqueId";

const FeedbackContainer = styled.div`
  padding-inline: 10%;
  padding: 5%;
`;
export default function Feedback() {
  const [feedback, setFeedBack] = useState("");
  const [loading, setLoading] = useState(false);
  const sendFeedback = async () => {
    try {
      if (feedback != "") {
        setLoading(false);
        const id = localStorage.getItem("userID");
        const data = await getData(`USERS/${id}`);
        await setData(`ADMIN/FeedBack/id:${uniqueId}`, {
          name: data.firstName + data.lastName,
          email: data.email,
          userId: data.ID,
          feedBack: feedback,
        });
        toastAlert(1, "Feedback successfully send!");
        setFeedBack("");
      } else toastAlert(0, "Please Fill The Value!");
    } catch (error) {
      setLoading(false);
    }
  };
  const textAreaStyle = {
    marginTop: "20px",
    height: "40vh",
    fontWeight: "400",
    fontSize: "15px",
  };
  return (
    <Wrapper>
      <LoaderSpinner isCenter={true} visible={loading} />
      <Title>Feedback</Title>
      <FeedbackContainer>
        <TextArea
          value={feedback}
          style={textAreaStyle}
          onChange={(e) => setFeedBack(e.target.value)}
        />
        <Button title="Send Feedback" onClick={() => sendFeedback()} />
      </FeedbackContainer>
    </Wrapper>
  );
}
