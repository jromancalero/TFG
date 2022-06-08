<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProductController;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;


/* --------------------------------------------------------------------------------------------- */
//Vistas de las categorias

Route::get('/',function(){
    return view('inicio');
})->name('inicio');

Route::get('merchandising',function(){
    return view('categories/merchandising');
})->name('merchandising');

Route::get('gachapon',function(){
    return view('categories/gachapon');
})->name('gachapon');

Route::get('figuras',function(){
    return view('categories/figures');
})->name('figures');

Route::get('/comida-nipona',function(){
    return view('categories.japaneseFood');
})->name('japaneseFood');


Route::get('/carrito',function(){
    return view('carrito.carrito');
})->name('carrito')->middleware('auth');

Route::get('/politica-privacidad',function(){
    return view('extra.politicas_privacidades');
})->name('politica-privacidad');

Route::get('/mapa-web',function(){
    return view('extra.mapa_web');
})->name('mapa-web');

Route::get('/contacto',function(){
    return view('extra.contacto');
})->name('contacto');



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
//USERS
Route::get('api/users/viewUser',[App\Http\Controllers\Api\UserApiController::class,'viewUser'])->middleware('api');
Route::put('api/users/userPassword',[App\Http\Controllers\Api\UserApiController::class,'userPassword'])->middleware('api');
Route::put('api/users/userUpdate',[App\Http\Controllers\Api\UserApiController::class,'userUpdate'])->middleware('api');
Route::get('api/users/viewUserCoin',[App\Http\Controllers\Api\UserApiController::class,'viewUserCoin'])->middleware('api');
Route::put('api/users/operationsCoins',[App\Http\Controllers\Api\UserApiController::class,'operationsCoins'])->middleware('api');
//ADDRESSES
Route::get('api/address/order/{order_id}',[App\Http\Controllers\Api\AddressApiController::class,'addressOrder']);
//ORDERS-ORDERSLINE
Route::get('api/orders/cart',[App\Http\Controllers\Api\OrderApiController::class,'orderCart']);
Route::get('api/orders/profile',[App\Http\Controllers\Api\OrderApiController::class,'paidOrderList']);
Route::get('api/orderLines/profile/{order_id}',[App\Http\Controllers\Api\OrderLineApiController::class,'listOrdersWithProducts']);
//PRODUCTS
Route::put('api/products/stock/{product}',[App\Http\Controllers\Api\ProductController::class,'updatestock']);
//API RESOURCES
Route::apiResource('api/products',App\Http\Controllers\Api\ProductController::class)->middleware('api');
Route::apiResource('api/users',App\Http\Controllers\Api\UserApiController::class)->middleware('api');
Route::apiResource('api/images',App\Http\Controllers\Api\ImageApiController::class)->middleware('api');
Route::apiResource('api/orders',App\Http\Controllers\Api\OrderApiController::class)->middleware('api');
Route::apiResource('api/orderLines',App\Http\Controllers\Api\OrderLineApiController::class);
Route::apiResource('api/addresses',App\Http\Controllers\Api\AddressApiController::class);
Route::apiResource('api/EarnedProducts',App\Http\Controllers\Api\EarnedProductApiController::class);
Route::post('/api/orderLines', 'App\Http\Controllers\Api\OrderLineApiController@store');
/* -------------------------------------------------------------------------------------------------- */

//RUTAS ADMIN

Route::get('/admin', function () {
    if (Auth::user()->is_admin) {
        return view('admin.index');
    } else {
        abort(403, 'Unauthorized action.');
    }
})->name('admin')->middleware('auth');
