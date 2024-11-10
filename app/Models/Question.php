<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $fillable = [
        "survey_id",
        "order_no",
        "parent_id",
        "status",
        "text",
        "description",
        "question_type",
        "is_mandatory",
    ];

    protected $casts = [
        'status' => 'boolean',
        'is_mandatory' => 'boolean',
        'question_type' => 'string',
    ];
    function survey()
    {
        return $this->belongsTo(Survey::class);
    }

    function children(){
        return $this->hasMany(Question::class, 'parent_id');
    }
}
