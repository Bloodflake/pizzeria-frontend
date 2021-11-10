import "../scss/menu.scss";
import { useState, useEffect } from "react";
import Item from "./MenuItem";
import axios from "axios";

export default function Menu(){
    const [menuItem, setMenu] = useState([]);
    useEffect(()=>{
        //console.log("component mounted");

        axios("/api/getMenu").then(res=>{
            // console.log(res.data);
            setMenu(res.data);
        });

    }, []);

    // console.log(menuItem);

    return (
        <div className="container mx-auto">
            <h1 className="text-lg font-bold">Products</h1>
            <div className="grid grid-cols-4 my-8 gap-24">
                {menuItem.map(ele => {
                    return <Item key={ele._id} menu={ele}/>
                })}  
            </div>
        </div>
    )
}