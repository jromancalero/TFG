
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


getProducts();
getUsers();

