import React, { useState, useEffect } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { auth } from "./../../Firebase";
import Navbar from "../../Components/Navbar";

import DoneImage from "./../../images/check.png";

function Checkout() {
  let navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvcNumber, setCvcNumber] = useState("");
  const [date, setDate] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        var uid = user.uid;
        console.log(uid);
      } else {
        navigate("/");
      }
    });
  });

  const checkOut = () => {
    setSuccessMessage(!successMessage);
  };

  return (
    <div>
      <Navbar />
      <div className="mt-5 pt-5">
        <Container>
          {successMessage ? (
            <Row className="justify-content-center">
              <Col xs={12} sm={8} md={8} lg={6} xl={6}>
                <div style={{ textAlign: "center" }}>
                  <img src={DoneImage} className="doneImage" alt="Done" />
                  <h4>Congratulations you have successfully purchased</h4>
                </div>
              </Col>
            </Row>
          ) : (
            <>
              <Row className="justify-content-center">
                <Col xs={12} sm={8} md={8} lg={6} xl={6}>
                  <div>
                    <h3>Billing Details</h3>
                  </div>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col xs={12} sm={8} md={8} lg={3} xl={3}>
                  <div className="mb-3">
                    <input
                      className="form-control"
                      placeholder="First Name*"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                    />
                  </div>
                </Col>
                <Col xs={12} sm={8} md={8} lg={3} xl={3}>
                  <div className="mb-3">
                    <input
                      className="form-control"
                      placeholder="Last Name*"
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                    />
                  </div>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col xs={12} sm={8} md={8} lg={6} xl={6}>
              
                  <div>
                    <div className="mb-3">
                      <select className="w-100 p-2 rounded" placeholder="Country">
                        <option>Select Country</option>
                        <option>Sweden</option>
                        <option>Denmark</option>
                        <option>Norway</option>
                        <option>Finland</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <input
                        className="form-control"
                        placeholder="Town/City*"
                        value={city}
                        onChange={(e) => {
                          setCity(e.target.value);
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        className="form-control"
                        placeholder="Street Address*"
                        value={address}
                        onChange={(e) => {
                          setAddress(e.target.value);
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        className="form-control"
                        type="text"
                        title="Enter numbers only."
                        id="uid"
                        required="'required'"
                        maxlength="19"
                        autocomplete="off"
                        placeholder="Card Number*"
                        value={cardNumber}
                        onChange={(e) => {
                          setCardNumber(
                            e.target.value
                              .replace(/[^\dA-Z]/g, "")
                              .replace(/(.{4})/g, "$1 ")
                              .trim()
                          );
                        }}
                      />
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col xs={12} sm={8} md={8} lg={3} xl={3}>
                  <div className="mb-3">
                    <input
                      className="form-control"
                      placeholder="CVC Number*"
                      value={cvcNumber}
                      onChange={(e) => {
                        setCvcNumber(e.target.value);
                      }}
                      type="number"
                    />
                  </div>
                </Col>
                <Col xs={12} sm={8} md={8} lg={3} xl={3}>
                  <div>
                    <div className="mb-3">
                      <input
                        className="form-control"
                        type="text"
                        title="Enter numbers only."
                        id="uid"
                        maxlength="5"
                        autocomplete="off"
                        placeholder="DD/MM*"
                        value={date}
                        onChange={(e) => {
                          setDate(
                            e.target.value
                              .replace(/[^\dA-Z]/g, "")
                              .replace(/(.{2})/g, "$1 ")
                              .trim()
                          );
                        }}
                      />
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col xs={12} sm={8} md={8} lg={6} xl={6}>
                  <div className="btnDiv">
                    <Button
                      variant="contained"
                      className="btn btn-primary"
                      onClick={() => checkOut()}
                    >
                      Checkout
                    </Button>
                  </div>
                </Col>
              </Row>
            </>
          )}
        </Container>
      </div>
    </div>
  );
}

export default Checkout;
