<?php

namespace App\Http\Resources\Categories;

use App\Http\Resources\paginationResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class CategoriesCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return  [
            'data' =>  CategoryResource::collection($this->collection),
        ];
    }
    public function paginationInformation()
    {
        return ['pagination' => new paginationResource($this)];
    }
}
