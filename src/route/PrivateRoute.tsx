import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    if(localStorage.getItem("user") == null){
        return (
            <Navigate to="/"/>
        )
    } else {
        return(
            <Outlet/>
        )
    }
};

export default PrivateRoute;