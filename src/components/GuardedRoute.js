import react, {useCallback, useContext, useEffect, useState} from "react";
import {Route, useNavigate} from "react-router-dom"
import { CartContext } from "../pages/CartContext";
import Login from "../pages/Login";

const GuardedRoute = (props)=>{
    const {authToken, setAuthToken} = useContext(CartContext);
    const [isAuth, setIsAuth] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        if(authToken.auth !== ""){
            setIsAuth(true);
        }
    }, [authToken])

    if(isAuth === props.auth){
        return <props.component/>
    }else{
        return (
            <div className="component">
                <section className="pt-32 login flex justify-center">
                    <h1 className="text-red-500 text-sm">UnAuthorized! redirecting you...</h1>
                </section>
            </div>
        )
    }
}

export default GuardedRoute;