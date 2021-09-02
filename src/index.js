import app from './app'
import db from "./config/database"

app.listen(app.get("port"), dbConnection())

console.log("server on port", app.get("port"))

async function dbConnection () {
    try {
        await db.authenticate();
        console.log('Base de Datos conectada')
    } catch (error) {
        throw new Error(error);
        
    }
}