<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Skills;
use App\Models\Bootcamp;
use App\Models\Projects;
use App\Models\Certificates;
use Illuminate\Http\Request;
use App\Models\WorkExperiences;

class PortofolioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $projects = Projects::with('skills')->latest()->get()->map(function ($project) {
            $project->skills->map(function ($skill) {
                $skill->image = $skill->image ? asset('storage/' . $skill->image) : null;
                return $skill;
            });
            $project->image = $project->image ? asset('storage/' . $project->image) : null;
            return $project;
        });
        $skills = Skills::all()->map(function ($skill) {
            $skill->image = $skill->image ? asset('storage/' . $skill->image) : null;
            return $skill;
        });

        $experiences = WorkExperiences::all()->map(function ($experience) {
            $experience->image = $experience->image ? asset('storage/' . $experience->image) : null;
            return $experience;
        });

        $certificates = Certificates::all()->map(function ($certificate) {
            $certificate->file = $certificate->file ? asset('storage/' . $certificate->file) : null;
            return $certificate;
        });

        $bootcamps = Bootcamp::all()->map(function ($bootcamp) {
            $bootcamp->image = $bootcamp->image ? asset('storage/' . $bootcamp->image) : null;
            return $bootcamp;
        });

        return Inertia::render('Users/Index', [
            'projects' => $projects,
            'experiences' => $experiences,
            'skills' => $skills,
            'bootcamps' => $bootcamps,
            'certificates' => $certificates,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
