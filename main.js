const url = ""


const enviar = async (data) => {
    let config = {
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(data)
    }
    let res = await (await fetch(url+`${id}`)).json();
}

let obtenerObj = async (id) => {
    let config =  {
        method: "GET"
    }
    let res = await (await fetch(url+`${id}`)).json();
}

const actualizar =  async (id,data) =>{
    let config = {
        method:"PUT",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(data)
    }
    let res = await (await fetch(url+`${id}`)).json();
}

const deleteObj = async (id) =>{
    let config =  {
        method: "DELETE"
    }
    let res = await (await fetch(url+`${id}`)).json();
}
