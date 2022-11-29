import styled from "styled-components";

export const ForgotPasswordContainer = styled.div`
  padding-inline: 10%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 80vh;
  width: 50vw;
  @media (max-width: 900px) {
    width: 100vw;
  }
`;
export const ForgotTitle = styled.div`
  display: flex;
  flex-direction: column;
  height: 9vh;
  justify-content: space-between;
`;
export const LockImg = styled.img`
  width: 200px;
  height: 200px;
`;
