

let bloqueLista = document.querySelector('#productos_usuarios');
let botonUsuarios = document.querySelector('#usuarios');
let botonProductos = document.querySelector('#productos');
let tokenInput = document.querySelector('[name=_token]');
let token = tokenInput.value;
let articleEdicion = document.querySelector('#edicion')
let divErrores = document.createElement('div');
divErrores.className = "div_errores";


//Funcion listar productos o usuarios
 const listar = async(nombre)=>{

    let lista;
    if(nombre === 'PRODUCTOS'){
        let res2 = await fetch("/api/products");
        let productos = await res2.json();
        lista = productos
        let res3 = await fetch("/api/images");
        images = await res3.json();

    }else{
        let res = await fetch("/api/users");
        users = await res.json();
        lista = users
    };



    let titulo_lista = document.createElement('h2');
    bloqueLista.innerHTML="";
    articleEdicion.innerHTML="";
    titulo_lista.textContent = nombre;
    titulo_lista.className="titulo_lista";
    bloqueEditar = document.createElement('div');
    bloqueEditar.className="bloque_editar";
    articleEdicion.append(bloqueEditar);
    bloqueLista.append(titulo_lista);



    lista.forEach(element => {

        if(nombre === 'PRODUCTOS'){

            let liId = document.createElement("li");
            let liName = document.createElement("li");
            let liType = document.createElement("li");
            let liSize = document.createElement("li");
            let liPrice = document.createElement("li");
            let liDescription = document.createElement("li");
            let liImage = document.createElement('li');
            let liStock = document.createElement("li");
            let lista_admin = document.createElement('ul');

            let liBotones = document.createElement('li');
            let botonEditar = document.createElement('button');
            let botonBorrar = document.createElement('button');
            botonEditar.textContent = 'Editar';
            botonEditar.value = element.id;
            botonEditar.className ="edit_button";
            botonBorrar.textContent = 'Borrar';
            botonBorrar.value = element.id;
            botonBorrar.className = "delete_button";
            liBotones.className="botones_lista"
            liBotones.append(botonEditar,botonBorrar);

            liId.textContent = 'ID: '+ element.id;
            liName.textContent = 'Name: '+element.name;
            liType.textContent = 'Type: '+ element.type;
            liSize.taxtContent = 'Size: '+element.size;
            liPrice.textContent = 'Price: '+element.price;
            //URL DE LA IMAGEN
            images.forEach(image => {
                if(image.product_id === element.id){
                    liImage.textContent = 'URL: '+ image.url;
                }
            });
            liDescription.textContent = 'Descripción: '+element.description;
            liStock.textContent = 'Stock: '+ element.stock;
            lista_admin.className = 'lista_admin';
            lista_admin.append(liId,liName,liType,liSize,liPrice,liDescription,liStock,liImage,liBotones);
            bloqueLista.append(lista_admin);
        }else{

            let liId = document.createElement("li");
            let liName = document.createElement("li");
            let liUserName = document.createElement("li");
            let liEmail = document.createElement("li");
            let liDNI = document.createElement("li");
            let liPhone = document.createElement("li");
            let liDateBirth = document.createElement("li");
            let lista_admin = document.createElement('ul');

            let liBotones = document.createElement('li');
            let botonEditar = document.createElement('button');
            let botonBorrar = document.createElement('button');
            botonEditar.textContent = 'Editar';
            botonEditar.value = element.id;
            botonEditar.className ="edit_button";
            botonBorrar.textContent = 'Borrar';
            botonBorrar.className = "delete_button";
            botonBorrar.value = element.id;
            liBotones.className="botones_lista"
            liBotones.append(botonEditar,botonBorrar);

            liId.textContent = 'ID: '+ element.id;
            liName.textContent = 'Nombre: '+element.name +' '+element.surname+' '+element.surname2;
            liUserName.textContent = 'Nombre usuario : '+ element.user_name;
            liEmail.taxtContent = 'Email : '+element.email;
            liDNI.textContent = 'DNI : '+element.dni;
            liPhone.textContent = 'Teléfono: '+element.phone;
            liDateBirth.textContent = 'Fecha Nacimiento : '+ element.date_birth;
            lista_admin.className = 'lista_admin';
            lista_admin.append(liId,liName,liUserName,liEmail,liDNI,liPhone,liDateBirth,liBotones);
            bloqueLista.append(lista_admin);

        }
    });
    //LLAMADA FUNCIÓN PARA EDITAR
    edit(nombre);
    deleteProductsAndUsers(nombre);
}

