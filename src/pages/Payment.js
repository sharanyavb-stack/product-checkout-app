import {
  Card,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import * as React from "react";
import "./Payment.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { changeTabIndex } from "../store/reducers/TabSlice";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { selectDiscount } from "../store/reducers/PaymentSlice";
import Loader from "../components/UI/Loader";
import SuccessfulIcon from "../components/UI/SuccessfulIcon";
import { emptyCart } from "../store/reducers/cartSlice";
import CancelIcon from "@mui/icons-material/Cancel";

const Payment = () => {
  const [value, setValue] = React.useState(1);
  const [discountAmount, setDiscountAmount] = React.useState(0);
  const [processing, setProcessing] = React.useState(false);
  const [processed, setProcessed] = React.useState(false);
  const [notProcessed, setNotProcessed] = React.useState(false);
  const dispatch = useDispatch();
  const { discounts, selectedValue = {} } = useSelector(
    (state) => state.payment
  );
  const { totalPrice, totalItems } = useSelector((state) => state.cart);
  const updateDiscount = () => {
    const { discount, type } = selectedValue;
    if (type === "percent") {
      setDiscountAmount((discount * 0.01 * totalPrice).toFixed(2));
    } else if (type === "amount") {
      setDiscountAmount(discount);
    }
  };
  useEffect(() => {
    updateDiscount();
  }, [selectedValue.id]);

  const handleChange = async (event) => {
    setValue(event.target.value);
    await dispatch(selectDiscount(event.target.value));
  };
  const goToCart = () => {
    dispatch(changeTabIndex(0));
    setNotProcessed(false);
  }
  const handleTabChange = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      if (totalItems > 10) {
        setNotProcessed(true);
      } else {
        
        setProcessed(true);
        debugger
        setTimeout(() => {
            debugger
          setProcessed(false);
          dispatch(changeTabIndex(0));
          dispatch(emptyCart());
        }, 2500);
      }
    }, 2500);
  };

  return processing ? (
    <>
      <div>
        <Loader />
      </div>
      <Typography variant="caption" className="divCenter">
        <i>Please wait while we are processing your order.</i>
      </Typography>
    </>
  ) : processed ? (
    <>
      <Typography variant="caption" className="divCenter">
        <i>Successfully Placed your order.. Continue Shopping..</i>
      </Typography>
      <SuccessfulIcon />
    </>
  ) : notProcessed ? (
    <>
      <Typography variant="caption" className="divCenter">
        <i>Total received quantity for item exceeds shipped quantity..
        You can’t have more than 10 items in cart..
        </i>
      </Typography>
      <div className="divCenter">
        <CancelIcon sx={{ color: "red" }} />
      </div>
      <div className="buttonDiv">
        <Button
          className="btnContinue"
          onClick={() => goToCart()}
          size="small"
        >
          Go to Cart
        </Button>
      </div>
    </>
  ) : (
    discounts.length && (
      <>
        <Card variant="outlined" className="cardCss cardWrapper">
          <FormControl fullWidth>
            <FormLabel id="demo-radio-buttons-group-label">
              <Typography variant="subtitle2">Discounts</Typography>
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              value={value}
              name="radio-buttons-group"
              onClick={(e) => handleChange(e)}
            >
              {discounts.map((val) => {
                const { name, id } = val;
                return (
                  <Card className="cardCss">
                    <FormControlLabel
                      value={id}
                      control={<Radio />}
                      label={
                        <Typography variant="subtitle2">{name}</Typography>
                      }
                    />
                  </Card>
                );
              })}
            </RadioGroup>
          </FormControl>
        </Card>
        <Card variant="outlined" className="cardCss">
          <Typography variant="subtitle2" mb={1}>
            Price Details
          </Typography>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="caption">
                Total ({totalItems} items)
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" align="right">
                ${totalPrice}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption">Discount</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" align="right" color={"green"}>
                -${discountAmount}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption">Total Amount</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" align="right">
                ${(totalPrice - discountAmount).toFixed(2)}
              </Typography>
            </Grid>
          </Grid>
        </Card>
        <div className="buttonDiv">
          <Button
            className={(totalPrice && totalItems) ?  "btnContinue" : 'disableButton'}
            onClick={() => handleTabChange()}
            size="small"
            disabled={(totalPrice && totalItems) ? false : true}
          >
            Place Order
          </Button>
        </div>
      </>
    )
  );
};

export default Payment;
