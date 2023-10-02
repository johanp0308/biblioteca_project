import {env} from '../config.js';
const uri = `${env.ssl+env.hostName}:${env.port}`
const config = {method:'',headers:{"content-type": "application/json"}};

console.log(uri);

export const getAll = async() =>{
    config.methods = 'GET'
    let res = await (await fetch(`${uri}/libro`,config)).json();
    return res;
}
export const post = async(obj) =>{
    config.methods = 'POST'
    config.body = JSON.stringify(obj);
    let res = await (await fetch(`${uri}/libro`,config)).json();
    return res;
}
export const deletOne = async(id) =>{
    if(typeof id !== 'number') return  {status: 404, message:`${id} is not a number`};
    config.method = 'DELETE';
    let res = await (await fetch(`${uri}/libro/${id}`,config)).json();
    return res;
}
export const putOne = async(obj={id,autorId,categoriaId,editorialId,titulo,fechaLanzamiento,isbn,numPaginacion,estadoId}) =>{
    const {id, autorId, categoriaId, editorialId, titulo, fechaLanzamiento, isbn, numPaginacion, estadoId} = obj;
    let date = new Date(fechaLanzamiento);
    if(!(date && date.getFullYear()<=2040)) return {status: 400, message: `El datos '${fechaLanzamiento}' no cumple con el formato`};
    if(typeof id !== 'number') return {status: 400, message: `El datos '${id}' no cumple con el formato`};
    if(typeof autorId !== 'number') return {status: 400, message: `El datos '${autorId}' no cumple con el formato`};
    if(typeof categoriaId !== 'number') return {status: 400, message: `El datos '${categoriaId}' no cumple con el formato`};
    if(typeof editorialId !== 'number') return {status: 400, message: `El datos '${editorialId}' no cumple con el formato`};
    if(typeof titulo !== 'string') return {status: 400, message: `El datos '${titulo}' no cumple con el formato`};
    if(typeof isbn !== 'string') return {status: 400, message: `El datos '${isbn}' no cumple con el formato`};
    if(typeof numPaginacion !== 'number') return {status: 400, message: `El datos '${numPaginacion}' no cumple con el formato`};
    if(typeof estadoId !== 'number') return {status: 400, message: `El datos '${estadoId}' no cumple con el formato`};
    
    // config.methods = 'PUT';
    // config.body = JSON.stringify(obj);
    // let res = await (await fetch(`${uri}/libro/${id}`,config)).json();

    return "Hola"
}

console.log(putOne());
