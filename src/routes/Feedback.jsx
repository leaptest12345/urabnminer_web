import React from "react";
import styled from "styled-components";
import Button from "../components/Button";
import SearchAutoComplete from "../components/SearchAutoComplete";
import { TextArea, Title, Wrapper } from "../utils/GlobalStyles";

export default function Feedback() {
  const FeedbackContainer = styled.div`
    padding-inline: 10%;
    padding: 5%;
  `;
  return (
    <Wrapper>
      <Title>Feedback</Title>
      <FeedbackContainer>
        <SearchAutoComplete />
        <TextArea style={{ marginTop: "20px", height: "40vh" }} />
        <Button title="Send Feedback" />
      </FeedbackContainer>
    </Wrapper>
  );
}
