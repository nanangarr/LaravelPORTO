<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Intern extends Model
{
    use HasFactory;

    protected $table = 'interns';
    protected $fillable = [
        'name',
        'start_date',
        'end_date',
        'description',
        'image',
    ];
}
