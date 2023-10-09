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
const data = d.querySelector("#data");

/* DOMLoader */

d.addEventListener("DOMContentLoaded",async(e)=>{
    const endpoint = window.location.href;
    const path = window.location.pathname;
    
    // if()
    
    if(path==='/views/books.html'){
        const tempTabla = d.querySelector("#tabla");
        const imported = d.importNode(tempTabla.content, true);
        console.log(data);
        // data.appendChild(imported);
        if(dataBook){
            let res = await getAllBooks();
            domMg.fillTable(dataBook,res)
        }
    }

    /* Loaded Table */
});


/* Event Delegator */
d.addEventListener("click",(e)=>{
    
});

window.addEventListener("pos",(e)=>{

});