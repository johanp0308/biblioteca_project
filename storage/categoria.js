import {env} from '../config.js';
import { compareEstructure as compareObject } from '../tools/validations.js';
const uri = `${env.ssl+env.hostName}:${env.port}`
const config = {method:'',headers:{"content-type": "application/json"}};   

const endpoint = 'categories'

const validCategoria = (data) => {
    const {name=null} = data;
    if(data.constructor.name !== 'Object' || Object.keys(data)==0) return {status: 404, message:'Porfavor envie algun dato'}

    if(typeof name !== 'string') return {status: 400, message: `El dato nombre: '${name}' no cumple con el formato`};
    return data;
}

export const getAll = async() =>{
    config.method = 'GET'
    let res = await (await fetch(`${uri}/${endpoint}`,config)).json();
    return res;
}
export const getOne = async(id) =>{
    config.method = 'GET';
    let res = await(await fetch(`${uri}/${endpoint}/${id}`,config)).json()
    return (Object.keys(res).length>0) ? res : {status:400, message:'That Object does not exits'};
}
export const post = async(obj={}) =>{
    let valid = validCategoria(obj);
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
    let valid = validCategoria(obj);    
    if(valid.status) return valid; 
    const {id} = obj;
    if(typeof id !== 'number') return {status: 400, message: `El dato autorId: '${id}' no cumple con el formato`};
    
    let newEdit = compareObject(await getOne(id), obj);
    config.method = 'PUT';
    config.body = JSON.stringify(newEdit);
    let res = await (await fetch(`${uri}/${endpoint}/${id}`,config)).json();

    return res;
}
