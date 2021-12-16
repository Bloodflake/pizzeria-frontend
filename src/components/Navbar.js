import {Link} from "react-router-dom";
import { CartContext } from "../pages/CartContext";
import { useContext } from "react";

import "../scss/navBar.scss";
export default function Navbar(){
    const {cart, authToken} = useContext(CartContext);
    
    let totalItems = 0;
    if(cart && cart.totalItems){
        totalItems = cart.totalItems;
    }

    function ItemNumberDisplay(){
        if(totalItems !== 0){
            return <span >{totalItems}</span>;
        }else{
            return <span ></span>
        }
    };

    return (
        <nav className= "container flex items-center justify-between p-4 bg-white shadow-lg fixed left-0 right-0 z-40" id="navBar">
            <Link to ="/">
                <img className="navLogo" src="/images/logo.png" alt="logo"/>
            </Link>
            <ul className="flex items-centre">
                <li className="navText"><Link to="/">Menu</Link></li>
                {authToken.auth === "" && <li className="ml-4 navText"><Link to="/login">Login</Link></li>}
                {authToken.auth === "" && <li className="ml-4 navText"><Link to="/register">Register</Link></li>}
                {authToken.auth !== "" && <li className="ml-4 navText"><Link to="/logout">Logout</Link></li>}
                {authToken.auth !== "" && <li className="ml-4 navText"><Link to="/myOrders">MyOrders</Link></li>}
                {authToken.auth !== "" && <li className="ml-4 navText"><Link to="/admin">Admin</Link></li>}
                <li className="ml-4">
                    <Link to="/cart">
                        <div className="navCart pl-1">
                            <ItemNumberDisplay/>
                            <img className="ml-1 mr-2" src="/images/cart.png" alt="cart"></img>
                        </div>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}