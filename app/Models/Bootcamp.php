<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bootcamp extends Model
{
    use HasFactory;

    protected $table = 'bootcamp';
    
    protected $fillable = [
        'name',
        'description',
        'start_date',
        'end_date',
        'image',
    ];
}
