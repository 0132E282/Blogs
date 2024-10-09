<?php

namespace App\Providers;

use App\Models\Categories;
use App\Observers\CategoriesObserver;
use App\Pagination\CustomPaginator;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\ServiceProvider;
use Illuminate\Contracts\Pagination\LengthAwarePaginator as LengthAwarePaginatorContract;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        ResetPassword::createUrlUsing(function (object $notifiable, string $token) {
            return config('app.frontend_url') . "/password-reset/$token?email={$notifiable->getEmailForPasswordReset()}";
        });
        Categories::observe(CategoriesObserver::class);
        // JsonResource::withoutWrapping();
    }
}
