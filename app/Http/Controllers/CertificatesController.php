<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Certificates;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CertificatesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $certificates = Certificates::all();
        return Inertia::render('Admin/Certificates/index', ['certificates' => $certificates]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Certificates/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'file' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'link' => 'nullable|url',
            'lisensi' => 'nullable|string',
        ]);

        $imagePath = null;
        if ($request->hasFile('file')) {
            $imagePath = $request->file('file')->store('certificates', 'public');
        }

        Certificates::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'file' => $imagePath,
            'link' => $validated['link'],
            'lisensi' => $validated['lisensi'],
        ]);
        return redirect()->route('certificates.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $certificate = Certificates::findOrFail($id);
        return Inertia::render('Admin/Certificates/view', ['certificate' => $certificate]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $certificate = Certificates::findOrFail($id);
        return Inertia::render('Admin/Certificates/update', ['certificate' => $certificate]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'file' => 'nullable|string',
            'link' => 'nullable|string',
            'lisensi' => 'nullable|string',
        ]);

        $certificate = Certificates::findOrFail($id);

        $imagePath = null;
        if ($request->hasFile('file')) {
            if ($certificate->file){
                Storage::disk('public')->delete($certificate->file);
            }
            $imagePath = $request->file('file')->store('certificates', 'public');
        } 
        
        $certificate = Certificates::findOrFail($id);
        $certificate->update([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'file' => $imagePath ?? $certificate->file,
            'link' => $validated['link'],
            'lisensi' => $validated['lisensi'],
        ]);
        return redirect()->route('certificates.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $certificate = Certificates::findOrFail($id);
        $certificate->delete();

        return redirect()->route('certificates.index');
    }
}
