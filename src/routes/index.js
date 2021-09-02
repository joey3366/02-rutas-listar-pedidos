import { Router } from "express";
import { validarCampos } from "../middlewares/validator";
import { check } from 'express-validator'
import {
    userController as user,
    authController as auth,
    productController as product,
    orderController as order
} from "../controllers"
import { validateJWT } from "../middlewares/jwt-validator";

const router = Router()

/*const diskStorage = multer.diskStorage({
    destination: path.join(__dirname, '../public/images'),
    filename: (req, file, cb) => {
        cb(null, Date.now()+ file.originalname)
    }
})

const fileUpload = multer({
    storage: diskStorage
}).single()*/


//Listar todos los usuarios
router.get("/api/user/list", user.getAllUsers);

// Crear usuario
router.post("/api/user/create",[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('lastname', 'El apellido es obligatorio').not().isEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña debe tener 6 caracteres').isLength({ min: 6}),
    validarCampos
], user.createUser);

//Login de usuario
router.post("/api/auth",[
    check('email', 'El correo es obligatorio').not().isEmpty().isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty()
] ,auth.loginUser);

//Renovar token

router.get("/api/auth/renew", validateJWT ,auth.renewToken)


// Crear Producto
router.post('/api/product/new', product.newProduct)

//Actualizar Producto
router.put('/api/product/update/:id', product.updateProduct)

//Listar Productos
router.get("/api/product/list", product.getAllProducts);

// Eliminar Productos
router.delete('/api/product/delete/:id', product.deleteProduct)




// Listar Pedidos
router.get("/api/orders/list", order.getAllOrders);

//Listar un solo pedido
router.get("/api/orders/list/:id", order.getOneOrder);

// Listar pedido por codigo de producto
router.get("/api/orders/product/:cod_producto", order.getOneOrderByProduct);
export default router;