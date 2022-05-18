<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('inicio');
})->name('inicio');

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
