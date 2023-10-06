import {getOne as getOneAutor} from './autor.js'
import {getOne as getOneCategoria} from './categoria.js';
import {getOne as getOneEditorial} from './editorial.js';
import {getOne as getOneEstado} from './estado-libro.js'

import {env} from '../config.js';
import { compareEstructure as compareObject } from '../tools/validations.js';

const uri = `${env.ssl+env.hostName}:${env.port}`
const config = {method:'',headers:{"content-type": "application/json"}};   

const endpoint = 'books'

const validLibro = (data) => {
    const {authorId=null, 
        categoryId=null, 
        publisherId=null, 
        title=null,
        releasedate=null, 
        isbn=null, 
        pagenum=null, 
        statusId=null}=data;
    if(data.constructor.name !== 'Object' || Object.keys(data)==0) return {status: 404, message:'Porfavor envie algun dato'}
    let date = new Date(releasedate);
    if(!(date && date.getFullYear()<=2040)) return {status: 400, message: `El dato fecha: '${releasedate}' no cumple con el formato`};
    if(typeof authorId !== 'number') return {status: 400, message: `El dato autorId: '${authorId}' no cumple con el formato`};
    if(typeof categoryId !== 'number') return {status: 400, message: `El dato categoriaId: '${categoryId}' no cumple con el formato`};
    if(typeof publisherId !== 'number') return {status: 400, message: `El dato editorialId: '${publisherId}' no cumple con el formato`};
    if(typeof title !== 'string') return {status: 400, message: `El dato titulo:'${title}' no cumple con el formato`};
    if(typeof isbn !== 'number') return {status: 400, message: `El dato isbn: '${isbn}' no cumple con el formato`};
    if(typeof pagenum !== 'number') return {status: 400, message: `El dato numPaginacion: '${pagenum}' no cumple con el formato`};
    if(typeof statusId !== 'number') return {status: 400, message: `El dato estadoId: '${statusId}' no cumple con el formato`};
    return data;
}
export const getAll = async() =>{
    config.method = 'GET'
    let res = await (await fetch(`${uri}/${endpoint}`,config)).json();
    return res;
}
export const getOne = async(id) =>{
    if(typeof id!== 'number') return  {status: 404, message:`${id} is not a number`};
    config.method = 'GET';JSON.stringify(obj)
    return res;
}
export const post = async(obj={}) =>{
    let valid = validLibro(obj);    
    if(valid.status) return valid;
    config.method = 'POST'
    config.body = JSON.stringify(obj);
    console.log(JSON.stringify(obj))
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
    let valid = validLibro(obj);    
    if(valid.status) return valid;
    const {id} = obj;
    if(typeof id !== 'number') return {status: 400, message: `El dato id: '${id}' no cumple con el formato`};

    let newEdit = compareObject(await getOne(id),obj);
    config.method = 'PUT';
    config.body = JSON.stringify(newEdit);
    let res = await (await fetch(`${uri}/${endpoint}/${id}`,config)).json();
    return res;
}
export const  getRelationShips = async() =>{
    let res = await getAll();
    res = await Promise.all(res.map( async (data)=>{
        let {categoryId:idCAt, authorId:idAutor, publisherId:idEdit, statusId:IdEstado} = data;
        data.categoryId = await getOneCategoria(idCAt);
        data.authorId = await getOneAutor(idAutor);
        data.publisherId = await getOneEditorial(idEdit);
        data.statusId = await getOneEstado(IdEstado);
        return data;
    }));    
    return res;
}


let date = new Date(321546561854);

