

let bloqueLista = document.querySelector('#productos_usuarios');
let botonUsuarios = document.querySelector('#usuarios');
let botonProductos = document.querySelector('#productos');




getProducts = async() =>{

    try {
        let res = await fetch("/api/products");
        let productos = await res.json();

        botonProductos.addEventListener('click',(e) =>{
            listar(productos,'PRODUCTOS');
        });



    } catch (error) {
        let message = err.statusText || "Ocurrio un error";
        divContainer.insertAdjacentHTML(
            "afterend",
            `<p><b>Error ${err.status}: ${message} </b></p>`
        );
    }

}


getUsers = async() =>{

    try {
        let res = await fetch("/api/users");
        users = await res.json();
        listar(users,'USUARIOS');

        botonUsuarios.addEventListener('click',(e) =>{
            listar(users,'USUARIOS');
        });

    } catch (error) {
        let message = err.statusText || "Ocurrio un error";
        divContainer.insertAdjacentHTML(
            "afterend",
            `<p><b>Error ${err.status}: ${message} </b></p>`
        );
    }
}

//Funcion listar productos o usuarios
function listar(lista,nombre){
    let titulo_lista = document.createElement('h2');
    bloqueLista.innerHTML="";
    titulo_lista.textContent = nombre;
    titulo_lista.className="titulo_lista";
    bloqueLista.append(titulo_lista);

    lista.forEach(element => {

        if(nombre === 'PRODUCTOS'){
            let liId = document.createElement("li");
            let liName = document.createElement("li");
            let liType = document.createElement("li");
            let liSize = document.createElement("li");
            let liPrice = document.createElement("li");
            let liDescription = document.createElement("li");
            let liStock = document.createElement("li");
            let lista_admin = document.createElement('ul');

            let liBotones = document.createElement('li');
            let botonEditar = document.createElement('button');
            let botonBorrar = document.createElement('button');
            botonEditar.textContent = 'Editar';
            botonEditar.value = element.id;
            botonBorrar.textContent = 'Borrar';
            botonBorrar.value = element.id;
            liBotones.className="botones_lista"
            liBotones.append(botonEditar,botonBorrar);

            liId.textContent = 'ID: '+ element.id;
            liName.textContent = 'Name: '+element.name;
            liType.textContent = 'Type: '+ element.type;
            liSize.taxtContent = 'Size: '+element.size;
            liPrice.textContent = 'Price: '+element.price;
            liDescription.textContent = 'Descripción: '+element.description;
            liStock.textContent = 'Stock: '+ element.stock;
            lista_admin.className = 'lista_admin';
            lista_admin.append(liId,liName,liType,liSize,liPrice,liDescription,liStock,liBotones);
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
            botonBorrar.textContent = 'Borrar';
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
}

//Funcion para crear los productos desde el admin

const makeProducts = async()=>{

    makeProductsButton = document.querySelector('#crear_productos');
    makeProductsButton.addEventListener('click',(e)=>{
        bloqueLista.innerHTML="";

        let carac = ['name','type','size','price','description','stock'];

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
        let divErrores = document.createElement('div');
        divErrores.className = "div_errores";
        bloqueLista.append(sendButton,divErrores);

        //CREAR PRODUCTO
        sendButton.addEventListener('click',(e)=>{

            let inputName = document.querySelector('#name');
            let inputType = document.querySelector('#type');
            let inputSize = document.querySelector('#size');
            let inputPrice = document.querySelector('#price');
            let inputDescription = document.querySelector('#description');
            let inputStock = document.querySelector('#stock');
            let token = document.querySelector('#token');
            console.log(inputName.value,inputDescription.value);

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
                console.log(error)
                console.log(arrayErrores);
            }else{
                //ENVAIR DATOS
                let producto = {"name": inputName.value,"type": inputType.value,"size": inputSize.value,"price": inputPrice.value,
                                "description":inputDescription.value,"stock": inputStock.value};
                console.log(producto);
                fetch("/api/products", {
                    method: "POST",
                    mode:'cors',
                    headers: {
                        'X-CSRF-TOKEN': token.value,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(producto),
                });
            }



        });
    });

}




makeProducts();
getProducts();
getUsers();

