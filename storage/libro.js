import {env} from '../config.js';
const uri = `${env.ssl+env.hostName}:${env.port}`
const config = {method:'',headers:{"content-type": "application/json"}};   

const endpoint = 'libro'

const compareData = (data,dataC)=>{
    let dataNew = Object.keys(data).map(key=>{
        console.log(key, data[key]);
    })
    console.log(dataC)
    return dataNew;
}
const validLibro = (data) => {
    const {autorId=null, categoriaId=null, editorialId=null, titulo=null,
        fechaLanzamiento=null, 
        isbn=null, 
        numPaginacion=null, 
        estadoId=null}=data;
    if(typeof data !== 'Object' || Object.keys(data)==0) return {status: 404, message:'Porfavor envie algun dato'}
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
    let res = await (await fetch(`${uri}/${endpoint}`,config)).json();
    return res;
}

export const getOne = async(id) =>{
    if(typeof id!== 'number') return  {status: 404, message:`${id} is not a number`};
    config.method = 'GET';
    let res = await (await fetch(`${uri}/${endpoint}/${id}`,config)).json();
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
export const deletOne = async(id) =>{
    if(typeof id !== 'number') return  {status: 404, message:`${id} is not a number`};
    config.method = 'DELETE';
    let res = await (await fetch(`${uri}/${endpoint}/${id}`,config)).json();
    return res;
}
export const putOne = async(obj={}) =>{
    let valid = validCategoria(obj);    
    if(valid.status) return valid;
    const {id} = obj;
    if(typeof id !== 'number') return {status: 400, message: `El dato id: '${id}' no cumple con el formato`};

    let objReal = compareData(obj, await getOne(id));

    config.method = 'PUT';
    config.body = JSON.stringify(obj);
    let res = await (await fetch(`${uri}/${endpoint}/${id}`,config)).json();
    console.log(res);
    return res;
    
}
