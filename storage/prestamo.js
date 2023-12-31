import {getOne as getOneUser} from './usuario.js';
import {getOne as getOneBook} from './libro.js'

import {env} from '../config.js';
import { compareEstructure as compareObject } from '../tools/validations.js';
const uri = `${env.ssl+env.hostName}:${env.port}`
const config = {method:'',headers:{"content-type": "application/json"}};   

const endpoint = 'loans'

const validarPrestamo = (data) => {
    let dateToday = (new Date()).toISOString().slice(0,10)

    const {userId=null, bookId=null, loandate=null, returndate=null, status=null} = data;
    
    if(data.constructor.name !== 'Object' || Object.keys(data)==0) return {status: 404, message:'Porfavor envie algun dato'}
    let dateI = (new Date(dateloan))
    if(!(dateI && dateRes < dateToday)) return {status: 400, message: `El dato dateloan: '${dateloan}' no cumple con el formato`};
    let dateF = new Date(loandate);
    if(!(dateF && dateRes < dateToday)) return {status: 400, message: `El dato loandate: '${loandate}' no cumple con el formato`};
    
    if(typeof userId !== 'string') return {status: 400, message: `El dato userId: '${userId}' no cumple con el formato`};
    if(typeof bookId !== 'string') return {status: 400, message: `El dato libroId: '${bookId}' no cumple con el formato`};

    return data;
}
export const getAll = async() =>{
    config.method = 'GET'
    let res = await (await fetch(`${uri}/${endpoint}`,config)).json();
    return res;
}
export const getOne = async(id) =>{
    config.method = 'GET'
    let res = await(await fetch(`${uri}/${endpoint}/${id}`)).json();
    return res;
}
export const post = async(obj={}) =>{
    let valid = validReserva(obj);    
    if(valid.status) return valid; 
    config.method = 'POST'
    config.body = JSON.stringify(obj);
    let res = await (await fetch(`${uri}/${endpoint}`,config)).json();
    return res;
}
export const deletOne = async(id) =>{
    if(typeof id !== 'number') return {status: 400, message: `El dato autorId: '${id}' no cumple con el formato`};
    config.method = 'DELETE';
    let res = await (await fetch(`${uri}/${endpoint}/${id}`,config)).json();
    return res;
}
export const putOne = async(obj={}) =>{
    
    let valid = validReserva(obj);    
    if(valid.status) return valid;  
    const {id} = obj;
    
    if(typeof id !== 'number') return {status: 400, message: `El dato autorId: '${id}' no cumple con el formato`};
    
    let newEdit = compareObject(await getOne(id),obj);
    config.method = 'PUT';
    config.body = JSON.stringify(newEdit);
    let res = await (await fetch(`${uri}/${endpoint}/${id}`,config)).json();
    
    return res;
}
export const getRelationsShips = async() => {
    let res = await getAll();
    res = await Promise.all(res.map(async (data)=>{
        let {userId:iduser,bookId:idbook} = data;
        data.userId = await getOneUser(iduser);
        data.bookId = await getOneBook(idbook);
        return data;
    }))
    return res;
}

console.log(await getRelationsShips());