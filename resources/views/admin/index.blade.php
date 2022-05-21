<script type="text/javascript" src="{!! asset('js/admin/admin.js') !!}" defer></script>
<link rel="stylesheet" href="{{asset('css/admin/admin.css')}}">


<section class="section_admin">
    <h1 class="titulo"> VISTA DE ADMIN PARA ADMINISTRAR LA APLICACIÓN</h1>
    <h2 class="name_admin">Admin:{{Auth::user()->name}}</h2>

    <article class="article__modalidades">
        <button id="usuarios">Usuarios</button>
        <button id="productos">Productos</button>
        <button class="admin__filtros">Filtros</button>
    </article>
    <article class="listado_admin" id="productos_usuarios">

    </article>
</section>
