import {env} from '../config.js';

import {getOne as getOneUSer} from './usuario.js';
import {getOne as getOneBook} from './libro.js';

import { compareEstructure as compareObject } from '../tools/validations.js';

const uri = `${env.ssl+env.hostName}:${env.port}`
const config = {method:'',headers:{"content-type": "application/json"}};   

const endpoint = 'bookings'


// @ Falta validar las fechas
const validReserva = (data) => {
    let dateToday = new Date()
    
    const {userId=null, bookId=null, reservationdate=null, endreservation=null, status=null} = data;
    if(data.constructor.name !== 'Object' || Object.keys(data)==0) return {status: 404, message:'Porfavor envie algun dato'}

    if(typeof reservationdate !== 'string') return {status: 400, message: `El dato reservationdate: '${reservationdate}' no cumple con el formato`};
    let dateI = new Date(reservationdate);
    if(!(dateI && dateI < dateToday)) return {status:400, message:`El dato reservationdate: '${reservationdate}' no cumple con el formato`};

    if(typeof endreservation !== 'string') return {status: 400, message:`El dato endreservation: '${endreservation}' no cumple con el formato`};
    let dateF = new Date(endreservation);
    if(!(dateF && dateF < dateToday)) return {status:400, message:`El dato endreservationend: '${endreservation}' no cumple con el formato`};

    if(typeof userId !== 'number') return {status: 400, message: `El dato userId: '${userId}' no cumple con el formato`};
    if(typeof bookId !== 'number') return {status: 400, message: `El dato bookId: '${bookId}' no cumple con el formato`};
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
export const getRelationShips = async() =>{
    let res = await getAll();
    res = await Promise.all(res.map( async (data)=>{
        let {userId:iduser, bookId:idbook} = data;
        data.userId = await getOneUSer(iduser);
        data.bookId = await getOneBook(idbook);
        return data;
    }));
    return res;
}

console.log(await getRelationShips());