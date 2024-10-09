<?php

namespace App\Http\Resources\Post;

use App\Http\Resources\paginationResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class PostCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'data' => PostResource::collection($this->collection),
        ];
    }

    public function paginationInformation()
    {
        return ['pagination' => new paginationResource($this)];
    }
}
