import { useEffect, useState , useContext} from "react";
import { CartContext } from "../pages/CartContext";
import Admin from "../pages/Admin";
import axios from "axios"

export default function GuardedAdminRoute(){
    console.log("guarded adminS")
    const [isAdmin, setIsAdmin] = useState(false);
    const {authToken} = useContext(CartContext);

    useEffect(()=>{
        async function admin(){
            if(authToken.auth !== ""){
                await axios
                  .get("https://pizzeria-sumit90990.herokuapp.com/api/isAdmin", {headers:{"authorization": "Bearer " + authToken.auth}})
                  .then(res =>{
                      console.log(res);
                      async function isAdmin(){
                        await setIsAdmin(true);
                      }

                      isAdmin();
                  })
                  .catch(err => console.error(err));
            }
        }

        admin()
    }, [authToken])

    return (
        <>
        {isAdmin?<Admin/>: 
        <div className="component">
            <section className="pt-32 login flex justify-center">
                <h1 className="text-red-500 text-sm">UnAuthorized!</h1>
            </section>
        </div>}
        </>
    )
}