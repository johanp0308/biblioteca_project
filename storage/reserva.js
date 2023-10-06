import {env} from '../config.js';
import { compareEstructure as compareObject } from '../tools/validations.js';
const uri = `${env.ssl+env.hostName}:${env.port}`
const config = {method:'',headers:{"content-type": "application/json"}};   

const endpoint = 'bookings'


// @ Falta validar las fechas
const validReserva = (data) => {
    let dateToday = new Date()
    
    const {userId=null, bookId=null, reservationdate=null, endreservationend=null, status=null} = data;
    if(data.constructor.name !== 'Object' || Object.keys(data)==0) return {status: 404, message:'Porfavor envie algun dato'}

    if(typeof reservationdate !== 'string') return {status: 400, message: `El dato reservationdate: '${reservationdate}' no cumple con el formato`};
    let dateI = new Date(reservationdate);
    if(!(dateI && dateI < dateToday)) return {status:400, message:`El dato reservationdate: '${reservationdate}' no cumple con el formato`};

    if(typeof endreservationend !== 'string') return {status: 400, message:`El dato endreservationend: '${endreservationend}' no cumple con el formato`};
    let dateF = new Date(endreservationend);
    if(!(dateF && dateF < dateToday)) return {status:400, message:`El dato endreservationend: '${endreservationend}' no cumple con el formato`};

    if(typeof userId !== 'number') return {status: 400, message: `El dato userId: '${userId}' no cumple con el formato`};
    if(typeof bookId !== 'number') return {status: 400, message: `El dato bookId: '${bookId}' no cumple con el formato`};
    if(typeof endreservationend !== 'number') return {status: 400, message: `El dato endreservationend: '${endreservationend}' no cumple con el formato`};
    if(typeof status !== 'string') return {status: 400, message: `El dato status: '${status}' no cumple con el formato`};

    return data;
}

export const getAll = async() =>{
    config.method = 'GET'
    let res = await (await fetch(`${uri}/${endpoint}`,config)).json();
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