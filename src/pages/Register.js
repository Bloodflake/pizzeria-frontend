import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import { CartContext } from "./CartContext";
import { useContext, useState } from "react";
import Spinner from "../components/Spinner"

export default function Register(){
    const [formData, setFormData] = useState({
        name:"",
        email:"",
        password:""
    });

    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setloading] = useState(undefined);

    const {setAuthToken} = useContext(CartContext);
    
    const navigate = useNavigate();

    async function handleFormSubmit(e){
        e.preventDefault();
        await setloading("loading");

        axios
          .post("https://pizzeria-sumit90990.herokuapp.com/api/register", formData)
          .then((res) => {
            console.log("request sent to sever",res)
            const _localToken ={
                auth: res.data.access_token,
                refresh: res.data.refresh_token
            }

            setAuthToken(_localToken);
            setloading(undefined);
            navigate("/");

          })
          .catch((err) =>{
            console.log("error: ",err.response.data.message);
            setloading(undefined);
            setErrorMsg(err.response.data.message)
          });

        setFormData({
            name:"",
            email:"",
            password:""
        })
    }

    function handleChange(e){
        setErrorMsg("")
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    return(
        <>
        {loading?<Spinner/>:
        <section className="pt-32 login flex justify-center">
            <div className="w-full max-w-xs">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleFormSubmit}>
                    {errorMsg && <span class="text-red-500 text-sm">{errorMsg}</span>}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Name
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" name="name" value={formData.name} onChange={handleChange}></input>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Email">
                            Email
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Email" type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange}></input>
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="****" name="password" value={formData.password} onChange={handleChange}></input>
                    </div>

                    <div className="flex items-center justify-between">
                        <button className="px-6 py-2 rounded-full text-white font-bold mt-4 bg-yellow-500 hover:bg-yellow-600" type="submit">
                            Sign Up
                        </button>
                        <Link to="/login">
                            <h1 className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">Have an account?</h1>
                        </Link>
                    </div>

                </form>
            </div>
        </section>}
        </>
    )
}