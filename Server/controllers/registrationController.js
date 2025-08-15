import { createUser, findUser } from "../models/userModel.js";
import { hashPassword } from "../utils/PasswordUtility.js";

async function registerUser(req, res){
    try{
        const {rusername, ruseremail, ruserpassword} = req.body;

        const existing_user = await findUser(ruseremail);
        if(existing_user){
            return res.status(400).json({message: "User already exists"});
        }

        const password_hash = await hashPassword(ruserpassword);

        const newUser = await createUser(rusername, ruseremail, password_hash);

        res.status(201).json({ message: "User registered", user: newUser });

    }catch(err){
        console.log(err);
    }
}

export default registerUser;
