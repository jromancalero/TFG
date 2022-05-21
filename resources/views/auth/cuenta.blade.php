@extends('layouts.layout')

@section('content')
    <section class="section__cuenta">
        <article class="article__fotoPerfil">
            <img>
        </article>
        <article class="article__user">
            <h1 class="nombre_cuenta">{{Auth::user()->name}} {{Auth::user()->surname}} {{Auth::user()->surname2}}</h1>

            <ul class="lista_cuenta">
                <li>
                    Nombre de usuario : {{Auth::user()->user_name}}
                </li>
                <li>
                    Email : {{Auth::user()->email}}
                </li>
                <li>
                    Teléfono : {{Auth::user()->phone}}
                </li>
                <li>
                    DNI : {{Auth::user()->dni}}
                </li>
                <li>
                    Fecha Nacimiento : {{Auth::user()->date_birth}}
                </li>
                <li>
                    Direcciones de envio :
                </li>
                <li>
                    <button>Cambiar la contraseña</button><button>Compras y pedidos</button>
                </li>
            </ul>
        </article>
        <article>
            <p>Guardar cambios</p>
        </article>
    </section>

@endsection
