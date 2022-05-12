import React, { useEffect, useState } from "react";
import { Container, Button, Row, Col, Nav, Input } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { auth } from "./../../Firebase";

function Login() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorShow, setErrorShow] = useState(false);
  const [loader, setLoader] = useState(false);

  // useEffect(() => {
  //   auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       navigate("/home");
  //     } else {
  //       navigate("/");
  //     }
  //   });
  // });

  const userLogin = async () => {
    if (email === "") {
      setErrorShow(true);
      setErrorMessage("Email is required");
    } else if (password === "") {
      setErrorShow(true);
      setErrorMessage("Password is required");
    } else {
      setLoader(true);
      auth
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          setLoader(false);
          navigate("/home");
        })
        .catch((error) => {
          var errorMessage = error.message;
          setErrorShow(true);
          setErrorMessage(errorMessage);
          setLoader(false);
        });
    }
  };
  return (
    <div className="">
      <Container>
        <Row className="justify-content-center mt-5 pt-5">
          <Col xs={12} sm={8} md={8} lg={5} xl={5}>
            <h1 className="my-3">Login</h1>
            <div className="mb-3">
              <label>Email address</label>
              <input
                className="form-control"
                placeholder="Email"
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
            <div className="mb-3">
              <label>Password</label>
              <input
                className="form-control"
                placeholder="Password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorShow(false);
                  setErrorMessage("");
                }}
              />
            </div>
            {errorShow ? <p className="text-danger">{errorMessage}</p> : null}
            <div className="d-flex align-content-center gap-2 py-2">
              <p className="m-0 ">Don't have an account</p>
              <Nav.Link href="/signup" className="m-0 p-0">
                Register
              </Nav.Link>
            </div>
            <div className="d-grid">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => userLogin()}
                disabled={loader}
              >
                {loader ? "Loading" : "Login"}
              </button>
            </div>
            <div>
              <p className=" text-center pt-4">
                <Nav.Link href="/forgotpass">Forgot Password?</Nav.Link>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
