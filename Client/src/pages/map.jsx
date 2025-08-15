import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import L from 'leaflet';

// Fix default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Component to move map to new coordinates
function RecenterMap({ lat, lng }) {
    const map = useMap();
    useEffect(() => {
        if (lat && lng) {
            map.setView([lat, lng], 10); // zoom level stays the same
        }
    }, [lat, lng, map]);
    return null;
}

export default function Map() {
    const [locations, setLocations] = useState([]);
    const [locationName, setLocationName] = useState("");
    const [locationLong, setLocationLong] = useState("");
    const [locationLat, setLocationLat] = useState("");
    const [newMarker, setNewMarker] = useState(null); // for recentering

    // Fetch user locations on mount
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/location/user', {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                });
                setLocations(res.data.locations);
            } catch (err) {
                console.log(err);
            }
        };
        fetchLocations();
    }, []);

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!locationName || !locationLat || !locationLong) return;

        try {
            const res = await axios.post('http://localhost:5000/api/location/add', {
                locationName,
                locationLat: parseFloat(locationLat),
                locationLong: parseFloat(locationLong)
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });

            setLocations(res.data.locations); 
            setNewMarker({ lat: parseFloat(locationLat), lng: parseFloat(locationLong) }); // trigger recenter
            setLocationName("");
            setLocationLat("");
            setLocationLong("");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            {/* Form */}
            <form onSubmit={handleSubmit} className='rounded-lg shadow bg-white absolute left-[20rem] top-2 p-1'>
                <label className='p-4 font-bold'>Enter location or coordinates
                    <input 
                        type="text" 
                        placeholder='location name'
                        name='locationName'
                        value={locationName}
                        onChange={(e) => setLocationName(e.target.value)}
                        className=' border-gray-600 border-3 rounded ml-5 font-mono font-light bg-gray-200 outline-0 text-center'
                    />
                    <input 
                        type="text" 
                        placeholder='location longitude'
                        value={locationLong}
                        name='locationLong'
                        onChange={(e) => setLocationLong(e.target.value)}
                        className=' border-gray-600 border-3 rounded ml-5 font-mono font-light bg-gray-200 outline-0 text-center'
                    />
                    <input 
                        type="text" 
                        placeholder='location latitude'
                        value={locationLat}
                        name='locationLat'
                        onChange={(e) => setLocationLat(e.target.value)}
                        className=' border-gray-600 border-3 rounded ml-5 font-mono font-light bg-gray-200 outline-0 text-center'
                    />
                    <button 
                        type="submit" 
                        className='ml-5 p-2 bg-amber-200 rounded-md'
                    >
                        Add
                    </button>
                </label>
            </form>

            {/* Map */}
            <MapContainer className='rounded-md border-8 border-white shadow-2xl ' center={[3.1319, 101.6841]} zoom={10} style={{ height: '90vh', width: '80%' }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                {locations.map(loc => (
                    <Marker key={loc.id} position={[loc.latitude, loc.longitude]}>
                        <Popup>{loc.name}</Popup>
                    </Marker>
                ))}
                {/* Recenter map when a new marker is added */}
                {newMarker && <RecenterMap lat={newMarker.lat} lng={newMarker.lng} />}
            </MapContainer>
        </>
    );
}
