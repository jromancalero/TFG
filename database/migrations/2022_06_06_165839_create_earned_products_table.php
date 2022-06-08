<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('earned_products', function (Blueprint $table) {
            $table->id();
            $table->date('date')->nullable();
            $table->foreignId('user_id') ->constrained()
            ->onUpdate('cascade')
            ->onDelete('cascade');
            $table->foreignId('product_id') ->constrained()
            ->onUpdate('cascade')
            ->onDelete('cascade');
            $table->unique(['user_id','product_id'],'claves_ajenas');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('earned_products');
    }
};
