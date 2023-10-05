
export const compareEstructure = (obj,newObj)=>{
    Object.keys(obj).forEach(keys => {
        if(newObj.hasOwnProperty(keys) === obj.hasOwnProperty(keys)){
            obj[keys] = newObj[keys];
        }  
    });
    return obj;
}

