import {Link} from "react-router-dom";
import { CartContext } from "../pages/CartContext";
import { useContext, useState } from "react";


export default function MenuItem(props){
    //console.log(props);
    const [isClicked, setIsClicked] = useState(false);
    
    const {cart, setCart}  = useContext(CartContext);

    const addToCart = (event, product) =>{
        // console.log(product);

        // const cart = {
        //     items:{},
        //     totalItems: 0
        // }
        let localCart = {...cart};
        if(!localCart.items){
            localCart.items = {};
        }

        if(localCart.items[product._id]){
            localCart.items[product._id] += 1;
        }else{
            localCart.items[product._id] = 1;
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

    return(
            <div>
                <Link to={"/products/" + props.product._id}>
                    <img className="menuImage mx-auto" src="/images/pizza.png" alt="menu"></img>
                    <div className="text-center">
                        <h2 className="text-lg font-bold py-2">{props.product.name}</h2>
                        <span className="bg-gray-200 py-1 rounded-full text-sm px-4">{props.product.size}</span>
                    </div>
                </Link>
                <div className="flex justify-between items-center mt-4">
                    <span>Rs {props.product.price}</span>
                    <button disabled={isClicked} onClick={(e)=>{addToCart(e, props.product)}} className={`${isClicked?`bg-green-500`:`bg-yellow-500`}  px-2 rounded-full font-bold`}>
                        ADD{isClicked?'ED':''}
                    </button>
                </div>
            </div>
    );
}