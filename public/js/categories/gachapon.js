
const ruleta = document.querySelector('#ruleta');
const infoGacha = document.querySelector('.info__gracha--container');
//Evento ruleta
ruleta.addEventListener('click',girar);

//Funcion girar ruleta
function girar(){

    let girosRandom = Math.random() * 7200;

    //Hacer que gire la ruleta
    calcular(girosRandom);

    //sonido para la ruleta
    let sonidoRuleta = new Audio('/sonidos/sonido_ruleta.mp3');
    sonidoRuleta.play();
    console.log(sonidoRuleta);

    setTimeout(()=>{
        switch(true){
            case valor > 0 && valor <= 45:
                console.log("abanico");
                break;
            case valor > 45 && valor <= 90:
                console.log('figura BAKUGO');
                break;
            case valor > 90 && valor <= 135:
                console.log('figura zoro');
                break;
            case valor > 135 && valor <= 180:
                console.log('mochis sabor fresa');
                break;
            case valor > 180 && valor <= 225:
                console.log('Póster de jujutsu kaisen');
                break;
            case valor > 225 && valor <= 270:
                console.log('Taza de naruto');
                break;
            case valor > 270 && valor <= 315:
                console.log('Pocky Fresa con Chocolate');
                break;
            case valor > 315 && valor <= 360:
                console.log('Taza de totoro');
                break;
        }
    },5000);
}

//Función para hacer que gire
function calcular(girosRandom){

    valor = girosRandom / 360;
    valor = (valor - parseInt(valor.toString().split('.')[0])) * 360;
    ruleta.style.transform = "rotate("+girosRandom+"deg)";
}
