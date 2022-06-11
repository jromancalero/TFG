
let section_carrito = document.querySelector('#section__carrito');
let tokenInput = document.querySelector('[name=_token]');
let token = tokenInput.value;
let footer = document.querySelector('.section__footer');
const listarCarrito= async()=>{

    section_carrito.innerHTML="";
    try{
        let respOrderLines = await fetch('api/orderLines');
        let orderLines = await respOrderLines.json();
        console.log(orderLines);
        let orderLinesLength = orderLines.length;
        let contadorLinesLength = 0;
        let num_carrito = document.querySelector('#num_carrito');
        let numeroCarrito = 0;
        let stockTotal = true;
        let precioFinal = 0;
        let listaProductos = [];


       console.log(orderLines.length)
       if(orderLines.length === 0){
            let articleImg = document.createElement('article')
            let img = document.createElement('img');

            articleImg.className = 'article_img--rex';
            img.className = 'img_rex';
            img.src="/img/carrito/rexCompra.png";

            articleImg.append(img);
            section_carrito.append(articleImg);
            section_carrito.style="background-Color: white;"
            footer.style="margin-top:0px"
        }

        orderLines.forEach(linea =>{
            numeroCarrito = numeroCarrito + linea.quantity;
        });
        num_carrito.textContent = numeroCarrito;

        //creación de las líneas de pedido
        orderLines.forEach( async line => {
            console.log(line);
            let product_id = line.product_id;
            //Llamada para recopilar cada producto
            let resProducto = await fetch(`/api/products/${product_id}`);
            let producto = await resProducto.json();

            let res2 = await fetch("/api/images");
            let images = await res2.json();
            //BUCLE DEL JSON PARA LAS URL'S
            images.forEach(image => {
                if(image.product_id === producto.id){
                    url = image.url;
                }
            });

            let articuloProducto = document.createElement('article');
            let img = document.createElement('img');
            let divNomStock = document.createElement('div');
            let nombre = document.createElement('h2');
            let stock = document.createElement('p');
            let divBotonCantidad = document.createElement('div');
            let mas = document.createElement('button');
            let cantidad = document.createElement('p');
            let menos = document.createElement('button');
            let precio = document.createElement('p');
            let precioTotalProducto = document.createElement('p');
            let botonEliminar = document.createElement('button');
            let  basura = document.createElement('span');
            //Insertamos el valor en cada caso

            img.src = url;
            nombre.textContent = producto.name;
            menos.textContent = '-';
            mas.textContent = '+';
            precio.textContent = `Pr/ud: ${producto.price} €`;
            precioTotalProducto.textContent = `Total: ${(producto.price * line.quantity).toFixed(2)} €`;
            basura.textContent="delete";
            stock.textContent = `STOCK : ${producto.stock}`
            cantidad.textContent = line.quantity;
            mas.value = line.id;
            menos.value = line.id;
            mas.dataset.id = line.quantity;
            menos.dataset.id = line.quantity;
            botonEliminar.value = line.id;
            //clases
            articuloProducto.className="articulo__producto--carrito";
            img.className="img_producto--carrito";
            divNomStock.className = "div__nombreStock--carrito";
            stock.className = "stock__producto--carrito";
            divBotonCantidad.className = "div__botonCantidad--carrito";
            mas.className = "boton_mas_menos";
            menos.className = "boton_mas_menos";
            precio.className = "precio__producto--carrito";
            precioTotalProducto.className = "precioFinal__producto--carrito";
            botonEliminar.className ="boton__borrarProducto--carrito";
            basura.className = "material-symbols-outlined"

            botonEliminar.append(basura);
            divNomStock.append(nombre,stock);
            divBotonCantidad.append(menos,cantidad,mas);
            articuloProducto.append(img,divNomStock,divBotonCantidad,precio,precioTotalProducto,botonEliminar);
            section_carrito.append(articuloProducto);

            precioFinal += producto.price * line.quantity;
            let precioTotalProductos = producto.price * line.quantity;
            listaProductos.push({"name":producto.name,"cantidad":line.quantity,"precio":precioTotalProductos,"id_product":producto.id,"stock":producto.stock});

            if(producto.stock < line.quantity){
                stockTotal = false;
            }

            //Funciones despues de mostrar todos los productos
            contadorLinesLength += 1;
            if(contadorLinesLength === orderLinesLength){
                precioFinal = precioFinal.toFixed(2);
                compraFinal(precioFinal,numeroCarrito,stockTotal,orderLines,listaProductos);
                eventoSumarRestar();
                borrarLineOrder();
            }

        });

    }catch(error){
        if(error){
            let articleImg = document.createElement('article')
            let img = document.createElement('img');

            articleImg.className = 'article_img--rex';
            img.className = 'img_rex';
            img.src="/img/carrito/rexCompra.png";

            articleImg.append(img);
            section_carrito.append(articleImg);
            section_carrito.style="background-Color: white;"
            footer.style="margin-top:0px"
        }
    }
}

