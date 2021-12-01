import { CartContext } from "./CartContext";
import { useContext, useState, useEffect} from "react";
import axios from "axios";

export default function Cart(){
    let total = 0;
    const [products, setProducts] = useState([]);
    const {cart, setCart} = useContext(CartContext);
    const [fetchedProducts, setFetchedProducts] = useState(false);

    

    useEffect(()=>{

        if(!cart || !cart.items){
            return;
        }

        if(fetchedProducts){
            return;
        }

        // console.log("cart", cart);
        let items = {items : Object.keys(cart.items)};
        axios
          .post("/api/getProducts", items)
          .then(res =>{
              setProducts(res.data);
              setFetchedProducts(true);
            //   console.log("products", products);
          })
          .catch(err => console.error(err));
    }, [cart, fetchedProducts]);


    function incrementProduct(e, id){
        let _cart = {...cart};
        _cart.items[id]++;
        _cart.totalItems++;

        setCart(_cart);
    }

    function decrementProduct(e, id){
        let _cart = {...cart};
        if(_cart.items[id] === 1){
            return;
        }

        _cart.items[id]--;
        _cart.totalItems--;
        setCart(_cart);
    }

    function getPrice(price, id){
        let numberOfItems = cart.items[id];

        let sum = price * numberOfItems;
        total += sum;
        return sum;
    }

    function deleteProduct(id){
        let _cart = {...cart};
        console.log(_cart);
        let qty = _cart.items[id];
        delete _cart.items[id];
        console.log(_cart);
        _cart.totalItems -= qty;
        setCart(_cart);
        let updatedProducts = products.filter((product)=>product._id !== id);
        setProducts(updatedProducts);
    }

    return (
        !products.length? <img className="mx-auto w-1/4 pt-24" src="./images/empty-cart.png" alt="" />:
        <div className="container mx-auto lg:w-1/2 w-full pt-16 pb-4">
            <h1 className="my-6 font-bold">Cart Items</h1>
            <ul>   
                {products.map((product)=>{
                    return (
                        <li className="mb-8" key={product._id}>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <img className="h-16" src="./images/peproni.png" alt="Pizza"/>
                                    <span className="font-bold ml-4 w-48">{product.name}</span>
                                </div>
                                <div>
                                    <button onClick={(e)=>{decrementProduct(e, product._id)}} className="bg-yellow-500 px-4 py-2 rounded-full leading-none">-</button>
                                    <b className="px-4">{cart.items[product._id]}</b>
                                    <button onClick={(e)=>{incrementProduct(e, product._id)}} className="bg-yellow-500 px-4 py-2 rounded-full leading-none">+</button>
                                </div>
                                <span>₹ {getPrice(product.price, product._id)}</span>
                                <button onClick={()=>{deleteProduct(product._id)}} className="bg-red-500 px-4 py-2 rounded-full leading-none text-white">Delete</button>
                            </div>
                        </li>
                    )
                })}
                <hr className="my-6"/>
                <div className="text-right">
                    <b>Grand Total:</b> ₹{total}
                </div>
                <div className="text-right mt-6">
                    <button className="bg-yellow-500 px-4 py-2 rounded-full leading-none">Order Now</button>
                </div>
            </ul> 
        </div>
    )
}