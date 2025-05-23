import jwt from 'jsonwebtoken'
const authMiddleware = (req, res, next) =>{
    const token = req.headers.authorization?.split(' ')[1]
    if(!token){
        return res.status(401).json({message : 'token no proporcionado'})
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log('🔍 Token decodificado:', decoded)
        req.userId = decoded.userId
        next()
    }catch(error){
        return res.status(401).json({message : 'token invalido o expirado'})
    }
}


export default authMiddleware

        