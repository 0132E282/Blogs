<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\CategoryRequest;
use App\Http\Resources\Categories\CategoriesCollection;
use App\Http\Resources\Categories\CategoryResource;
use App\Models\Categories;
use Exception;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Facades\Cache;


class CategoriesController extends ResourceCollection
{
    protected $categoryModal;
    protected $cacheConstants;
    function __construct()
    {
        $this->categoryModal = new Categories();
        $this->cacheConstants = config('constants.cache', []);
    }
    /**
     * Display a listing of the resource.
     */
    public function index(CategoryRequest $request)
    {
        try {
            $key = $this->cacheConstants['CATEGORIES'] . ':' . md5(json_encode($request->input()));
            $categories = Cache::tags([$this->cacheConstants['CATEGORIES']])
                ->remember(
                    $key,
                    60 * rand(00, 60),
                    fn() => $this->categoryModal->whereNull('parent_id')->applyFilters($request)->paginate($request->limit ?? 25)
                );
            return new CategoriesCollection($categories);
        } catch (Exception $e) {
            return response()->json($e->getMessage());
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CategoryRequest $request)
    {
        try {
            $category = $this->categoryModal->create($request->input());
            return (new CategoryResource($category))->additional([
                'message' => 'created a category successfully',
                'status_code' => 201
            ])->response()->setStatusCode(201);
        } catch (Exception $e) {
            return response()->json($e->getMessage());
        }
    }


    /**
     * Display the specified resource.
     * @param  Categories:id
     */
    public function show(Categories $categories)
    {
        try {
            return (new CategoryResource($categories))
                ->additional([
                    'message' => 'created a category successfully',
                    'status_code' => 201
                ]);
        } catch (Exception $e) {
            return response()->json($e->getMessage(), $e->getCode());
        }
    }

    /**
     * Update the specified resource in storage.
     * @param Categories:id
     */
    public function update(Categories $categories, CategoryRequest $request)
    {
        try {
            $categories->update($request->input());
            return (new CategoryResource($categories))
                ->additional([
                    'message' => 'updated a category successfully',
                    'status_code' => 201,
                ])->response()->setStatusCode(201);
        } catch (Exception $e) {
            return response()->json('an error accessing again', $e->getCode());
        }
    }

    /**
     * Remove the specified resource from storage.
     * @param CategoryResource:id $categories
     */
    public function destroy(Categories $categories)
    {
        try {
            $categories->delete();
            return (new CategoryResource($categories))->additional([
                'message' => 'Destroy successfully',
                'status' => 'success'
            ]);
        } catch (Exception $e) {
            return response()->json($e->getMessage(), $e->getCode());
        }
    }
}
