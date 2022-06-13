# GACHAPO
## _Tienda online japonesa_


## Installation

Gachapo necesita [Node.js](https://nodejs.org/) v10+ y[Laravel](https://laravel.com/docs/9.x/installation) v9+ para funcionar.

Clona en gitHub [GithubJorge](https://github.com/jromancalero/TFG) u obtén el proyecto desade el pen 
Instala [Node.js](https://nodejs.org/) y [XAMPP](https://www.apachefriends.org/es/index.html)

Si se requiere, instale tambien el composer y laravel

```sh
composer global require laravel/installer
```

Instala todas las dependencias necesarias

```sh
npm install 
```
Dentro del proyecto en .env deberás de poner el nombre de la base de datos que deseas, al igual que al crearla en phpMyAdmin

Realiza desde el proyecto el siguiente comando:
```sh
php artisan migrate
```
Luego vuelca los datos de la BBDD que se te proporciona dentro del proyecto en phpMyAdmin en la base de datos seleccionada.

Para poner la web en marcha deberás realizar el siguiente comando:

```sh
php artisan serve
```
Se abrirá la pagina con el proyecto y podrás interaccionar a tu gusto con la web

