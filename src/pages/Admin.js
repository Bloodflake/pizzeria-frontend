import axios from "axios";
import {useState, useEffect, useContext} from "react";
import AdminTable from "../components/AdminTable";
import { CartContext } from "./CartContext";
import { io } from "socket.io-client";

export default function Admin(){
    console.log("in admin")
    const [orders, setOrders] = useState([]);
    const {authToken} = useContext(CartContext);
    const [socket, setSocket] = useState();
    const [flag, setFlag] = useState(false);
    const [errorMsg, setErrorMsg] = useState(undefined);

    useEffect(()=>{
        //console.log("admin mounted", authToken)
        // let interval = setInterval(() => {
        //     console.log("10 sec")
        // }, 300000);

        // return ()=>clearInterval(interval)
        if(authToken.auth !== ""){
            //console.log("fetch orders")
            axios
            .get("/api/admin/order",{headers:{"authorization": "Bearer " + authToken.auth}})
            .then(res => {
                //console.log(res.data)
                setOrders(res.data)
            })
            .catch(err => console.error(err));
        }

    }, [authToken, flag])

    useEffect(()=>{
        const newSocket = io("/");
        setSocket(newSocket);

        return () => newSocket.close();
    }, [setSocket])


    useEffect(()=>{
        if(socket){
            socket.emit("adminJoin", "adminRoom");
            socket.on("newOrder", (data)=>{
                //console.log(data)
                // setOrders(localOrders);
                setFlag(!flag);
            })
        }
    }, [socket, flag])

    function OrderRow(){
        return orders.map((ele)=>{
            return <AdminTable order={ele} key={ele._id}/>
        })
    }
    return (
        <section className="pt-20 orders light-section mx-2">
            <div className="mx-auto">
                <h1 className="font-bold text-lg mb-4">All orders</h1>
                <table className="w-full table-auto bg-white">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-left">Order</th>
                            <th className="px-4 py-2 text-left">Customer</th>
                            <th className="px-4 py-2 text-left">Address</th>
                            <th className="px-4 py-2 text-left">status</th>
                            <th className="px-4 py-2 text-left">Time</th>
                            <th className="px-4 py-2 text-left">Payment</th>
                        </tr>
                    </thead>
                    <OrderRow/>
                </table>
            </div>
        </section>
    )
}