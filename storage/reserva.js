import {env} from '../config.js';
import { compareEstructure as compareObject } from '../tools/validations.js';
const uri = `${env.ssl+env.hostName}:${env.port}`
const config = {method:'',headers:{"content-type": "application/json"}};   

const endpoint = 'reserva'


// @ Falta validar las fechas
const validReserva = (data) => {
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

export const getAll = async() =>{
    config.method = 'GET'
    let res = await (await fetch(`${uri}/${endpoint}}`,config)).json();
    return res;
}
export const post = async(obj={}) =>{
    let valid = validReserva(obj);    
    if(valid.status) return valid; 
    config.method = 'POST'
    config.body = JSON.stringify(obj);
    let res = await (await fetch(`${uri}/${endpoint}`,config)).json();
    return res;
}
export const deletOne = async(id) =>{
    if(typeof id !== 'number') return {status: 400, message: `El dato autorId: '${id}' no cumple con el formato`};
    config.method = 'DELETE';
    let res = await (await fetch(`${uri}/${endpoint}/${id}`,config)).json();
    return res;
}
export const putOne = async(obj={}) =>{
    
    let valid = validReserva(obj);    
    if(valid.status) return valid;  
    const {id} = obj;
    
    if(typeof id !== 'number') return {status: 400, message: `El dato autorId: '${id}' no cumple con el formato`};
    
    let newEdit = compareObject(await getOne(id),obj);
    config.method = 'PUT';
    config.body = JSON.stringify(newEdit);
    let res = await (await fetch(`${uri}/${endpoint}/${id}`,config)).json();
    
    return res;
}