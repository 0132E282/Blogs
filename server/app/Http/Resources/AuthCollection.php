<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;

class AuthCollection extends JsonResource
{
    protected $data;
    public function __construct($resource, $data)
    {
        parent::__construct($resource);
        $this->data = $data;
    }
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'message' => $this->data['message'],
            'data' => [
                'id' => $this->id,
                'name' => $this->name,
                'email' => $this->email,
                'created_at' => $this->created_at,
                'updated_at' => $this->updated_at,
            ],
            'JWT' => [
                'access_token' => $this->data['access_token'],
                'refresh_token' => $this->data['refresh_token'],
                'token_type' => 'bearer',
                'expires_in' => time() + (auth('api')->factory()->getTTL() * 60),
            ]
        ];
    }
}
