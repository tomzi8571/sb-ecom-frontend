import {Pagination} from "@mui/material";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";

// http://{{url}}/api/public/products?pageNumber=0&pageSize=10&sortBy=productName&sortOrder=desc&keyword=XL&category=Android

export const Paginations = ({numberOfPage}) => {

    const [searchParams] = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const pathName = useLocation()
    const navigate = useNavigate();
    const currentPage = searchParams.get("page")
        ? Number(searchParams.get("page"))
        : 1;

    const onChangeHandler = (event, value) => {
        params.set("page", value.toString());
        navigate(`${pathName.pathname}?${params}`);
    }

    return (
        <><Pagination
            count={numberOfPage}
            page={currentPage}
            defaultPage={1}
            siblingCount={1}
            boundaryCount={2}
            shape="rounded"
            onChange={onChangeHandler}
        />
        </>
    )
}