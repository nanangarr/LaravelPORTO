import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { router } from '@inertiajs/react';

export default function ExperiencesIndex({ workExperiences }) {
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('experiences.destroy', id));
            }
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Work Experiences
                </h2>
            }
        >
            <Head title="Work Experiences" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-end items-center mb-6">
                        <a
                            href={route('experiences.create')}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Create New Experience
                        </a>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className=" bg-white border ">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border border-gray-300">Company</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border border-gray-300">Position</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border border-gray-300">Image</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border border-gray-300">Location</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border border-gray-300">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {workExperiences.map((experience) => (
                                        <tr key={experience.id}>
                                            <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{experience.company_name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{experience.job_title}</td>
                                            <td className="px-6 py-4 whitespace-nowrap border border-gray-300">
                                                {experience.image && (
                                                    <img
                                                        src={`/storage/${experience.image}`}
                                                        alt={experience.title}
                                                        className="h-40 w-40 object-cover rounded"
                                                    />
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap border border-gray-300">{experience.location}</td>
                                            <td className="px-6 py-4 whitespace-nowrap border border-gray-300">
                                                <div className="flex items-center">
                                                    <a
                                                        href={route('experiences.edit', experience.id)}
                                                        className="text-indigo-600 hover:text-indigo-900 mr-2"
                                                    >
                                                        <FaEdit size={18} />
                                                    </a>
                                                    <a
                                                        href={route('experiences.show', experience.id)}
                                                        className="text-blue-600 hover:text-blue-900 mr-2"
                                                    >
                                                        <FaEye size={18} />
                                                    </a>
                                                    <button
                                                        onClick={() => handleDelete(experience.id)}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        <FaTrash size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}