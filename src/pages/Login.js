import {Link} from "react-router-dom";

export default function Login(){
    return (
        <section className="login flex justify-center">
            <div className="w-full max-w-xs">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Email
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="email" placeholder="Email"></input>
                    </div>
                    <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"></input>
                    </div>
                    <div className="flex items-center justify-between">
                    <button className="px-6 py-2 rounded-full text-white font-bold mt-4 bg-yellow-500 hover:bg-yellow-600" type="button">
                        Sign In
                    </button>
                    <Link to="/register">
                        <h1 className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">Don't Have Account?</h1>
                    </Link>
                    </div>
                </form>
            </div>
        </section>
    )
}