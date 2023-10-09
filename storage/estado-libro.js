import {env} from '../config.js';
import { compareEstructure as compareObject } from '../tools/validations.js';
const uri = `${env.ssl+env.hostName}:${env.port}`
const config = {method:'',headers:{"content-type": "application/json"}};   

const endpoint = 'state'

const validEstadoLibro = (data) => {
    const { name=null, description=null} = data;

    if(data.constructor.name !== 'Object' || Object.keys(data)==0) return {status: 404, message:'Porfavor envie algun dato'}

    if(typeof name !== 'string') return {status: 400, message: `El dato name: '${name}' no cumple con el formato`};
    if(typeof description !== 'string') return {status: 400, message: `El dato description: '${description}' no cumple con el formato`};

    return data;
}
export const getAll = async() =>{
    config.method = 'GET'
    let res = await (await fetch(`${uri}/${endpoint}`,config)).json();
    return res;
}
export const getOne = async(id) =>{
    config.method = 'GET'
    console.log(`${uri}/${endpoint}/${id}`);
    let res = await (await fetch(`${uri}/${endpoint}/${id}`,config)).json();
    return (Object.keys(res).length>0) ? res : {status:400,message:'That Object does not exits'};
}
export const post = async(obj={}) =>{
    let valid = validEstadoLibro(obj);    
    if(valid.status) return valid; 
    config.method = 'POST'
    config.body = JSON.stringify(obj);
    let res = await (await fetch(`${uri}/${endpoint}`,config)).json();
    return res;
}
export const deletOne = async(estadoId) =>{
    if(typeof estadoId !== 'number') return {status: 400, message: `El dato autorId: '${estadoId}' no cumple con el formato`};
    config.method = 'DELETE';
    let res = await (await fetch(`${uri}/${endpoint}/${estadoId}`,config)).json();
    return res;
}
export const putOne = async(obj={}) =>{
    let valid = validEstadoLibro(obj);    
    if(valid.status) return valid;  
    const {estadoId} = obj;
    if(typeof estadoId !== 'number') return {status: 400, message: `El dato autorId: '${estadoId}' no cumple con el formato`};

    let newEdit = compareObject(await getOne(id),obj);
    config.method = 'PUT';
    config.body = JSON.stringify(newEdit);
    let res = await (await fetch(`${uri}/${endpoint}/${id}`,config)).json();

    return res;
}
