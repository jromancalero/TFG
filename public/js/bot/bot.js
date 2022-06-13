
const mainBot = document.querySelector('main');

let articleBot = document.createElement('article');
let imgBot = document.createElement('img');
let discursoBot = document.createElement('p');
let inputPregunta = document.createElement('input');
let divImagen = document.createElement('div');
let divConsultas = document.createElement('div');

//clases
articleBot.className = "article__bot";
imgBot.className = "img__bot";
discursoBot.className ="discurso__inicial--bot";
inputPregunta.className = "input__pregunta--bot";
divImagen.className ="div__imagen--bot";
divConsultas.className = "div__consultas--bot";

//añadir contenido a los elementos
discursoBot.textContent = "Hola, soy el bot de ayuda de Gachapó, en que puedo ayudarte?";
imgBot.src = '/img/bot/bot.png'
divConsultas.style="display: none";
inputPregunta.placeholder ="Preguntas cortas y sencillas por favor ";

divConsultas.append(discursoBot,inputPregunta);
divImagen.append(imgBot);
articleBot.append(divConsultas,divImagen);
mainBot.append(articleBot);
let contador = 0;

imgBot.addEventListener('click',(e)=>{

    //Boton ha ayudado o no
    let divAyuda = document.createElement('div');
    let textoAyuda = document.createElement('p');
    let divBotonAyuda = document.createElement('div');
    let botonSi = document.createElement('button');
    let botonNo = document.createElement('button');

    //hacer aparecer las posibles preguntas para el bot
    if(divConsultas.style.display === 'none'){
        divConsultas.style="display: flex"
        articleBot.style="background-color: rgb(247, 230, 184); "
        discursoBot.textContent = "Hola, soy el bot de ayuda de Gachapó, en que puedo ayudarte?";
    }else{
        divConsultas.style="display: none"
        articleBot.style="background-color:none; "
        inputPregunta.value="";
    }

    //Boton ha ayudado o no
    textoAyuda.textContent = 'He conseguido ayudarte? ';
    botonNo.textContent = 'NO';
    botonSi.textContent = 'SI';

    divAyuda.className = 'div__ayuda--bot';
    divBotonAyuda.className = 'div__botonAyuda--bot';
    botonSi.className = 'boton__ayudaSi--bot';
    botonNo.className = 'boton__ayudaNo--bot';

    divBotonAyuda.append(botonSi,botonNo);
    divAyuda.append(textoAyuda,divBotonAyuda);

    inputPregunta.addEventListener('keypress',(e)=>{
        if(e.key === 'Enter'){
            let pregunta = inputPregunta.value;
            inputPregunta.value = "";
            let arrayPalabras = pregunta.split(" ");
            inputPregunta.style = 'display:none';

            //palabras para el bot
            let servicio, cliente, contacto,perdido,ayuda,direcciones,direccion,cambiar,datos,contraseña,productos,ganados,no,jugar,ruleta,gachapon,hola,caro,como,acuerdo,olvidado;
            let nada = true;
            //Links
            let linkContacto = document.createElement('a');
            let linkMapaWeb = document.createElement('a');
            let linkPerfil= document.createElement('a');
            let linkGachapon= document.createElement('a');

            linkContacto.textContent = 'Contacto';
            linkMapaWeb.textContent = 'Mapa Web';
            linkPerfil.textContent = 'Perfil';
            linkGachapon.textContent = 'Gachapon';

            linkContacto.href = '/contacto';
            linkMapaWeb.href = '/mapa-web';
            linkPerfil.href = '/cuenta';
            linkGachapon.href = '/gachapon';

            arrayPalabras.forEach((palabra)=>{
                switch(palabra.toLocaleLowerCase()){
                    case 'hola':
                        hola = true;
                        break;
                    case 'caro':
                        caro = true;
                        break;
                    case 'servicio':
                        servicio = true;
                        break;
                    case 'cliente':
                        cliente = true;
                        break;
                    case 'contacto':
                        contacto = true;
                        break;
                    case 'perdido':
                        perdido = true;
                        break;
                    case 'ayuda':
                        ayuda = true;
                        break;
                    case 'direcciones':
                        direcciones = true;
                        break;
                    case 'direccion':
                        direccion = true;
                        break;
                    case 'cambiar':
                        cambiar = true;
                        break;
                    case 'datos':
                        datos = true;
                        break;
                    case 'contraseña':
                        contraseña = true;
                        break;
                    case 'productos':
                        productos = true;
                        break;
                    case 'ganados':
                        ganados = true;
                        break;
                    case 'no':
                        no = true;
                        break;
                    case 'jugar':
                        jugar = true;
                        break;
                    case 'ruleta':
                        ruleta =true;
                        break;
                    case 'gachapon':
                        gachapon=true;
                        break
                    case 'como':
                        como = true;
                        break;
                    case 'acuerdo':
                        acuerdo = true;
                        break;
                    case 'olvidado':
                        olvidado = true;
                    break;
                }

                //secuencia de if para encontrar el problema del cliente
                if(hola === true){
                    discursoBot.textContent = `Hola, que deseas?`;
                    nada = false;
                    inputPregunta.style = 'display:contains';
                }
                if(caro === true){
                    discursoBot.textContent = "Pues ya puedes ir ahorrando para comprarme algo... :'V ";
                    nada = false;
                    inputPregunta.style = 'display:contains';

                }
                if(servicio === true && cliente === true){
                    discursoBot.textContent = `Si necesitas el servicio al cliente accede a la siguiente página: `;
                    discursoBot.append(linkContacto);
                    nada = false;
                    divConsultas.append(divAyuda);
                    divAyuda.style ='display:flex';
                }
                if(contacto === true){
                    discursoBot.textContent = 'Si estas buscando la página de contacto, accede al siguiente link: ';
                    discursoBot.append(linkContacto);
                    nada = false;
                    divConsultas.append(divAyuda);
                    divAyuda.style ='display:flex';
                }
                if(perdido === true){
                    discursoBot.textContent = "Vaya, parece que te has perdido, accede al siguiente enlace para saber las rutas web de la pagina: ";
                    discursoBot.append(linkMapaWeb);
                    nada = false;
                    divConsultas.append(divAyuda);
                    divAyuda.style ='display:flex';
                }
                if(ayuda === true){
                    discursoBot.textContent = "Veo que necesitas ayuda, accede al siguiente link para que podamos ayudarte: ";
                    discursoBot.append(linkContacto);
                    nada = false;
                    divConsultas.append(divAyuda);
                    divAyuda.style ='display:flex';
                }
                if(direccion === true || direcciones === true){
                    discursoBot.textContent = "Las direcciones las tienes en tu perfil (debes estar logueado), puedes modificarlas allí, sigue el siguiente enlace para acceder a ellas: ";
                    discursoBot.append(linkPerfil);
                    nada = false;
                    divConsultas.append(divAyuda);
                    divAyuda.style ='display:flex';
                }
                if(cambiar === true && direccion === true){
                    discursoBot.textContent = 'Si deseas cambiar las direcciones, puedes hacerlo desde tu perfil: ';
                    discursoBot.append(linkPerfil);
                    nada = false;
                    divConsultas.append(divAyuda);
                    divAyuda.style ='display:flex';
                }
                if(cambiar === true && datos === true){
                    discursoBot.textContent = 'Si deseas cambiar tus datos personales, puedes hacerlo desde tu perfil: ';
                    discursoBot.append(linkPerfil);
                    nada = false;
                    divConsultas.append(divAyuda);
                    divAyuda.style ='display:flex';
                }
                if(cambiar === true && contraseña === true){
                    discursoBot.textContent = 'Si deseas cambiar tu contraseña, puedes hacerlo desde tu perfil: ';
                    discursoBot.append(linkPerfil);
                    nada = false;
                    divConsultas.append(divAyuda);
                    divAyuda.style ='display:flex';
                }
                if(perdido === true && contraseña === true || acuerdo === true && contraseña === true || olvidado === true && contraseña === true){
                    discursoBot.textContent = 'Si no te acuerdas de tu contraseña, envia un correo a nuestro contacto y te ayudaremos lo antes posible: ';
                    discursoBot.append(linkContacto);
                    nada = false;
                    divConsultas.append(divAyuda);
                    divAyuda.style ='display:flex';
                }
                if(productos === true && ganados === true){
                    discursoBot.textContent = 'Los productos ganados son los productos que se obtienen a través de el gachapón, aquí puedes conseguirlos: ';
                    discursoBot.append(linkGachapon);
                    nada = false;
                    divConsultas.append(divAyuda);
                    divAyuda.style ='display:flex';
                }
                if(no === true && jugar === true && ruleta === true || no === true && jugar === true && gachapon === true || como === true && jugar === true && ruleta === true || como === true && jugar === true && gachapon === true){
                    discursoBot.textContent = 'Para jugar al gachapon (ruleta), deberás estar registrado, comprar un GachaCoin y pulsar encima de la ruleta, el premio se guardará en el apartado de Productos Ganados en el perfil';
                    nada = false;
                    divConsultas.append(divAyuda);
                    divAyuda.style ='display:flex';
                }
                if(nada === true){
                    discursoBot.textContent= 'Lo siento, no te he entendido, podrias ser más específico ?';
                    inputPregunta.style = 'display:content';
                }
            });
            botonSi.addEventListener('click',(e)=>{
                divAyuda.style ='display:none'
                let gracias = document.createElement('p');
                gracias.textContent = 'Gracias por confiar en mi :D';
                divConsultas.append(gracias);
                setTimeout(()=>{
                    gracias.innerHTML ="";
                },3000);
            });
            botonNo.addEventListener('click',(e)=>{
                divAyuda.style ='display:none'
                inputPregunta.style = 'display:content';
                discursoBot.textContent = "Lo sentimos, podria reformular la pregunta? Gracias";
            });

        }
    })
});

