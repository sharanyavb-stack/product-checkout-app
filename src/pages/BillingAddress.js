import { Card, Button, Typography, Grid, IconButton } from "@mui/material";
import * as React from "react";
import { Done, Clear } from "@mui/icons-material";
import "./BillingAddress.css";
import AddressForm from "../components/common/AddressForm";
import { useDispatch, useSelector } from "react-redux";
import { addAddress, deleteAddress, updateDefault } from "../store/reducers/addressSlice";
import { changeTabIndex } from "../store/reducers/TabSlice";

const BillingAddress = () => {
  const [newAdd, setNewAdd] = React.useState(false);
  const dispatch = useDispatch();
  const addressList = useSelector((state) => state.address) || [];
  const stopEventPropagationTry = (event) => {
    if (event.target === event.currentTarget) {
      event.stopPropagation();
    }
  };
  const handleAddNewAddress = (val) => {
    setNewAdd(val);
  };
  const handleCancel = async (e, val) => {
    stopEventPropagationTry(e);
    await dispatch(deleteAddress(val));
    if (val.default) {dispatch(updateDefault())}
  };
  const handleTabChange = () => {
    dispatch(changeTabIndex(2));
  };

  const handleSelectAddress = (e, val) => {
    stopEventPropagationTry(e);
    dispatch(addAddress(val));
  };

  return (
    <>
      {newAdd ? (
        <AddressForm cancelHandler={handleAddNewAddress} />
      ) : addressList.length ? (
        <>
          <Card variant="outlined" className="cardCss cardWrapper">
            {addressList.map((val) => {
              const { name, phone, address, pincode, default: selected } = val;

              return (
                <Card
                  className="cardCss"
                  onClick={(e) => handleSelectAddress(e, val)}
                >
                  <Grid container>
                    <Grid item xs={9}>
                      <Typography variant="subtitle2">{name}</Typography>
                      <Typography variant="subtitle2">{phone}</Typography>
                      <Typography variant="body2">{address}</Typography>
                      <Typography variant="caption">{pincode}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      {selected && (
                        <IconButton>
                          <Done sx={{ color: "green" }} />
                        </IconButton>
                      )}
                    </Grid>
                    <Grid item xs={1}>
                      <IconButton>
                        <Clear
                          sx={{ color: "#999" }}
                          fontSize="small"
                          onClick={(e) => handleCancel(e, val)}
                        />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Card>
              );
            })}
          </Card>
          <div className="buttonDiv">
          <Button
              className="btnContinue"
              onClick={() => handleAddNewAddress(true)}
              size="small"
            >
              Add New
            </Button>
            <Button
              className="btnContinue"
              onClick={() => handleTabChange()}
              size="small"
            >
              Continue
            </Button>
            
          </div>
        </>
      ) : (
        <div className="buttonDiv">
          <Button
            className="btnContinue"
            onClick={() => handleAddNewAddress(true)}
            size="small"
          >
            Add New
          </Button>
        </div>
      )}
    </>
  );
};

export default BillingAddress;
