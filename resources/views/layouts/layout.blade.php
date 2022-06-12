
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <title>GACHAPO</title>
    <link rel="stylesheet" href="{{asset('css/header.css')}}">
    <link rel="stylesheet" href="{{asset('css/footer.css')}}">
    <link rel="stylesheet" href="{{asset('css/bargacha.css')}}">
    <link rel="stylesheet" href="{{asset('css/categories/products.css')}}">
    <link rel="stylesheet" href="{{asset('css/auth/cuenta.css')}}">
    <link rel="stylesheet" href="{{asset('css/extras/politica_privacidad.css')}}">
    <link rel="stylesheet" href="{{asset('css/bot/bot.css')}}">
    <script type="text/javascript" src="{!! asset('js/bot/bot.js') !!}" defer></script>
    <link rel="stylesheet" href="https://fonts.sandbox.google.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    {{--<script type="text/javascript" src="{!! asset('js/products/products.js') !!}" defer></script>  --}}
</head>
<body>
    @include('partials.header')

    <main>
        @yield('content')
    </main>

    @include('partials.footer')
</body>

</html>

