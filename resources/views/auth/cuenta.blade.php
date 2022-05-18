<main class="main__cuenta">
    <section class="section__cuenta">
        <article class="article__fotoPerfil">
            <img>
        </article>
        <article class="article__user">
            <h1>{{Auth::user()->name}} {{Auth::user()->surname}} {{Auth::user()->surname2}}</h1>
            <form method="POST" action="{{route('logout')}}">
                @csrf
                <a href="{{route('logout')}}" onclick="event.preventDefault();this.closest('form').submit();">Salir</a>
            </form>
            <a href="{{route('inicio')}}">INICIO</a>
            <div>Email: {{Auth::user()->email}}</div>
            <div> DNI: {{Auth::user()->dni}}</div>
            <div> Teléfono : {{Auth::user()->phone}}</div>
            <div>Usuario : {{Auth::user()->user_name}}</div>
        </article>
    </section>
</main>
