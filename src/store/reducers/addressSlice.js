const { createSlice } = require("@reduxjs/toolkit");

const AddressSlice = createSlice({
  name: "tab",
  initialState: [
    {
      id: 111111,
      name: "sharanya",
      phone: "+91 9740147938",
      address: "#111, KR Puram, Bangalore",
      pincode: "563121",
      default: true,
    },
    {
      id: 222222,
      name: "Pavan",
      phone: "+91 9652260966",
      address: "#111, Whitefield, Bangalore",
      pincode: "560078",
      default: false,
    },
  ],
  reducers: {
    addAddress(state, action) {
      const isPresent = state.find((item) => item.id === action.payload.id);
      if (isPresent === undefined) {
        if (action.payload.default) {
          state.map((value) => (value.default = false));
          const details = { ...action.payload };
          details.default = true;
          state.push(details);
        } else {
          state.push(action.payload);
        }
      } else {
        const stateval = [...state];
        stateval.map((value) => {
          if (value.id === action.payload.id) {
            value.default = true;
          } else {
            value.default = false;
          }
        });
      }
    },
    deleteAddress(state, action) {
      
        return state.filter((item) => item.id !== action.payload.id);
    },
    updateDefault(state, action) {
        state[0].default = true
    }
  },
});

export const { addAddress, deleteAddress, updateDefault} = AddressSlice.actions;
export default AddressSlice.reducer;
