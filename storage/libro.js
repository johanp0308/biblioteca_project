import {env} from '../config.js';
const uri = `${env.ssl+env.hostName}:${env.port}`
const config = {method:'',headers:{"content-type": "application/json"}};   

// const end

const validLibro = (data) => {
    const {id=null, autorId=null, categoriaId=null, editorialId=null, titulo=null,
        fechaLanzamiento=null, 
        isbn=null, 
        numPaginacion=null, 
        estadoId=null}=data;
    if(typeof obj !== 'Object' || Object.keys(obj)==0) return {status: 404, message:'Porfavor envie algun dato'}
    let date = new Date(fechaLanzamiento);
    if(!(date && date.getFullYear()<=2040)) return {status: 400, message: `El dato fecha: '${fechaLanzamiento}' no cumple con el formato`};
    if(typeof autorId !== 'number') return {status: 400, message: `El dato autorId: '${autorId}' no cumple con el formato`};
    if(typeof categoriaId !== 'number') return {status: 400, message: `El dato categoriaId: '${categoriaId}' no cumple con el formato`};
    if(typeof editorialId !== 'number') return {status: 400, message: `El dato editorialId: '${editorialId}' no cumple con el formato`};
    if(typeof titulo !== 'string') return {status: 400, message: `El dato titulo:'${titulo}' no cumple con el formato`};
    if(typeof isbn !== 'string') return {status: 400, message: `El dato isbn: '${isbn}' no cumple con el formato`};
    if(typeof numPaginacion !== 'number') return {status: 400, message: `El dato numPaginacion: '${numPaginacion}' no cumple con el formato`};
    if(typeof estadoId !== 'number') return {status: 400, message: `El dato estadoId: '${estadoId}' no cumple con el formato`};
    return data;
}

export const getAll = async() =>{
    config.method = 'GET'
    let res = await (await fetch(`${uri}/libro`,config)).json();
    return res;
}
export const post = async(obj={}) =>{
    if(!validLibro(obj)) return "Mando objeto";
    

    config.method = 'POST'
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
export const putOne = async(obj={}) =>{

    if(typeof id !== 'number') return {status: 400, message: `El dato id: '${id}' no cumple con el formato`};
    if(validLibro(obj)) return; 
    
    const {id} = obj;
    config.method = 'PUT';
    config.body = JSON.stringify(obj);
    let res = await (await fetch(`${uri}/libro/${id}`,config)).json();
    console.log(res);
    return res;
}

let objeto = {
    id: 2,
    autorId: 2,
    categoriaId: 2,
    editorialId: 2,
    titulo: "Hola",
}

console.log(await post(objeto));
