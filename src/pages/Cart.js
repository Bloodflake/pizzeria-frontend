export default function Cart(){
    return (
        <section className="container mx-auto">
            <div className=" mx-auto py-2">
                <div className="flex items-center border-b border-gray-300">
                    <img src="./images/cart-black.png" alt="cart"></img>
                    <h1 className="font-bold ml-4 text-2xl">Order Summar</h1>
                </div>
            </div>
            <div className="mx-auto my-4">
                <div className="flex items-center">
                    <img className="w-16" src="./images/pizza.png" alt="pizza"></img>
                    <div className="flex-1 ml-2">
                        <h1>Pizza</h1>
                        <span>MEDIUM</span>
                    </div>
                    <span className="flex-1">1 Pcs</span>
                    <span className="font-bold">Rs 300</span>
                </div>
            </div>
            <hr></hr>
            <div className="text-right py-4">
                <div>
                    <span className="text-lg font-bold">Total Amount</span>
                    <span className="text-2xl font-bold ml-4">Rs 300</span>
                </div>
                <div>
                    <form className="mx-6">
                        <ul>
                            <li><input className="border border-gray-400 p-2 w-1/2" type="text" placeholder="Phone No."></input></li>
                            <li><input className="border border-gray-400 p-2 w-1/2 mt-4" type="text" placeholder="Address."></input></li>
                            {/* <li><button className="mx-4 px-6 py-2 rounded-full text-white font-bold mt-4 bg-yellow-500 hover:bg-yellow-600">Order Now</button></li> */}
                        </ul>
                    </form>
                </div>
                <div className="mt-6">
                    <a href="./login" className="px-6 py-2 rounded-full text-white font-bold mt-4 bg-yellow-500 hover:bg-yellow-600">Login to continue</a>
                </div>
            </div>
            {/* <div className="py-16">
                <div className="container mx-auto text-center">
                    <h1 className="text-3xl font-bold mb-2">Cart Empty</h1>
                    <p className="text-gray-500 text-lg mb-12">You probably haven't ordered a pizza yet
                    <br></br>
                    To order a pizza, go to main page.
                    </p>
                    <img className="w-2/5 mx-auto pb-8" src="./images/empty-cart.png" alt="empty-cart" alt="empty-cart"></img>
                    <a className="px-6 py-2 rounded-full text-white font-bold mt-4 bg-yellow-500 hover:bg-yellow-600" href="/">Go back</a>
                </div>  
            </div> */}
        </section>
    )
}