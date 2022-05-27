<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\OrderLine;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Order;

class OrderLineApiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $userId = Auth::user()->id;
        $orderCart = Order::where([['user_id',$userId],['status','carrito']])->get();
        $orderLine = $orderCart[0]->id;
        $orderLines = OrderLine::where('order_id',$orderLine)->get();
        return response()->json($orderLines,200);
    }
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['index', 'show','store','update','destroy']]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $orderLine = new OrderLine();


        $orderLine->order_id = $request->get('order_id');
        $orderLine->product_id = $request->get('product_id');
        $orderLine->quantity = $request->get('quantity');

        $orderLine->save();
        return response()->json($orderLine, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\OrderLine  $orderLine
     * @return \Illuminate\Http\Response
     */
    public function show(OrderLine $orderLine)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\OrderLine  $orderLine
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, OrderLine $orderLine)
    {
        $orderLine->quantity = $request->get('quantity');
        $orderLine->save();
        return response()->json($orderLine, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\OrderLine  $orderLine
     * @return \Illuminate\Http\Response
     */
    public function destroy(OrderLine $orderLine)
    {
        $orderLine->delete();
        return response()->json(["eliminado"=>$orderLine],200);
    }
}
