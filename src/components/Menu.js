import "../scss/menu.scss";
import { useState, useEffect, useContext } from "react";
import MenuItem from "./MenuItem";
import axios from "axios";
import { CartContext } from "../pages/CartContext";


export default function Menu(){

    const [products, setMenu] = useState([]);

    useEffect(()=>{
        //console.log("component mounted");

        axios("/api/getMenu").then(res=>{
            //console.log(res.data);
            setMenu(res.data);
        });

    }, []);

    //console.log(products);

    return (
        <div className="container mx-auto">
            <h1 className="text-lg font-bold">Products</h1>
            <div className="grid grid-cols-4 my-8 gap-24">
                {products.map(ele => {
                    return <MenuItem key={ele._id} product={ele}/>
                })}  
            </div>
        </div>
    )
}