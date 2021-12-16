import {useEffect} from "react"

const status ={"placed":1, "confirmed":2, "prepared":3, "delivered":4, "completed":5}

export default function OrderStatus(props){

    useEffect(()=>{
        props.socket.emit("join", `${props.order._id}`)

        props.socket.on("orderUpdated", (data)=>{
            console.log("socket reply from server", data)
            let localOrder = {...props.order};
            localOrder.status = data;
            console.log(localOrder)
            props.setOrder(localOrder)
        });


    }, [props.socket])

    return (
        <section className="container mx-auto flex items-center justify-between py-8">
            <div className="container mx-auto">
                <div className="status-box w-full lg:w-2/3 mx-auto">
                    <div className="flex items-center justify-between mb-12">
                        <h1 className="text-xl font-bold">Track delivery status</h1>
                    </div>
                    <ul>
                        <li className={`status_line text-sm md:text-xl pb-16 ${status[props.order.status] >1?'step-completed':''} ${status[props.order.status] === 1?'current':''}`} ><span>Order Placed</span>
                        </li>
                        <li className={`status_line text-sm md:text-xl pb-16 ${status[props.order.status] >2?'step-completed':''} ${status[props.order.status] === 2?'current':''}`} ><span>Order confirmation</span>
                        </li>
                        <li className={`status_line text-sm md:text-xl pb-16 ${status[props.order.status] >3?'step-completed':''} ${status[props.order.status] === 3?'current':''}`} ><span>Preparation</span></li>
                        <li className={`status_line text-sm md:text-xl pb-16 ${status[props.order.status] >4?'step-completed':''} ${status[props.order.status] === 4?'current':''}`} ><span>Out for delivery </span>
                        </li>
                        <li className={`status_line text-sm md:text-xl${status[props.order.status] >5?'step-completed':''} ${status[props.order.status] === 5?'current':''}`} ><span>Complete</span></li>
                    </ul>
                </div>
            </div>
    </section>
    )
}

