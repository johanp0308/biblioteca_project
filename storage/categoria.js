import {env} from '../config.js';
const uri = `${env.ssl+env.hostName}:${env.port}`
const config = {method:'',headers:{"content-type": "application/json"}};   

const endpoint = 'categoria'

const validCategoria = (data) => {
    const {categoriaId=null, nombre=null} = data;
    if(typeof data !== 'Object' || Object.keys(data)==0) return {status: 404, message:'Porfavor envie algun dato'}

    if(typeof nombre !== 'string') return {status: 400, message: `El dato nombre: '${nombre}' no cumple con el formato`};
    return data;
}

export const getAll = async() =>{
    config.method = 'GET'
    let res = await (await fetch(`${uri}/${endpoint}}`,config)).json();
    return res;
}
export const post = async(obj={}) =>{
    let valid = validCategoria(obj);
    if(valid.status) return valid;
    config.method = 'POST'
    config.body = JSON.stringify(obj);
    let res = await (await fetch(`${uri}/${endpoint}`,config)).json();
    return res;
}
export const deletOne = async(categoriaId) =>{
    if(typeof categoriaId !== 'number') return {status: 400, message: `El dato autorId: '${categoriaId}' no cumple con el formato`};
    config.method = 'DELETE';
    let res = await (await fetch(`${uri}/${endpoint}/${id}`,config)).json();
    return res;
}
export const putOne = async(obj={}) =>{
    let valid = validCategoria(obj);    
    if(valid.status) return valid; 
    const {categoriaId} = obj;
    if(typeof categoriaId !== 'number') return {status: 400, message: `El dato autorId: '${categoriaId}' no cumple con el formato`};
    config.method = 'PUT';
    config.body = JSON.stringify(obj);
    let res = await (await fetch(`${uri}/${endpoint}/${categoriaId}`,config)).json();
    console.log(res);
    return res;
}