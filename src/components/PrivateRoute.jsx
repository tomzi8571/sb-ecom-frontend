import {useSelector} from "react-redux";
import {Navigate, Outlet} from "react-router-dom";

// <Outlet> is a component that renders the child routes of the parent route.
export const PrivateRoute = ({publicPage = false}) => {
    const {user} = useSelector(state => state.auth);
    if (publicPage) {
        return user ? <Navigate to={"/"}/> : <Outlet/>
    }
    return user ? <Outlet/> : <Navigate to={"/login"}/>;
}