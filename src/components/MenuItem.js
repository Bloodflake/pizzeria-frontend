export default function Item(props){
    // console.log(props);
    return(
        <div>
            <img className="menuImage" src="./images/peproni.png" alt="menu"></img>
            <div className="text-center">
                <h2 className="text-lg font-bold py-2">{props.menu.name}</h2>
                <span className="bg-gray-200 py-1 rounded-full text-sm px-4">{props.menu.size}</span>
            </div>
            <div className="flex justify-between items-center mt-4">
                <span>Rs {props.menu.price}</span>
                <button className="bg-yellow-500  px-2 rounded-full font-bold">ADD</button>
            </div>
        </div>
    );
}