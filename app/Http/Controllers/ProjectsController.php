<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Skills;
use App\Models\Projects;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProjectsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Ambil semua project beserta relasi skills
        $projects = Projects::with('skills')->latest()->get();
        return Inertia::render('Admin/Projects/index', [
            'projects' => $projects,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Ambil semua skill untuk ditampilkan di form
        $skills = Skills::all();
        return Inertia::render('Admin/Projects/create', [
            'skills' => $skills,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //validasi inputan
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'link' => 'nullable|url',
            'github_link' => 'nullable|url',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'skills' => 'array',
            'skills.*' => 'exists:skills,id',
        ]);

        //menyimpan gambar jika ada
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('projects', 'public');
        }

        //membuat data project baru
        $project = Projects::create([
            'title' => $request->title,
            'description' => $request->description,
            'image' => $imagePath,
            'link' => $request->link,
            'github_link' => $request->github_link,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
        ]);

        //simpan relasi many-to-many dengan skills
        if ($request->has('skills')) {
            $project->skills()->attach($request->skills);
        }

        return redirect()->route('projects.index')->with('success', 'Project created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $project = Projects::with('skills')->findOrFail($id);
        return Inertia::render('Admin/Projects/view', [
            'project' => $project,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $project = Projects::with('skills')->findOrFail($id);
        $skills = Skills::all();
        return Inertia::render('Admin/Projects/update', [
            'project' => $project,
            'skills' => $skills,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //validasi inputan
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'link' => 'nullable|url',
            'github_link' => 'nullable|url',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'skills' => 'array',
            'skills.*' => 'exists:skills,id',
        ]);

        // Ambil project berdasarkan ID
        $project = Projects::findOrFail($id);

        //menyimpan gambar jika ada
        $imagePath = $project->image;
        if ($request->hasFile('image')) {
            if ($imagePath) {
                Storage::disk('public')->delete($imagePath);
            }
            $imagePath = $request->file('image')->store('projects', 'public');
        }

        //update data project
        $project->update([
            'title' => $request->title,
            'description' => $request->description,
            'image' => $imagePath,
            'link' => $request->link,
            'github_link' => $request->github_link,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
        ]);

        //simpan relasi many-to-many dengan skills
        if ($request->has('skills')) {
            $project->skills()->sync($request->skills);
        }

        return redirect()->route('projects.index')->with('success', 'Project updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Ambil project berdasarkan ID
        $project = Projects::findOrFail($id);

        // Hapus gambar jika ada
        if ($project->image) {
            Storage::disk('public')->delete($project->image);
        }

        // Hapus relasi many-to-many dengan skills
        $project->skills()->detach();

        // Hapus project
        $project->delete();

        return redirect()->route('projects.index')->with('success', 'Project deleted successfully.');
    }
}
