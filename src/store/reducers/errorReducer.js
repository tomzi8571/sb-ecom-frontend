const initialState = {
    isLoading: false,
    errorMessage: null,
    categoryLoader: false,
    categoryError: null,
    btnLoader: false,
};

export const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case "IS_FETCHING_PRODUCTS":
            return {
                ...state,
                isLoading: true,
                errorMessage: null,
            }
        case "IS_SUCCESS":
            return {
                ...state,
                btnLoader: false,
                isLoading: false,
                errorMessage: null,
                categoryError: null,
            }
        case "IS_ERROR":
            return {
                ...state,
                btnLoader: false,
                isLoading: false,
                errorMessage: action.payload,
                categoryError: false,
            }
        case "CATEGORY_LOADER":
            return {
                ...state,
                categoryLoader: true,
                errorMessage: null,
            }
        case "CATEGORY_SUCCESS":
            return {
                ...state,
                categoryLoader: false,
                errorMessage: null,
            }
        case "BUTTON_LOADER":
            return {
                ...state,
                btnLoader: true,
                errorMessage: null,
                categoryError: null
            }
        default:
            return state;
    }
}