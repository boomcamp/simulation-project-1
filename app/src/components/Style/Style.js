import styled from "styled-components";

const Div = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 200px;
`;
const Cont = styled.div`
  border-radius: 20px;
  padding: 30px 50px 60px 50px;
  display: flex;
  flex-direction: column;
  width: 400px;
  background: whitesmoke;
`;
const Cont2 = styled.div`
  margin-top: 100px;
  border-radius: 20px;
  padding: 50px;
  display: flex;
  flex-direction: column;
  background: whitesmoke;
`;
const Span = styled.span`
  font-size: 30px;
  text-align: center;
  padding: 20px 0 30px 0;
`;
const Span2 = styled.span`
  padding: 5px 0 5px 0;
`;

export { Div, Cont, Span, Span2, Cont2 };
