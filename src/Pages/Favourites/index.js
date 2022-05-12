import React, { useState, useEffect } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { auth, db } from "./../../Firebase";
import Navbar from "../../Components/Navbar";
import { AiFillHeart } from "react-icons/ai";

function MyFavourites() {
  //   const db = firebase.firestore();
  let navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        var uid = user.uid;
        var obj;
        await db
          .collection("users")
          .doc(uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              obj = doc.data();
              obj.id = doc.id;
              setUserData(obj);
            } else {
              console.log("No such document!");
            }
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });
      } else {
        navigate("/");
      }
    });
  },[]);

  const addFavourites = async (data) => {
    var flag = false;
    if (
      userData?.favouriteProducts &&
      userData?.favouriteProducts.length !== 0
    ) {
      for (var i = 0; i < userData.favouriteProducts.length; i++) {
        if (userData.favouriteProducts[i].id === data.id) {
          flag = true;
          userData.favouriteProducts.splice(i, 1);
        }
      }
      if (!flag) {
        userData.favouriteProducts.push(data);
      }
    } else {
      userData.favouriteProducts = [data];
    }
    setUserData({ ...userData });
    console.log(userData);
    await db
      .collection("users")
      .doc(userData?.id)
      .set(userData)
      .then((docRef) => {
        console.log("favourite added successfully");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="mt-5 pt-5">
        {userData &&
        userData?.favouriteProducts &&
        userData?.favouriteProducts.length !== 0 ? (
          <Container>
            <Row className="justify-content-center">
              {userData?.favouriteProducts.length !== 0 &&
                userData.favouriteProducts.map((val, i) => {
                  return (
                    <Col xs={12} sm={8} md={8} lg={4} xl={4} key={i}>
                      <Card>
                        <Card.Img
                          variant="top"
                          src={val.images[0]}
                          style={{ maxHeight: "250px", minHeight: "250px" }}
                        />
                        <Card.Body>
                          <Card.Title>{val.title}</Card.Title>
                          <Card.Text className="m-0">
                            {val.description}
                          </Card.Text>
                          <Card.Text className="m-0">
                            Price: {Number(val.price)}$
                          </Card.Text>
                          <div className="d-flex justify-content-end">
                            <Button
                              variant=""
                              onClick={() => addFavourites(val)}
                            >
                              <AiFillHeart style={{ color: "red" }} />
                            </Button>
                            <Button
                              variant="text"
                              className="buyBtn"
                              onClick={() => navigate("/checkout")}
                            >
                              Buy Now
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })}
            </Row>
          </Container>
        ) : (
          <div style={{ textAlign: "center" }}>
            There is no favourite products
          </div>
        )}
      </div>
    </div>
  );
}

export default MyFavourites;
