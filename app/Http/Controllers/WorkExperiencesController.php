<?php

namespace App\Http\Controllers;

use App\Models\WorkExperiences;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WorkExperiencesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $workExperiences = WorkExperiences::all();
        return Inertia::render('Admin/Experiences/index', [
            'workExperiences' => $workExperiences,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Experiences/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'company_name' => 'required|string|max:255',
            'job_title' => 'required|string|max:255',
            'location' => 'nullable|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('work_experiences', 'public');
        }

        $workExperience = WorkExperiences::create([
            'company_name' => $validated['company_name'],
            'job_title' => $validated['job_title'],
            'location' => $validated['location'],
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'],
            'description' => $validated['description'],
            'image' => $imagePath,
        ]);
        return redirect()->route('experiences.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $workExperience = WorkExperiences::findOrFail($id);
        return Inertia::render('Admin/Experiences/view', ['experience' => $workExperience]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $workExperience = WorkExperiences::findOrFail($id);
        return Inertia::render('Admin/Experiences/update', ['experience' => $workExperience]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'company_name' => 'required|string|max:255',
            'job_title' => 'required|string|max:255',
            'location' => 'nullable|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($request->has('end_date') && !$request->end_date) {
            $validated['end_date'] = null; // Set end_date to null if "Masih Bekerja" is selected
        }

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('work_experiences', 'public');
        }

        $workExperience = WorkExperiences::findOrFail($id);
        $workExperience->update([
            'company_name' => $validated['company_name'],
            'job_title' => $validated['job_title'],
            'location' => $validated['location'],
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'],
            'description' => $validated['description'],
            'image' => $imagePath ? $imagePath : $workExperience->image,
        ]);

        return redirect()->route('experiences.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $workExperience = WorkExperiences::findOrFail($id);
        $workExperience->delete();

        return redirect()->route('experiences.index');
    }
}
