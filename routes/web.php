<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
/* --------------------------------------------------------------------------------------------- */

 //Inicio

Route::get('/', function () {
    return view('inicio');
})->name('inicio');

/* --------------------------------------------------------------------------------------------- */

//Vistas de las categorias

Route::get('/figuras',function (){
    return view('categories/figures');
})->name('figures');

Route::get('/comida-nipona',function(){
    return view('categories/japaneseFood');
})->name('japaneseFood');

Route::get('/merchandising',function(){
    return view('categories/merchandising');
})->name('merchandising');

Route::get('gachapon',function(){
    return view('categories/gachapon');
})->name('gachapon');

/* ------------------------------------------------------------------------------------------------ */

//Login y registro

Route::get('/registro',[LoginController::class,'registroForm'])->name('registro');
Route::post('/registro',[LoginController::class,'registro']);
Route::get('/login',[LoginController::class,'loginForm'])->name('login');
Route::post('/login',[LoginController::class,'login']);
Route::post('/logout',[LoginController::class,'logout'])->name('logout')->middleware('auth');

Route::get('/cuenta',function(){
    return view('auth.cuenta');
})->name('cuenta')->middleware('auth');

