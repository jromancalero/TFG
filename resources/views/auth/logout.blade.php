@auth()
    Bienvenido {{Auth::user()->user_name}}

    <form method="POST" action="{{route('logout')}}">
        @csrf
        <a href="{{route('logout')}}" onclick="event.preventDefault();this.closest('form').submit();">Salir</a>
    </form>
@else
    <a href="{{route('login')}}">Conéctate</a>
    <a href="{{route('registro')}}">Registrate</a>
@endauth
