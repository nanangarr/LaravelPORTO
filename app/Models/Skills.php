<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Skills extends Model
{
    use HasFactory;

    protected $table = 'skills';

    protected $fillable = [
        'name',
        'image',
    ];

    public function projects()
    {
        return $this->belongsToMany(Projects::class, 'project_skill');
    }
}
