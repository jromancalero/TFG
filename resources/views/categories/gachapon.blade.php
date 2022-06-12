<link rel="stylesheet" href="{{asset('css/categories/gachapon.css')}}">
<script type="text/javascript" src="{!! asset('js/categories/gachapon.js') !!}" defer></script>

@extends('layouts.layout')
@section('content')
    <section class="section__gacha">
        <h1 class="titulo">GACHA RULETA</h1>
        <article class="article__gacha">
            <div class="gacha__container" id="gacha__container">
                <div class="img_container">
                    <div class="vara_premio"></div>
                    <img class="img_ruleta"  src="{{asset('img/gachapon/ruleta.png')}}" id="ruleta">
                </div>
                <div class="info__gracha--container">
                    <h2 class="subtitulo__gacha">Bienvenidos a la ruleta del gachapón</h2>
                    <h3 class="aviso__gacha">Para poder jugar necesitarás 1 Gacha Coin por partida</h3>
                    @if(Auth::user())
                        <p class="gacha__coins--propios">Tus Gacha Coins: {{Auth::user()->coin}}</p>
                    @else
                        <p>Debes loguearte antes para poder adquirir Gacha Coins</p>
                    @endif
                    <div class="compra__coins">
                        <img class="img__coin" alt="Gacha_coin" src="{{asset('img/gachapon/gachaCoin.png')}}">
                    </div>
                    <div class="div__cantidad--precio">
                        <div class="cantidad__coins">
                            <button class="boton__cambio--cantidad">-</button>
                            <p class="cantidad__coins--num">1</p>
                            <button class="boton__cambio--cantidad">+</button>
                        </div>
                        <p class="precio__coins">Precio: 15 €</p>
                    </div>
                    <div class="div__compra">
                        <button class="boton__compra animacion">Añadir a la cesta</button>
                    </div>
                </div>

            </div>
        </article>
    </section>
@endsection



