<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Ramsey\Uuid\Uuid;

class Posts extends Model
{
    use HasFactory;
    protected $primaryKey = 'id';
    protected $table = 'posts';
    protected $fillable = ['slug', 'title', 'type', 'status', 'content', 'category_id', 'user_id', 'description', 'photo_url'];
    public function user(): BelongsTo
    {
        return $this->belongsTo(user::class, 'user_id');;
    }
    public function Category(): BelongsTo
    {
        return $this->belongsTo(Categories::class, 'category_id');
    }
    public function scopeSearch($query, $text = '')
    {
        $textSearch = '%' . $text . '%';
        return $query->when(!empty($text), function ($query) use ($textSearch) {
            $query->where('title', 'LIKE', $textSearch);
        });
    }
    public function scopePublished($query, string $status = '')
    {
        return $query->when(!empty($status), function ($query) use ($status) {
            $query->where('status', $status);
        });
    }
    public function scopeType($query, string $type = '')
    {
        return $query->when(!empty($type), function ($query) use ($type) {
            $query->where('type', $type);
        });
    }
    public function scopeFindPostToCategory($query, string $category = '')
    {
        return $query->when(!empty($type), function ($query) use ($category) {
            $query->when(!empty($category), function ($query) use ($category) {
                $query->where('category_id', $category);
            });
        });
    }
    public function scopeFilter($query, $param = [])
    {
        extract($param);
        return $query->latest($sort ?? null, $type_sort ?? null)
            ->search($search ?? '')
            ->published(!empty($status) && $status)
            ->findPostToCategory($category ?? '')
            ->type($type ?? '')
        ;
    }
}
