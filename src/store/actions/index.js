import api from "../../api/api.js";
import toast from "react-hot-toast";

/* Example response
{
  "content": [
    {
      "productId": 1,
      "productName": "Adjustable dumbbell 2",
      "image": null,
      "description": "Adjustable dumbbell 2 set for home workouts, can be used indoors, outdoors, at your personal gym. This is available at lowest possible rates.",
      "quantity": 88,
      "price": 90,
      "discount": 10,
      "specialPrice": 81
    }
  ],
  "pageNumber": 0,
  "pageSize": 20,
  "totalElements": 2,
  "totalPages": 1,
  "lastPage": true
}
 */
export const fetchProducts = (queryString) => async (dispatch) => {
    try {
        dispatch({type: "IS_FETCHING"});
        const {data} = await api.get(`/public/products?${queryString || ""}`);
        dispatch({
            type: "FETCH_PRODUCTS",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage,
        });
        dispatch({type: "IS_SUCCESS"});
    } catch (error) {
        console.log(error);
        dispatch({
            type: "IS_ERROR", payload: error?.response?.data?.message || "Failed to fetch products"
        });
    }
}

/** Returns
 * {
 *   "content": [
 *     {
 *       "categoryId": 2,
 *       "categoryName": "Android"
 *     },
 *     {
 *       "categoryId": 1,
 *       "categoryName": "iPhone"
 *     }
 *   ],
 *   "pageNumber": 0,
 *   "pageSize": 10,
 *   "totalElements": 2,
 *   "totalPages": 1,
 *   "lastPage": true
 * }
 **/
export const fetchCategories = () => async (dispatch) => {
    try {
        dispatch({type: "CATEGORY_LOADER"});
        const {data} = await api.get(`/public/categories`);
        dispatch({
            type: "FETCH_CATEGORIES",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage,
        });
        dispatch({type: "CATEGORY_SUCCESS"});
    } catch (error) {
        console.log(error);
        dispatch({
            type: "IS_ERROR", payload: error?.response?.data?.message || "Failed to fetch categories"
        });
    }
}

export const addToCart = (data, qty = 1, toast) => (dispatch, getState) => {
    // find the product in cart
    const {products} = getState().products;
    const getProduct = products.find((item) => item.productId === data.productId)
    // Check the stocks
    const isQuantityExists = getProduct.quantity >= qty;

    // If in stock -> add
    if (isQuantityExists) {
        dispatch({type: "ADD_CART", payload: {...data, quantity: qty}});
        toast.success(`${data?.productName} added to the car`);
        localStorage.setItem("cartItems", JSON.stringify([...getState().carts.cart]));
    } else {
        toast.success(`${data?.productName} is out of stock`);
    }
};

export const increaseCartQuantity = (productId, toast, currentQuantity, setCurrentQuantity) => (dispatch, getState) => {

    const {products} = getState().products;
    const getProduct = products.find((item) => item.productId === productId)
    // Check the stocks
    const isQuantityExists = getProduct.quantity >= currentQuantity + 1;

    if (isQuantityExists) {
        const newQuantity = currentQuantity + 1;
        setCurrentQuantity(newQuantity);

        dispatch({
            type: "ADD_CART", payload: {...getProduct, quantity: newQuantity}
        });
        localStorage.setItem("cartItems", JSON.stringify([...getState().carts.cart]));
    } else {
        toast.error("Quantity exceeds available stock");
    }
}

export const decreaseCartQuantity = (productId, toast, currentQuantity, setCurrentQuantity) => (dispatch, getState) => {

    const {products} = getState().products;
    const getProduct = products.find((item) => item.productId === productId)
    if (currentQuantity > 1) {
        const newQuantity = currentQuantity - 1;
        setCurrentQuantity(newQuantity);

        dispatch({
            type: "ADD_CART", payload: {...getProduct, quantity: newQuantity}
        });
        localStorage.setItem("cartItems", JSON.stringify([...getState().carts.cart]));
    }
}

export const removeFromCart = (productId, toast) => (dispatch, getState) => {

    const {products} = getState().products;
    const getProduct = products.find((item) => item.productId === productId)
    dispatch({type: "REMOVE_FROM_CART", payload: productId});

    toast.success(`${getProduct?.productName} removed from the cart`);
    localStorage.setItem("cartItems", JSON.stringify([...getState().carts.cart]));
}

export const authenticateSignInUser = (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
    try {
        setLoader(true);
        const {data} = await api.post("/auth/signin", sendData);
        dispatch({type: "LOGIN_USER", payload: data});
        localStorage.setItem("auth", JSON.stringify(data));
        reset();
        navigate("/");
        toast.success("Login successful");
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Login failed, internal server error");

    } finally {
        setLoader(false);
    }
}

export const registerUser = (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
    try {
        setLoader(true);
        const {data} = await api.post("/auth/signup", sendData);
        reset();
        navigate("/login");
        toast.success(data?.message || "You were successfully registered");
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || error?.response?.data?.password || "Login failed, internal server error");

    } finally {
        setLoader(false);
    }
}

