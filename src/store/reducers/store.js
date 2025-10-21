import {configureStore} from '@reduxjs/toolkit'
import {productReducer} from "./ProductReducer.js";
import {errorReducer} from "./errorReducer.js";
import {cartReducer} from "./cartReducer.js";
import {authReducer} from "./authReducer.js";

// on Application start, load cart from local storage
const cartItems = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const user = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : [];

const initialState = {
    auth: {user: user},
    carts: {cart: cartItems}
}

export const store = configureStore(
    {
        reducer: {
            products: productReducer,
            errors: errorReducer,
            carts: cartReducer,
            auth: authReducer,
        },
        preloadedState: initialState,
    }
)