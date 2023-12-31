import {env} from '../config.js';
import { compareEstructure as compareObject } from '../tools/validations.js'
const uri = `${env.ssl+env.hostName}:${env.port}`
const config = {method:'',headers:{"content-type": "application/json"}};   

const endpoint = 'users'

const validar = (data) => {
    let dateToday = (new Date()).toISOString().slice(0,10)
    
    const {name=null, surname=null, direction=null, phone=null, email=null} = data;
    
    if(data.constructor.name !== 'Object' || Object.keys(data)==0) return {status: 404, message:'Porfavor envie algun dato'}

    if(typeof name !== 'string') return {status: 400, message: `El dato name: '${name}' no cumple con el formato`};
    if(typeof surname !== 'string') return {status: 400, message: `El dato surname: '${surname}' no cumple con el formato`};
    if(typeof direction !== 'string') return {status: 400, message: `El dato direction: '${direction}' no cumple con el formato`};
    if(typeof phone !== 'string') return {status: 400, message: `El dato phone: '${phone}' no cumple con el formato`};
    if(typeof email !== 'string') return {status: 400, message: `El dato email: '${email}' no cumple con el formato`};

    return data;
}
export const getAll = async() =>{
    config.method = 'GET'
    let res = await (await fetch(`${uri}/${endpoint}`,config)).json();
    return res;
}
export const getOne = async (id) =>{
    config.method = 'GET'
    let res = await (await fetch(`${uri}/${endpoint}/${id}`,config)).json();
    return res;
}
export const post = async(obj={}) =>{
    let valid = validEditorial(obj);    
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
    let valid = validEditorial(obj);    
    if(valid.status) return valid;  
    const {id} = obj;
    if(typeof id !== 'number') return {status: 400, message: `El dato autorId: '${id}' no cumple con el formato`};

    let newEdit = compareObject(await getOne(id),obj);
    config.method = 'PUT';
    config.body = JSON.stringify(newEdit);
    let res = await (await fetch(`${uri}/${endpoint}/${id}`,config)).json();

    return res;
}

