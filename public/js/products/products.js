console.log('hola');


let getProducts = async() =>{

    try {
        let res = await fetch("/api/products");
        json = await res.json();
        console.log(json);
    } catch (error) {
        let message = err.statusText || "Ocurrio un error";
        divContainer.insertAdjacentHTML(
            "afterend",
            `<p><b>Error ${err.status}: ${message} </b></p>`
        );
    }
}




getProducts();
