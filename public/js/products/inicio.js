
let products_container = document.querySelector('#section__products');
let main = document.querySelector('main');
let tokenInput = document.querySelector('[name=_token]');
let token = tokenInput.value;


const listar = async()=>{

    products_container.innerHTML="";
    main.innerHTML="";

    let res = await fetch("/api/products");
    let products = await res.json();

    let res2 = await fetch("/api/images");
    let images = await res2.json();

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

    let titulo = document.createElement('h1');
    titulo.className = "titulo";
    titulo.textContent = 'PRODUCTOS';
    let arrayProducto = [];
    /* products_container.innerHTML="";
    main.innerHTML=""; */

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
            let id_image = "";
            let titulo_product = document.createElement('h2');
            let image = document.createElement('img');
            let descripcion = document.createElement('p');
            let price = document.createElement('p');
            let boton_compra = document.createElement('button');
            //Creación del textContent de los productos
            titulo_product.textContent = arrayProducto[numeroRandom].name;
            descripcion.textContent = arrayProducto[numeroRandom].description;
            price.textContent = arrayProducto[numeroRandom].price +'€';
            boton_compra.textContent = 'Añadir a la cesta';
            //BUCLE DEL JSON PARA LAS URL'S
            images.forEach(image => {
                if(image.product_id === arrayProducto[numeroRandom].id){
                    url = image.url
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
            image.alt= arrayProducto[numeroRandom].name;
            image.src = url;
            image.dataset.url = arrayProducto[numeroRandom].id;
            image.dataset.id = id_image;
            boton_compra.value = arrayProducto[numeroRandom].id;
            //Inserción de elementos dentro de los contenedores
            article_product.append(image,titulo_product,descripcion,price,boton_compra);
            products_container.append(article_product);
        }
    }
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
    botonCompra.dataset.stock = producto.stock;
    comentarios.textContent= 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
    botonVolverProductos.textContent = "VOLVER A LOS PRODUCTOS";

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
    cantidad.className="cantidad_producto--inidividual"
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

    let modo = 'individual';
    botonMas.addEventListener('click',(e)=>{
        let cantidadTotal = parseInt(cantidad.textContent) + 1;
        cantidad.textContent =cantidadTotal;
    });
    botonMenos.addEventListener('click',(e)=>{
        if(cantidad.textContent == 0){

        }else{
            let cantidadTotal = parseInt(cantidad.textContent) - 1;
            cantidad.textContent = cantidadTotal;
        }

    });
    //AÑADIR AL CARRITO DE LA COMPRA DENTRO DE LA VISTA DE LOS PRODUCTOS INDIVIDUALES
    carritoCompra(modo,);
}

//Evento Añadir al carrito de la compra
const carritoCompra=(modo,)=>{
    console.log(modo);
    let botonesCesta = document.querySelectorAll('.boton__compra');
    botonesCesta.forEach((botonCesta)=>{
        botonCesta.addEventListener('click',async(e)=>{
            id_producto = e.target.value;
            let respProducts = await fetch(`api/products/${id_producto}`);
            let producto = await respProducts.json();
            console.log(e.target.value);

            if(modo === 'individual'){
                let cantidadTot = document.querySelector('.cantidad_producto--inidividual');
                let cantidad = cantidadTot.textContent;
                console.log(cantidad,producto.stock);
                if(cantidad > producto.stock){
                    alert('No puedes añadir mas productos que el stock existente');
                }else{
                    createLineasDeProducto(id_producto,modo,cantidad);
                }
            }else{
                if(producto.stock > 0 ){
                    createLineasDeProducto(id_producto,modo);
                }else{
                    alert(`No hay stock del producto ${producto.name}, sentimos las molestias`);
                }
            }
        });
    });
}
            //Creación lineas de pedido
const createLineasDeProducto = async(id_producto,modo,cantidad)=>{
    console.log(id_producto);
    let respOrders = await fetch('api/orders/cart');
    let order = await respOrders.json();
    console.log(order);
    //SI NO TIENE CARRITO SE LO CREAMOS Y AÑADIMOS PRODUCTO DIRECTAMENTE
    if(order.length === 0){
        fetch("/api/orders", {
            method: "POST",
            mode:'cors',
            headers: {
                'X-CSRF-TOKEN': token,
                'Content-Type': 'application/json',
            },
        });
        let respOrders2 = await fetch('api/orders/cart');
        let order2 = await respOrders2.json();
        console.log(order2);
        introducirProductoCarrito(order2[0].id,id_producto,modo,cantidad);
    }
    introducirProductoCarrito(order[0].id,id_producto,modo,cantidad);
}

const introducirProductoCarrito= async(order,id_producto,modo,cantidad)=>{

    let respOrderLines = await fetch('api/orderLines');
    let orderLines = await respOrderLines.json();
    console.log(orderLines);
    let existe = false;
    let orderLineId;
    let orderLineCantidad = 0;
    console.log(modo);
    //Comprobamos si existe el mismo producto para en vez de crear uno, le sumamos uno a quantity
    orderLines.forEach( async line =>{
        if(line.product_id == id_producto & modo === undefined){
            orderLineId = line.id;
            orderLineCantidad = line.quantity + 1;
            console.log(orderLineCantidad);
            existe = true;
            console.log(existe);
        }
        console.log(line.product_id, id_producto);
        console.log(modo);
        if(line.product_id == id_producto & modo === 'individual'){
            console.log(cantidadProductoIndividual);
            orderLineId = line.id;
            orderLineCantidad = line.quantity + parseInt(cantidad);
            console.log(orderLineCantidad);
            existe = true;
            console.log(existe);
        }
    });
    if(existe){
        fetch(`/api/orderLines/${orderLineId}`, {
            method: "PUT",
            mode:'cors',
            headers: {
                'X-CSRF-TOKEN': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"quantity": orderLineCantidad}),
        }).then(resp=> resp.json()).then(resp=>console.log(resp));
    }else{
        if(modo === 'individual'){
            orderLineCantidad = parseInt(cantidad);
            console.log(orderLineCantidad);
            fetch('api/orderLines',{
                method: "POST",
                mode:'cors',
                headers: {
                    'X-CSRF-TOKEN': token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"quantity": orderLineCantidad,"order_id": order,"product_id":id_producto}),
            }).then(resp=> resp.json()).then(resp=>console.log(resp));
        }else{
            fetch('api/orderLines',{
                method: "POST",
                mode:'cors',
                headers: {
                    'X-CSRF-TOKEN': token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"quantity": 1,"order_id": order,"product_id":id_producto}),
            }).then(resp=> resp.json()).then(resp=>console.log(resp));
        }
    }
    countCarrito();
}

const countCarrito = async()=>{

    let respOrderLines = await fetch('api/orderLines');
    let orderLines = await respOrderLines.json();
    console.log(orderLines)
    if(orderLines === 'error'){
        console.log('no invitado');
    }else{
        console.log(orderLines);
        let num_carrito = document.querySelector('#num_carrito');
        let numeroCarrito = 0;
        orderLines.forEach(linea =>{
            numeroCarrito = numeroCarrito + linea.quantity;
        });
        num_carrito.textContent = numeroCarrito;
    }

}

countCarrito();
listar();


