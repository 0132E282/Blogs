<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Resources\AuthCollection;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthenticatedJWTController extends Controller
{
    public function store(LoginRequest $request)
    {
        try {
            $credentials = request(['email', 'password']);
            $token = auth()->attempt($credentials);
            if (!$token) throw new HttpException(401, 'Mật khẩu không chính xác');;
            $refresh_token =  $this->getTokenRefresh();
            return new AuthCollection(auth()->user(), [
                'status_code' => 200,
                'access_token' => $token,
                'message' => 'đặng nhập thành công',
                'refresh_token' => $refresh_token
            ]);
        } catch (HttpException $e) {
            return response()->json(['message' => $e->getMessage(), 'status_code' => $e->getStatusCode()], $e->getStatusCode());
        }
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request)
    {
        try {
            auth()->logout(true);
            return response()->json(['message' => 'đăng xuất thành công']);
        } catch (JWTException $e) {
        }
    }
    public function refresh(Request $req)
    {
        try {
            $refreshToken =  Cookie::get('refresh_token') ?? $req->refresh_token;
            $dataRefreshDecode = JWTAuth::getJWTprovider()->decode($refreshToken);
            if (!User::find($dataRefreshDecode)) throw new JWTException('không thành công');

            auth('api')->invalidate();
            $token = auth('api')->refresh();
            $refresh_token =  $this->getTokenRefresh();
            return new AuthCollection(auth()->user(), [
                'access_token' => $token,
                'message' => 'đã tạo lại WJT',
                'refresh_token' => $refresh_token
            ]);
        } catch (JWTException $e) {
        }
    }
    public function profile(Request $request)
    {
        return response()->json(auth('api')->user());
    }
    private function getTokenRefresh()
    {
        $data = [
            'sub' => auth('api')->id(),
            'random' => rand() . time(),
            'exp' => time() + config('jwt.refresh_ttl'),
        ];
        return   JWTAuth::getJWTProvider()->encode($data);
    }
}
