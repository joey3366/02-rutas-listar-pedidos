import { request, response } from "express";
import bcryptjs from "bcryptjs";
import User from "../models/UserModel";
import { generateJWT } from "../helpers/jwt";

export const createUser = async (req = request, res = response) => {
  const { email, password } = req.body;
  try {
    let userExist = await User.findOne({ where: { email } });

    if (userExist) {
      return res.status(400).json({
        status: false,
        msg: "Ya existe un usuario con ese correo",
      });
    }

    const user = await User.create(req.body);
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    (await user).save();
    const token = await generateJWT(user.id, user.name)
    res.status(201).json({
      status: true,
      msg: "Usuario creado correctamente",
      token
    });
  } catch (error) {
    console.log(error);
    res.send(500).json({
      status: false,
      msg: "No se pudo crear usuario",
    });
  }
};
export const getAllUsers = async (req, res = response) => {
  const users = await User.findAll();
  res.json({ users });
};

