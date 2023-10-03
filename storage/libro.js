import {env} from '../config.js';
const uri = `${env.ssl+env.hostName}:${env.port}`
const config = {methods:'',headers:{"content-type": "application/json"}};   

const defaultObj = {
    id:null,
    autorId:null,
    categoriaId:null,
    editorialId:null,
    titulo:"",
    fechaLanzamiento:"",
    isbn:"",
    numPaginacion:undefined,
    estadoId:undefined
}

const validLibro = (obj) => {
    const {id, autorId, categoriaId, editorialId, titulo, fechaLanzamiento, isbn, numPaginacion, estadoId} = obj;
    let date = new Date(fechaLanzamiento);
    if(!(date && date.getFullYear()<=2040)) return {status: 400, message: `El dato fecha: '${fechaLanzamiento}' no cumple con el formato`};
    console.log("la validacion sigue")
    if(typeof id !== 'number') return {status: 400, message: `El dato id: '${id}' no cumple con el formato`};
    if(typeof autorId !== 'number') return {status: 400, message: `El dato autorId: '${autorId}' no cumple con el formato`};
    if(typeof categoriaId !== 'number') return {status: 400, message: `El dato categoriaId: '${categoriaId}' no cumple con el formato`};
    if(typeof editorialId !== 'number') return {status: 400, message: `El dato editorialId: '${editorialId}' no cumple con el formato`};
    if(typeof titulo !== 'string') return {status: 400, message: `El dato titulo:'${titulo}' no cumple con el formato`};
    if(typeof isbn !== 'string') return {status: 400, message: `El dato isbn: '${isbn}' no cumple con el formato`};
    if(typeof numPaginacion !== 'number') return {status: 400, message: `El dato numPaginacion: '${numPaginacion}' no cumple con el formato`};
    if(typeof estadoId !== 'number') return {status: 400, message: `El dato estadoId: '${estadoId}' no cumple con el formato`};
    return false;
}

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
export const putOne = async(obj=defaultObj) =>{
    if(!validLibro(obj)) return obj
    const {id} =obj;
    config.methods = 'PUT';
    config.body = JSON.stringify(obj);
    let res = await (await fetch(`${uri}/libro/${id}`,config)).json();

    return "Hola";
}

console.log(putOne());
