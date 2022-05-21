<?php

namespace App\Http\Requests\api;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class ProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => ['required','string','max:35','min:2'],
            'type' => ['required','string','max:20','min:2'],
            'size' => ['string','max:20'],
            'price' => ['required','numeric'],
            'description' => ['required','string','max:255'],
            'stock' => ['required','numeric'],
        ];
    }

    public function messages()
    {
        return[
            'name.required' => 'El nombre es obligatorio',
            'name.max' => 'La longitud máxima del nombre es de 35 carácteres',
            'name.min' => 'La longitud minima del nombre es de 2 carácteres',
            'type.required' => 'El tipo de producto es obligatorio',
            'type.max' => 'La longitud máxima del tipo es de 20 carácteres',
            'type.min' => 'La longitud minima del tipo es de 2 carácteres',
            'size.max' => 'La longitud máxima de la talla es de 20 carácteres',
            'price.required' => 'El precio es obligatorio',
            'description.required' => 'La descripción es obligatoria',
            'description.max' => 'La longitud máxima de la descripción es de 255 carácteres',
            'stock.required' => 'El stock es obligatorio',
        ];


    }
}
