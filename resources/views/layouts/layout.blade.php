<?php
    $ruta = Route::currentRouteName() ;
?>

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
</head>
<body>
    @include('partials.header')
    <main>
        @if($ruta === 'gachapon')
            @yield('content')
        @else
            <!-- @include('partials.bargacha') -->
            @yield('content')
        @endif
        
    </main>
    @include('partials.footer')
</body>

</html>

