import {Link} from "react-router-dom";
import "../scss/navBar.scss";
export default function Navbar(){
    return (
        <nav className= "container mx-auto flex items-center justify-between py-4">
            <Link to ="/">
                <img className="navLogo" src="/images/logo.png" alt="logo"/>
            </Link>
            <ul className="flex items-centre">
                <li className="navText"><Link to="/">Menu</Link></li>
                <li className="ml-4 navText"><Link to="/login">Login</Link></li>
                <li className="ml-4 navText"><Link to="/register">Register</Link></li>
                <li className="ml-4">
                    <Link to="/cart">
                        <div className="navCart">
                            <span >10</span>
                            <img className="ml-1 mr-2" src="/images/cart.png" alt="cart"></img>
                        </div>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}