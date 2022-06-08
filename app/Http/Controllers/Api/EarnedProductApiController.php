<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Earned_product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class EarnedProductApiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $userId = Auth::user()->id;
        $productosGanados = Earned_product::where('user_id',$userId)->get();

        return response()->json($productosGanados,200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $earned_product = new Earned_product();

        $userId = Auth::user()->id;
        $currentTime = date('Y-m-d');
        $earned_product->date = $currentTime;
        $earned_product->product_id = $request->get('product_id');
        $earned_product->user_id = $userId;
        $earned_product->save();

        return response()->json($earned_product,200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Earned_product  $earned_product
     * @return \Illuminate\Http\Response
     */
    public function show(Earned_product $earned_product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Earned_product  $earned_product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Earned_product $earned_product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Earned_product  $earned_product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Earned_product $earned_product)
    {
        //
    }
}
