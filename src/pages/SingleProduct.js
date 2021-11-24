import {useParams} from "react-router-dom";
import Item from "../components/Item";

export default function SingleProduct(){
    const {id} = useParams();
    
    return(
        <Item id={id}/>
    );
}