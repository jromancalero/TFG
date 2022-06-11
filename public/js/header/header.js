
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

/* RESPONSIVE */

let listaNav = document.querySelector('.invisible');
let hamburguesa = document.querySelector('.material-symbols-outlined');
let nav = document.querySelector('nav');
let headerUsuariCarrito = document.querySelector('.header__usuario');
let botonMenu = document.querySelector('.boton__menu');

console.log(listaNav);
let contadorHamburguesa = 0;

hamburguesa.addEventListener('click',(e)=>{
    console.log(contadorHamburguesa)
    if(contadorHamburguesa === 0){
        listaNav.style= 'display:flex;';
        nav.style= 'align-items: flex-start; max-height: 100%;';
        headerUsuariCarrito.style = 'margin-top: 0px';
        hamburguesa.animate([
            {transform: 'rotate (90deg)'},
        ],{
            duration:1000,
            fill:'forwards',
        });
        contadorHamburguesa = 1;
    }else if(contadorHamburguesa === 1){
        listaNav.style= 'display:none;';
        nav.style= 'align-items: center;';
        headerUsuariCarrito.style = 'margin-top: 17.600px';
        contadorHamburguesa = 0;
    }
});
