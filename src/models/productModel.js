import { DataTypes } from "sequelize";
import db from "../config/database";
import Order from "./orderModel";


const Product = db.define('productos', {
    nombre_producto: { type: DataTypes.STRING},
    valor: {type: DataTypes.INTEGER}
})

Product.hasMany(Order, {foreignKey: 'cod_producto'})
Order.belongsTo(Product, {foreignKey: 'cod_producto'})
export default Product;