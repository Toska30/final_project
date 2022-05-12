import * as React from "react";
import { Routes, Route } from "react-router-dom";
import {
  Login,
  Signup,
  Home,
  MyFavourites,
  AddProducts,
  ForgotPass,
  Checkout,
  
} from "./Pages";
import About from "./Pages/About";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"
function BasicRouter() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="forgotpass" element={<ForgotPass />} />
        <Route path="home" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="favourites" element={<MyFavourites />} />
        <Route path="add-products" element={<AddProducts />} />
        <Route path="checkout" element={<Checkout />} />
      </Routes>
    </div>
  );
}

export default BasicRouter;
