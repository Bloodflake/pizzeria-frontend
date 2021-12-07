import axios from "axios"
import {useNavigate} from "react-router-dom"
import { CartContext } from "./CartContext";
import { useState, useContext, useEffect} from "react";

export default function Logout(){
    const navigate = useNavigate();

    const {authToken, setAuthToken} = useContext(CartContext);

    useEffect(()=>{
        console.log("logging out")
        axios
          .post("/api/logout", {refresh_token: authToken.refresh}, {headers:{
              "authorization": "Bearer " + authToken.auth
          }})
          .then(res => {
            console.log(res)

            setAuthToken({
                auth:"",
                refresh:""
            })

            navigate("/");
          })
          .catch(err => console.error(err));
    }, []);
    return(
        <>
            <h1 className="pt-32">Logging out</h1>
        </>
    )
}