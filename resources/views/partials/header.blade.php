<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="https://fonts.sandbox.google.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />

</head>

<body>
    <section class="header__section" >
        <article class="header__article">
            <img src= '{{asset("img/header/logo.png")}}' width="200px" heigth="200px" alt="Logo"/>
            <h1 class="title">GACHAPÓ</h1>
        </article>

    </section>
    <section class="header__section--nav">
        <ul class="header__sectionNav--ul">
            <li>
                <a class="invert_link" id="inicio" value="inicio" >INICIO</a>
            </li>
            <li>
                <a class="invert_link link" value="figuras" id="figuras">FIGURAS</a>
            </li>
            <li>
                <a class="invert_link link" value="comida" id="comida">COMIDA NIPONA</a>
            </li>
            <li>
                <a class="invert_link link" value="merchandising" id="merchandising">MERCHANDISING</a>
            </li>
            <li>
                <a class="invert_link" href="{{route('gachapon')}}">GACHAPON</a>
            </li>
        </ul>
        <ul class="header__sectionNav--ul">
            <li>
                <span class="material-symbols-outlined">search</span>
            </li>
            <li>
                <span class="material-symbols-outlined">shopping_cart</span>
            </li>
            @csrf
            <li class="header__li--user">

                @auth
                    <p class="material-symbols-outlined">account_circle_full</p>
                    <a class="li__user--a" href="{{route('cuenta')}}">{{Auth::user()->user_name}}</a>
                    <form method="POST" action="{{route('logout')}}">
                        <a class="logout" href="{{route('logout')}}" onclick="event.preventDefault();this.closest('form').submit();"><span class="material-symbols-outlined">
                            settings_power
                            </span></a>
                    </form>
                    <input type ="hidden" name="token_header" id="token_header" value="{{csrf_token()}}">
                    <input type ="hidden" name="id_user" id="id_user" value="{{Auth::user()->id}}">
                @else
                    <a class="li__user--a" href="{{route('login')}}">Conéctate</a>
                    <a class="li__user--a" href="{{route('registro')}}">Registrate</a>
                @endauth

            </li>
        </ul>
    </section>
</body>
</html>
