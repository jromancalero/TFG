@extends('layouts.layout')

@section('content')
    <h1>Productos</h1>
    @forelse ($products as $product )
        {{$product}}
    @empty
        No hay products
    @endforelse
@endsection
