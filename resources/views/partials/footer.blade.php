<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Footer</title>

</head>
<body>
    <section class="section__footer">
        <article class="article__footer--information">
            <ul class="ul__footer--information">
                <li>
                    <a href="{{route('politica-privacidad')}}">Politica</a>
                </li>
                <li>
                    <a href="{{route('contacto')}}">Contacto</a>
                </li>
                <li>
                    <a href="{{route('mapa-web')}}">Mapa Web</a>
                </li>
            </ul>
        </article>
        <article class="article__footer--copyrigth">
            <p>&copy; 2022 - Todos los derechos reservados por GACHAPO</p>
        </article>
        <article class="article__footer--logo">
            <img src= '{{asset("img/footer/logopequeño.png")}}' alt="Logo"/>
        </article>
    </section>
</body>
</html>
