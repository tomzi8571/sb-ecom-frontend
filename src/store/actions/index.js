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
        console.log(data);
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
        console.log(data);
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