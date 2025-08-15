import { findUser } from "../models/userModel.js";
import { comparePassword } from "../utils/PasswordUtility.js";
import jwt from 'jsonwebtoken';

const JWT_SECRET = "P@ssword";

async function loginCheck(req, res){
    const { luseremail, luserpassword } = req.body;

    if(!luseremail || !luserpassword){
        return res.status(400).json({message: "Email and password are required"});
    }

    try {
        const user = await findUser(luseremail);
        if(!user) return res.status(404).json({message: "User not found"});

        const isMatch = await comparePassword(luserpassword, user.userpassword);
        if(!isMatch) return res.status(401).json({message: "Invalid password"});

        // Issue JWT
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({ message: "Login successful", token });
    } catch(err){
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
}

export default loginCheck;
