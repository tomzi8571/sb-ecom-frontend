import {configureStore} from '@reduxjs/toolkit'
import {productReducer} from "./ProductReducer.js";
import {errorReducer} from "./errorReducer.js";
import {cartReducer} from "./cartReducer.js";
import {authReducer} from "./authReducer.js";
import {paymentMethodReducer} from "./paymentMethodReducer.js";

// on Application start, load cart from local storage
const cartItems = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const user = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : null;

const selectedCheckoutAddress = localStorage.getItem("checkout-address")
    ? JSON.parse(localStorage.getItem("checkout-address"))
    : null;

const initialState = {
    auth: {user: user, selectedCheckoutAddress},
    carts: {cart: cartItems}
}

export const store = configureStore(
    {
        reducer: {
            products: productReducer,
            errors: errorReducer,
            carts: cartReducer,
            auth: authReducer,
            payment: paymentMethodReducer,
        },
        preloadedState: initialState,
    }
)