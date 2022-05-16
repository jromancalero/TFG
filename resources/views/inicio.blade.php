@extends('layouts.layout')

@section('content')
    <h1>Productos</h1>
    @forelse ($products as $product )
        @if ($product->type == 'Merchandising')
            {{$product->name}}<br>
            {{$product->type}}<br>
            {{$product->price}}<br>
            {{$product->description}}<br>
            {{$product->stock}}<br><br>

        @endif
    @empty
        No hay products
    @endforelse
@endsection

