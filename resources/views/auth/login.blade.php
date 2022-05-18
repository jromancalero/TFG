
<link rel="stylesheet" href="{{asset('css/auth/login.css')}}">

<main class="main__login">
    <section class="section__login">
        <article class="article__login--img">
            <img src= '{{asset("img/header/logo.png")}}' alt="Logo"/>
        </article>
        <article class="article__login--form">
            <form action="{{route('login')}}" method="POST">
                @csrf
                <article class="titulo"><h1>LOGIN</h1></article>
                <article>
                    <label for="user_name">Nombre de usuario:</label>
                    <input type="text" name="user_name" id="user_name">
                </article>

                <article>
                    <label for="password">Contraseña:</label>
                    <input type="password" name="password" id="password">
                </article>
                <article >
                    <input class="botonLogin" type="submit" name="envair" value="Logearse">
                    <button class="botonLogin">Contraseña olvidada</button>
                </article>
            </form>
        </article>

    </section>
</main>
