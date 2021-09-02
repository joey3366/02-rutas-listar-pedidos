import jwt from 'jsonwebtoken'

export const generateJWT = (userId, name) => {
    return new Promise( (resolve, reject) => {

        const payload = {userId, name}
        jwt.sign(payload, process.env.SECRET_JWT, {
            expiresIn: '2h'
        }, (err, token)=> {
            if (err) {
                console.log(err)
                reject('No se pudo generar el token')
            }

            resolve( token );
        })
    })
}