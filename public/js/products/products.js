
//Variables para los contenedores padres

let link_inicio = document.querySelector('#inicio');
let links = document.querySelectorAll('.link');
let products_container = document.querySelector('#section__products');
let main = document.querySelector('main');

//Llamada fetch para los productos
let getProducts = async() =>{

    try {
        let res = await fetch("/api/products");
        let products = await res.json();

        let res2 = await fetch("/api/images");
        let images = await res2.json();

        //EVENTO CLICK PARA CAMBIAR LAS VISTAS DE LOS PRODUCTOS
        for(let link of links){
            link.addEventListener('click',(e)=>{
                let valorLink = e.target.attributes.value.textContent;
                console.log(valorLink);
                products_container.innerHTML="";
                main.innerHTML="";
                let titulo = document.createElement('h1');
                titulo.className = "titulo";
                titulo.textContent = valorLink.toUpperCase();
                if(valorLink === 'figuras'){
                    valorLink = 'figura';
                }
                products.forEach(product => {
                    console.log(product.type);
                    console.log(valorLink.toLowerCase());
                    if(product.type === valorLink.toLowerCase()){
                        //Creación de los contenedores
                        let article_product = document.createElement('article');
                        let url = "";
                        let titulo_product = document.createElement('h2');
                        let image = document.createElement('img');
                        let descripcion = document.createElement('p');
                        let price = document.createElement('p');
                        let boton_compra = document.createElement('button');
                        //Creación del textContent de los productos
                        titulo_product.textContent = product.name;
                        descripcion.textContent = product.description;
                        price.textContent = product.price;
                        boton_compra.textContent = 'Añadir a la cesta';
                        //BUCLE DEL JSON PARA LAS URL'S
                        images.forEach(image => {
                            if(image.product_id === product.id){
                                url = image.url
                            }
                        });
                        //Añadir las clases
                        article_product.className ="article__products re__animation";
                        image.className="img__product";
                        titulo_product.className="h2__titulo_producto";
                        descripcion.className="p__description";
                        price.className="p__price";
                        boton_compra.className="boton__compra animacion";
                        //Valores extras
                        image.alt=product.name;
                        image.src = url;
                        boton_compra.value = product.id;
                        //Inserción de elementos dentro de los contenedores
                        article_product.append(image,titulo_product,descripcion,price,boton_compra);
                        products_container.append(article_product);
                    }
                });
                main.append(titulo,products_container);
            });
        }
        //DATOS NECESARIOS PARA EL INICIO
        let arrayFiguras = [];
        let arrayMerchandising = [];
        let arrayComida = [];
        products.forEach(product => {
            if(product.type === 'merchandising'){
                arrayMerchandising.push(product);
            }else if(product.type === 'figura'){
                arrayFiguras.push(product);
            }else{
                arrayComida.push(product);
            }
        });

        //EVENTO PARA EL INICIO
        link_inicio.addEventListener('click',(e)=>{
            let valorLink = e.target.attributes.value.textContent;
            console.log(valorLink);
            let titulo = document.createElement('h1');
            titulo.className = "titulo";
            titulo.textContent = valorLink;
            let arrayProducto = [];
            products_container.innerHTML="";
            main.innerHTML="";

            //bucle para que inserte los 3 tipos de productos en la tienda.
            for(let i = 0; i < 3; i++){
                let arrayRandom = [];
                for(let j = 0; j < 4; j++){
                    if(i === 0)arrayProducto = arrayFiguras;
                    if(i === 1)arrayProducto = arrayComida;
                    if(i === 2)arrayProducto = arrayMerchandising;

                    //Para imprimir 4 productos random de una misma categoria
                    let numeroRandom = 0;
                    let salir = true;
                    do{
                        numeroRandom = Math.floor(Math.random() * 18);
                        if(arrayRandom.includes(numeroRandom)){
                            salir = false;
                        }else{
                            salir = true;
                            arrayRandom.push(numeroRandom);
                        }
                    }while(!salir);

                    //Imprimir los productos
                    let article_product = document.createElement('article');
                    let url = "";
                    let titulo_product = document.createElement('h2');
                    let image = document.createElement('img');
                    let descripcion = document.createElement('p');
                    let price = document.createElement('p');
                    let boton_compra = document.createElement('button');
                    //Creación del textContent de los productos
                    console.log(numeroRandom);
                    console.log(arrayProducto[numeroRandom].name);
                    titulo_product.textContent = arrayProducto[numeroRandom].name;
                    descripcion.textContent = arrayProducto[numeroRandom].description;
                    price.textContent = arrayProducto[numeroRandom].price;
                    boton_compra.textContent = 'Añadir a la cesta';
                    //BUCLE DEL JSON PARA LAS URL'S
                    images.forEach(image => {
                        if(image.product_id === arrayProducto[numeroRandom].id){
                            url = image.url
                        }
                    });
                    //Añadir las clases
                    article_product.className ="article__products re__animation";
                    image.className="img__product";
                    titulo_product.className="h2__titulo_producto";
                    descripcion.className="p__description";
                    price.className="p__price";
                    boton_compra.className="boton__compra animacion";
                    //Valores extras
                    image.alt= arrayProducto[numeroRandom].name;
                    image.src = url;
                    boton_compra.value = arrayProducto[numeroRandom].id;
                    //Inserción de elementos dentro de los contenedores
                    article_product.append(image,titulo_product,descripcion,price,boton_compra);
                    products_container.append(article_product);
                }
            }
            main.append(titulo,products_container);
        });


    } catch (error) {
        let message = err.statusText || "Ocurrio un error";
        divContainer.insertAdjacentHTML(
            "afterend",
            `<p><b>Error ${err.status}: ${message} </b></p>`
        );
    }
}

 const getImages =(id,images)  =>{
    console.log(images);
    let url = "";

}



getProducts();
