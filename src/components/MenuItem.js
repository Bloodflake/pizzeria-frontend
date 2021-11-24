import {Link} from "react-router-dom";

export default function MenuItem(props){
    //console.log(props);
    return(
        <Link to={"/products/" + props.product._id}>
            <div>
                <img className="menuImage" src="/images/pizza.png" alt="menu"></img>
                <div className="text-center">
                    <h2 className="text-lg font-bold py-2">{props.product.name}</h2>
                    <span className="bg-gray-200 py-1 rounded-full text-sm px-4">{props.product.size}</span>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <span>Rs {props.product.price}</span>
                    <button className="bg-yellow-500  px-2 rounded-full font-bold">ADD</button>
                </div>
            </div>
        </Link>
    );
}