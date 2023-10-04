import {env} from '../config.js';
const uri = `${env.ssl+env.hostName}:${env.port}`
const config = {method:'',headers:{"content-type": "application/json"}};   

const endpoint = 'autor'

const validAutor = (data) => {
    const {autorId=null, nombre=null, apellido=null,nacionalidad=null} = data;
    if(typeof obj !== 'Object' || Object.keys(obj)==0) return {status: 404, message:'Porfavor envie algun dato'}

    if(typeof nombre !== 'string') return {status: 400, message: `El dato nombre: '${nombre}' no cumple con el formato`};
    if(typeof apellido !== 'string') return {status: 400, message: `El dato apellido: '${apellido}' no cumple con el formato`};
    if(typeof nacionalidad !== 'string') return {status: 400, message: `El dato nombre: '${nacionalidad}' no cumple con el formato`};

    return data;
}

export const getAll = async() =>{
    config.method = 'GET'
    let res = await (await fetch(`${uri}/${endpoint}}`,config)).json();
    return res;
}
export const post = async(obj={}) =>{
    let valid = validAutor(obj);    
    if(valid.status) return valid; 
    config.method = 'POST'
    config.body = JSON.stringify(obj);
    let res = await (await fetch(`${uri}/${endpoint}`,config)).json();
    return res;
}
export const deletOne = async(autorId) =>{
    if(typeof autorId !== 'number') return {status: 400, message: `El dato autorId: '${autorId}' no cumple con el formato`};
    config.method = 'DELETE';
    let res = await (await fetch(`${uri}/${endpoint}/${id}`,config)).json();
    return res;
}
export const putOne = async(obj={}) =>{
    let valid = validAutor(obj);    
    if(valid.status) return valid; 
    const {autorId} = obj;
    if(typeof autorId !== 'number') return {status: 400, message: `El dato autorId: '${autorId}' no cumple con el formato`};
    config.method = 'PUT';
    config.body = JSON.stringify(obj);
    let res = await (await fetch(`${uri}/${endpoint}/${autorId}`,config)).json();
    console.log(res);
    return res;
}