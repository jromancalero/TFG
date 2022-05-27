<?php

namespace App\Http\Controllers;

use App\Models\orderLine;
use Illuminate\Http\Request;

class OrderLineController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\orderLine  $orderLine
     * @return \Illuminate\Http\Response
     */
    public function show(orderLine $orderLine)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\orderLine  $orderLine
     * @return \Illuminate\Http\Response
     */
    public function edit(orderLine $orderLine)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\orderLine  $orderLine
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, orderLine $orderLine)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\orderLine  $orderLine
     * @return \Illuminate\Http\Response
     */
    public function destroy(orderLine $orderLine)
    {
        //
    }
}
