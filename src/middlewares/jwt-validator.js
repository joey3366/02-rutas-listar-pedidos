import { request, response } from "express";
import jwt from 'jsonwebtoken'


export const validateJWT = (req = request, res = response, next) => {

    const token = req.header('x-token')

    if (!token) {
        return res.status(401).json({
            status: false,
            msg: 'No hay token'
        })
    }

    try {
        
        const {userId, name} = jwt.verify(token, process.env.SECRET_JWT);
        req.userId = userId;
        req.name = name
    } catch (error) {
        return res.status(401).json({
            status: false,
            msg: 'Token invalido'
        })
    }

    next();
}