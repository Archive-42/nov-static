import styled from "styled-components/macro";
import { Form, Row, Button } from "react-bootstrap";

export const Title = styled.h2`
  margin: 1em 0 2.3em;
  text-align: center;
`;

export const RomanValue = styled(Form.Text)`
  text-align: left;
  clear: both;
  word-break: break-word;
  @media (max-width: 768px) {
    margin-bottom: 25px;
  }
`;

export const ErrorMessage = styled.span`
  text-align: left;
  color: #ff1212;
  font-size: 13px;
  text-transform: uppercase;
`;

export const CustomBtn = styled(Button)`
  @media (max-width: 768px) {
    margin: 10px 0;
    width: 100%;
  }
`;

export const ButtonsRow = styled(Row)`
  margin: 2em 0;
`;

export const Result = styled.p`
  text-align: left;
  word-break: break-word;
`;
