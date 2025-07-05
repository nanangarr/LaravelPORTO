<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\InternController;
use App\Http\Controllers\SkillsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\BootcampController;
use App\Http\Controllers\ProjectsController;
use App\Http\Controllers\PortofolioController;
use App\Http\Controllers\CertificatesController;
use App\Http\Controllers\OrganizationController;
use App\Http\Controllers\WorkExperiencesController;
use App\Http\Controllers\ContactController;

Route::get('/', [PortofolioController::class, 'index'])->name('home');

Route::get('/Welcome', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Admin/Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('projects', ProjectsController::class);
    Route::resource('skills', SkillsController::class);
    Route::resource('experiences', WorkExperiencesController::class);
    Route::resource('organizations', OrganizationController::class);
    Route::resource('bootcamp', BootcampController::class);
    Route::resource('certificates', CertificatesController::class);
});

// Route for handling contact form submission
Route::post('/contact', [ContactController::class, 'sendEmail'])->name('contact.send');

require __DIR__ . '/auth.php';
