<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class OrderApiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $orders = Order::all();
        return response()->json($orders,200);
    }
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['index', 'show','store','update','destroy','orderCart']]);
    }

    public function orderCart()
    {
        $userId = Auth::user()->id;
        $orderCart = Order::where([['user_id',$userId],['status','carrito']])->get();
        return response()->json($orderCart,200);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $order = new Order();
        $order->user_id = Auth::user()->id;
        $order->status = 'carrito';
        $order->type_payment = null;
        $currentTime = date('Y-m-d');
        $order->date = $currentTime;
        $final_price = null;
        $order->save();

        return response()->json(['order user'=> $order->user_id],200);

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function show(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Order $order)
    {
        $order->status = 'pagado';
        $order->address_id = $request->get('address_id');

        $order->save();

        return response()->json($order,200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function destroy(Order $order)
    {
        //
    }
}
