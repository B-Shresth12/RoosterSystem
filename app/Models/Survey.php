<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Survey extends Model
{
    protected $fillable = [
        'title',
        'description',
        'is_active',
    ];

    protected static function booted()
    {
        static::creating(function ($survey) {
            $survey->created_by = auth()->id();
            $survey->order_no = Survey::max('order_no') + 1;
        });
    }

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function Questions()
    {
        return $this->hasMany(Question::class);
    }
}
