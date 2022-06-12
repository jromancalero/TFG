<script type="text/javascript" src="{!! asset('js/admin/admin.js') !!}" defer></script>
<link rel="stylesheet" href="{{asset('css/admin/admin.css')}}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.sandbox.google.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<section class="section_admin">
    <h1 class="titulo"> VISTA DE ADMIN PARA ADMINISTRAR LA APLICACIÓN</h1>
    <h2 class="name_admin">Admin:{{Auth::user()->name}}</h2>
    @csrf
    <article class="article__modalidades">
        <button id="usuarios">Usuarios</button>
        <button id="productos">Productos</button>
        <button id="crear_productos">Crear Productos</button>
        <a href="{{route('inicio')}}">Inicio</a>
    </article>
    <article class="article__filtro"></article>
    <article id="edicion"></article>
    <article class="listado_admin" id="productos_usuarios">

    </article>
</section>

