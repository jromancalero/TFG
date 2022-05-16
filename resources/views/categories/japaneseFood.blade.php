@extends('layouts.layout')

@section('content')
    <h1>Productos</h1>
    @forelse ($products as $product )
        {{$product}}
        @foreach ($product->images as $image)
            <img class="img__product" src= '{{asset("$image->url")}}' alt="Logo"/>
        @endforeach

        <img src="">
    @empty
        No hay products
    @endforelse
@endsection
