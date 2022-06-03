<link rel="stylesheet" href="{{asset('css/extras/mapa_web.css')}}">

@extends('layouts.layout')

@section('content')
    <section class="section__mapa--web">
        <h1 class="titulo__extra">Mapa Web</h1>
        <article class="article__mapa--web">

            <ul class="lista__mapa--web">
                <li> <a class="inicio__rutas--mapaWeb" href="{{route('inicio')}}">Inicio</a>
                    <ul>
                        <li class="rutas__mapa--web">Cabecera :
                            <ul>
                                <li><a href="{{route('figures')}}">-> Figuras</a>
                                </li><li><a href="{{route('japaneseFood')}}">-> Comida Nipona</a>
                                </li><li><a href="{{route('merchandising')}}">-> Merchandising</a>
                                </li><li><a href="{{route('gachapon')}}">-> Gachapon</a></li>
                                <li><a href="{{route('login')}}">-> Login</a></li>
                                <li><a href="{{route('registro')}}">-> Registro</a></li>
                                <li><a href="{{route('logout')}}">-> Logout</a></li>
                                <li><a href="{{route('cuenta')}}">-> Perfil</a></li>
                                <li><a href="{{route('carrito')}}">-> Carrito</a></li>
                            </ul>
                        </li>
                        <li class="rutas__mapa--web">Pie de página :
                            <ul>
                                <li><a href="{{route('politica-privacidad')}}">-> Política y privacidad</a></li>
                                <li><a href="{{route('contacto')}}">-> Contacto</a></li>
                                <li><a href="{{route('mapa-web')}}">-> Mapa Web</a></li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </article>
    </section>
@endsection
