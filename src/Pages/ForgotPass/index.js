import React, { useState } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { auth } from "./../../Firebase";

function Login() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorShow, setErrorShow] = useState(false);
  const [loader, setLoader] = useState(false);

  const userLogin = () => {
    if (email === "") {
      setErrorShow(true);
      setErrorMessage("Email is required");
    } else {
      setLoader(true);
      auth
        .sendPasswordResetEmail(email)
        .then(() => {
          setLoader(false);
          setSuccess(true);
          // navigate("/home");
        })
        .catch((error) => {
          setErrorShow(true);
          setErrorMessage(errorMessage);
          setLoader(false);
        });
    }
  };
  return (
    <div className="mainDiv">
      <Container>
        {success ? (
          <h4 className="text-center py-4">
            Email Sent successfully, <br />
            Check your Email!
          </h4>
        ) : null}
        <Row className="justify-content-center">
          <Col xs={12} sm={8} md={8} lg={5} xl={5}>
            <div>
              <h4>Forgot Password</h4>
              <div className="loginDiv">
                <input
                  placeholder="Email"
                  className="input"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrorShow(false);
                    setErrorMessage("");
                  }}
                />
              </div>

              {errorShow ? (
                <p className="errorMessage">{errorMessage}</p>
              ) : null}
              <div className="btnDiv">
                <p className="dontHaveTxt">
                  Don't have an account{" "}
                  <span onClick={() => navigate("/signup")}>Register</span>
                </p>
                <Button
                  variant="contained"
                  className="loginBtn"
                  onClick={() => userLogin()}
                  disabled={loader}
                >
                  {loader ? "Loading" : "Reset Password"}
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
