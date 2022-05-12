import React, { useState, useEffect } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { auth, db, store } from "./../../Firebase";
import Navbar from "../../Components/Navbar";

function AddProducts() {
  let navigate = useNavigate();
  //   const db = firebase.firestore();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorShow, setErrorShow] = useState(false);
  const [loader, setLoader] = useState(false);
  const [uploadImages, setUploadImages] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        var uid = user.uid;
        console.log(uid);
        setUserId(uid);
      } else {
        navigate("/");
      }
    });
  });

  const addProducts = () => {
    if (title === "") {
      setErrorShow(true);
      setErrorMessage("Product Name is required");
    } else if (price === "") {
      setErrorShow(true);
      setErrorMessage("Price is required");
    } else if (description === "") {
      setErrorShow(true);
      setErrorMessage("Product Details is required");
    } else if (uploadImages.length === 0) {
      setErrorShow(true);
      setErrorMessage("Images is required");
    } else {
      setLoader(true);

      db.collection("products")
        .add({
          title: title,
          description: description,
          images: uploadImages,
          uploaderId: userId,
          price: price,
        })
        .then((docRef) => {
          // console.log('Document written with ID: ', docRef.id);
          setLoader(false);
          setTitle("");
          setDescription("");
          setUploadImages([]);
          setPrice("");
          navigate("/home");
          alert("Product Added Successfully");
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
          setLoader(false);
        });
    }
  };

  const uploadImage = async (e) => {
    var selectedEventImage = e.target.files[0];

    var ref = store.ref("/").child(`images/${selectedEventImage.name}`);
    await ref.put(selectedEventImage);
    ref.getDownloadURL().then((url) => {
      console.log(url);
      uploadImages.push(url);
      setUploadImages([...uploadImages]);
    });
  };
  return (
    <div>
      <Navbar />
      <div className="mt-5 pt-5">
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} sm={8} md={8} lg={5} xl={5}>
              <div>
                <h3>Add Products</h3>

                <div className="mb-3">
                  <input
                    className="form-control"
                    placeholder="Product Name"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      setErrorShow(false);
                      setErrorMessage("");
                    }}
                  />
                </div>

                <div className="mb-3">
                  <input
                    className="form-control"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                      setErrorShow(false);
                      setErrorMessage("");
                    }}
                    type="number"
                  />
                </div>

                <div className="mb-3">
                  <input
                    placeholder="Price"
                    className="form-control"
                    onChange={(e) => {
                      uploadImage(e);
                      setErrorShow(false);
                      setErrorMessage("");
                    }}
                    accept="image/*"
                    multiple
                    type="file"
                  />
                </div>
                <div className="selectPhotos">
                  {uploadImages.length !== 0 &&
                    uploadImages.map((val, i) => {
                      return (
                        <div className="mb-2" key={i}>
                          <div
                            className="closeBtn"
                            onClick={() => {
                              uploadImages.splice(i, 1);
                              setUploadImages([...uploadImages]);
                            }}
                          >
                            x
                          </div>
                          <img src={val} alt="" className="w-25" />
                        </div>
                      );
                    })}
                </div>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    rows={4}
                    placeholder="Description"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      setErrorShow(false);
                      setErrorMessage("");
                    }}
                  ></textarea>
                </div>

                {errorShow ? (
                  <p className="errorMessage">{errorMessage}</p>
                ) : null}
                <div className="btnDiv">
                  <Button
                    className="btn btn-primary"
                    onClick={() => addProducts()}
                    disabled={loader}
                  >
                    {loader ? "Loading..." : "Add Products"}
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default AddProducts;
