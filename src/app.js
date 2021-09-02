import express from 'express';
import config from './config';
import cors from 'cors';
import multer from 'multer';
import path from 'path'

import routes from './routes'

const app = express();

// ==== CONFIGURACIONES ===//

// Cors

app.use(cors())

// Multer 

app.use(multer({dest: path.join(__dirname, './public/images')}).single('img'))

// Parseo del body

app.use(express.json())

//Puerto
app.set("port", config.port);



// === RUTAS == //
app.use(routes)

export default app;