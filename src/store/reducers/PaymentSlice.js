const { createSlice } = require("@reduxjs/toolkit");

const PaymentSlice = createSlice({
  name: "tab",
  initialState: {
    discounts: [
      { id: 1, name: "15% Discount on Google Pay", discount: 15, type: "percent" },
      { id: 2, name: "FLAT $10 On any Debit Card", discount: 10, type: "amount" },
    ],
    selectedValue: { id: 1, name: "15% Discount on Google Pay", discount: 15, type: "percent" }
  },
  reducers: {
    selectDiscount(state, action) {
        state.selectedValue = state.discounts.find(item => item.id == Number(action.payload))
    },
   
  },
});

export const { selectDiscount } =
  PaymentSlice.actions;
export default PaymentSlice.reducer;
