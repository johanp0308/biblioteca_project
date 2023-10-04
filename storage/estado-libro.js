import {env} from '../config.js';
const uri = `${env.ssl+env.hostName}:${env.port}`
const config = {method:'',headers:{"content-type": "application/json"}};   

const endpoint = 'estado-libro'

const validEstadoLibro = (data) => {
    const {estadoId=null, nombre=null, descripcion=null} = data;
    if(typeof obj !== 'Object' || Object.keys(obj)==0) return {status: 404, message:'Porfavor envie algun dato'}

    if(typeof nombre !== 'string') return {status: 400, message: `El dato nombre: '${nombre}' no cumple con el formato`};
    if(typeof descripcion !== 'string') return {status: 400, message: `El dato nombre: '${descripcion}' no cumple con el formato`};

    return data;
}

export const getAll = async() =>{
    config.method = 'GET'
    let res = await (await fetch(`${uri}/${endpoint}}`,config)).json();
    return res;
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
    config.method = 'PUT';
    config.body = JSON.stringify(obj);
    let res = await (await fetch(`${uri}/${endpoint}/${estadoId}`,config)).json();
    console.log(res);
    return res;
}