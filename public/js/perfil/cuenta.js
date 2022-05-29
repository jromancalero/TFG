

let tokenInput = document.querySelector('[name=_token]');
let token = tokenInput.value;
let sectionPerfil = document.querySelector('#section__cuenta');
let articleUser = document.querySelector('#article__user');

listarUsuario = async()=>{
    articleUser.innerHTML = "";
    let respUser = await fetch('api/users/viewUser');
    let userAndAddress = await respUser.json();
    let user = userAndAddress[0];
    let addresses = userAndAddress[1];
    console.log(addresses, user);

    let listaUser = document.createElement('ul');

    let nombreCompleto = document.createElement('h1');
    let liNombreUsuario= document.createElement('li');
    let liEmail = document.createElement('li');
    let liTelefono= document.createElement('li');
    let liDNI = document.createElement('li');
    let liFechaNacimiento = document.createElement('li');
    let liDireccionesEnvio = document.createElement('li');
    let ulDireccionesEnvio = document.createElement('ul');
    let liAñadirEliminarDirecciones = document.createElement('li');
    let liCambiarDatos = document.createElement('li');
    let liPedidos = document.createElement('li');
    let liCambiarConstraseña = document.createElement('li');

    //metemos datos a los li
    nombreCompleto.textContent = `${user.name} ${user.surname} ${user.surname2}`;
    liNombreUsuario.textContent = `Nombre de usuario: ${user.user_name}`;
    liEmail.textContent = `Email: ${user.email}`;
    liTelefono.textContent = `Teléfono: ${user.phone}`;
    liDNI.textContent = `DNI: ${user.dni}`;
    liFechaNacimiento.textContent = `Fecha Nacimiento : ${user.date_birth}`;
    liDireccionesEnvio.textContent = 'Direcciones de envio: ';
    liAñadirEliminarDirecciones.textContent = "Añadir o eliminar direcciones";
    for(let address of addresses){
        let direccionEnvio = document.createElement('li');
        direccionEnvio.className = "direccionesEnvio__perfil";
        direccionEnvio.textContent = `Direccion: ${address.tipo} ${address.nombre}, Nº ${address.patio}, piso ${address.piso}, puerta ${address.puerta}, ${address.cp}, ${address.localidad}, ${address.pais}  `;
        ulDireccionesEnvio.append(direccionEnvio);
    }
    liDireccionesEnvio.append(ulDireccionesEnvio,liAñadirEliminarDirecciones);
    liPedidos.textContent = "Pedidos realizados";
    liCambiarConstraseña.textContent = "Cambiar la contraseña";
    liCambiarDatos.textContent = 'Cambiar datos'
    //clases
    listaUser.className ="lista_cuenta";
    nombreCompleto.className ="nombre_cuenta";
    liPedidos.className = "pedidos__perfil";
    liCambiarConstraseña.className = "cambiarContraseña__perfil";
    ulDireccionesEnvio.className = "ul__direccionesEnvio";
    liCambiarDatos.className = 'cambiar_datos';
    liAñadirEliminarDirecciones.className="li__AñadirEliminar--Direcciones"

    //introducimos los datos a la vista
    listaUser.append(liNombreUsuario,liEmail,liTelefono,liDNI,liFechaNacimiento,liDireccionesEnvio,liCambiarDatos,liPedidos,liCambiarConstraseña);
    articleUser.append(nombreCompleto,listaUser);

    eventosPerfil(user,addresses,liCambiarDatos,liPedidos,liCambiarConstraseña,liAñadirEliminarDirecciones);
}
//eventos click personalización de usuario
const eventosPerfil=(user,addresses,liCambiarDatos,liPedidos,liCambiarConstraseña,liAñadirEliminarDirecciones)=>{
    let botonConfirmar = document.createElement('button');
    botonConfirmar.textContent = 'CONFIRMAR';
    let botonAtras = document.createElement('button');
    botonAtras.textContent = 'VOLVER ATRÁS';
    let divBotones = document.createElement('div');
    divBotones.append(botonAtras,botonConfirmar);
    divBotones.className="botones__perfil--volverConfirmar";

    //MODIFICAR DATOS DEL USUARIO
    liCambiarDatos.addEventListener('click',(e)=>{
        articleUser.innerHTML = "";

        let titulo = document.createElement('h1');
        let divDatos = document.createElement('div');
        let inputNombre = document.createElement('input');
        let inputApellido= document.createElement('input');
        let inputApellido2 = document.createElement('input');
        let inputNombreUsuario= document.createElement('input');
        let inputTelefono= document.createElement('input');
        let inputDNI = document.createElement('input');
        let inputFechaNacimiento = document.createElement('input');

        let labelNombre = document.createElement('label');
        let labelApellido = document.createElement('label');
        let labelApellido2 = document.createElement('label');
        let labelUsuario = document.createElement('label');
        let labelTelefono = document.createElement('label');
        let labelDNI = document.createElement('label');
        let labelFechaNacimiento = document.createElement('label');
        //damos valor del usuario
        inputNombre.value = user.name;
        inputApellido.value = user.surname;
        inputApellido2.value = user.surname2;
        inputNombreUsuario.value = user.user_name;
        inputTelefono.value = user.phone;
        inputDNI.value = user.dni;
        inputFechaNacimiento.value = user.date_birth;

        labelNombre.textContent ="Nombre: ";
        labelApellido.textContent ="Apellido: ";
        labelApellido2.textContent ="Segundo Apellido: ";
        labelUsuario.textContent = "Nombre Usuario: ";
        labelTelefono.textContent = "Telefono: ";
        labelDNI.textContent = 'DNI: ';
        labelFechaNacimiento.textContent = "Fecha Nacimiento: ";
        titulo.textContent= "Modificar datos personales";

        //clases
        divDatos.className = "div__datos--perfil"
        titulo.className = "titulo__modificar--datos";
        //Valores extra
        inputFechaNacimiento.type = "date";
        inputTelefono.type = "number";
        //Los pasamos a la vista
        labelNombre.append(inputNombre);
        labelApellido.append(inputApellido)
        labelApellido2.append(inputApellido2)
        labelUsuario.append(inputNombreUsuario);
        labelTelefono.append(inputTelefono);
        labelDNI.append(inputDNI);
        labelFechaNacimiento.append(inputFechaNacimiento);
        divDatos.append(labelNombre,labelApellido,labelApellido2,labelUsuario,labelTelefono,labelDNI,labelFechaNacimiento,divBotones);
        articleUser.append(titulo,divDatos);

        botonConfirmar.addEventListener('click',e=>{
            let userModificated = {"name": inputNombre.value,"surname":inputApellido.value,"surname2":inputApellido2.value,"user_name":inputNombreUsuario.value,
                                    "phone":inputTelefono.value,"dni":inputDNI.value,"date_birth":inputFechaNacimiento.value};
            fetch('api/users/userUpdate', {
                method: "PUT",
                mode:'cors',
                headers: {
                    'X-CSRF-TOKEN': token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userModificated),
            }).then(resp=> resp.json()).then(resp=>console.log(resp));

            listarUsuario();
        })
    });

    //MODIFICAR LA CONTRASEÑA
    liCambiarConstraseña.addEventListener('click',e=>{
        articleUser.innerHTML = "";
        let titulo = document.createElement('h1');
        let divContraseñas = document.createElement('div');
        let labelContraseña = document.createElement('label');
        let labelContraseñaRepetida = document.createElement('label');
        let inputContraseña = document.createElement('input');
        let inputContraseñaRepetida = document.createElement('input');
        let aviso = document.createElement('p');
        let divErrores = document.createElement('div');

        labelContraseña.textContent = 'Nueva Contraseña';
        labelContraseñaRepetida.textContent = 'Repita la Contraseña';
        titulo.textContent = 'Cambiar contraseña';
        aviso.textContent = 'Le rogamos que la contraseña sea cambiada las menos veces posible, gracias';
        //clases
        divContraseñas.className = "div__contraseñas--perfil";
        titulo.className = "titulo__cambio--contraseña";
        divErrores.className = "divErrores";

        labelContraseña.append(inputContraseña);
        labelContraseñaRepetida.append(inputContraseñaRepetida);
        divContraseñas.append(labelContraseña,labelContraseñaRepetida,divBotones);
        articleUser.append(titulo,divContraseñas,aviso,divErrores);

        botonConfirmar.addEventListener('click',e=>{
            let contraseña = inputContraseña.value.trim();
            let contraseñaRepetida = inputContraseñaRepetida.value.trim();
            let listaErrores = [];
            let error = false;
            divErrores.innerHTML = "";
            const validación = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

            if(contraseña !== contraseñaRepetida ){
                listaErrores.push('Las contraseñas no coinciden');
                error = true;
            }
            if(contraseña.length < 8){
                listaErrores.push('La contraseña debe tener un minimo de 8 carácteres');
                error = true;
            }
            if (contraseña.length > 20){
                listaErrores.push('La contraseña debe contener como máximo de 20 carácteres');
                error = true;
            }
            if (/\s/.test(contraseña)) {
                listaErrores.push('La contraseña no debe de tener espacios');
                error = true;
            }
            if(!contraseña.match(validación)){
                listaErrores.push("La contraseña debe tener al menos una mayúscula, minúscula, un número y un carácter especial");
                error = true;
            }
            if(error){
                if(error){
                    divErrores.innerHTML="";
                    let ulErrores = document.createElement('ul');
                    ulErrores.className='lista_errores';
                    for(let error of listaErrores){
                        let liError = document.createElement('li');
                        liError.textContent = error;
                        ulErrores.append(liError);
                    }
                    divErrores.append(ulErrores);
                }
            }else{
                fetch('api/users/userPassword', {
                    method: "PUT",
                    mode:'cors',
                    headers: {
                        'X-CSRF-TOKEN': token,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({"password":contraseña}),
                }).then(resp=> resp.json()).then(resp=>console.log(resp));
            }
        })
    });

    //AÑADIR O ELIMINAR LAS DIRECCIONES
    liAñadirEliminarDirecciones.addEventListener('click',e=>{

        articleUser.innerHTML = "";
        let divDireccionesEnvio = document.createElement('div');
        let ulDireccionesEnvioMod = document.createElement('ul');
        ulDireccionesEnvioMod.className ="ul__DireccionesEnvio--Mod"
        divDireccionesEnvio.className ="div__DireccionesEnvio"
        for(let address of addresses){
            let botonEliminarDireccion = document.createElement('button');
            let direccionEnvio = document.createElement('li');
            botonEliminarDireccion.textContent = "Eliminar";
            botonEliminarDireccion.className ="boton__eliminar--direccion"
            direccionEnvio.className = "direccionesEnvio__perfil";
            direccionEnvio.textContent = `Direccion: ${address.tipo} ${address.nombre}, Nº ${address.patio}, piso ${address.piso}, puerta ${address.puerta}, ${address.cp}, ${address.localidad}, ${address.pais}  `;
            botonEliminarDireccion.value = address.id;
            ulDireccionesEnvioMod.append(direccionEnvio,botonEliminarDireccion);
        }
        divDireccionesEnvio.append(ulDireccionesEnvioMod);

        let titulo = document.createElement('h1');
        titulo.textContent ="Añadir o eliminar Direcciones";
        titulo.className = "titulo__modificar--datos";

        let divAñadirDireccion = document.createElement('div');
        let labelTipo = document.createElement('label');
        let labelNombre = document.createElement('label');
        let labelLocalidad = document.createElement('label');
        let labelPais = document.createElement('label');
        let labelCp = document.createElement('label');
        let labelPatio = document.createElement('label');
        let labelPuerta = document.createElement('label');
        let labelPiso = document.createElement('label');

        let inputTipo = document.createElement('input');
        let inputNombre = document.createElement('input');
        let inputLocalidad = document.createElement('input');
        let inputPais = document.createElement('input');
        let inputCp = document.createElement('input');
        let inputPatio = document.createElement('input');
        let inputPuerta = document.createElement('input');
        let inputPiso = document.createElement('input');

        //tipos de input
        inputCp.type = "number";
        inputPatio.type = "number";
        inputPuerta.type = "number";
        inputPiso.type = "number";
        //clases
        divAñadirDireccion.className ="div__añadir--direccion"
        //valores a los labels
        labelTipo.textContent = 'Tipo: ';
        labelNombre.textContent = 'Nombre: ';
        labelLocalidad.textContent = 'Localidad: ';
        labelPais.textContent = 'País: ';
        labelCp.textContent = 'Código Postal: ';
        labelPatio.textContent = 'Patio: ';
        labelPuerta.textContent = 'Puerta: ';
        labelPiso.textContent = 'Piso: ';

        //Añadimos los inputs a los labels
        labelTipo.append(inputTipo);
        labelNombre.append(inputNombre);
        labelLocalidad.append(inputLocalidad);
        labelPais.append(inputPais);
        labelCp.append(inputCp);
        labelPatio.append(inputPatio);
        labelPuerta.append(inputPuerta);
        labelPiso.append(inputPiso);

        divAñadirDireccion.append(labelTipo,labelNombre,labelLocalidad,labelPais,labelCp,labelPatio,labelPuerta,labelPiso,divBotones);
        articleUser.append(titulo,divDireccionesEnvio,divAñadirDireccion);
        console.log(e)

        //Función borrar direcciones
        let botonesEliminarDireccion = document.querySelectorAll('.boton__eliminar--direccion');
        console.log(botonesEliminarDireccion);
        //Scrollear hasta el titulo
        let scroll = titulo.getBoundingClientRect();
        window.scrollTo(scroll.x,scroll.y);

        //BORRAR DIRECCIONES
        for(let botonEliminarDireccion of botonesEliminarDireccion){
            botonEliminarDireccion.addEventListener('click',e=>{
                borrarDireccion(botonEliminarDireccion.value,divDireccionesEnvio);
            });
        }

        //AÑADIR DIRECCIÓN
        botonConfirmar.addEventListener('click',async(e)=>{
            let respAddresses = await fetch('api/addresses');
            let addresses = await respAddresses.json();
            console.log(addresses[0].length);
            if(addresses[0].length < 4 ){
                let direccion = {"tipo": inputTipo.value,"nombre":inputNombre.value,"patio":inputPatio.value,"puerta":inputPuerta.value,"piso":inputPiso.value,"cp":inputCp.value,"localidad":inputLocalidad.value,"pais":inputPais.value};
                fetch(`api/addresses/`, {
                    method: "POST",
                    mode:'cors',
                    headers: {
                        'X-CSRF-TOKEN': token,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(direccion),
                }).then(() => {
                    listarUsuario();
                });
            }else{
                alert('Superas el máximo de direcciones (4), por favor, elimina alguna');
            }

        });
    });


    botonAtras.addEventListener('click',(e)=>{
        listarUsuario();
    });
}

//llamada a la funcion para borrar las direcciones
const borrarDireccion = async(idBotonEliminar,divDireccionesEnvio)=>{

    console.log(idBotonEliminar);
    fetch(`api/addresses/${idBotonEliminar}`, {
        method: "DELETE",
        mode:'cors',
        headers: {
            'X-CSRF-TOKEN': token,
            'Content-Type': 'application/json',
        },
    }).then(async()=>{
        let respAddresses2 = await fetch('api/addresses');
        let addresses2 = await respAddresses2.json();
        console.log(addresses2);

        divDireccionesEnvio.innerHTML="";
        let ulDireccionesEnvioMod = document.createElement('ul');
        ulDireccionesEnvioMod.className ="ul__DireccionesEnvio--Mod"
        divDireccionesEnvio.className ="div__DireccionesEnvio"
        for(let address of addresses2[0]){
            let botonEliminarDireccion = document.createElement('button');
            let direccionEnvio = document.createElement('li');
            botonEliminarDireccion.textContent = "Eliminar";
            botonEliminarDireccion.className ="boton__eliminar--direccion"
            direccionEnvio.className = "direccionesEnvio__perfil";
            direccionEnvio.textContent = `Direccion: ${address.tipo} ${address.nombre}, Nº ${address.patio}, piso ${address.piso}, puerta ${address.puerta}, ${address.cp}, ${address.localidad}, ${address.pais}  `;
            botonEliminarDireccion.value = address.id;
            ulDireccionesEnvioMod.append(direccionEnvio,botonEliminarDireccion);
        }
        divDireccionesEnvio.append(ulDireccionesEnvioMod);
    });
}


listarUsuario();
