import "../scss/menu.scss";
import { useState, useEffect} from "react";
import MenuItem from "./MenuItem";
import axios from "axios";


export default function Menu(){

    const [products, setMenu] = useState([]);

    useEffect(()=>{
        console.log("menu mounted");

        axios("https://pizzeria-sumit90990.herokuapp.com/api/getMenu").then(res=>{
            console.log(res.data);
            setMenu(res.data);
        }).catch((err)=>console.log(err));

    }, []);

    //console.log(products);

    return (
        <div className="container mx-auto">
            <h1 className="text-lg font-bold">Products</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-8 gap-24">
                {products.map(ele => {
                    return <MenuItem key={ele._id} product={ele}/>
                })}  
            </div>
        </div>
    )
}