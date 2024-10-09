<?php

namespace App\Http\Resources\Categories;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $getDetails = $request->get === 'detail';
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'count_blogs' => 0,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated,
            'status' => $this->status,
            'description' => $this->description,
            'type' => $this->type,
            'user' => $getDetails ? $this->user : null,
            'parent' => $this->parent,
            'children' => !empty($this->children) &&  $getDetails ? $this->collection($this->children) : [],
        ];
    }
    /**
     * Get additional data that should be returned with the resource array.
     *
     * @return array<string, mixed>
     */
    public function with(Request $request): array
    {
        return [];
    }
}
