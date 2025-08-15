import Login from "./pages/login";
import Register from "./pages/register";
import Map from "./pages/map";
import UploadFile from "./pages/fileUpload";
import Sidebar from "./components/sidebar";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";

export default function App(){
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedStatus = localStorage.getItem("isLoggedIn");
        if (storedStatus === "true") {
            setIsLoggedIn(true);
        }
    }, []);

    return(
        <>
            <h1 className="font-bold w-[12rem] h-[3rem] text-2xl mt-[1rem] ml-[2rem]">Hexon Data</h1>

            <div className="flex">
                <Sidebar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                
                <Routes>
                    <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path="/map" element={<Map/>} />
                    <Route path="/upload" element={<UploadFile/>} />
                </Routes>
            </div>
        </>
    )
}
