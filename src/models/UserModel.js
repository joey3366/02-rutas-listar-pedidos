import { DataTypes } from "sequelize";
import db from "../config/database";


const User = db.define('users', {
    name: { type: DataTypes.STRING},
    lastname: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING}
})

export default User;