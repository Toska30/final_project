import React, { useState } from "react";
import { Container, Nav, Row, Col } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import { auth, db } from "./../../Firebase";

function Signup() {
  let navigate = useNavigate();
  //   const db = firebase.firestore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorShow, setErrorShow] = useState(false);
  const [loader, setLoader] = useState(false);

  const Register = () => {
    if (name === "") {
      setErrorShow(true);
      setErrorMessage("Name is required");
    } else if (email === "") {
      setErrorShow(true);
      setErrorMessage("Email is required");
    } else if (password === "") {
      setErrorShow(true);
      setErrorMessage("Password is required");
    } else {
      setLoader(true);
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          var user = userCredential.user;
          alert("success");
          db.collection("users")
            .doc(user.uid)
            .set({
              name: name,
              email: email,
              password: password,
            })
            .then((docRef) => {
              // console.log('Document written with ID: ', docRef.id);
              setLoader(false);
              navigate("/home");
            })
            .catch((error) => {
              console.error("Error adding document: ", error);
              setLoader(false);
            });
        })
        .catch((error) => {
          var errorMessage = error.message;
          setErrorShow(true);
          setErrorMessage(errorMessage);
          alert("fail");
          setLoader(false);
        });
    }
  };
  return (
    <div className="">
      <Container>
        <Row className="justify-content-center mt-5 pt-5">
          <Col xs={12} sm={8} md={8} lg={5} xl={5}>
            <h1 className="my-3">Register</h1>
            <div className="mb-3">
              <div className="mb-3">
                <label>Name</label>
                <input
                  className="form-control"
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={(e) => {
                    setErrorShow(false);
                    setErrorMessage("");
                    setName(e.target.value);
                  }}
                  type="name"
                />
              </div>

              <div className="mb-3">
                <label>Email address</label>
                <input
                  className="form-control"
                  value={email}
                  placeholder="Email"
                  name="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrorShow(false);
                    setErrorMessage("");
                  }}
                  type="email"
                />
              </div>
              <div className="mb-3">
                <label>Password</label>
                <input
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(e) => {
                    setErrorShow(false);
                    setErrorMessage("");
                    setPassword(e.target.value);
                  }}
                  type="password"
                />
              </div>

              {errorShow ? <p className="text-danger">{errorMessage}</p> : null}
              <div className="">
                <p className="d-flex align-content-center gap-2 ">
                  Have an account?{" "}
                  <Nav.Link href="/" className="p-0 m-0">
                    Login
                  </Nav.Link>
                </p>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => Register()}
                  disabled={loader}
                >
                  {loader ? "Loading..." : "Register"}
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Signup;