//FUNCIÓN PARA BORRAR USUARIOS Y PRODUCTOS
const deleteProductsAndUsers = async(nombre)=>{
    deleteButtons = document.querySelectorAll('.delete_button');
    deleteButtons.forEach((deleteButton)=>{
        deleteButton.addEventListener('click',(e)=>{
            //console.log(e)
            getProductsAndUsersForDelete(e,nombre);
        })
    })
}
//FUNCIÓN PARA RECOGER LOS DATOS DE LOS USUARIOS Y PRODUCTOS PARA PODER BORRARLOS
const getProductsAndUsersForDelete = async(e,nombre)=>{

    let id = e.target.value;

    console.log(id);
    console.log(nombre)
    if(nombre === 'PRODUCTOS'){
        let resProducto = await fetch(`/api/products/${id}`);
        let producto = await resProducto.json();
        let mensajeProduct = confirm(`Estas seguro de querer borrar el producto ${producto.name} de tipo ${producto.type} ?`);
        if(mensajeProduct){
            fetch(`/api/products/${id}`, {
                method: "DELETE",
                mode:'cors',
                headers: {
                    'X-CSRF-TOKEN': token,
                    'Content-Type': 'application/json',
                },
            }).then(()=>listar('PRODUCTOS'));
        }
    }else{
        let resUser = await fetch(`/api/users/${id}`);
        let user = await resUser.json();
        let mensajeUser = confirm(`Estas seguro de querer borrar el usuario ${user.name} de DNI ${user.dni} ?`);
        if(mensajeUser){
            fetch(`/api/users/${id}`, {
                method: "DELETE",
                mode:'cors',
                headers: {
                    'X-CSRF-TOKEN': token,
                    'Content-Type': 'application/json',
                },
            }).then(()=>listar('USUARIOS'));
        }
    }

}
// FUNCIÓN EDITAR USUARIOS Y PRODUCTOS
const edit = async(nombre)=>{
    editButtons = document.querySelectorAll('.edit_button');
    for(let edit_button of editButtons ){
        edit_button.addEventListener('click',(e)=>{
            console.log(e.target.value)
            bloqueEditar.innerHTML="";

            const getUserAndProducts= async()=>{
                let boton_enviar_cambios = document.createElement('button');
                boton_enviar_cambios.className="boton_guardar_cambios";
                boton_enviar_cambios.textContent = "Guardar Cambios"
                if(nombre === 'USUARIOS'){
                    let respUsuario = await fetch(`/api/users/${e.target.value}`);
                    let usuario = await respUsuario.json();
                    console.log(usuario);
                    //Inputs de los campos para cambiarlo
                    let inputName = document.createElement('input');
                    let inputSurname = document.createElement('input');
                    let inputSurname2 = document.createElement('input');
                    let inputUserName = document.createElement('input');
                    let inputDNI = document.createElement('input');
                    let inputPhone = document.createElement('input');
                    let inputFechaNacimiento = document.createElement('input');

                    //tipos de los input
                    inputName.type = "text";
                    inputSurname.type ="text";
                    inputSurname2.type = "text";
                    inputUserName.type = "text";
                    inputDNI.type ="text";
                    inputPhone.type ="number";
                    inputFechaNacimiento.type = "date";

                    //Aplicamos el contenido
                    console.log(usuario.name)
                    inputName.value = usuario.name;
                    inputSurname.value = usuario.surname;
                    inputSurname2.value = usuario.surname2;
                    inputUserName.value = usuario.user_name;
                    inputDNI.value = usuario.dni;
                    inputPhone.value = usuario.phone;
                    inputFechaNacimiento.value = usuario.date_birth;

                    bloqueEditar.append('Nombre: ',inputName,'Apellido: ',inputSurname,'2Apellido: ',inputSurname2,'Nombre Usuario: ',inputUserName,'DNI: ',inputDNI,
                    'Teléfono: ',inputPhone,'Fecha Nacimiento: ',inputFechaNacimiento,boton_enviar_cambios,divErrores);

                    //GUARDAR LOS CAMBIOS REALIZADOS SOBRE EL USUARIO
                    boton_enviar_cambios.addEventListener('click',(e)=>{
                        //VALIDACIONES DE LOS INPUT
                        let arrayErrores = [];
                        let error = false;
                        if(inputName.value === '' || inputName.value === null  || inputName.value.length > 30){
                            arrayErrores.push('Error en el nombre , por favor escríbalo bien');
                            error = true;
                        }
                        if(inputSurname.value === '' || inputSurname.value === null || inputSurname.value.length > 25){
                            arrayErrores.push('Error en el apellido , por favor escríbalo bien');
                            error = true;
                        }
                        if(inputSurname2.value.length > 25){
                            arrayErrores.push('El segundo apellido es demasiado largo');
                            error = true;
                        }
                        if(inputUserName.value === '' || inputUserName.value === null || inputUserName.value.length > 25){
                            arrayErrores.push('Error en nombre sde usuario , por favor escríbalo bien');
                            error = true;
                        }
                        if(inputDNI.value === '' || inputDNI.value === null || inputDNI.value.length >9){
                            arrayErrores.push('Error en el DNI , por favor escríbalo bien');
                            error = true;
                        }
                        if(inputPhone.value.length >12){
                            arrayErrores.push('Error en el telefono , por favor escríbalo bien');
                            error = true;
                        }
                        if(error){
                            divErrores.innerHTML="";
                            let ulErrores = document.createElement('ul');
                            ulErrores.className='lista_errores';
                            for(let _error of arrayErrores){
                                let liError = document.createElement('li');
                                liError.textContent = _error;
                                ulErrores.append(liError);
                            }
                            divErrores.append(ulErrores);
                        }else{
                            //CAMBIAMOS LOS DATOS DEL USUARIO
                            let usuarioCambiado = {"name" : inputName.value,"surname":inputSurname.value,"surname2":inputSurname2.value,
                                                    "user_name": inputUserName.value,"dni":inputDNI.value,"date_birth":inputFechaNacimiento.value};
                            let usuarioId = usuario.id;
                            fetch(`/api/users/${usuarioId}`, {
                                method: "PUT",
                                mode:'cors',
                                headers: {
                                    'X-CSRF-TOKEN': token,
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(usuarioCambiado),
                            }).then((res) => {
                                console.log('jojojo')
                                listar('USUARIOS');
                            });
                        }
                    })
                }else{
                    //EDITAR PRODUCTO
                    let respProducto = await fetch(`/api/products/${e.target.value}`);
                    let producto = await respProducto.json();
                    let res5 = await fetch("/api/images");
                    images = await res5.json();
                    console.log(images);
                    console.log(producto);
                    //CREACIÓN DE SUS INPUTS
                    let inputName = document.createElement('input');
                    let inputType = document.createElement('input');
                    let inputPrice = document.createElement('input');
                    let inputDescription = document.createElement('textarea');
                    let inputStock = document.createElement('input');
                    let inputImage = document.createElement('input');

                    //Añadimos propiedades
                    inputDescription.cols ="40";
                    inputDescription.rows ="5";
                    //DEFINIMOS TIPO DE INPUT
                    inputName.type = "text";
                    inputType.type = "text";
                    inputPrice.type = "number";
                    inputDescription.type = "text";
                    inputStock.type = "number";

                    //Insertamos el contenido en los input
                    inputName.value = producto.name;
                    inputType.value = producto.type;
                    inputPrice.value = producto.price;
                    inputDescription.value = producto.description;
                    inputStock.value = producto.stock;
                    //bucle para la URL de la imagen
                    images.forEach(image => {
                        if(image.product_id === producto.id){
                            inputImage.value = image.url;
                            idImage = image.id;
                        }
                    });

                    bloqueEditar.append('Nombre: ',inputName,'Tipo: ',inputType,'Price: ',inputPrice,'Descripción: ',
                                        inputDescription,'Stock: ',inputStock,'URL: ',inputImage, boton_enviar_cambios,divErrores);

                    //GUARDAR LOS CAMBIOS REALIZADOS SOBRE EL USUARIO
                    boton_enviar_cambios.addEventListener('click',(e)=>{
                        //VALIDACIONES DE LOS INPUT
                        let arrayErrores = [];
                        let error = false;
                        if(inputName.value === '' || inputName.value === null  || inputName.value.length > 30){
                            arrayErrores.push('Error en el nombre , por favor escríbalo bien');
                            error = true;
                        }
                        if(inputType.value === '' || inputType.value === null || inputType.value.length > 25){
                            arrayErrores.push('Error en el tipo , por favor escríbalo bien');
                            error = true;
                        }
                        if(inputPrice.value === '' || inputPrice.value === null ){
                            arrayErrores.push('Error en el precio , por favor escríbalo bien');
                            error = true;
                        }
                        if(inputDescription.value === '' || inputDescription.value === null || inputDescription.value.length > 255){
                            arrayErrores.push('Error en la descripción , por favor escríbalo bien, debe contener menos de 255 carácteres');
                            error = true;
                        }
                        if(inputStock.value === '' || inputStock.value === null ){
                            arrayErrores.push('Error en el stock , por favor escríbalo bien');
                            error = true;
                        }
                        if(inputImage.value === '' || inputImage.value === null ){
                            arrayErrores.push('Error en el imagen , por favor escríbalo bien');
                            error = true;
                        }
                        if(error){
                            divErrores.innerHTML="";
                            let ulErrores = document.createElement('ul');
                            ulErrores.className='lista_errores';
                            for(let _error of arrayErrores){
                                let liError = document.createElement('li');
                                liError.textContent = _error;
                                ulErrores.append(liError);
                            }
                            divErrores.append(ulErrores);
                        }else{
                            //CAMBIAMOS LOS DATOS DEL USUARIO
                            let productoCambiado = {"name" : inputName.value,"type":inputType.value,"price":inputPrice.value,
                                                    "description": inputDescription.value,"stock":inputStock.value};
                            let productoId = producto.id;
                            fetch(`/api/products/${productoId}`, {
                                method: "PUT",
                                mode:'cors',
                                headers: {
                                    'X-CSRF-TOKEN': token,
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(productoCambiado),
                            })
                            console.log(idImage);
                            fetch(`/api/images/${idImage}`, {
                                method: "PUT",
                                mode:'cors',
                                headers: {
                                    'X-CSRF-TOKEN': token,
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({"url":inputImage.value}),
                            }).then((res) => {
                                listar('PRODUCTOS');
                            });
                        }
                    });
                }
            }
            getUserAndProducts();
        });
    }
}

//Funcion para crear los productos desde el admin

const makeProducts = async()=>{

    makeProductsButton = document.querySelector('#crear_productos');
    makeProductsButton.addEventListener('click',(e)=>{
        bloqueLista.innerHTML="";
        articleEdicion.innerHTML="";
        let carac = ['name','type','size','price','description','stock','url'];

        for(let name of carac){
            let div = document.createElement('div');
            div.className="div_inputs_carac"
            let label = document.createElement('label');
            label.textContent = name;
            label.className = 'label_carac'
            let input = document.createElement('input');
            input.id = name;
            input.className ="input_carac";
            div.append(label,input);
            bloqueLista.append(div);
        }
        let sendButton = document.createElement('button');
        sendButton.textContent = 'Crear Producto';
        sendButton.className = 'send_button';
        bloqueLista.append(sendButton,divErrores);

        //CREAR PRODUCTO
        sendButton.addEventListener('click',(e)=>{

            let inputName = document.querySelector('#name');
            let inputType = document.querySelector('#type');
            let inputSize = document.querySelector('#size');
            let inputPrice = document.querySelector('#price');
            let inputDescription = document.querySelector('#description');
            let inputStock = document.querySelector('#stock');
            let inputUrl = document.querySelector('#url');

            const sendProductInformation = async() =>{
                //CONSEGUIR LA LONGITUD DEL ARRAY DE PRODUCTOS
                let resProductosLength = await fetch("/api/products");
                productosLong = await resProductosLength.json();
                idProduct = productosLong.length +1;
                //VALIDACIONES DE LOS INPUT
                let arrayErrores = [];
                let error = false;
                if(inputName.value === '' || inputName.value === null  || inputName.value.lenght > 30){
                    arrayErrores.push('Error en el nombre del producto, por favor escríbalo bien');
                    error = true;
                }
                if(inputType.value === '' || inputType.value === null || inputType.value.lenght > 25){
                    arrayErrores.push('Error en el tipo del producto, por favor escríbalo bien');
                    error = true;
                }
                if(inputPrice.value === '' || inputPrice.value === null || isNaN(inputPrice.value)){
                    arrayErrores.push('Error en el precio del producto, por favor escríbalo bien');
                    error = true;
                }
                if(inputDescription.value === '' || inputDescription.value === null || inputDescription.value.lenght > 255){
                    arrayErrores.push('Error en la descripción del producto, por favor escríbalo bien');
                    error = true;
                }
                if(inputStock.value === '' || inputStock.value === null || isNaN(inputStock.value)){
                    arrayErrores.push('Error en el stock del producto, por favor escríbalo bien');
                    error = true;
                }
                if(inputUrl.value === '' || inputUrl.value === null){
                    arrayErrores.push('Error en la URL del producto, por favor escríbalo bien');
                    error = true;
                }
                if(error){
                    divErrores.innerHTML="";
                    let ulErrores = document.createElement('ul');
                    ulErrores.className='lista_errores';
                    for(let _error of arrayErrores){
                        let liError = document.createElement('li');
                        liError.textContent = _error;
                        ulErrores.append(liError);
                    }
                    divErrores.append(ulErrores);
                }else{
                    //ENVAIR DATOS
                    let producto = {"name": inputName.value,"type": inputType.value,"size": inputSize.value,"price": inputPrice.value,
                                    "description":inputDescription.value,"stock": inputStock.value};
                    console.log(producto);
                    fetch("/api/products", {
                        method: "POST",
                        mode:'cors',
                        headers: {
                            'X-CSRF-TOKEN': token,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(producto),
                    });
                    fetch("/api/images", {
                        method: "POST",
                        mode:'cors',
                        headers: {
                            'X-CSRF-TOKEN': token,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({"url":inputUrl.value,"product_id":idProduct}),
                    }).then((res)=>{
                        inputName.value = '';
                        inputType.value = '';
                        inputPrice.value = '';
                        inputSize.value = '';
                        inputDescription.value = '';
                        inputStock.value = '';
                        inputUrl.value = '';
                    });
                }
            }
            sendProductInformation();


        });
    });
}



listar('USUARIOS');
botonUsuarios.addEventListener('click',(e) =>{
    listar('USUARIOS');
});

botonProductos.addEventListener('click',(e) =>{
    listar('PRODUCTOS');
});

makeProducts();


