@extends('layouts.layout')

@section('content')
    <h1 class="titulo">Merchandising</h1>
    <section class="section__products">
        @forelse ($products as $product )
            <article class="article__products re__animation">
                @foreach ($product->images as $image)
                <img class="img__product" src= '{{asset("$image->url")}}' alt="Logo"/>
                @endforeach
                <h2 class="h2__titulo_producto">{{$product->name}}</h2>
                <p class="p__description">{{$product->description}}</p>
                <p class="p__price">{{$product->price}} €</p>
                <button class="boton__compra animacion">Añadir a la cesta</button>
            </article>
        @empty
            No hay products
        @endforelse
    </section>
@endsection
