let products_container = document.querySelector('#section__products');
let main = document.querySelector('main');
let tokenInput = document.querySelector('[name=_token]');
let token = tokenInput.value;


const listar = async()=>{

    let res = await fetch("/api/products");
    let products = await res.json();

    let res2 = await fetch("/api/images");
    let images = await res2.json();

    //EVENTO CLICK PARA CAMBIAR LAS VISTAS DE LOS PRODUCTOS
    products_container.innerHTML="";
    let titulo = document.createElement('h1');
    titulo.className = "titulo";
    titulo.textContent = 'COMIDA JAPONESA'

    products.forEach(product => {
        if(product.type === 'comida'){
            //Creación de los contenedores
            let article_product = document.createElement('article');
            let url = "";
            let id_image = "";
            let titulo_product = document.createElement('h2');
            let image = document.createElement('img');
            let descripcion = document.createElement('p');
            let price = document.createElement('p');
            let boton_compra = document.createElement('button');
            //Creación del textContent de los productos
            titulo_product.textContent = product.name;
            descripcion.textContent = product.description;
            price.textContent = product.price + '€';
            boton_compra.textContent = 'Añadir a la cesta';
            //BUCLE DEL JSON PARA LAS URL'S
            images.forEach(image => {
                if(image.product_id === product.id){
                    url = image.url;
                    id_image = image.id;
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
            image.dataset.url = product.id;
            image.dataset.id = id_image;
            //Inserción de elementos dentro de los contenedores
            article_product.append(image,titulo_product,descripcion,price,boton_compra);
            products_container.append(article_product);
        }
    });
    main.append(titulo,products_container);
    showProduct();
    carritoCompra();
}
//Mostrar un único producto
showProduct = ()=>{
    let imagenes_productos = document.querySelectorAll('.img__product');
    //console.log(imagenes_productos);
    for(let link_image of imagenes_productos){
        link_image.addEventListener('click',(e)=>{
            console.log(e.target)
            let id_image = e.target.dataset.id;
            let id_link = e.target.dataset.url;

            productView(id_image,id_link);

        });
    }
}

const productView = async(id_image,id_link) =>{
    let res3 = await fetch(`/api/products/${id_link}`);
    let producto = await res3.json();
    console.log(producto);
    products_container.innerHTML="";
    main.innerHTML="";

    let section = document.createElement('section');
    let articleCompra = document.createElement('article');
    let sectionIzquierda = document.createElement('section');
    let sectionDerecha = document.createElement('section');
    let articleComentarios = document.createElement('div');
    let articleExtra = document.createElement('article');
    let botonVolverProductos = document.createElement('button');

    let img = document.createElement('img');
    let titulo_producto = document.createElement('h1');
    let botonMas = document.createElement('button');
    let botonMenos = document.createElement('button');
    let precio = document.createElement('p');
    let cantidad = document.createElement('p');
    let stock = document.createElement('p');
    let botonCompra = document.createElement('button');
    let contenedorCantidad = document.createElement('div');
    let comentarios = document.createElement('p');

    let resp4 = await fetch(`/api/images/${id_image}`);
    let image = await resp4.json();
    console.log(image);

    //Creación del textContent de los productos
    titulo_producto.textContent = producto.name;
    botonMas.textContent = '+';
    botonMenos.textContent = '-';
    precio.textContent = `Precio : ${producto.price}`;
    cantidad.textContent = 1;
    stock.textContent = `Stock acutal del producto :  ${producto.stock}`
    botonCompra.textContent = 'Añadir al carrito';
    botonCompra.value = producto.id;
    comentarios.textContent= 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
    botonVolverProductos.textContent = "VOLVER A LOS COMIDAS JAPONESAS";

    //Valores extras
    img.src = image.url;

    //Clases de los elementos
    section.className="section_product";
    sectionDerecha.className="section_derecha";
    sectionIzquierda.className="section_izquierda";
    articleCompra.className="article_compra";
    articleComentarios.className="article_comentarios";
    articleExtra.className="article_Extra";
    img.className="img_individual_product";
    contenedorCantidad.className="contenedor_cantidad";
    botonMas.className="boton_mas";
    botonMenos.className="boton_menos";
    botonCompra.className="boton__compra animacion"

    //Inserción html
    contenedorCantidad.append(botonMenos,cantidad,botonMas);
    articleCompra.append(titulo_producto,precio,stock,contenedorCantidad,botonCompra)
    articleComentarios.append(comentarios);
    sectionIzquierda.append(img,articleComentarios);
    sectionDerecha.append(articleCompra,articleExtra);
    section.append(sectionIzquierda,sectionDerecha,botonVolverProductos);
    main.append(section);


    //Volver a productos
    botonVolverProductos.addEventListener('click',(e)=>{
        console.log(e);
        listar();
    });

    //AÑADIR AL CARRITO DE LA COMPRA DENTRO DE LA VISTA DE LOS PRODUCTOS INDIVIDUALES
    carritoCompra();

}

//Evento Añadir al carrito de la compra
const carritoCompra= async()=>{

    let botonesCesta = document.querySelectorAll('.boton__compra');
    botonesCesta.forEach((botonCesta)=>{
        botonCesta.addEventListener('click',(e)=>{
            console.log(e.target.value);
            //Creación lineas de pedido
            createLineasDeProducto();
        });
    });
}

const createLineasDeProducto = async()=>{
    let respOrders = await fetch(' api/orders/cart');
    let order = await respOrders.json();
    console.log(order);
    //SI NO TIENE CARRITO SE LO CREAMOS
    if(order.length === 0){
        fetch("/api/orders", {
            method: "POST",
            mode:'cors',
            headers: {
                'X-CSRF-TOKEN': token,
                'Content-Type': 'application/json',
            },
        });
    }


}

listar();
