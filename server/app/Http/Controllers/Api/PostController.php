<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PostRequest;
use App\Http\Resources\Post\PostCollection;
use App\Http\Resources\Post\PostResource;
use App\Models\Posts;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    protected $postModel;
    protected $cacheConstants;

    function __construct()
    {
        $this->postModel = new Posts();
        $this->cacheConstants =  config('constants.cache', []);
    }
    /**
     * Display a listing of the resource.
     */
    public function index(PostRequest $request)
    {
        $key = $this->cacheConstants['POSTS'] . ':' . md5(json_encode($request->input()));
        $categories = Cache::tags([$this->cacheConstants['POSTS']])->remember(
            $key,
            60 * rand(00, 60),
            function () use ($request) {
                return $this->postModel->filter($request->input())->paginate($request->input('limit', 10));
            }
        );
        return (new PostCollection($categories))->additional(['message' => 'Lấy dữ liệu thành công', 'status' => 'success']);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PostRequest $request)
    {
        try {
            if ($request->hasFile('photo_url')) {
                $file = $request->file('photo_url');
                $extension = $file->getClientOriginalExtension();
                $photoUrl = $file->storeAs('post', $request->slug . '.' . $extension);
                $photoUrl = url(Storage::url($photoUrl));
            }
            $post = $this->postModel->create([...$request->input(), 'photo_url' => $photoUrl]);
            return (new PostResource($post))->additional(['message' => 'tạo thành công', 'status' => 'success']);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage(), 'status' => 'error'], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            if (!$post = $this->postModel->find($id)) return response()->json(['message' => 'Bài đăng không tồn tại', 'status' => 'error'], 404);
            return (new PostResource($post))->additional(['message' => 'tạo thành công', 'status' => 'success']);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage(), 'status' => 'error'], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PostRequest $request, string $id)
    {
        try {
            if (!$post = $this->postModel->find($id)) return response()->json(['message' => 'Bài đăng không tồn tại', 'status' => 'error'], 404);
            if (!$post->update([...$request->input()])) return response()->json(['message' => 'cập nhập thất bại', 'status' => 'eroor'], 500);
            return (new PostResource($post))->additional(['message' => 'tạo thành công', 'status' => 'success']);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage(), 'status' => 'error'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            if (!$post = $this->postModel->find($id)) return response()->json(['message' => 'không tìm thấy bài đăng', 'status' => 'error'], 404);
            if (!$post->delete()) return response()->json(['message' => 'xóa thất bại', 'status' => 'error'], 500);
            return (new PostResource($post))->additional(['message' => 'xóa thành công', 'status' => 'success']);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage(), 'status' => 'error'], 500);
        }
    }
}
