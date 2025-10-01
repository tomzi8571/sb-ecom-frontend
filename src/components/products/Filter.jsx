import {useEffect, useState} from "react";
import {FiArrowDown, FiArrowUp, FiRefreshCw, FiSearch} from "react-icons/fi";
import {Button, FormControl, InputLabel, MenuItem, Select, Tooltip} from "@mui/material";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";

export const Filter = ({categories}) => {

    const [searchParams] = useSearchParams() // for the query parameter
    const params = new URLSearchParams(searchParams);
    const pathname = useLocation() // current url (localhost:3000/products/xxx)
    const navigate = useNavigate() // navigate/change to a new url

    const [sortOrder, setSortOrder] = useState("asc");
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("all");

    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchTerm) {
                searchParams.set("keyword", searchTerm);
            } else {
                searchParams.delete("keyword");
            }

            navigate(`${pathname.pathname}?${searchParams}`)
        }, 700)

        return () => {
            clearTimeout(handler)
        }
    }, [searchParams, navigate, pathname, searchTerm]);

    useEffect(() => {
        const currentCategory = searchParams.get("category") || "all"
        const currentSortOrder = searchParams.get("sortBy") || "asc"
        const currentKeyword = searchParams.get("keyword") || ""

        setCategory(currentCategory);
        setSortOrder(currentSortOrder);
        setSearchTerm(currentKeyword);
    }, [searchParams])

    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;
        if (selectedCategory === "all") {
            params.delete("category");
        } else {
            params.set("category", selectedCategory);
        }
        if (searchTerm) {
            params.set("keyword", searchTerm);
        }
        if (sortOrder) {
            params.set("sortBy", sortOrder);
        }
        params.delete("page");
        navigate(`${pathname.pathname}?${params}`)
    }

    const toggleSortOrder = () => {
        setSortOrder((prevSortOrder) => {
            const newOrder = (prevSortOrder === "asc") ? "desc" : "asc";
            params.set("sortBy", newOrder);
            navigate(`${pathname.pathname}?${params}`)
            return newOrder;
        })
    }

    const handleClearFilter = () => {
        navigate(`${pathname.pathname}`)
    };

    function handleKeyWordChange() {
        return (e) => setSearchTerm(e.target.value);
    }

    return (<div className="flex lg:flex-row flex-col-reverse lg:justify-between justify-center items-center gap-4">
            {/** Search Bar **/}
            <div className="relative flex items-center 2xl:w-[450px] sm:w-[420px] w-full">
                <input type="text"
                       value={searchTerm}
                       onChange={handleKeyWordChange()}
                       placeholder="Search for products"
                       className="border border-gray-400 text-slate-800 rounded-md py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-1 focus:ring-[#1976d2]"/>
                <FiSearch className="absolute left-3 text-slate-800 size={20}"/>
            </div>

            {/** Category Filter **/}
            <div className="flex sm:flex-row flex-col gap-4 item-center">
                <FormControl
                    className="text-slate-800 border-slate-700"
                    variant="outlined"
                    size="small">
                    <InputLabel id="category-select-label">Category</InputLabel>
                    <Select
                        labelId="category-select-label"
                        value={category}
                        onChange={handleCategoryChange}
                        label="Category"
                        variant="outlined"
                        className="min-w-[120px] text-slate-800 border-slate-700"
                    >
                        <MenuItem value="all">All</MenuItem>
                        {categories.map((item) => (
                            <MenuItem key={item.categoryId} value={item.categoryName}>{item.categoryName}</MenuItem>))}
                    </Select>
                </FormControl>

                {/** Sort By Filter **/}
                <Tooltip title="Sorted by price: asc">
                    <Button variant="contained"
                            onClick={toggleSortOrder}
                            color="primary"
                            className="flex items-center gap-2 h-10">
                        Sort By
                        {sortOrder === "asc" ? <FiArrowUp size={20}/> : <FiArrowDown size={20}/>}
                    </Button>
                </Tooltip>
                <button
                    className={"flex items-center gap-2 bg-rose-900 text-white px-3 py-2 rounded-md transition duration-300 ease-in shadow-md focus:outline-none"}
                    onClick={handleClearFilter}>
                    <FiRefreshCw className={"font-semibold"} size={16}/>
                    <span className={"font-semibold"}>Clear Filter
            </span>
                </button>
            </div>
        </div>)
}