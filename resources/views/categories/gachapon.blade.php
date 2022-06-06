<link rel="stylesheet" href="{{asset('css/categories/gachapon.css')}}">
<script type="text/javascript" src="{!! asset('js/categories/gachapon.js') !!}" defer></script>

@extends('layouts.layout')
@section('content')
    <section>
        <article class="article__gacha">
            <div class="gacha__container" id="gacha__container">

                <div class="img_container">
                    <div class="vara_premio"></div>
                    <img class="img_ruleta"  src="{{asset('img/gachapon/ruleta.png')}}" id="ruleta">
                </div>
                <div class="info__gracha--container">
                    <h2>Bienvenidos a la ruleta del gachapón</h2>
                    <h3>Para poder participar necesitarás 1 ficha Gacha</h3>
                </div>

            </div>
        </article>
    </section>
@endsection



