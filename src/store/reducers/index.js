
import { combineReducers } from '@reduxjs/toolkit'
import addressSlice from './addressSlice'
import cartSlice from './cartSlice'
import PaymentSlice from './PaymentSlice'
import productSlice from './productSlice'
import TabSlice from './TabSlice'

const rootReducer = combineReducers({
    cart: cartSlice,
    product: productSlice,
    tab: TabSlice,
    address: addressSlice,
    payment: PaymentSlice
})

export default rootReducer;