import axios from "axios";
import {useState, useEffect, useContext} from "react";
import { CartContext } from "./CartContext";
import { Link } from "react-router-dom";

export default function MyOrders(){

    const [orderList, setOrderList] = useState([]);
    const {authToken} = useContext(CartContext);
    useEffect(()=>{
        if(authToken.auth !== ""){
            axios
            .get("https://pizzeria-sumit90990.herokuapp.com/api/myOrders", {headers:{"authorization": "Bearer " + authToken.auth}})
            .then(res => {
                // console.log(res)
                setOrderList(res.data)
            })
            .catch(err => console.error(err));
        }
    }, [authToken])

    // useEffect(()=>{
    //     console.log("order list ",orderList)
    // }, [orderList])

    function Row(){
        return orderList.map((ele)=>{
            let date = new Date(Date.parse(ele.createdAt));
            return (
                <tr key={ele._id}>
                    <td className="border px-4 py-2">
                        <Link to={"/myOrders/" + ele._id} style={{ color: 'orange' }}><p >{ele._id}</p></Link>
                    </td>
                    <td className="border px-4 py-2">
                        <p>address</p>
                    </td>
                    <td className="border px-4 py-2">
                        <p>{ele.status}</p>
                    </td>
                    <td className="border px-4 py-2">
                        <p>{date.toDateString()} {date.toTimeString()}</p>
                    </td>
                </tr>
            )
        })
    }
    return(
        <div className="container mx-auto flex items-center justify-between pt-32">
            <div className="mx-auto">
                <h1 className="font-bold text-lg mb-4">All orders</h1>
                <table className="w-full table-auto bg-white">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-left">Order</th>
                            <th className="px-4 py-2 text-left">Address</th>
                            <th className="px-4 py-2 text-left">status</th>
                            <th className="px-4 py-2 text-left">Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        <Row/>
                    </tbody>
                </table>
            </div>
        </div>
    )
}