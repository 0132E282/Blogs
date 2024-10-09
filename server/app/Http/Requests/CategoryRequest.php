<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\str;

class CategoryRequest extends FormRequest
{

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules =  [
            'name' => ['required', 'max:50'],
            'status' => ['in:active,inactive'],
            'description' => ['max:255'],
            'parent_id' => ['nullable', 'exists:categories,id'],
        ];
        switch ($this->method()) {
            case "POST":
                $rules['type'] =  ['required', 'in:blogs,products'];
                return $rules;
            default:
                return [];
        }
    }
    public function passedValidation()
    {
        switch ($this->method()) {
            case "POST":
                $this->merge(['user_id' => auth('api')->id()]);
            case "PATCH":
            case "PUT":
                $this->slug ?? $this->merge(['slug' => Str::slug($this->name) . '.' . rand(0000, 9999)]);
                break;
            default:
                $this->merge([
                    'filter' => [
                        'status' => $this->status ?? 'active',
                        'type' => $this->type,
                    ]
                ]);
                break;
        }
    }
}