function eventoSumarRestar(){
    let botonesCantidad = document.querySelectorAll('.boton_mas_menos');

    botonesCantidad.forEach(boton=>{
        boton.addEventListener('click',(e)=>{
            let orderLineId = e.target.value;
            let target = e.target.textContent;
            let cantidad = parseInt(e.target.dataset.id);

            if(target === '+'){
                cantidad = cantidad + 1;
            }else{
                cantidad -= 1;
            }
            if(cantidad <= 0 ){
                fetch(`/api/orderLines/${orderLineId}`, {
                    method: "DELETE",
                    mode:'cors',
                    headers: {
                        'X-CSRF-TOKEN': token,
                        'Content-Type': 'application/json',
                    },
                }).then(resp=> resp.json()).then(resp=>console.log(resp));
            }else{
                fetch(`/api/orderLines/${orderLineId}`, {
                    method: "PUT",
                    mode:'cors',
                    headers: {
                        'X-CSRF-TOKEN': token,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({"quantity": cantidad}),
                }).then(resp=> resp.json()).then(resp=>console.log(resp));
            }

            listarCarrito();
        });

    });

}

function borrarLineOrder(){
    let botonesBorrar = document.querySelectorAll('.boton__borrarProducto--carrito');

    botonesBorrar.forEach((botonBorrar)=>{
        botonBorrar.addEventListener('click',(e)=>{
            let orderLineId = e.target.value;
            fetch(`/api/orderLines/${orderLineId}`, {
                method: "DELETE",
                mode:'cors',
                headers: {
                    'X-CSRF-TOKEN': token,
                    'Content-Type': 'application/json',
                },
            }).then(resp=> resp.json()).then(resp=>console.log(resp));

            listarCarrito();
        });
    })
}

compraFinal =  async(precioFinal,numeroCarrito,stockTotal,orderLines,listaProductos)=>{

    let articuloCompraFinal = document.createElement('article');
    let botonFinalizarCompra = document.createElement('button');
    let articulosCarrito = document.createElement('p');
    let totalPrecio = document.createElement('p');

    //introducimos datos
    botonFinalizarCompra.textContent = 'Finalizar la compra';
    if(numeroCarrito === 0){articulosCarrito.textContent = `OOPS, no hoy ningún artículo en tu carrito`}
    else if(numeroCarrito === 1){articulosCarrito.textContent = `Hay ${numeroCarrito} artículo en tu carrito`}
    else{articulosCarrito.textContent = `Hay ${numeroCarrito} artículos en tu carrito`}
    totalPrecio.textContent = `Total: ${precioFinal} €`;

    //clases a los elementos
    articuloCompraFinal.className="articulo__carrito_final";
    botonFinalizarCompra.className = "boton__carrito--finalizarCompra";
    articulosCarrito.className = " articulos__carrito__final";
    totalPrecio.className = " precio__carrito--final";

    //Los metemos en la vista
    articuloCompraFinal.append(botonFinalizarCompra,articulosCarrito,totalPrecio);
    section_carrito.append(articuloCompraFinal);

  //EVENTO FINALIZAR COMPRA
    botonFinalizarCompra.addEventListener('click',async(e)=>{
        let respUser = await fetch('api/users/viewUser');
        let userAndAddress = await respUser.json();
        let user = userAndAddress[0];
        let addresses = userAndAddress[1];
        console.log(user,addresses);
        let edad = getEdad(user.date_birth);
        console.log(edad);
        let finalizaCompraBoolean = true;
        let arrayErrores = [];
        let articleFinalVentaProducto = document.createElement('article');
        articleFinalVentaProducto.className="articulo__final--venta";
        articleFinalVentaProducto.innerHTML ="";
        if(edad < 18){
            finalizaCompraBoolean = false;
            arrayErrores.push('Para comprar productos en la tienda, deberás tener al menos 18 años');
        }
        if(!stockTotal){
            finalizaCompraBoolean = false;
            arrayErrores.push('Parece que no hay stock de alguno de los productos, por favor, revisa bien tu pedido');
        }
        if(addresses.length === 0){
            finalizaCompraBoolean = false;
            arrayErrores.push('Debes tener al menos una dirección para poder finalizar la compra');
        }

        //Finalizar compra
        if(finalizaCompraBoolean){
            section_carrito.innerHTML="";
            let titulo_confirmaciónDirección = document.createElement('h1');
            titulo_confirmaciónDirección.textContent = 'Confirme una dirección para el pedido'
            titulo_confirmaciónDirección.className = "titulo_confirmación";
            let lista_direcciones = document.createElement('ul');
            lista_direcciones.className = 'lista_direcciones_carrito';

            addresses.forEach(address=>{
                let liDireccion = document.createElement('li');
                liDireccion.textContent = `Direccion: ${address.tipo} ${address.nombre}, Nº ${address.patio}, piso ${address.piso}, puerta ${address.puerta}, ${address.cp}, ${address.localidad}, ${address.pais}`;
                let botonConfirmarDireccion = document.createElement('button');
                botonConfirmarDireccion.textContent = 'Confirmar';
                botonConfirmarDireccion.value = address.id;
                botonConfirmarDireccion.className= "boton_confirmacion_direccion";
                liDireccion.append(botonConfirmarDireccion);
                lista_direcciones.append(liDireccion);
            });
            section_carrito.append(titulo_confirmaciónDirección,lista_direcciones);
            let botonesdirecciones = document.querySelectorAll('.boton_confirmacion_direccion');
            //coger el id de la order
            let resOrder = await fetch('/api/orders/cart');
            let order = await resOrder.json();
            let orderId = order[0].id;
            console.log(orderId);

            for(let botonDireccion of botonesdirecciones){
                //evento de confirmacion de la direccion y ultimos pasos para finalizar la compra
                botonDireccion.addEventListener('click', async(e)=>{
                    let addresId = e.target.value;
                    console.log(orderId,addresId);
                    section_carrito.innerHTML ="";
                    let articleVentaFinal = document.createElement('article');
                    articleVentaFinal.className="article_venta_final";
                    console.log(listaProductos);

                    let precioTotalFinal = 0;
                    let precioFinalProductos = document.createElement('p');
                    let tituloProductosPedido = document.createElement('h1');
                    precioFinalProductos.className="precioFinalVenta";
                    tituloProductosPedido.textContent="Productos Del Pedido";
                    tituloProductosPedido.className="titulos_carrito";
                    articleVentaFinal.append(tituloProductosPedido);
                    //Listar productos que van a ser comprados
                    listaProductos.forEach(producto=>{
                        precioTotalFinal += producto.precio;
                        let divProducto = document.createElement('div');
                        let tituloProducto = document.createElement('p');
                        let cantidadProducto = document.createElement('p');
                        let precioProducto = document.createElement('p');
                        //clases
                        divProducto.className= 'divProducto_final--compra';
                        tituloProducto.className = 'titulo__producto--compraFinal';
                        cantidadProducto.className = 'cantidad__producto--compraFinal';
                        precioProducto.className = 'precio__producto--compraFinal';
                        //valor a los elementos
                        tituloProducto.textContent = producto.name;
                        cantidadProducto.textContent = `Cantidad: ${producto.cantidad}`;
                        precioProducto.textContent = `Precio: ${producto.precio} €`;
                        //append
                        divProducto.append(tituloProducto,cantidadProducto,precioProducto);
                        articleVentaFinal.append(divProducto);
                    });

                    let precioEnvio = document.createElement('p');
                    let botonFinalizarPago = document.createElement('button');
                    botonFinalizarPago.textContent = 'Finalizar pago';
                    if(precioTotalFinal < 39.99){
                        let anuncio = document.createElement('p');
                        precioTotalFinal = (precioTotalFinal + 3.95).toFixed(2);
                        anuncio.textContent = 'Si el total de la compra supera los 40€, el envio será gratuito';
                        precioEnvio.textContent = 'Precio del envio: 3,95€';
                        precioFinalProductos.textContent = `Total del pedido: ${precioTotalFinal} €`;
                        articleVentaFinal.append(anuncio);
                    }else{
                        precioTotalFinal = (precioTotalFinal).toFixed(2);
                        precioEnvio.textContent = 'Precio del envio: 0€';
                        precioFinalProductos.textContent = `Total del pedido: ${precioTotalFinal} €`;
                    }
                    articleVentaFinal.append(precioEnvio,precioFinalProductos,botonFinalizarPago);
                    section_carrito.append(articleVentaFinal);

                    //FINALIZACIÓN PAGO, RESTA DE PRODUCTOS EN LA BASE DE DATOS Y CAMBIO EN EL STATUS DE ORDER
                    botonFinalizarPago.addEventListener('click', async(e)=>{
                        //Cambio de carrito
                        fetch(`api/orders/${orderId}`, {
                            method: "PUT",
                            mode:'cors',
                            headers: {
                                'X-CSRF-TOKEN': token,
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({"address_id":addresId,"final_price":precioTotalFinal}),
                        }).then(resp=> resp.json()).then(resp=>console.log(resp));

                        //Eliminando productos
                        listaProductos.forEach(async(producto)=>{
                            let stock = producto.stock - producto.cantidad;
                            console.log(stock);
                            fetch(`api/products/stock/${producto.id_product}`, {
                                method: "PUT",
                                mode:'cors',
                                headers: {
                                    'X-CSRF-TOKEN': token,
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({"stock":stock}),
                            }).then(resp=> resp.json()).then(resp=>console.log(resp));
                        });

                        //Si el producto son gacha coins, añadirselo al usuario
                        listaProductos.forEach(async(producto)=>{
                            if(producto.id_product == 62){
                                fetch('api/users/operationsCoins', {
                                    method: "PUT",
                                    mode:'cors',
                                    headers: {
                                        'X-CSRF-TOKEN': token,
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({"coin":producto.cantidad}),
                                }).then(resp=> resp.json()).then(resp=>console.log(resp));
                            }
                        });
                        let num_carrito = document.querySelector('#num_carrito');
                        num_carrito.textContent = 0;
                        setTimeout(()=>{
                            listarCarrito();
                        },6000);
                        section_carrito.innerHTML="";
                        let articleFinal = document.createElement('article');
                        articleFinal.className = "article_final";
                        let titulo_ultimo = document.createElement('h1');
                        titulo_ultimo.className="titulo_ultimo";
                        titulo_ultimo.textContent = 'Esto es una simulación del pago total por el carrito y sus productos, finalizará aquí, gracias por su compra';
                        articleFinal.append(titulo_ultimo,)
                        section_carrito.append(articleFinal);

                    });
                });
            }

        }else{
            let listaErrores = document.createElement('ul');
            listaErrores.className="lista_errores_carrito";
            for(let error of arrayErrores){
                let liError = document.createElement('li');
                liError.textContent = error;
                listaErrores.append(liError);
            }
            let titulo = document.createElement('h1');
            let subtitulo = document.createElement('h2');
            let botonCerrar = document.createElement('button');
            titulo.textContent = 'VAYA VAYA... PARACE QUE ALGO ANDA MAL...';
            subtitulo.textContent = 'Creo que deberias revisar los siguientes errores...';
            botonCerrar.textContent = 'Cerrar aviso';
            botonCerrar.className = "boton_cerrar";
            titulo.className = "titulo_error_carrito";
            subtitulo.className = "subtitulo_error_carrito";
            articleFinalVentaProducto.append(titulo,subtitulo,listaErrores,botonCerrar);
            section_carrito.append(articleFinalVentaProducto);
            let scroll = articleFinalVentaProducto.getBoundingClientRect();
            window.scrollTo(scroll.x,scroll.y);
            console.log(scroll);
            botonCerrar.addEventListener('click',e=>{
                articleFinalVentaProducto.innerHTML = "";
            });
        }
    });
}

//contar carrito
const countCarrito = async()=>{
    let num_carrito = document.querySelector('#num_carrito');
    let numeroCarrito = 0;
    let respOrderLines = await fetch('api/orderLines');
    let orderLines = await respOrderLines.json();
    console.log(orderLines)

    if(orderLines === 'error'){
        console.log('no invitado');
    }else{

        console.log(orderLines);

        orderLines.forEach(linea =>{
            numeroCarrito = numeroCarrito + linea.quantity;
        });
        num_carrito.textContent = numeroCarrito;
    }
}

//Función para saber si es mayor de edad
function getEdad(date_birth){
    let fechaNacimiento = new Date(date_birth);
    let hoy = new Date();
    let hoyCompleto = hoy.getFullYear();
    let age = hoyCompleto - fechaNacimiento.getFullYear();
    return age;
}


listarCarrito();
