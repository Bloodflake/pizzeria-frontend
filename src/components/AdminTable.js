import {useState, useEffect, useContext} from "react"
import axios from "axios"
import { CartContext } from "../pages/CartContext";

export default function AdminTable(props){
    // console.log("AdminTable",props.order.user_id?"user id hai":"ke nahi hai")

    const [status, setStatus] = useState("");

    const {authToken} = useContext(CartContext);

    useEffect(()=>{
        setStatus(props.order.status);
    },[props.order.status])

    // useEffect(()=>{
    //     console.log("status ",props.order[0], status)
    // }, [status])

    function ListItem(){
        return props.order.items.map((ele)=>{
            return <p key={ele.product_id.name}>{ele.product_id.name}: {ele.quantity}</p>
        })
    }


    function handleChange(e){
        
        //console.log("event", e.target.value)
        setStatus(e.target.value);
        axios
          .post("/api/admin/order", {orderid: props.order._id, status: e.target.value}, {headers:{
            "authorization": "Bearer " + authToken.auth
        }})
          .then(res => {
              console.log("order status updated ", res);
          })
          .catch(err =>{
            console.error("error",err)
            window.location.reload(false);
          });

    }

    // useEffect(()=>{
    //     console.log("status ", status)
    // }, [status])
    
    let date = new Date(Date.parse(props.order.createdAt));
    return(
        <tbody id="orderTableBody">
            <tr>
                <td className="border px-4 py-2">
                    <p>{props.order._id}</p>
                    <ListItem/>
                </td>
                <td className="border px-4 py-2">
                    <p>{props.order.user_id?props.order.user_id.name: ""}</p>
                </td>
                <td className="border px-4 py-2">
                    <p>141/204</p>
                </td>
                <td className="border px-4 py-2">
                    <div className="inline-block relative w-64">
                        <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline " value={status} onChange={handleChange}>
                            <option value="placed" >Placed</option>
                            <option value="confirmed" >Confirmed</option>
                            <option value="prepared" >Prepared</option>
                            <option value="delivered" >Delivered</option>
                            <option value="completed" >Completed</option>
                        </select>
                        <div
                            className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20">
                                <path
                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>
                    </div>
                </td>
                <td className="border px-4 py-2">
                    <p>{date.toDateString()} {date.toTimeString()}</p>
                </td>
                <td className="border px-4 py-2">
                    <p>CoD</p>
                </td>
            </tr>
        </tbody>
    )
}