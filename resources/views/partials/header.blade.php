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
        <article class="header__article--nav">
            <ul class="header__articleNav--ul">
                <li>
                    <a class="invert_link" href="{{route('inicio')}}">INICIO</a>
                </li>
                <li>
                    <a class="invert_link" href="{{route('figures')}}">FIGURAS</a>
                </li>
                <li>
                    <a class="invert_link" href="{{route('japaneseFood')}}">COMIDA NIPONA</a>
                </li>
                <li>
                    <a class="invert_link" href="{{route('merchandising')}}">MERCHANDISING</a>                  
                </li>
                <li>
                    <a class="invert_link" href="{{route('gachapon')}}">GACHAPON</a>                   
                </li>
            </ul>
            <ul class="header__articleNav--ul">
                <li>
                    <span class="material-symbols-outlined">search</span>
                </li>
                <li>
                    <span class="material-symbols-outlined">shopping_cart</span>
                </li>
                <li class="header__li--user">
                    <p class="material-symbols-outlined">account_circle_full</p>
                    <p>Nombre usuario</p>
                </li>
            </ul>
        </article>
    </section>
</body>
</html>