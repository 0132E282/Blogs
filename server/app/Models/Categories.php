<?php

namespace App\Models;

use GuzzleHttp\Psr7\Query;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Categories extends Model
{
    protected $primaryKey = 'id';
    protected $table = 'categories';
    protected $fillable = [
        'user_id',
        'status',
        'name',
        'type',
        'slug',
        'parent_id',
        'description'
    ];
    protected $dates = ['created_at', 'updated_at'];
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function parent(): BelongsTo
    {
        return $this->belongsTo(Categories::class, 'parent_id');
    }
    public function children(): HasMany
    {
        return $this->hasMany(Categories::class, 'parent_id');
    }
    public function scopeFindSlug($query, string $slug)
    {
        return $query->where('slug', $slug);
    }
    function queryWhereSearch($query, string $textSearch)
    {
        return $query->where('name', 'LIKE', $textSearch)
            ->orWhere('description', 'LIKE', $textSearch);
    }
    public function scopeSearch($query, string $search = null)
    {
        return $query->when($search !== null, function ($query) use ($search) {
            $textSearch = "%{$search}%";
            $query = $this->queryWhereSearch($query, $textSearch);
            $query->orWhereHas('children', function ($query) use ($textSearch) {
                $this->queryWhereSearch($query, $textSearch);
            });
            $query->with(['children' => function ($query) use ($textSearch) {
                $this->queryWhereSearch($query, $textSearch);
            }]);
        });
    }
    public function scopeSort($query, string $column = null, string $type = null)
    {
        return $query->orderBy($column ?? 'created_at', $type ?? 'ASC');
    }
    public function scopeFilter($query, array $filter = [])
    {
        extract($filter);

        $query
            ->when(!empty($status), function ($query) use ($status) {
                return $query->where('status', $status);
            })
            ->when(!empty($type), function ($query) use ($type) {
                return $query->where('type', $type);
            });
        return $query;
    }
    public function scopeApplyFilters($query, $request)
    {
        return $query->sort($request->sort, $request->sort_type)->search($request->search)->filter($request->filter);
    }
}
