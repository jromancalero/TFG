<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProductController;
use App\Models\Product;

/* --------------------------------------------------------------------------------------------- */

 //Inicio

Route::get('/', [ProductController::class, 'index'])->name('inicio');
Route::get('/comida-nipona',[ProductController::class, 'comidaProduct'])->name('japaneseFood');
Route::get('/merchandising',[ProductController::class, 'merchandisingProduct'])->name('merchandising');
Route::get('/figuras',[ProductController::class, 'figuraProduct'])->name('figures');

/* --------------------------------------------------------------------------------------------- */
//Vistas de las categorias

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

/* ------------------------------------------------------------------------------------------------- */

//Productos

Route::resource('/products', ProductController::class);

/* -------------------------------------------------------------------------------------------------- */

//APIS
Route::get('api/orders/cart',[App\Http\Controllers\Api\OrderApiController::class,'orderCart']);
Route::apiResource('api/products',App\Http\Controllers\Api\ProductController::class)->middleware('api');
Route::apiResource('api/users',App\Http\Controllers\Api\UserApiController::class)->middleware('api');
Route::apiResource('api/images',App\Http\Controllers\Api\ImageApiController::class)->middleware('api');
Route::apiResource('api/orders',App\Http\Controllers\Api\OrderApiController::class);

/* -------------------------------------------------------------------------------------------------- */

//RUTAS ADMIN

Route::get('/admin', function () {
    if (Auth::user()->is_admin) {
        return view('admin.index');
    } else {
        abort(403, 'Unauthorized action.');
    }
})->name('admin')->middleware('auth');
