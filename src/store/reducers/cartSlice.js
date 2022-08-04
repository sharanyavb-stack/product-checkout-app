const { createSlice, current } = require('@reduxjs/toolkit');

const cartSlice = createSlice({
    name: 'cart',
    initialState: {cartItems: [], totalItems: 0, totalPrice: 0},
    reducers: {
        add(state, action) {
            const isPresent = state.cartItems.find((item) => item.id === action.payload.id) 
            if (isPresent === undefined) {
                const details = {...action.payload}
                details.quantity = 1;
                state.cartItems.push(details);
                state.totalItems = state.totalItems + 1
            } else {
                isPresent.quantity += 1;
                state.cartItems[state.cartItems.findIndex((item) => item.id === action.payload.id)] = isPresent;
                state.totalItems = state.totalItems + 1
                return state
            }
        },
        remove(state, action) {
            state.totalItems = state.totalItems - 1;
            state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
            return state;
        },
        addQuantity(state, action) {
            const isPresent = state.cartItems.find((item) => item.id === action.payload);
            isPresent.quantity += 1;
            state.totalItems = state.totalItems + 1
            state.cartItems[state.cartItems.findIndex((item) => item.id === action.payload.id)] = isPresent;
            return state;
        },
        reduceQuantity(state, action) {
            const isPresent = state.cartItems.find((item) => item.id === action.payload);
            isPresent.quantity -= 1;
            state.totalItems = state.totalItems - 1
            state.cartItems[state.cartItems.findIndex((item) => item.id === action.payload.id)] = isPresent;
            return state;
        },
        setTotalPrice(state, action) {
            state.totalPrice = action.payload;
        },
        emptyCart(state, action) {
            debugger
            state.cartItems = [];
            state.totalItems = 0;
            state.totalPrice = 0;
        }
    },
});

export const { add, remove, reduceQuantity, addQuantity, setTotalPrice, emptyCart} = cartSlice.actions;
export default cartSlice.reducer;
