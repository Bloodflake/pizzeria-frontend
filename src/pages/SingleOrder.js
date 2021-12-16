import {useParams, useNavigate} from "react-router-dom";
import {useState,useEffect, useContext} from "react";
import axios from "axios"
import { CartContext } from "./CartContext";
import { io } from "socket.io-client";
import OrderStatus from "../components/OrderStatus"

export default function SingleOrder(){
    // console.log("single order")
    const {id} = useParams();
    const [order, setOrder] = useState({});
    const [socket, setSocket] = useState();
    const navigate = useNavigate();
    const {authToken} = useContext(CartContext)


    useEffect(()=>{
        if(authToken.auth !== ""){
            axios
          .get("/api/getOrder", { headers:{"authorization": "Bearer " + authToken.auth},params: { id} })
          .then(res => {
            // console.log("res ", res);
            setOrder(res.data[0])
          })
          .catch(err => console.error(err));
        }
    }, [id, authToken])



    useEffect(()=>{
        const newSocket = io("/");
        setSocket(newSocket);

        return () => newSocket.close();
    }, [setSocket])

    // if(socket){
    //     socket.
    // }
    function Row(){
        // console.log("order ",order)
        return order.items.map((ele)=>{
            return (
                <tr key={ele.product_id._id}>
                    <td className="border px-4 py-2">
                        <p>{ele.product_id.name} - {ele.product_id.size}</p>
                    </td>
                    <td className="border px-4 py-2">
                        <p>{ele.quantity}</p>
                    </td>
                    <td className="border px-4 py-2">
                        <p>{ele.quantity*ele.product_id.price}</p>
                    </td>
                </tr>
            )
        })
    }

    if(Object.keys(order).length !== 0){
        let date = new Date(Date.parse(order.createdAt));
        return(
            <div className="mx-auto tems-center">
            <div className="container mx-auto flex items-center justify-between pt-32">
                <div className="mx-auto">
                    <button className="mb-12 font-bold bg-yellow-500 px-4 py-2 rounded-full leading-none" onClick={ () => { navigate(-1)} }>Back</button>
                    <div class="flex items-center justify-between mb-12">
                        <h1 className="font-bold text-lg mb-4">Total Amount: {order.total_amount}</h1>
                        <h6 class="bg-white py-1 rounded-full px-4 text-green-600 text-xs">{id}</h6>
                    </div>
                    <h1 className="font-bold text-md mb-4">Created At: {date.toDateString()} {date.toTimeString()}</h1>
                    <table className="w-full table-auto bg-white">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-left">product</th>
                                <th className="px-4 py-2 text-left">quantity</th>
                                <th className="px-4 py-2 text-left">price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <Row/>
                        </tbody>
                    </table>
                </div>
            </div>
            {socket?(<OrderStatus order={order} socket={socket} setOrder={setOrder}/>): (<></>)}
            </div>)
    }else{
        return(<div></div>)
    }
}