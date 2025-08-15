import { useState } from 'react';
import axios from 'axios';

export default function UploadFile() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post('http://localhost:5000/api/location/upload', formData, {
                headers: { 
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setMessage(res.data.message);
            setTimeout(() => setMessage(''), 3000);

        } catch(err) {
            const msg = err.response?.data?.message || 'Error uploading file';
            setMessage(msg);
            setTimeout(() => setMessage(''), 3000);
        }
    };

    return(
        <div className="bg-white h-[25rem] w-md flex items-center justify-center m-auto mt-[7rem] rounded-2xl shadow-lg">
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-7 w-full">
                <h1 className="text-4xl font-bold">Upload Files</h1>
                <p className="text-sm">Please upload a zip file containing single text file listing location data</p>
                <input 
                    type="file" 
                    accept=".zip"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="border-gray-400 border rounded-md w-53 p-2 outline-0"
                />
                <button 
                    type="submit" 
                    className="rounded-md w-[8rem] p-3 font-semibold bg-amber-200"
                >
                    Upload
                </button>
                {message && <div className="mt-2 text-center font-bold">{message}</div>}
            </form>
        </div>
    )
}
