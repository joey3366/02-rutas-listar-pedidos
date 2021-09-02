import { request, response } from "express";
import Product from "../models/productModel";
import { random } from "../helpers/libs";
import path from "path";
import fs from "fs-extra";

export const newProduct = async (req = request, res = response) => {
  try {
    const url = random();
    const imagePath = req.file.path;
    console.log(imagePath);
    const ext = path.extname(req.file.originalname).toLowerCase();
    console.log(ext);
    const targetPath = path.resolve(`src/public/images/${url}${ext}`);
    if (ext === ".png" || ext === ".jpg" || ext === ".jpeg" || ext === ".gif") {
      await fs.rename(imagePath, targetPath);
      const product = await Product.create({
        description: req.body.description,
        price: req.body.price,
        img: url + ext,
      });
      await product.save();
    }

    res.json({
      status: true,
      msg: "Recibido",
    });
  } catch (error) {
    console.log(error);
    res.send(500).json({
      status: false,
      msg: "No se pudo crear producto",
    });
  }
};

export const getAllProducts = async (req, res = response) => {
  const products = await Product.findAll();
  res.json({ products });
};


export const updateProduct = async (req = request, res = response) => {

  const id = req.params.id
  const { body } = req

  try {

    const product = await Product.findByPk(id)

    if (!product) {
      return res.status(404).json({
        status: false,
        msg: 'Producto con ese id no existe'
      })
    }

    await product.update(body)

    res.json({
      status: true,
      msg: 'Producto actualizado correctamente',
      product: productExist
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      msg: 'Hable con el administrador'
    })
  }
}

export const deleteProduct = async (req = request, res = response) =>{

  const id = req.params.id
  try {
    const product = await Product.findByPk(id)

    if (!product) {
      return res.status(404).json({
        status: false,
        msg: 'Producto no se puede eliminar ya que no existe'
      })
    }

    await product.destroy();

    return res.status(200).json({
      status: true,
      msg: 'Producto Eliminado'
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: false,
      msg: 'Hable con el administrador'
    })
  }
}