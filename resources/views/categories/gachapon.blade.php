<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gacha</title>
    <link rel="stylesheet" href="{{asset('css/categories/gachapon.css')}}">
    <script type="text/javascript" src="{!! asset('js/categories/gachapon.js') !!}" defer></script>
</head>
<body>
    @extends('layouts.layout')
    @section('content')
        <section>
            <article class="article__gacha">
                <div class="gacha__container" id="gacha__container">
                    <div class="gancho" id="gancho"></div>

                </div>
            </article>
        </section>
    @endsection
</body>
</html>



