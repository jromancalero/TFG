
let section_carrito = document.querySelector('#section__carrito');
let tokenInput = document.querySelector('[name=_token]');
let token = tokenInput.value;

const listarCarrito= async()=>{

    section_carrito.innerHTML="";

    let respOrderLines = await fetch('api/orderLines');
    let orderLines = await respOrderLines.json();
    console.log(orderLines);
    let orderLinesLength = orderLines.length;
    let contadorLinesLength = 0;
    let num_carrito = document.querySelector('#num_carrito');
    let numeroCarrito = 0;
    let stockTotal = 0;
    let precioFinal = 0;

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

        //Insertamos el valor en cada caso

        img.src = url;
        nombre.textContent = producto.name;
        menos.textContent = '-';
        mas.textContent = '+';
        precio.textContent = `Pr/ud: ${producto.price} €`;
        precioTotalProducto.textContent = `Total: ${(producto.price * line.quantity).toFixed(2)} €`;
        botonEliminar.textContent = 'Eliminar';
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

        divNomStock.append(nombre,stock);
        divBotonCantidad.append(menos,cantidad,mas);
        articuloProducto.append(img,divNomStock,divBotonCantidad,precio,precioTotalProducto,botonEliminar);
        section_carrito.append(articuloProducto);

        precioFinal += producto.price * line.quantity;
        stockTotal += producto.stock;

        //Funciones despues de mostrar todos los productos
        contadorLinesLength += 1;
        if(contadorLinesLength === orderLinesLength){
            compraFinal(precioFinal,numeroCarrito,stockTotal,orderLines);
            eventoSumarRestar();
            borrarLineOrder();
        }

    });


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

compraFinal =  async(precioFinal,numeroCarrito,stockTotal,orderLines)=>{

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

  //llamada user para ver si tiene direcciones y demás
    botonFinalizarCompra.addEventListener('click',(e)=>{
        let anuncio = document.createElement('article');
        if(stockTotal<numeroCarrito){

        }else{

        }
    });
}




listarCarrito();
