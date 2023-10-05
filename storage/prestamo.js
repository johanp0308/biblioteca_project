import {env} from '../config.js';
import { compareEstructure as compareObject } from '../tools/validations.js';
const uri = `${env.ssl+env.hostName}:${env.port}`
const config = {method:'',headers:{"content-type": "application/json"}};   

const endpoint = 'loans'


// @ Falta validar las fechas
const validarPrestamo = (data) => {
    let dateToday = (new Date()).toISOString().slice(0,10)
    
    const {usuarioId=null, libroId=null, fechaReserva=null, fechaReservaFin=null, estado=null} = data;
    if(typeof data !== 'Object' || Object.keys(data)==0) return {status: 404, message:'Porfavor envie algun dato'}

    if(typeof usuarioId !== 'string') return {status: 400, message: `El dato usuarioId: '${usuarioId}' no cumple con el formato`};
    if(typeof libroId !== 'string') return {status: 400, message: `El dato libroId: '${libroId}' no cumple con el formato`};
    
    let dateRes = (new Date(fechaReserva)).toISOString().slice(0,10);
    if(!(date && date.ge)) return {status: 400, message: `El dato fechaReserva: '${fechaReserva}' no cumple con el formato`};
    if(typeof fechaReservaFin !== 'string') return {status: 400, message: `El dato fechaReserva: '${fechaReserva}' no cumple con el formato`};

    return data;
}
