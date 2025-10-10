import api from "../../api/api.js";

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
        dispatch({type: "IS_FETCHING_PRODUCTS"});
        const {data} = await api.get(`/public/products?${queryString || ""}`);
        dispatch({
                type: "FETCH_PRODUCTS",
                payload: data.content,
                pageNumber: data.pageNumber,
                pageSize: data.pageSize,
                totalElements: data.totalElements,
                totalPages: data.totalPages,
                lastPage: data.lastPage,
            }
        );
        dispatch({type: "IS_SUCCESS"});
    } catch (error) {
        console.log(error);
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch products"
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
            }
        );
        dispatch({type: "CATEGORY_SUCCESS"});
    } catch (error) {
        console.log(error);
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch categories"
        });
    }
}

export const addToCart =
    (data, qty = 1, toast) =>
        (dispatch, getState) => {
            // find the product in cart
            const {products} = getState().products;
            const getProduct = products.find(
                (item) => item.productId === data.productId
            )
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

export const increaseCartQuantity =
    (productId, toast, currentQuantity, setCurrentQuantity) =>
        (dispatch, getState) => {

            const {products} = getState().products;
            const getProduct = products.find(
                (item) => item.productId === productId
            )
            // Check the stocks
            const isQuantityExists = getProduct.quantity >= currentQuantity + 1;

            if (isQuantityExists) {
                const newQuantity = currentQuantity + 1;
                setCurrentQuantity(newQuantity);

                dispatch({
                    type: "ADD_CART",
                    payload: {...getProduct, quantity: newQuantity}
                });
                localStorage.setItem("cartItems", JSON.stringify([...getState().carts.cart]));
            } else {
                toast.error("Quantity exceeds available stock");
            }
        }

export const decreaseCartQuantity =
    (productId, toast, currentQuantity, setCurrentQuantity) =>
        (dispatch, getState) => {

            const {products} = getState().products;
            const getProduct = products.find(
                (item) => item.productId === productId
            )
            if (currentQuantity > 1) {
                const newQuantity = currentQuantity - 1;
                setCurrentQuantity(newQuantity);

                dispatch({
                    type: "ADD_CART",
                    payload: {...getProduct, quantity: newQuantity}
                });
                localStorage.setItem("cartItems", JSON.stringify([...getState().carts.cart]));
            }
        }

export const removeFromCart =
    (productId, toast) =>
        (dispatch, getState) => {

            const {products} = getState().products;
            const getProduct = products.find(
                (item) => item.productId === productId
            )
            dispatch({type: "REMOVE_FROM_CART", payload: productId});

            toast.success(`${getProduct?.productName} removed from the cart`);
            localStorage.setItem("cartItems", JSON.stringify([...getState().carts.cart]));
        }

