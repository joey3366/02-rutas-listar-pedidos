import { request, response } from "express";
import bcryptjs from "bcryptjs";
import User from "../models/UserModel";
import { generateJWT } from "../helpers/jwt";


//Login de usuario
export const loginUser = async (req = request, res = response) => {
    const { email, password } = req.body;
    try {
      const userExist = await User.findOne({ where: { email } });
  
      if (!userExist) {
        return res.status(400).json({
          status: false,
          msg: "El usuario no existe",
        });
      }
  
      const validPassword = bcryptjs.compareSync(password, userExist.password);
  
      if (!validPassword) {
          return res.status(400).json({
              status: false,
              msg: "contraseña incorrecta",
          });
      }
  
      const token = await generateJWT(userExist.id, userExist.name)
  
      res.status(200).json({
          status: true,
          msg: 'Login correcto',
          token
      })
    } catch (error) {
      res.status(500).json({
        status: false,
        msg: "Ha ocurrido un error",
      });
    }
};

export const renewToken = async(req = request, res = response) => {

    const userId = req.userId;
    const name = req.name;

    const token = await generateJWT(userId, name);

    res.json({
        status: true,
        token
    })
};