export const logoutWhenUnauthorized = (navigate, toast, error) => async (dispatch, getState) => {
    try {
        // error.response === undefined most likely if the request is unauthorized, and because of and CORS
        // issue, the server didn't even process the request.
        if (!error?.response || error?.response?.status === 401) {
            console.error("logout at 401 ", error, error.status);
            toast.success("Please login to continue");
            dispatch(logoutUser(navigate));
        }
    } catch (error) {
        console.error(error);
    }
};

export const logoutUser = (navigate) => async (dispatch) => {
    dispatch({type: "LOGOUT_USER"});
    localStorage.removeItem("auth");
    navigate("/login");
};

export const addUpdateUserAddress = (sendData, toast, addressId, setOpenModal) => async (dispatch, getState) => {
    try {
        dispatch({type: "BUTTON_LOADER"});

        if (addressId) {
            const {data} = await api.put(`/addresses/${addressId}`, sendData);
        } else {
            const {data} = await api.post(`/addresses`, sendData);
        }
        await dispatch(getUserAddresses()) // Update the addresses in redux store
        toast.success("Address successfully saved");
        dispatch({type: "IS_SUCCESS"});
        setOpenModal(false);
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Ooops, internal server error, address couldn't be saved");
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "internal server error, address couldn't be saved"
        });
        if (error?.response?.data?.type === "validation") {
            setOpenModal(true);
        } else {
            setOpenModal(false);
        }
    }
}

export const getUserAddresses = (navigate, toast) => async (dispatch, getState) => {
    try {
        dispatch({type: "IS_FETCHING"});
        const {data} = await api.get(`/addresses`)
        dispatch({type: "USER_ADDRESS", payload: data});
        dispatch({type: "IS_SUCCESS"});
    } catch (error) {
        dispatch(logoutWhenUnauthorized(navigate, toast, error))
        dispatch({
            type: "IS_ERROR", payload: error?.response?.data?.message || "Failed to fetch user's addresses"
        });
    }
}

export const selectUserCheckoutAddress = (address) => {
    localStorage.setItem("checkout-address", JSON.stringify(address));
    return {
        type: "SELECT_CHECKOUT_ADDRESS",
        payload: address,
    }
}

export const deleteUserAddress = (toast, addressId, setOpenDeleteModal) => async (dispatch, getState) => {
    try {
        console.log("delete address", addressId)
        dispatch({type: "BTN_LOADER"});
        await api.delete(`/addresses/${addressId}`);
        dispatch({type: "IS_SUCCESS"});
        dispatch(getUserAddresses()) // Update the addresses in redux store
        dispatch({type: "REMOVE_CHECKOUT_ADDRESS"});
        toast.success("Address successfully saved");
    } catch (error) {
        console.log(error);
        // dispatch(logoutWhenUnauthorized(navigate, toast, error))
        dispatch({
            type: "IS_ERROR", payload: error?.response?.data?.message || "Failed to deleting user's addresses"
        });
    } finally {
        setOpenDeleteModal(false);
    }
}

export const addPaymentMethod = (method) => {
    return {
        type: "ADD_PAYMENT_METHOD",
        payload: method,
    }
}

export const createUserCart = (sendCartItems) => async (dispatch, getState) => {
    try {
        dispatch({type: "IS_FETCHING"});
        const response = await api.post(`/cart`, sendCartItems);
        console.log("response from create cart", response)
        await dispatch(getUserCart());
    } catch (error) {
        dispatch({
            type: "IS_ERROR", payload: error?.response?.data?.message || "Failed to create cart items"
        });
    }
}

export const getUserCart = () => async (dispatch, getState) => {
    try {
        dispatch({type: "IS_FETCHING"});
        const {data} = await api.get(`/cart`)
        dispatch({
            type: "FETCH_USER_CART",
            payload: data.products,
            totalPrice: data.totalPrice,
            cartId: data.cartId,
        });
        localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
        dispatch({type: "IS_SUCCESS"});
    } catch (error) {
        dispatch({
            type: "IS_ERROR", payload: error?.response?.data?.message || "Failed to fetch cart items"
        });
    }
}

export const createStripePaymentSecret = (sendData) => async (dispatch, getState) => {
    try {
        dispatch({type: "IS_FETCHING"});
        const {data} = await api.post(`/order/stripe-client-secret`, sendData);
        dispatch({type: "CLIENT_SECRET", payload: data});
        localStorage.setItem("client-secret", JSON.stringify(data));
        dispatch({type: "IS_SUCCESS"});
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Failed to create stripe client secret");
        dispatch({
            type: "IS_ERROR", payload: error?.response?.data?.message || "Failed to create stripe client secret"
        });
    }
}

export const stripePaymentConfirmation = (sendData, setErrorMessage, setLoading, toast) => async (dispatch, getState) => {
    try {
        const response = await api.post(`/order/users/payments/online`, sendData);
        if (response.data) {
            localStorage.removeItem("checkout-address");
            localStorage.removeItem("cartItems");
            localStorage.removeItem("client-secret");
            dispatch({type: "REMOVE_CLIENT_SECRET_ADDRESS"});
            dispatch({type: "CLEAR_CART"});
            toast.success("Order Accepted")
        } else {
            setErrorMessage("Payment Failed. Please try again.");
        }
    } catch (error) {
        console.log(error);
        setErrorMessage("Payment Failed. Please try again.");
    }
}