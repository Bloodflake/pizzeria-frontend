import axios from "axios"
import {useNavigate} from "react-router-dom"
import { CartContext } from "./CartContext";
import { useState,useContext, useEffect} from "react";
import Spinner from "../components/Spinner"


export default function Logout(){
    const navigate = useNavigate();
    const [loading, setloading] = useState(undefined);
    const [errorMsg, setErrorMsg] = useState("");
    const {authToken, setAuthToken, setCart} = useContext(CartContext);

    useEffect(()=>{
        // console.log("logging out")
        async function logout(){
            await setloading("loading");
            if(authToken.refresh !== ""){
                axios
                .post("/api/logout", {refresh_token: authToken.refresh}, {headers:{
                    "authorization": "Bearer " + authToken.auth
                }})
                .then(res => {
                    console.log(res)

                    setloading(undefined);

                    setAuthToken({
                        auth:"",
                        refresh:""
                    })

                    setCart({})
                    navigate("/");
                })
                .catch(err =>{
                    console.error(err);
                    setErrorMsg(err.response.data.message);
                    setTimeout(()=>{
                        navigate("/");
                    }, 5000);
                    setloading(undefined);
                });
            }
        }

        logout();
    }, [authToken.auth, authToken.refresh, navigate, setAuthToken, setCart]);
    return(
        <>
            {loading?<Spinner/>:
            <div className="component">
                <section className="pt-32 login flex justify-center">
                    <h1 className="text-red-500 text-sm">{errorMsg}! redirecting you...</h1>
                </section>
            </div>}
        </>
    )
}