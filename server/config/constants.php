<?php

use App\Models\Categories;
use App\Models\Posts;

return [
    'cache' => [
        'CATEGORIES' => (new Categories())->getTable(),
        'POSTS' => (new Posts())->getTable()
    ]
];
