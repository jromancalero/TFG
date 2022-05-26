
let section_carrito = document.querySelector('#section__carrito');

const listarCarrito= async()=>{

    let respOrderLines = await fetch('api/orderLines');
    let orderLines = await respOrderLines.json();
    console.log(orderLines);
    let num_carrito = document.querySelector('#num_carrito');
    num_carrito.textContent = orderLines.length;
    let precioFinal = 0;

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

        console.log(producto);
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
        precio.textContent = producto.price;
        precioTotalProducto.textContent = producto.price * line.quantity;
        botonEliminar.textContent = 'Eliminar';
        cantidad.textContent = line.quantity;

        //clases
        articuloProducto.className="articulo__producto--carrito";
        img.className="img_producto--carrito";
        divNomStock.className = "div__nombreStock--carrito";
        stock.className = "stock__producto--carrito";
        divBotonCantidad.className = "div__botonCantidad--carrito";
        precio.className = "precio__producto--carrito";
        precioTotalProducto.className = "precioFinal__producto--carrito";
        botonEliminar.className ="boton__borrarProducto--carrito";

        divNomStock.append(nombre,stock);
        divBotonCantidad.append(menos,cantidad,mas);
        articuloProducto.append(img,divNomStock,divBotonCantidad,precio,precioTotalProducto,botonEliminar);
        section_carrito.append(articuloProducto);
    });

}

listarCarrito();
