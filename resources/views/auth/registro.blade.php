<link rel="stylesheet" href="{{asset('css/auth/registro.css')}}">
<main class="main__registro">
    <section class="section__registro">
        <article class="article__registro--img">
            <img src= '{{asset("img/header/logo.png")}}' width="200px" heigth="200px" alt="Logo"/>
        </article>
        <article class="article__registro--form">
            <form action="{{route('registro')}}" method="POST">
                @csrf
                    <h1>REGISTRO</h1>
                    <div>
                        <label for="name">Nombre</label>
                        <input type="text" name="name" id="name">
                    </div>
                    <div>
                        <label for="surname">Primer apellido</label>
                        <input type="text" name="surname" id="surname">
                    </div>
                    <div>
                        <label for="surname2">Segundo Apellido</label>
                        <input type="text" name="surname2" id="surname2">
                    </div>
                    <div>
                        <label for="user_name">Nombre de Usuario</label>
                        <input type="text" name="user_name" id="user_name">
                    </div>
                    <div>
                        <label for="dni">DNI</label>
                        <input type="text" name="dni" id="dni">
                    </div>
                    <div>
                        <label for="email">Email:</label>
                        <input type="email" name="email" id="email">
                    </div>
                    <div>
                        <label for="password">Contraseña</label>
                        <input type="password" name="password" id="password">
                    </div>
                    <div>
                        <label for="password_confirmation">Contraseña</label>
                        <input type="password" name="password_confirmation" id="password_confirmation">
                    </div>
                    <div>
                        <label for="phone">Numero de telefono</label>
                        <input type="number" name="phone" id="phone" placeholder="Opcional">
                    </div>
                    <div>
                        <label for="date_birth">Fecha de nacimiento</label>
                        <input type="date" name="date_birth" id="date_birth">
                    </div>
                    <div class="div__botonEnviar">
                        <a class="botonEnviar" href="{{route('inicio')}}">Inicio</a>
                        <input class="botonEnviar" type="submit" name="enviar" value="Registrarse">
                    </div>

                </form>

                @if($errors->any())
                    <ul>
                        @foreach ($errors->all() as $error )
                            <li>{{$error}}</li>
                        @endforeach
                    </ul>
                @endif

        </article>
    </section>
</main>

