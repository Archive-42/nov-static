import React, { useState } from "react";
import romanConverter from "../utility/roman-converter";
import { Container, Row, Col, Form } from "react-bootstrap";
import {
  Title,
  RomanValue,
  Result,
  ButtonsRow,
  CustomBtn,
  ErrorMessage
} from "./style.css";

const RomanInputs = () => {
  const [firstValue, setFirstValue] = useState("");
  const [secondValue, setSecondeValue] = useState("");
  const [errorField, setErrorField] = useState("");
  const [total, setTotal] = useState(firstValue + secondValue);

  function calculateTotal() {
    let totalNumbers = firstValue + secondValue;
    setTotal(totalNumbers);
    if (totalNumbers <= 99999) {
      setErrorField("");
    } else {
      setErrorField("totalExceeded");
    }
  }

  function calculateSub() {
    let totalNumbers = firstValue - secondValue;
    setTotal(totalNumbers);
    if (totalNumbers <= 99999) {
      setErrorField("");
    } else {
      setErrorField("totalExceeded");
    }
  }

  function calculatemulti() {
    let totalNumbers = firstValue * secondValue;
    setTotal(totalNumbers);
    if (totalNumbers <= 99999) {
      setErrorField("");
    } else {
      setErrorField("totalExceeded");
    }
  }

  function handleValueChange(fieldName, value, successCallback, errorCallback) {
    if (value <= 99999) {
      successCallback(value);
      errorCallback("");
    } else {
      errorCallback(fieldName);
    }
  }

  return (
    <Container>
      <Title>Roman Calculator</Title>
      <Row>
        <Col md={6} xs={12}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>First Number</Form.Label>
            <Form.Control
              placeholder="Enter first number"
              value={firstValue}
              type="number"
              onChange={e =>
                handleValueChange(
                  "firstNumber",
                  +e.target.value,
                  setFirstValue,
                  setErrorField
                )
              }
            />
            {errorField === "firstNumber" && (
              <ErrorMessage>
                value exceeded allowable range (0-99999)
              </ErrorMessage>
            )}
            <RomanValue className="text-muted">
              Number in Roman: {romanConverter(firstValue)}
            </RomanValue>
          </Form.Group>
        </Col>
        <Col md={6} xs={12}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Second Number</Form.Label>
            <Form.Control
              placeholder="Enter second number"
              value={secondValue}
              type="number"
              onChange={e =>
                handleValueChange(
                  "secondNumber",
                  +e.target.value,
                  setSecondeValue,
                  setErrorField
                )
              }
            />
            {errorField === "secondNumber" && (
              <ErrorMessage>
                value exceeded allowable range (0-99999)
              </ErrorMessage>
            )}
            <RomanValue className="text-muted">
              Number in Roman: {romanConverter(secondValue)}
            </RomanValue>
          </Form.Group>
        </Col>
      </Row>

      <ButtonsRow>
        <Col md={4} xs={12}>
          <CustomBtn variant="primary" onClick={calculateTotal}>
            Add Them
          </CustomBtn>
        </Col>
        <Col md={4} xs={12}>
          <CustomBtn variant="warning" onClick={calculatemulti}>
            Multi Them
          </CustomBtn>
        </Col>
        <Col md={4} xs={12}>
          <CustomBtn variant="danger" onClick={calculateSub}>
            Sub Them
          </CustomBtn>
        </Col>
      </ButtonsRow>
      <Row>
        <Col xs={12}>
          <Result>
            Result: <span>{total}</span>
          </Result>
        </Col>
        <Col xs={12}>
          <Result>
            Result In Roman:
            {errorField === "totalExceeded" ? (
              <ErrorMessage> exceeded allowable range</ErrorMessage>
            ) : (
              <span>
                {total < 0 ? (
                  <ErrorMessage> no negitaive numbers in roman</ErrorMessage>
                ) : (
                  romanConverter(total)
                )}
              </span>
            )}
          </Result>
        </Col>
      </Row>
    </Container>
  );
};

export default RomanInputs;
