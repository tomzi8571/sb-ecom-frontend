import {useSearchParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {fetchProducts} from "../store/actions/index.js";

// We will forward the query to the backend
// http://{{url}}/api/public/products/keyword/Qual?pageNumber=0&pageSize=10&sortBy=productName&sortOrder=desc
export const useProductFilter = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();

    useEffect(() => {
        const params = new URLSearchParams();

        const currentPage = searchParams.get("page")
            ? Number(searchParams.get("page"))
            : 1;

        params.set("pageNumber", currentPage - 1)

        const pageSize = searchParams.get("pageSize")
            ? Number(searchParams.get("pageSize"))
            : null;
        if (pageSize) {
            params.set("pageSize", pageSize)
        }

        const sortOrder = searchParams.get("sortBy") || "asc";
        const categoryParams = searchParams.get("category") || null;
        const keyword = searchParams.get("keyword") || null;
        params.set("sortBy", "price");
        params.set("sortOrder", sortOrder);

        if (categoryParams) {
            params.set("category", categoryParams);
        }

        if (keyword) {
            params.set("keyword", keyword);
        }

        const queryString = params.toString();
        console.log("Querystring:", queryString);

        dispatch(fetchProducts(queryString))

    }, [dispatch, searchParams])
}