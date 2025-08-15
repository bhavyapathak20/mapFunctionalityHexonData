import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Login({ setIsLoggedIn }) {
    const [formData, setFormData] = useState({
        luseremail : "",
        luserpassword : ""
    });
    const navigate = useNavigate();

    const handleChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        });
    };

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
            const res = await axios.post('http://localhost:5000/api/existingUser/login', {
                luseremail : formData.luseremail,
                luserpassword : formData.luserpassword
            });
            // alert(res.data.message);
            localStorage.setItem("token", res.data.token); 
            setIsLoggedIn(true);
            navigate("/map");
        }catch(err){
            if(err.response && err.response.data.message){
                alert(err.response.data.message);
            }else{
                alert("Something went wrong");
            }
        }
    };

    return(
        <form onSubmit={handleSubmit} className="bg-white h-[25rem] w-md flex items-center justify-center m-auto mt-[7rem] rounded-2xl shadow-lg">
            <div className="flex flex-col justify-center items-center gap-7">
                <h1 className="text-4xl font-bold">Login</h1>
                <p className="text-sm">Hey, please login into your account to use the features</p>
                <input 
                    type="email" 
                    placeholder="Enter your email"
                    name="luseremail"
                    value={formData.luseremail}
                    onChange={handleChange}
                    className="border-gray-400 border rounded-md w-full p-2 outline-0"
                    required
                />
                <input 
                    type="password" 
                    placeholder="••••••••"
                    name="luserpassword"
                    value={formData.luserpassword}
                    onChange={handleChange}
                    className="border border-gray-400 rounded-md w-full p-2 outline-0"
                    required
                />
                <button 
                    type="submit" 
                    className="rounded-md w-[8rem] p-3 font-semibold bg-amber-200"
                >
                    Sign in
                </button>
                <p>Don't have an account? <span className="text-blue-600 font-medium cursor-pointer">Sign up</span></p>
            </div>
        </form>
    )
}
