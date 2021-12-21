import { useState, useEffect, useContext} from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import "../scss/singleItem.scss";
import { CartContext } from "../pages/CartContext";

export default function Item(props){
    //console.log(props.id);
    const [isClicked, setIsClicked] = useState(false);
    const [product, setproduct] = useState({});
    const history = useNavigate();

    const {cart, setCart} = useContext(CartContext);

    function addToCart(e, product){
        let localCart = {...cart};

        if(!localCart.items){
            localCart.items = {};
        }

        if(!localCart.items[product._id]){
            localCart.items[product._id] =1;
        }else{
            localCart.items[product._id] += 1;
        }

        if(!localCart.totalItems){
            localCart.totalItems = 0;
        }

        localCart.totalItems += 1;

        setCart(localCart);
        setIsClicked(true);
        setTimeout(()=>{
            setIsClicked(false);
        }, 1000);
    }

    useEffect(()=>{
        axios(`https://pizzeria-sumit90990.herokuapp.com/api/singleProduct/${props.id}`).then((res)=>{
            //console.log(res.data[0]);
            setproduct(res.data[0]);
        })
    }, [props.id]);

    return(
        <div className="container mx-auto pt-32">
            <button className="mb-12 font-bold bg-yellow-500 px-4 py-2 rounded-full leading-none" onClick={ () => { history(-1)} }>Back</button>
            <div className="flex">
                <img className="singleItem" src="/images/pizza.png" alt="pizza" />
                <div className="ml-16">
                    <h1 className="text-xl font-bold">{ product.name }</h1>
                    <div className="text-md">{ product.size }</div>
                    <div className="font-bold mt-2">₹ { product.price }</div>
                    <button disabled={isClicked} onClick={(e)=>{addToCart(e, product)}} className={`${isClicked?`bg-green-500`:`bg-yellow-500`}  px-2 rounded-full font-bold`}>Add{isClicked?'ED':''}</button>
                </div>
            </div>
        </div>
    );
}