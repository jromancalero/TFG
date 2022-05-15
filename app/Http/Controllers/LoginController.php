<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Requests\RegistroRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    public function registroForm()
    {
        return view('auth.registro');
    }

    public function registro(RegistroRequest $request)
    {
        $user = User::create([
            'name' => $request->name,
            'surname' => $request->surname,
            'surname2' => $request->surname2,
            'user_name' => $request->user_name,
            'email' => $request->email,
            'dni' => $request->dni,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
        ]);

        Auth::login($user);
        //return $user;
        return redirect('cuenta');
    }

    public function loginForm()
    {
        return view('auth.login');
    }

    public function login(Request $request)
    {
        $credenciales = $request->only('user_name','password');
        if (Auth::attempt($credenciales))
        {
            //Autenticación válida
            return redirect('cuenta');
        } else {
            $error = 'Error al acceder a la aplicación';
            return view('auth.login', compact('error'));
        }
    }

    public function logout(Request $request)
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/');
    }
}
