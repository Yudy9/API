import express from 'express'
import { pool } from './db.js'
import {PORT} from './config.js'
import  fs  from 'fs'



const app = express();

app.use(express.json());
app.use(express.static('src'));

app.get('/', async (req, res) => {
    const [rows] = await pool.query('SELECT "Bienvenidos a CreStyle"  as RESULT')
    res.json(rows)
  })
  app.get('/cliente', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM cliente')
    res.json(rows)
  })
  
  app.post('/cliente', async (req, res) => {
    const data = req.body
    const [rows] = await pool.query('insert into clientes ("documento", "nombre" ,"apellidos" , "direccion") select data.documento data.nombre data.apellidos data.direccion')
	res.json(rows[0][0])
  })
 
  app.post('/producto', async (req, res) => {
    const data = req.body
    const [rows] = await pool.query('insert into producto("nombre" ,"descripcion" , "precio") select  data.nombre data.descripcion data.precio')
    res.json(rows[0][0])
  })
  
  app.get('/orden_detalle/:IdOrden', async (req, res) => {
    const id = req.params
    const [rows] = await pool.query('SELECT * FROM orden_detalle')
    res.json(rows);
   })
  app.post('/orden_detalle', async (req, res) => {
    const data = req.body
    const [rows] = await pool.query('insert into orden_detalle( "cantidad" ) select data.cantidad ')
    res.json(rows[0][0])
  })
  
  app.post('/Imagen', async (req, res) => {
    const image= fs.readdirSync(new URL('../src/Imagenes/', import.meta.url));
    res.json(image);
  })
  
 app.post('/ordenes', async (req, res) => {
    const data = req.body
    const [rows] = await pool.query('insert into ordenes( "documento","fecha" ) select data.documento data.fecha ')
    res.json(rows[0][0])
  })
  
  app.post('/stock', async (req, res) => {
    const data = req.body
    const [rows] = await pool.query('insert into stock( "existencia" ) select data.existencia ')
    res.json(rows[0][0])
  })

 
  app.listen(PORT)
  console.log('Server on port', PORT)


