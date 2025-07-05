<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Bootcamp;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BootcampController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $bootcamps = Bootcamp::all();
        return Inertia::render('Admin/Bootcamps/index', ['bootcamp' => $bootcamps]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Bootcamps/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('bootcamp', 'public');
            $validated['image'] = $imagePath;
        }

        Bootcamp::create($validated);
        return redirect()->route('bootcamp.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $bootcamp = Bootcamp::findOrFail($id);
        return Inertia::render('Admin/Bootcamps/view', ['bootcamp' => $bootcamp]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $bootcamp = Bootcamp::findOrFail($id);
        return Inertia::render('Admin/Bootcamps/update', ['bootcamp' => $bootcamp]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $bootcamp = Bootcamp::findOrFail($id);

        $imagePath = $bootcamp->image; 
        if ($request->hasFile('image')) {
            if ($bootcamp->image) {
                Storage::disk('public')->delete($bootcamp->image);
            }
            $imagePath = $request->file('image')->store('bootcamp', 'public');
        }

        $bootcamp = Bootcamp::findOrFail($id);
        $bootcamp->update(
            [
                'name' => $validated['name'],
                'description' => $validated['description'],
                'start_date' => $validated['start_date'],
                'end_date' => $validated['end_date'],
                'image' => $imagePath,
            ]
        );

        return redirect()->route('bootcamp.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $bootcamp = Bootcamp::findOrFail($id);
        $bootcamp->delete();

        return redirect()->route('bootcamp.index');
    }
}
