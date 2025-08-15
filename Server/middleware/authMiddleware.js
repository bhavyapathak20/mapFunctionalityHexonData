import jwt from 'jsonwebtoken';
const JWT_SECRET = "P@ssword";

export function authenticateJWT(req, res, next){
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, JWT_SECRET, (err, decoded)=>{
            if(err) return res.status(403).json({ message: "Invalid token" });
            req.userId = decoded.userId;
            next();
        });
    } else {
        return res.status(401).json({ message: "No token provided" });
    }
}
