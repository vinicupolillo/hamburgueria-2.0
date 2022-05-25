import styled from "styled-components";

export const Container = styled.div`
  width: 80%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: stretch;
  justify-content: flex-start;
  text-align: center;
  li {
    margin: 30px;
  }
  span {
    font-size: 20px;
  }
  img {
    height: 200px;
    width: 200px;
  }
`;
