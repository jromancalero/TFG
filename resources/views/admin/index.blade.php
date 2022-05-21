<script type="text/javascript" src="{!! asset('js/admin/admin.js') !!}" defer></script>
<link rel="stylesheet" href="{{asset('css/admin/admin.css')}}">


<section class="section_admin">
    <h1 class="titulo"> VISTA DE ADMIN PARA ADMINISTRAR LA APLICACIÓN</h1>
    <h2 class="name_admin">Admin:{{Auth::user()->name}}</h2>
    <input type ="hidden" name="_token" id="token" value="{{csrf_token()}}">
    <article class="article__modalidades">
        <button id="usuarios">Usuarios</button>
        <button id="productos">Productos</button>
        <button id="crear_productos">Crear Productos</button>
    </article>
    <article class="listado_admin" id="productos_usuarios">

    </article>
</section>

<script type="text/javascript">
    window.CSRF_TOKEN = '{{ csrf_token() }}';
</script>

