/* Imports */
import {getRelationShips as getAllBooks} from './storage/libro.js' 
import domMg from './tools/domfun.js'

/* Constantes */
const routes ={
    "/":"/views/index.html",
    "/books":"/views/index.html"
}

/* Elements DOM */
const d = document
const dataBook = d.querySelector("#data-book");
const data = d.querySelector("#data")

/* DOMLoader */

document.addEventListener("DOMContentLoaded",async(e)=>{
    const endpoint = window.location.href;
    const path = window.location.pathname;
    // console.log(endpoint,path);
    

    /* Loaded Table */
    if(dataBook){
        let res = await getAllBooks();
        domMg.fillTable(dataBook,res)
    }

});


/* Event Delegator */
document.addEventListener("click",(e)=>{

});

window.addEventListener("popstate",(e)=>{
    console.log(e)
})