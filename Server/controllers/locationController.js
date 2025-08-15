import { insertLocation, getUserLocations } from "../models/locationModel.js";

async function addLocation(req, res){
    const { locationName, locationLong, locationLat } = req.body;
    const userId = req.userId; 

    if(!locationName || !locationLong || !locationLat){
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        await insertLocation(userId, locationName, locationLong, locationLat);
        const locations = await getUserLocations(userId);
        return res.status(200).json({ message: "Location added", locations });
    } catch(err){
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
}

async function getUserLocationsController(req, res){
    const userId = req.userId;
    try {
        const locations = await getUserLocations(userId);
        return res.status(200).json({ locations });
    } catch(err){
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
}

export { addLocation, getUserLocationsController };
