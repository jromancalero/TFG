<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Address;
use Illuminate\Support\Facades\Hash;

class UserApiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::all();
        return response()->json($users,200);
    }
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['index', 'show','update','destroy','viewUser','userUpdate','userPassword']]);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    public function viewUser()
    {
        $user = Auth::user();
        $userId = Auth::user()->id;
        $direcciones = Address::where('user_id',$userId)->get();
        return response()->json([$user,$direcciones],200);
    }

    public function userUpdate(Request $request)
    {
        $user = Auth::user();

        $user->name = $request->get('name');
        $user->surname = $request->get('surname');
        $user->surname2 = $request->get('surname2');
        $user->user_name = $request->get('user_name');
        $user->phone = $request->get('phone');
        $user->dni = $request->get('dni');
        $user->date_birth = $request->get('date_birth');

        $user->save();
        return response()->json($user, 200);
    }
    public function userPassword(Request $request)
    {
        $user = Auth::user();
        $user->password = Hash::make($request->get('password'));
        $user->save();
        return response()->json($user->password, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return response()->json($user,200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        $user->name = $request->name;
        $user->surname = $request->surname;
        $user->surname2 = $request->surname2;
        $user->user_name = $request->user_name;
        $user->dni = $request->dni;
        $user->date_birth = $request->date_birth;

        $user->save();
        return response()->json(["nombre" => $user->name], 201);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response()->json(["eliminado"=>$user],201);
    }
}
