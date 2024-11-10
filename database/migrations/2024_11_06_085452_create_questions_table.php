<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('survey_id')->references('id')->on('surveys')->onDelete('cascade');
            $table->unsignedBigInteger('order_no');
            $table->unsignedBigInteger('parent_id')->nullable();
            $table->boolean('status')->default(0);
            $table->text('text');
            $table->text('description')->nullable();
            $table->string('question_type')->nullable();
            $table->boolean('is_mandatory')->default(false);
            
            $table->foreign('parent_id')->references('id')->on('questions')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('questions');
    }
};
