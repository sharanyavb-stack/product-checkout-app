import { Card, Button, Checkbox } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAddress } from "../../store/reducers/addressSlice";

import "./AddressForm.css";
const AddressForm = ({ cancelHandler }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [checked, setChecked] = useState(true);

  const handleDefaultChange = (event) => {
    debugger
    setChecked(event.target.checked);
  };

  const dispatch = useDispatch();
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };
  const handlePincodeChange = (event) => {
    setPincode(event.target.value);
  };
  const clearAddress = () => {
    setName("");
    setPhone("");
    setAddress("");
    setPincode("");
    setPincode(false);
  };
  const handleAddressSave = async () => {
    debugger
    await dispatch(
      addAddress({
        id: Math.floor((Math.random() * 1000000) + 1),
        name,
        phone,
        address,
        pincode,
        default: checked,
      })
    );
    clearAddress();
    cancelHandler(false)
  };

  return (
    <Card
      variant="outlined"
      component="form"
      noValidate
      autoComplete="off"
      sx={{ padding: "0 3%" }}
    >
      <TextField
        id="outlined-name"
        label="Name"
        value={name}
        onChange={handleNameChange}
        margin="normal"
        fullWidth
        size="small"
      />
      <TextField
        id="outlined-uncontrolled"
        label="Mobile"
        value={phone}
        type="number"
        onChange={handlePhoneChange}
        margin="normal"
        fullWidth
        size="small"
      />
      <TextField
        id="outlined-text"
        label="Address"
        value={address}
        onChange={handleAddressChange}
        margin="normal"
        fullWidth
        size="small"
        multiline
        minRows={3}
      />
      <TextField
        id="outlined-uncontrolled"
        label="Pincode"
        value={pincode}
        type="number"
        onChange={handlePincodeChange}
        margin="normal"
        fullWidth
        size="small"
      />
      <Checkbox
        label = 'Set as a default address'
        checked={checked}
        onChange={handleDefaultChange}
        inputProps={{ "aria-label": "controlled" }}
      />
      Set as a default address
      <div className="buttonDiv">
        <Button
          className="btnContinue"
          onClick={() => handleAddressSave()}
          size="small"
        >
          Save
        </Button>
        <Button
          className="btnContinue"
          onClick={() => cancelHandler(false)}
          size="small"
        >
          Cancel
        </Button>
      </div>
    </Card>
  );
};

export default AddressForm;
