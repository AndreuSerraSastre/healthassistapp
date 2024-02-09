import styled from "styled-components";

export const AlertListWrapper = styled.div`
  overflow: hidden;
  width: 90%;
  margin: 0 auto;
  max-width: 450px !important;
  background: #222;
  height: 200px;
  color: white;
  border-radius: 5px;

  display: flex;
  flex-direction: column;
`;

export const AlertListInnerWrapper = styled.div`
  overflow: auto;
  height: 100%;
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
`;

export const AlertWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin: 5px;
  font-size: 0.8rem;
  border: 1px solid #6c6c6c4d;
  :hover {
    background: #6c6c6c4d;
  }
`;

export const AlertText = styled.div`
  margin: 15px;
`;

export const AlertCross = styled.div`
  float: right;
  :hover {
    color: red;
  }
`;
