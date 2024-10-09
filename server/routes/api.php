<?php

use App\Http\Controllers\Api\CategoriesController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Auth\AuthenticatedJWTController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:api')->get('user', function (Request $request) {
    return User::all();
});
Route::prefix('auth')->group(function () {
    Route::post('register', [RegisteredUserController::class, 'store'])->middleware('guest')->name('register');
    Route::controller(AuthenticatedJWTController::class)->group(function () {
        Route::post('login', 'store')->middleware('guest')->name('login');
        Route::get('profile', 'profile')->middleware('auth:api')->name('profile');
        Route::post('logout', 'destroy')->middleware('auth:api')->name('logout');
        Route::post('refresh', 'refresh')->middleware('auth:api')->name('refresh');
    });
});



Route::prefix('categories')->name('categories.')->controller(CategoriesController::class)->group(function () {
    Route::get('/', 'index')->name('get');
    Route::get('trash', 'trash');

    Route::middleware('auth')->group(function () {
        Route::post('create', 'store');
        Route::prefix("{categories}")->group(function () {
            Route::put('/',  'update');
            Route::delete('/', 'destroy');
            Route::delete('force-delete', 'forceDelete');
            Route::patch('restore', 'restore');
        });
    });
    Route::get('{categories}', 'show');
});

Route::apiResource('posts', PostController::class);
