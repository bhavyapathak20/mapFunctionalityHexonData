import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Register({ setIsLoggedIn }) {
    const [formData, setFormData] = useState({
        rusername : "",
        ruseremail : "",
        ruserpassword : ""
    });
    const navigate = useNavigate();

    const handleChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        });
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const res = await axios.post('http://localhost:5000/api/newUser/register', {
                rusername : formData.rusername,
                ruseremail: formData.ruseremail,
                ruserpassword : formData.ruserpassword
            });
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
        <form onSubmit={handleSubmit} className="bg-white h-[33rem] w-md flex items-center justify-center m-auto mt-[4rem] rounded-2xl shadow-lg">
            <div className="flex flex-col justify-center items-center gap-7">
                <h1 className="text-4xl font-bold">Register</h1>
                <p className="text-sm">Please fill in the details to register yourself with us</p>
                <input 
                    type="text" 
                    placeholder="Enter your Name"
                    name="rusername"
                    value={formData.rusername}
                    onChange={handleChange}
                    className="border-gray-400 border rounded-md w-full p-2 outline-0"
                    required
                />
                <input 
                    type="email" 
                    placeholder="Enter your email"
                    name="ruseremail"
                    value={formData.ruseremail}
                    onChange={handleChange}
                    className="border-gray-400 border rounded-md w-full p-2 outline-0"
                    required
                />
                <input 
                    type="password" 
                    placeholder="••••••••"
                    name="ruserpassword"
                    value={formData.ruserpassword}
                    onChange={handleChange}
                    className="border border-gray-400 rounded-md w-full p-2 outline-0"
                    required
                />
                <button 
                    type="submit" 
                    className="rounded-md w-[8rem] p-3 font-semibold bg-amber-200"
                >
                    Sign up
                </button>
                <p>Already have an account? <span className="text-blue-600 font-medium cursor-pointer">Sign in</span></p>
            </div>
        </form>
    )
}
