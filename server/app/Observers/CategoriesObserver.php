<?php

namespace App\Observers;

use App\Models\Categories;
use Illuminate\Support\Facades\Cache;

class CategoriesObserver
{
    /**
     * Handle the Categories "created" event.
     */
    protected $cacheConstants;
    function __construct()
    {
        $this->cacheConstants = config('constants.cache', []);
    }
    protected function clearCache()
    {
        $categoriesKeyCache = $this->cacheConstants['CATEGORIES'] ?? [];
        if (!empty($categoriesKeyCache)) {
            Cache::tags($categoriesKeyCache)->flush();
        }
    }
    public function created(Categories $categories): void
    {
        $this->clearCache();
    }

    /**
     * Handle the Categories "updated" event.
     */
    public function updated(Categories $categories): void
    {
        $this->clearCache();
    }

    /**
     * Handle the Categories "deleted" event.
     */
    public function deleted(Categories $categories): void
    {
        $this->clearCache();
    }

    /**
     * Handle the Categories "restored" event.
     */
    public function restored(Categories $categories): void
    {
        $this->clearCache();
    }

    /**
     * Handle the Categories "force deleted" event.
     */
    public function forceDeleted(Categories $categories): void
    {
        $this->clearCache();
    }
}
