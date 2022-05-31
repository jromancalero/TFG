<?php

namespace App\Http\Requests;
use Illuminate\Validation\Rules\Password;
use Illuminate\Foundation\Http\FormRequest;


class RegistroRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => ['required','string','max:20'],
            'surname' => ['required','string','max:20'],
            'surname2' => ['string','max:20'],
            'user_name' => ['required','string','min:3','max:15','unique:users'],
            'dni' => ['required','string','min:9','max:9','unique:users'],
            'email' => ['required','string','max:30','unique:users'],
            'password' => ['required','confirmed', Password::defaults()],
            'date_birth' => ['required'],

        ];
    }

    public function messages()
    {
        return[
            'name.required' => 'El nombre es obligatorio',
            'name.max' => 'La longitud máxima del nombre es de 20 carácteres',
            'surname.required' => 'El apellido es obligatorio',
            'surname.max' => 'La longitud máxima del apellido es de 20 carácteres',
            'surname2.max' => 'La longitud máxima del segundo apellido es de 20 carácteres',
            'user_name.required' => 'El nombre de usuario es obligatorio',
            'user_name.min' => 'La longitud minima del nombre de usuario es de 3 carácteres',
            'user_name.max' => 'La longitud maxima del nombre de usuario es de 15 carácteres',
            'user_name.unique' => 'El nombre de este usuario ya existe',
            'dni.required' => 'El DNI es obligatorio',
            'dni.min' => 'El DNI debe de tener al menos 6 carácteres',
            'dni.max' => 'El DNI debe de tener como máximo 9 carácteres',
            'dni.unique' => 'El DNI introducido ya está en uso',
            'email.required' => 'El email es obligatorio',
            'email.max' => 'El máximo de carácteres del email no debe ser superior a 30',
            'email.unique' => 'El email introducido, ya está en uso',
            'password.required' => 'La contraseña es obligatoria',
            'password.confirmed' => 'Las contraseñas no coinciden',
            'password.min' => 'La contraseña debe tener al menos 8 caracteres',
            'date_birth.required' => 'La fecha de nacimineto es obligatoria',

        ];
    }
}
