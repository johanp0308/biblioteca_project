
const fillTable = (tabla, res) =>{
    res.forEach(element => {
        let tr =`
        <tr>
            <td>${element.isbn}</td>
            <td>${element.title}</td>
            <td>${element.releasedate}</td>
            <td>${element.categoryId.name}</td>
            <td>${element.publisherId.name}</td>
            <td>${element.releasedate}</td>
            <td>${element.pagenum}</td>
            <td>${element.statusId.name}</td>
        </tr>
        `;
        tabla.insertAdjacentHTML("beforeend",tr);  
    });
}


export default{
    fillTable
}