import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, STATUSES } from "../../store/reducers/productSlice";
import Item from "../common/Item";
import { Grid, Skeleton } from "@mui/material";

const Products = () => {
  const dispatch = useDispatch();
  const { data: products = [], status } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  // if (status === STATUSES.LOADING) {
  //   return products.map(value => <Skeleton width={"100%"} height={"100%"} />);
  // }

  if (status === STATUSES.ERROR) {
    return <h2>Something went wrong!</h2>;
  }
  return (
    <Grid container spacing={2}>
      {products.map((product) => (
        <Grid key={product.id} item xs={3}>
          <Item product={product} loading={status === STATUSES.LOADING ? true : false} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Products;
