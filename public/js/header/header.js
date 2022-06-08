
const countTheCarrito = async()=>{

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

countTheCarrito();
