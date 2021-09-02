import { DataTypes } from "sequelize";
import db from "../config/database";
import Product from "./productModel";


const Order = db.define('pedido', {
    cod_pedido: { type: DataTypes.INTEGER},
    id_usuario: {type: DataTypes.INTEGER},
    valor: {type: DataTypes.INTEGER},
    cantidad: {type: DataTypes.INTEGER},
    valor_unitario: {type: DataTypes.INTEGER},
    cod_producto: {type: DataTypes.INTEGER}
}, {
    freezeTableName: true,
    tableName: "pedido"
})

export default Order;