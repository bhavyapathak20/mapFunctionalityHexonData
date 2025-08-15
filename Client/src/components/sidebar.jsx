import { Link, useNavigate } from "react-router-dom";

export default function Sidebar({ isLoggedIn, setIsLoggedIn }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/login");
    };

    return (
        <div className="w-[5rem] pr-[12rem] pl-[2rem] mt-[7rem]">
            <ul>
                <li className="mt-[1rem]">
                    <Link to="/" className="rounded-md block pt-[0.8rem] pb-[0.8rem] pr-[8rem] pl-[2rem] hover:bg-white active:bg-white active:shadow">Home</Link>
                </li>
                {!isLoggedIn && (
                    <>
                        <li className="mt-[1rem]">
                            <Link to="/login" className="rounded-md block pt-[0.8rem] pb-[0.8rem] pr-[8rem] pl-[2rem] hover:bg-white active:bg-white active:shadow">Login</Link>
                        </li>
                        <li className="mt-[1rem]">
                            <Link to="/register" className="rounded-md block pt-[0.8rem] pb-[0.8rem] pr-[8rem] pl-[2rem] hover:bg-white active:bg-white active:shadow">Register</Link>
                        </li>
                    </>
                )}
                {isLoggedIn && (
                    <>
                        <li className="mt-[1rem]">
                            <Link to="/map" className="rounded-md block w-40 pl-[2rem] pt-[0.8rem] pb-[0.8rem] pr-[2rem] hover:bg-white active:bg-white active:shadow">Map View</Link>
                        </li>
                        <li className="mt-[1rem]">
                            <Link to="/upload" className="rounded-md block w-40 pl-[2rem] pt-[0.8rem] pb-[0.8rem] pr-[2rem] hover:bg-white active:bg-white active:shadow">Upload File</Link>
                        </li>
                        <li className="mt-[15rem]">
                            <button
                                className=" text-gray-800 font-bold rounded-md block pt-[0.8rem] pb-[0.8rem] pr-[2rem] pl-[2rem] bg-red-500 hover:bg-red-400 active:bg-white active:shadow"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
}