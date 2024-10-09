<?php

namespace Tests\Feature\Categories;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class Get extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function get_all(): void
    {
        $response = $this->get(route('categories.get'));

        $response->assertStatus(200)
            ->assertJson([
                'get' => true,
            ]);
    }
    public function get_by_id(): void
    {
    }
}
