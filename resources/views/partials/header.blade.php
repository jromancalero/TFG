
<section class="header__section" >
    <article class="header__article">
        <img src= '{{asset("img/header/logo.png")}}' width="200px" heigth="200px" class="img__principal--header" alt="Logo"/>
        <h1 class="title">GACHAPÓ</h1>
    </article>

</section>
<section class="header__section--nav">
    <nav>
        <div class="menu__responsive">
            <div class="menu_bar">
                <a  class="boton__menu"><span class="material-symbols-outlined">
                    menu
                    </span></a>
            </div>
            <ul class="header__sectionNav--ul subrayado invisible">

                <li>
                    <a class="invert_link" id="inicio" href="{{route('inicio')}}" >INICIO</a>
                </li>
                <li>
                    <a class="invert_link link" href="{{route('figures')}}" id="figuras">FIGURAS</a>
                </li>
                <li>
                    <a class="invert_link link" href="{{route('japaneseFood')}}" id="comida">COMIDA NIPONA</a>
                </li>
                <li>
                    <a class="invert_link link" href="{{route('merchandising')}}" id="merchandising">MERCHANDISING</a>
                </li>
                <li>
                    <a class="invert_link" href="{{route('gachapon')}}">GACHAPON</a>
                </li>
            </ul>
        </div>

        <ul class="header__usuario header__sectionNav--ul ">
            <li>
                <a href="{{route('carrito')}}" class="invert_link carrito"><span class="material-symbols-outlined">shopping_cart</span></a>
                <span class="num_carrito" id="num_carrito">0</span>
            </li>
            @csrf
            <li class="header__li--user">

                @auth
                    <p class="material-symbols-outlined">account_circle</p>
                    @if (Auth::user()->is_admin == 1)
                        <a class="li__user--a" href="{{route('admin')}}">{{Auth::user()->user_name}}</a>
                    @else
                        <a class="li__user--a" href="{{route('cuenta')}}">{{Auth::user()->user_name}}</a>
                    @endif
                    <form class="form_logout" method="POST" action="{{route('logout')}}">
                        @csrf
                        <a class="logout" href="{{route('logout')}}" onclick="event.preventDefault();this.closest('form').submit();"><span class="material-symbols-outlined">
                            settings_power
                            </span></a>
                    </form>
                    <input type ="hidden" name="id_user" id="id_user" value="{{Auth::user()->id}}">
                @else
                    <a class="li__user--a" href="{{route('login')}}">Conéctate</a>
                    <a class="li__user--a" href="{{route('registro')}}">Registrate</a>
                @endauth

            </li>
        </ul>
    </nav>

</section>

<script type="text/javascript" src="{!! asset('js/header/header.js') !!}" defer></script>

