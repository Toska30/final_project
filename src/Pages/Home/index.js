import React, { useState, useEffect } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { auth, db } from "./../../Firebase";
import Navbar from "../../Components/Navbar";
import { AiFillHeart } from "react-icons/ai";
import ReactPaginate from "react-paginate";

function Home() {

  let navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(0);

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchByPrice, setSearchByPrice] = useState("");
  const [userData, setUserData] = useState(null);
 

  useEffect(() => {
    var getProducts = [];
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        var uid = user.uid;

        console.log(uid);
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

              console.log(obj);
            } else {
              console.log("No such document!");
            }
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });

        await db
          .collection("products")
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              var data = doc.data();
              data.id = doc.id;
              getProducts.push(data);
            });
          });

        setProducts([...getProducts]);
      } else {
        navigate("/");
      }
    });
  }, []);

  console.log(products);

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

  if (userData?.favouriteProducts) {
    for (var i = 0; i < products?.length; i++) {
      var productFlag = false;
      if (userData?.favouriteProducts.length !== 0) {
        for (var j = 0; j < userData.favouriteProducts.length; j++) {
          if (products[i].id === userData.favouriteProducts[j].id) {
            productFlag = true;
            products[i].favourite = true;
          }
        }
      }
      if (!productFlag) {
        products[i].favourite = false;
      }
    }
  }
  const usersPerPage = 3;
  const pagesVisited = pageNumber * usersPerPage;

  const pageCount = Math.ceil(products.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <div>
      <Navbar />
      <Row className="justify-content-center m-0 p-0">
        <Col sm={12} md={4}>
          <h1 className="mt-4">Search Product</h1>
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            className="form-control my-2"
            placeholder="Search by name"
          />

          <input
            type="text"
            onChange={(e) => setSearchByPrice(e.target.value)}
            className="form-control my-2"
            placeholder="Search by price"
          />
        </Col>
      </Row>
      <div className="mt-5">
        {products ? (
          <Container>
            <Row className="justify-content-center">
              {products
                .slice(pagesVisited, pagesVisited + usersPerPage)
                .filter((name) => name.title.toLowerCase().includes(search))
                .filter((name) =>
                  searchByPrice === ""
                    ? (name) => name.title.toLowerCase().includes(search)
                    : name.price.toString() === searchByPrice.toString()
                )
                .map((val, i) => {
                  return (
                    <Col xs={12} sm={8} md={8} lg={4} xl={4} key={i}>
                      <Card className="my-2">
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
                              {val.favourite ? (
                                <AiFillHeart style={{ color: "red" }} />
                              ) : (
                                <AiFillHeart />
                              )}
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
            <br />
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />
          </Container>
        ) : (
          <div className="text-center">There is no products</div>
        )}
      </div>
    </div>
  );
}

export default Home;
