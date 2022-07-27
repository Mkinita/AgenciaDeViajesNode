import express from'express';
import router from './routes/index.js';
import db from './config/db.js';







const app = express();


//conectar la base de datos

db.authenticate()
    .then(()=> console.log('base de datos conectada'))
    .catch(error => console.log('error'));


//Definir puerto
const port = process.env.PORT || 4000;

// habilitar pug

app.set('view engine', 'pug');


//OBTENER EL AÑO ACTUL
app.use((req, res, next) =>{
    res.locals.unaVariable ='Una Nueva Variable';

    const year = new Date ();
    res.locals.Actualyear = year.getFullYear();
    res.locals.nombresitio = "Agencia de Viajes";
    next();
});


//Agregar body paser para leer los datos del formulario


app.use('/', express.urlencoded({extended: true}));

//Definir la carpeta publica

app.use(express.static('public'));

//afregar router

app.use('/',router);

app.listen (port,() =>{
    console.log(`El servisor esta funcionado en el puerto ${port}`)
})