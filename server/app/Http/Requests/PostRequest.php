<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

class PostRequest extends FormRequest
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
        $rules = [
            'title' => ['required', 'max:70', 'min:5'],
            'status' => ['in:active,inactive'],
            'description' => ['max:255'],
            'category_id' => ['required', 'exists:categories,id'],
            'content' => ['required'],
            'type' => ['required', 'in:blogs'],
            'photo_url' => ['image', 'max:2500', 'mimes:jpeg,png,jpg,gif,svg']
        ];
        switch ($this->method()) {
            case 'POST':
                array_push($rules['photo_url'], [...$rules['photo_url'], 'required']);
                break;
            default:
                return [];
        }
        return $rules;
    }

    /**
     *  add parameters deep when passed validation
     */
    public function passedValidation()
    {
        switch ($this->method()) {
            case 'POST':
                $this->merge(['user_id' => auth('api')->id(), 'slug' => Str::slug($this->name . '_' . round(0000, 9999)) . '.html']);
                break;
            default:
                return [];
        }
    }
}
