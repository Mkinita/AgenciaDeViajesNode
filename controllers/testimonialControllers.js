import { Testimonial } from '../Models/Testimoniales.js';
 
const guardarTestimonial = async (req, res) => {


    //validar formulario

    const {nombre, correo, mensaje } = req.body

    const errores = [];

    if (nombre.trim() === ''){
        errores.push({mensaje : 'El Nombre esta Vacio'});
    }

    if (correo.trim() === ''){
        errores.push({mensaje : 'El Correo esta Vacio'});
    }

    if (mensaje.trim() === ''){
        errores.push({mensaje : 'El Mensaje esta Vacio'});
    }


    if(errores.length > 0) {

        //CONSULTAR TEZTIMONIALES EXISTENTES

        const testimoniales = await Testimonial.findAll()

        //mostar la vista con errores

        res.render('testimoniales', {
            pagina:'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        })
    } else{
        //almacenarlo en la db
        try{
            await Testimonial.create({
                nombre,
                correo,
                mensaje
            })
            res.redirect('/testimoniales');
        }catch (error){
            console.log(error)
        }
    }
    
}

export {
    guardarTestimonial
} 