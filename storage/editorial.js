import {env} from '../config.js';
const uri = `${env.ssl+env.hostName}:${env.port}`
const config = {method:'',headers:{"content-type": "application/json"}};   

const endpoint = 'editorial'

const validEditorial = (data) => {
    const {editorialId=null, nombre=null, direccion=null, telefono=null} = data;
    if(typeof obj !== 'Object' || Object.keys(obj)==0) return {status: 404, message:'Porfavor envie algun dato'}

    if(typeof nombre !== 'string') return {status: 400, message: `El dato nombre: '${nombre}' no cumple con el formato`};
    if(typeof direccion !== 'string') return {status: 400, message: `El dato nombre: '${direccion}' no cumple con el formato`};
    if(typeof telefono !== 'string') return {status: 400, message: `El dato nombre: '${telefono}' no cumple con el formato`};

    return data;
}

export const getAll = async() =>{
    config.method = 'GET'
    let res = await (await fetch(`${uri}/${endpoint}}`,config)).json();
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
export const deletOne = async(editorialId) =>{
    if(typeof editorialId !== 'number') return {status: 400, message: `El dato autorId: '${editorialId}' no cumple con el formato`};
    config.method = 'DELETE';
    let res = await (await fetch(`${uri}/${endpoint}/${id}`,config)).json();
    return res;
}
export const putOne = async(obj={}) =>{
    let valid = validEditorial(obj);    
    if(valid.status) return valid;  
    const {editorialId} = obj;
    if(typeof editorialId !== 'number') return {status: 400, message: `El dato autorId: '${editorialId}' no cumple con el formato`};
    config.method = 'PUT';
    config.body = JSON.stringify(obj);
    let res = await (await fetch(`${uri}/${endpoint}/${editorialId}`,config)).json();
    console.log(res);
    return res;
}