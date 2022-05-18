@extends('layouts.layout')

@section('content')
<main class="main__cuenta">
    <section class="section__cuenta">
        <article class="article__fotoPerfil">
            <img>
        </article>
        <article class="article__user">
            <h1>{{Auth::user()->name}} {{Auth::user()->surname}} {{Auth::user()->surname2}}</h1>

            <ul>
                <li>
                    {{Auth::user()->name}} {{Auth::user()->surname}} {{Auth::user()->surname2}}
                </li>
                <li>
                    {{Auth::user()->email}}
                </li>
                <li>
                    Cambiar la contraseña
                </li>
                <li>
                    Compras y pedidos
                </li>
                <li>
                    Direcciones de envio
                </li>
                <li>
                    Teléfono : {{Auth::user()->phone}}
                </li>
            </ul>
        </article>
        <article>
            <p>Guardar cambios</p>
        </article>
    </section>
</main>

@endsection
