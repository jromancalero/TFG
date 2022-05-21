<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::apiResource('api/products',App\Http\Controllers\Api\ProductController::class)->middleware('api');
Route::apiResource('api/users',App\Http\Controllers\Api\UserApiController::class)->middleware('api');
Route::apiResource('api/images',App\Http\Controllers\Api\ImageApiController::class)->middleware('api');
