import { Link } from "react-router-dom";
import styled from "styled-components";

export const InvoiceDraftSentBox = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #f5f5f5;
  border-radius: 6px;
  padding: 10px;
  padding-right: 20px;
  color: white;
  justify-content: space-between;
  align-items: center;
  box-shadow: 3px 0 5px -2px #888;
  margin-top: 10px;
  :hover {
    background-color: lightgray;
    cursor: pointer;
  }
`;
export const InvoiceSubBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 65%;
  justify-content: space-between;
`;
export const InvoiceView = styled.div`
  display: grid;
  grid-template-columns: 30% 30% 30%;
  grid-column-gap: 5%;
  @media (max-width: 1100px) {
    grid-template-columns: 43% 43%;
  }
  @media (max-width: 800px) {
    grid-template-columns: 80%;
  }
  @media (max-width: 600px) {
    grid-template-columns: 100%;
  }
`;

export const ItemCard = styled.div`
  position: relative;
  height: 100%;
  width: 15%;
  align-items: center;
  display: flex;
`;
