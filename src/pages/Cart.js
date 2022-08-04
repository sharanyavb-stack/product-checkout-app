import {
  Card,
  Typography,
  Grid,
  ButtonGroup,
  Button,
} from "@mui/material";
import Delete from "@mui/icons-material/Delete";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  remove,
  reduceQuantity,
  addQuantity,
  setTotalPrice
} from "../store/reducers/cartSlice";
import "./Cart.css";
import { changeTabIndex } from "../store/reducers/TabSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const {cartItems: products} = useSelector((state) => state.cart);
  const [total, setTotal] = useState(0);
  const sum = products.reduce((sum, val) => {
    const { quantity, price } = val;
    return sum + quantity * price;
  }, 0);

  useEffect(() => {
    setTotal(sum);
    dispatch(setTotalPrice(sum))
  }, [sum]);

  const handleRemove = (productId) => {
    dispatch(remove(productId));
  };
  const handleReduceQuantity = (productId) => {
    dispatch(reduceQuantity(productId));
  };
  const handleAddQuantity = (productId) => {
    dispatch(addQuantity(productId));
  };
  const handleTabChange = () => {
    dispatch(changeTabIndex(1))
  }
  return products.length === 0 ? (
    <Typography variant="body2">Your Cart is empty</Typography>
  ) : (
    <>
      <Card variant="outlined">
        <div className="cartWrapper">
          {products.map((product) => (
            <Grid key={product.id} className="cartCard" container spacing={2}>
              <Grid item xs={4}>
                <img className="cartImg" src={product.image} alt="" />
                <h6 className="overflowText cartTitle" title={product.title}>
                  {product.title}
                </h6>
              </Grid>

              <Grid item xs={3}>
                <h5 className="overflowText">${product.price}</h5>
              </Grid>
              <Grid item xs={5}>
                <ButtonGroup
                  size="small"
                  variant="outlined"
                  aria-label="outlined button group"
                >
                  {product.quantity === 1 ? (
                    <Button>
                      <Delete
                        onClick={() => handleRemove(product.id)}
                        color="error"
                      />
                    </Button>
                  ) : (
                    <Button onClick={() => handleReduceQuantity(product.id)}>
                      -
                    </Button>
                  )}
                  <Button>{product.quantity}</Button>
                  <Button onClick={() => handleAddQuantity(product.id)}>
                    +
                  </Button>
                </ButtonGroup>
              </Grid>
            </Grid>
          ))}
        </div>
      </Card>
      <Card variant="outlined" className="cardCss">
        <Grid className="totalCard" container spacing={2}>
          <Grid item xs={4}>
            <Typography variant="body2">Subtotal :</Typography>
          </Grid>
          <Grid item xs={8}>
            <h4>${total.toFixed(2)}</h4>
          </Grid>
        </Grid>
      </Card>
      <div className="buttonDiv">
        <Button className='btnContinue' onClick={() => handleTabChange()} size='small'>
            Continue
        </Button>
      </div>
      
    </>
  );
};

export default Cart;
