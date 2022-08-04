import { Typography } from "@mui/material";
import React from "react";
import Checkout from "../components/feature/Checkout";
import Products from "../components/feature/Products";
import './Home.css'
const Home = () => {
  return (
      <div className="shopping-page">
        <div className="products-div">
          <Typography variant="h5" mt={2} mb={2}>Products</Typography>
          <Products />
        </div>
        <div className="checkout-div">
          <Checkout />
        </div>
      </div>
  );
};

export default Home;
