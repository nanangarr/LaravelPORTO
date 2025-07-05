import React, { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Swal from 'sweetalert2';

export default function ProjectsUpdate({ project, skills }) {
    const { data, setData, put, processing, errors } = useForm({
        title: project.title || '',
        description: project.description || '',
        image: null,
        link: project.link || '',
        github: project.github_link || '',
        skills: project.skills.map(skill => skill.id) || [],
        start_date: project.start_date || '', // Updated to match the correct field name
        end_date: project.end_date || '',    // Updated to match the correct field name
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: "Data akan diperbarui.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, perbarui!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                put(route('projects.update', project.id), {
                    onSuccess: () => {
                        Swal.fire(
                            'Berhasil!',
                            'Data berhasil diperbarui.',
                            'success'
                        );
                    },
                });
            }
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit Proyek
                </h2>
            }
        >
            <Head title="Edit Project" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h1 className="text-2xl font-bold mb-6">Edit Project</h1>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <InputLabel htmlFor="title" value="Project Title" />
                                <TextInput
                                    id="title"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                />
                                {errors.title && <p className="text-red-500 text-xs italic">{errors.title}</p>}
                            </div>

                            <div className="mb-4">
                                <InputLabel htmlFor="description" value="Project Description" />
                                <textarea
                                    id="description"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                />
                                {errors.description && <p className="text-red-500 text-xs italic">{errors.description}</p>}
                            </div>

                            <div className="mb-4">
                                <InputLabel htmlFor="image" value="Current Image" />
                                {project.image && (
                                    <img
                                        src={`/storage/${project.image}`}
                                        alt={project.title}
                                        className="h-40 w-40 object-cover rounded mb-2"
                                    />
                                )}
                                <InputLabel htmlFor="image" value="New Image (Leave empty to keep current)" />
                                <input
                                    type="file"
                                    id="image"
                                    className="block w-full text-sm text-gray-500
                                                                file:mr-4 file:py-2 file:px-4
                                                                file:rounded-md file:border-0
                                                                file:text-sm file:font-semibold
                                                                file:bg-blue-50 file:text-blue-700
                                                                hover:file:bg-blue-100"
                                    onChange={(e) => setData('image', e.target.files[0])}
                                />
                                {errors.image && <p className="text-red-500 text-xs italic">{errors.image}</p>}
                            </div>

                            <div className="mb-4">
                                <InputLabel htmlFor="skills" value="Select Skills" />
                                <select
                                    id="skills"
                                    multiple
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={data.skills}
                                    onChange={(e) =>
                                        setData(
                                            'skills',
                                            [...e.target.selectedOptions].map(option => option.value)
                                        )
                                    }
                                >
                                    {skills.map(skill => (
                                        <option key={skill.id} value={skill.id}>{skill.name}</option>
                                    ))}
                                </select>
                                {errors.skills && <p className="text-red-500 text-xs italic">{errors.skills}</p>}
                            </div>

                            <div className="mb-4">
                                <InputLabel htmlFor="link" value="Project link" />
                                <TextInput
                                    id="link"
                                    type="text"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={data.link}
                                    onChange={(e) => setData('link', e.target.value)}
                                />
                                {errors.link && <p className="text-red-500 text-xs italic">{errors.link}</p>}
                            </div>

                            <div className="mb-4">
                                <InputLabel htmlFor="github" value="Project github" />
                                <TextInput
                                    id="github"
                                    type="text"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={data.github_link}
                                    onChange={(e) => setData('github_link', e.target.value)}
                                />
                                {errors.github_link && <p className="text-red-500 text-xs italic">{errors.github_link}</p>}
                            </div>

                            <div className="mb-4">
                                <InputLabel htmlFor="start_date" value="Start Date" />
                                <TextInput
                                    id="start_date"
                                    type="date"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={data.start_date}
                                    onChange={(e) => setData('start_date', e.target.value)}
                                />
                                {errors.start_date && <p className="text-red-500 text-xs italic">{errors.start_date}</p>}
                            </div>

                            <div className="mb-4">
                                <InputLabel htmlFor="end_date" value="End Date" />
                                <TextInput
                                    id="end_date"
                                    type="date"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={data.end_date}
                                    onChange={(e) => setData('end_date', e.target.value)}
                                />
                                {errors.end_date && <p className="text-red-500 text-xs italic">{errors.end_date}</p>}
                            </div>

                            <div className="flex items-center justify-between">
                                <Link
                                    href={route('projects.index')}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold text-xs uppercase py-2 px-4 rounded"
                                >
                                    Cancel
                                </Link>
                                <PrimaryButton
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    disabled={processing}
                                >
                                    {processing ? 'Updating...' : 'Update Project'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
