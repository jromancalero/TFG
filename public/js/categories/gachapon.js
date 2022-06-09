

const ruleta = document.querySelector('#ruleta');
const infoGacha = document.querySelector('.info__gracha--container');
const botonesCantidad = document.querySelectorAll('.boton__cambio--cantidad');
const cantidadCoin = document.querySelector('.cantidad__coins--num');
const precioCoins = document.querySelector('.precio__coins');
const botonCesta = document.querySelector('.boton__compra');
const articleGacha = document.querySelector('.article__gacha');
let tokenInput = document.querySelector('[name=_token]');
let token = tokenInput.value;
let gachaCoinsPropios = document.querySelector('.gacha__coins--propios');
let section = document.querySelector('.section__gacha');
let main = document.querySelector('main');



//Evento ruleta
ruleta.addEventListener('click',async(e)=>{

    let respUserCoin = await fetch('api/users/viewUserCoin');
    let coins = await respUserCoin.json();
    console.log(coins);
    if(coins >= 1 ){
        girar();

        fetch('api/users/operationsCoins', {
            method: "PUT",
            mode:'cors',
            headers: {
                'X-CSRF-TOKEN': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"coin":-1}),
        }).then(resp=> resp.json()).then(resp=>console.log(resp));

        //Cambiar los gachas propios
        let gachacoinsNumber = parseInt(gachaCoinsPropios.textContent.split(':')[1]);
        gachacoinsNumber -= 1;
        console.log(gachaCoinsPropios.textContent = `Tus Gacha Coins: ${gachacoinsNumber}`);

    }else{
        alert('NO TIENES COINS');
    }



});

