@extends('layouts.layout')

@section('content')

    <h1 class="titulo">Productos</h1>
    <section class="section__products" id="section__products">
        @for($i = 0; $i < 4; $i++)
        <article class="article__products re__animation">
            @foreach ($figuras[$i]->images as $image)
            <img class="img__product" src= '{{asset("$image->url")}}' alt="Logo"/>
            @endforeach
            <h2 class="h2__titulo_producto">{{$figuras[$i]->name}}</h2>
            <p class="p__description">{{$figuras[$i]->description}}</p>
            <p class="p__price">{{$figuras[$i]->price}} €</p>
            <button class="boton__compra animacion" value="{{$figuras[$i]->id}}">Añadir a la cesta</button>
        </article>
        @endfor
    </section>
    <section class="section__products">
        @for($i = 0; $i < 4; $i++)
        <article class="article__products re__animation">
            @foreach ($comidas[$i]->images as $image)
            <img class="img__product" src= '{{asset("$image->url")}}' alt="Logo"/>
            @endforeach
            <h2 class="h2__titulo_producto">{{$comidas[$i]->name}}</h2>
            <p class="p__description">{{$comidas[$i]->description}}</p>
            <p class="p__price">{{$comidas[$i]->price}} €</p>
            <button class="boton__compra animacion" value="{{$comidas[$i]->id}}">Añadir a la cesta</button>
        </article>
        @endfor
        {{-- BOTON DE VER MAS Y REDIRECCION --}}
    </section>
    <section class="section__products">
        @for($i = 0; $i < 4; $i++)
        <article class="article__products re__animation">
            @foreach ($merchandising[$i]->images as $image)
            <img class="img__product" src= '{{asset("$image->url")}}' alt="Logo"/>
            @endforeach
            <h2 class="h2__titulo_producto">{{$merchandising[$i]->name}}</h2>
            <p class="p__description">{{$merchandising[$i]->description}}</p>
            <p class="p__price">{{$merchandising[$i]->price}} €</p>
            <button class="boton__compra animacion" value="{{$merchandising[$i]->id}}">Añadir a la cesta</button>
        </article>
        @endfor
        {{-- BOTON DE VER MAS Y REDIRECCION --}}
    </section>

@endsection

