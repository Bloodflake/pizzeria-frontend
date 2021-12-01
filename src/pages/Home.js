import Menu from "../components/Menu";

export default function Home(){
    return(
        <div className="py-16">
            <div className=" hero py-16">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="w-1/2">
                        <h6 className="text-lg"><em>Are you hungry?</em></h6>
                        <h1 className="text-3xl md:text-6xl font-bold"> Don't wait !</h1>
                        <button className="px-6 py-2 rounded-full text-white font-bold mt-4 bg-yellow-500 hover:bg-yellow-600">Order now</button>
                    </div>
                    <div className="w-1/2">
                        <img src="./images/pizza.png" alt="pizza"></img>
                    </div>
                </div>
            </div>
            <div>
                <Menu/>
            </div>
        </div>
    )
}