//Funcion girar ruleta
function girar(){

    let girosRandom = Math.random() * 7200;

    //sonido para la ruleta
    let sonidoRuleta = new Audio('/sonidos/sonido_ruleta.mp3');
    sonidoRuleta.play();
    console.log(sonidoRuleta);

    //Hacer que gire la ruleta
    calcular(girosRandom);


    let product_id;
    let url;
    let name;
    //Valor de los % del angulo de la ruleta para saber que objeto ha tocado

    switch(true){
        case valor > 0 && valor <= 45:
            console.log("abanico antiguo");
            name = "Abanico Japonés estilo antiguo";
            url="img/products/merchandising/AbanicoOriental.jpg";
            product_id = 23;
            break;
        case valor > 45 && valor <= 90:
            console.log('figura BAKUGO');
            name = 'Figura de Bakugo';
            url= 'img/products/figuras/bakugo.png';
            product_id = 44;
            break;
        case valor > 90 && valor <= 135:
            console.log('figura zoro');
            name = 'Figura de Zoro';
            url ="img/products/figuras/zoroOnePiece.webp";
            product_id = 61;
            break;
        case valor > 135 && valor <= 180:
            console.log('mochis sabor fresa');
            name = 'Mochis Sabor a Fresa';
            url ="img/products/comida/mochisFresa.jpg";
            product_id = 20;
            break;
        case valor > 180 && valor <= 225:
            console.log('Póster de jujutsu kaisen');
            name = 'Póster de Jujutsu kaisen';
            url="img/products/merchandising/PosterJujutsu.jpg";
            product_id = 31;
            break;
        case valor > 225 && valor <= 270:
            console.log('Taza de naruto');
            name ="Taza de Naruto";
            url ="img/products/merchandising/tazaNaruto.jpg";
            product_id = 36;
            break;
        case valor > 270 && valor <= 315:
            console.log('Pocky Fresa con Chocolate');
            name ="Pocky de Fresa con Chocolate";
            url ="img/products/comida/pockyFresaChocolate.jpg";
            product_id = 4;
            break;
        case valor > 315 && valor <= 360:
            console.log('Taza de totoro');
            name ="Taza de Totoro";
            url ="img/products/merchandising/tazaTotoro.png";
            product_id = 40;
        break;
    }


    //Creamos el "producto ganado"
    fetch('api/EarnedProducts',{
        method: "POST",
        mode:'cors',
        headers: {
            'X-CSRF-TOKEN': token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({"product_id":product_id}),
    }).then(resp=> resp.json()).then(resp=>console.log(resp));

    //Aviso del producto ganado
    setTimeout(()=>{
        //ANNUNCIO DE PREMIO
        let gif1 = document.createElement('img');
        let gif2 = document.createElement('img');
        let articleProductoGanado = document.createElement('article');
        let divProductoGanado = document.createElement('div');
        let enhorabuena = document.createElement('h1');
        let imgProducto = document.createElement('img');
        let nombreProducto = document.createElement('h2');
        let botonCerrar = document.createElement('button');
        //clases
        articleProductoGanado.className = 'article__producto--ganado';
        divProductoGanado.className = 'div__producto--ganado';
        enhorabuena.className = 'h1__producto--ganado';
        imgProducto.className = 'img__producto--ganado';
        nombreProducto.className = 'nombre__producto--ganado';
        botonCerrar.className = 'botonCerrar__producto--ganado boton__compra animacion';
        gif1.className = 'gif__producto--ganado';
        gif2.className = 'gif__producto--ganado';
        //valor a los elementos
        enhorabuena.textContent = 'ENHORABUENA!! HAS GANADO : ';
        imgProducto.src = url;
        nombreProducto.textContent = name;
        botonCerrar.textContent = '¡¡¡ YAAAAAY !!!';
        gif1.src = '/img/GIF/konosuba.gif';
        gif1.alt = 'gif Premio';
        gif2.src = '/img/GIF/konosuba.gif';
        gif2.alt = 'gif Premio';

        //appends
        divProductoGanado.append(enhorabuena,imgProducto,nombreProducto,botonCerrar);
        articleProductoGanado.append(gif1,divProductoGanado,gif2);

        section.style="opacity:0.5";
        console.log(main);
        main.append(articleProductoGanado);

        //Musica para el premio ganado
        let sonidoProductoGanador = new Audio('/sonidos/musicaProductoGanador.mp3');
        sonidoProductoGanador.play();

        //evento para cerrar el premio
        botonCerrar.addEventListener('click',e=>{

            console.log(e);
            articleProductoGanado.innerHTML = "";
            section.style="opacity:1";
            sonidoProductoGanador.pause();
        });

        let scroll = articleProductoGanado.getBoundingClientRect();
        window.scrollTo(scroll.x,scroll.y);
    },6000);

}

//Función para hacer que gire
function calcular(girosRandom){

    valor = girosRandom / 360;
    valor = (valor - parseInt(valor.toString().split('.')[0])) * 360;
    ruleta.style.transform = "rotate("+girosRandom+"deg)";
}

//función cambiar valores cantidad coins
botonesCantidad.forEach((botonCambio)=>{
    botonCambio.addEventListener('click',e=>{
        if(botonCambio.textContent === '-'){
            if(cantidadCoin.textContent == 1){
                cantidadCoin.textContent = 1;
            }else{
                cantidadCoin.textContent = parseInt(cantidadCoin.textContent) - 1;
            }
        }else{
            cantidadCoin.textContent = parseInt(cantidadCoin.textContent) + 1;
        }
        precioCoins.textContent = `Precio: ${cantidadCoin.textContent * 15} €`
    });
})





//Evento Añadir al carrito de la compra Gacha Coins

botonCesta.addEventListener('click',async(e)=>{
    console.log(e.target);

    let respProductCoin = await fetch(` api/products/${62}`);
    let coins = await respProductCoin.json();
    console.log(coins);
    let id_producto = 62;
    let cantidadCoinNum = cantidadCoin.textContent;
    console.log(cantidadCoinNum)
    if(cantidadCoinNum > coins.stock){
        alert('No puedes añadir mas productos que el stock existente');
    } else if(coins.stock > 0 ){
        createLineasDeProducto(id_producto,cantidadCoinNum);
    }else{
        alert(`No hay stock del producto ${coins.name}, sentimos las molestias`);
    }

});


//Creación lineas de pedido
const createLineasDeProducto = async(id_producto,cantidadCoinNum)=>{
    let respOrders = await fetch('api/orders/cart');
    let order = await respOrders.json();
    console.log(order);
    //si no esta registrado, aviso
    if(order === 'no registrado'){
        alert('Para añadir artículos a tu carrito, debes registrarte o estar logueado antes');
    }else{
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
        introducirProductoCarrito(order2[0].id,id_producto,cantidadCoinNum);
    }
    introducirProductoCarrito(order[0].id,id_producto,cantidadCoinNum);
    }

}

const introducirProductoCarrito= async(order,id_producto,cantidadCoinNum)=>{

    let respOrderLines = await fetch('api/orderLines');
    let orderLines = await respOrderLines.json();
    console.log(orderLines);
    let existe = false;
    let orderLineId;
    let orderLineCantidad = 0;

    //Comprobamos si existe el mismo producto para en vez de crear uno, le sumamos uno a quantity
    orderLines.forEach( async line =>{
        if(line.product_id == id_producto){
            orderLineId = line.id;
            orderLineCantidad = line.quantity + parseInt(cantidadCoinNum);
            console.log(orderLineCantidad);
            existe = true;
            console.log(existe);
        }
        console.log(line.product_id, id_producto);
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
        fetch('api/orderLines',{
            method: "POST",
            mode:'cors',
            headers: {
                'X-CSRF-TOKEN': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"quantity": parseInt(cantidadCoinNum),"order_id": order,"product_id":id_producto}),
        }).then(resp=> resp.json()).then(resp=>console.log(resp));
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
