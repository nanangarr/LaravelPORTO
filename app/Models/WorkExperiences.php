<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkExperiences extends Model
{
    use HasFactory;

    protected $table = 'work_experiences';

    protected $fillable = [
        'company_name',
        'job_title',
        'location',
        'start_date',
        'end_date',
        'description',
        'image',
    ];

}
