const initialstate = {
    // List of products
    cart: [],
    totalPrice: 0,
    cartId: null,
}

export const cartReducer = (state = initialstate, action) => {
    switch (action.type) {
        case "ADD_CART": {
            const productToAdd = action.payload;
            const existingProduct = state.cart.find(
                (item) => item.productId === productToAdd.productId
            );
            if (existingProduct) {
                const updatedCart = state.cart.map(
                    (item) => {
                        if (item.productId === productToAdd.productId) {
                            return productToAdd;
                        } else {
                            return item;
                        }
                    }
                )
                return {
                    ...state,
                    cart: updatedCart,
                }
            } else {
                const newCart = [...state.cart, productToAdd];
                return {
                    ...state,
                    cart: newCart,
                }
            }
        }
        case "REMOVE_FROM_CART": {
            const productIdToRemove = action.payload;

            const newCart = state.cart.filter(
                (item) => item.productId !== productIdToRemove
            )

            return {
                ...state,
                cart: newCart,
            }
        }
        default:
            return state;
    }
};