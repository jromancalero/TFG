<link rel="stylesheet" href="{{asset('css/extras/contacto.css')}}">

@extends('layouts.layout')

@section('content')
    <h1 class="titulo">Formulario de contacto</h1>
    <section class="section__contacto">

        @csrf
        <form action="https://formsubmit.co/0a48981282b4de936692426340b3a886" method="POST">
            <article class="article__contacto">
                <fieldset>
                <legend>Contacto</legend>
                <label for="Nombre">Nombre: </label>
                <input type="text" name="name" placeholder="Ej: Jaime Garcia De la Tierra">

                <label for="email">Correo electrónico: </label>
                <input type="email" name="email" placeholder="Ej: ejemplo@gmail.com">

                <label for="subject">Asunto: </label>
                <input type="text" name="subject" placeholder="Asunto en cuestión">

                <label for="comments">Comentarios: </label>
                <textarea name="comments" cols="15" rows="5" placeholder="Se recomienda que a la hora de hacer críticas sean constructivas, gracias."></textarea>

                <input type="submit" value="Enviar">

                <input type="hidden" name="_next" value="http://localhost:8000">
                <input type="hidden" name="_cc" value=" infogachapo@email.com ">
                <input type="hidden" name="_autoresponse" value="Gracias por confiar en nosotros, te dejamos aquí la copia de tu mensaje">
                </fieldset>
            </article>
        </form>
    </section>
@endsection
