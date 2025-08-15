import jwt from 'jsonwebtoken';

export function verifyJWT(req, res, next){
    const authHeader = req.headers['authorization'];
    if(!authHeader) return res.status(401).json({message: 'No token provided'});

    const token = authHeader.split(' ')[1];

    jwt.verify(token, 'P@ssw0rd', (err, decoded) => {
        if(err) return res.status(403).json({message: 'Invalid token'});
        req.userId = decoded.id;
        next();
    });
}
