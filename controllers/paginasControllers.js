import {Viaeje} from '../Models/Vieaje.js';
import {Testimonial} from '../Models/Testimoniales.js';

const paginaInicio = async (req,res) => {

    //Consultar 3 viajes del modelo viaje

    const promiseDB = [];

    promiseDB.push(Viaeje.findAll({ limit: 3}));
    promiseDB.push(Testimonial.findAll({ limit: 3}));


    
    try {

        const resultado = await Promise.all( promiseDB );

        res.render('inicio',{
            pagina:'Inicio',
            clase:'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
        } );
    } catch (error) {
        console.log(error);
    }

   
}

const paginaNosotros = (req,res) => {
    res.render('nosotros', {
        pagina:'Nosotros'
    });
}


const paginaViajes = async (req,res) => {
    //consultar base de datos
    const viajes = await Viaeje.findAll();

    console.log(viajes);

    res.render('viajes', {
        pagina:'Proximos Viajes',
        viajes,
    })
}


const paginaTestimoniales = async (req,res) => {

    try {
        
        const testimoniales = await Testimonial.findAll()

        res.render('testimoniales', {
            pagina:'Testimoniales',
            testimoniales
        })

    } catch (error) {
        console.log(error);
    }

}

//muestra un viaje por su slug

const paginaDetalleViaje = async (req,res) => {
    const { slug } = req.params;

    try{
        const viaje = await Viaeje.findOne({ where : { slug}});
        res.render('viaje',{
           pagina: 'Informacion Viaje' , 
           viaje
        })

    } catch(error){
        console.log(error);
    }

}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
    
}