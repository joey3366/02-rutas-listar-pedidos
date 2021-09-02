import { response } from "express";
import Order from "../models/orderModel";
import Product from "../models/productModel";

export const getAllOrders = async (req, res = response) => {
    const orders = await Order.findAll();
    res.json({ orders });
};


export const getOneOrder = async (req, res = response) => {

    const { id } = req.params
    const order = await Order.findOne({where: {cod_pedido: id}})
    if (order) {
        return res.json({ status: true, msg: 'ok', order });
    }
    res.json({
        status: false,
        msg: 'No existe codigo de pedido'
    })
}

export const getOneOrderByProduct = async (req, res = response) => {

    const {cod_producto}  = req.params

    const order = await Order.findAll({where: { cod_producto }})
    if (order) {
        return res.json({ status: true, msg: 'ok', order });
    }
    
}