import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { router } from '@inertiajs/react';

export default function ProjectsIndex({ projects }) {

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: "Data yang dihapus tidak dapat dikembalikan!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('projects.destroy', id), {
                    onSuccess: () => {
                        Swal.fire(
                            'Terhapus!',
                            'Data telah dihapus.',
                            'success'
                        );
                    },
                    onError: () => {
                        Swal.fire(
                            'Gagal!',
                            'Terjadi kesalahan saat menghapus data.',
                            'error'
                        );
                    }
                });
            }
        });
    };


    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Proyek
                </h2>
            }
        >
            <Head title="Proyek" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-end items-center mb-6">
                        <a
                            href={route('projects.create')}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Create New Project
                        </a>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="overflow-x-auto">
                            <table className="min-w-full table-fixed ">
                                <thead>
                                    <tr>
                                        <th className="w-1/6 px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border border-gray-300">Title</th>
                                        <th className="w-2/6 px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border border-gray-300">Description</th>
                                        <th className="w-1/6 px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border border-gray-300">Image</th>
                                        <th className="w-1/6 px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border border-gray-300">Skills</th>
                                        <th className="w-1/6 px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border border-gray-300">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.map((project) => (
                                        <tr key={project.id}>
                                            <td className="px-6 py-4 whitespace-normal border border-gray-300 break-words align-middle">{project.title}</td>
                                            <td className="px-6 py-4 whitespace-normal border border-gray-300 break-words align-middle">{project.description}</td>
                                            <td className="px-6 py-4 whitespace-nowrap border border-gray-300 align-middle">
                                                {project.image && (
                                                    <img
                                                        src={`/storage/${project.image}`}
                                                        alt={project.title}
                                                        className="h-40 w-40 object-cover rounded"
                                                    />
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-normal border border-gray-300 align-middle">
                                                {project.skills.map(skill => (
                                                    <span key={skill.id} className="inline-block bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded mr-1">
                                                        {skill.name}
                                                    </span>
                                                ))}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap border border-gray-300 align-middle">
                                                <div className="flex items-center">
                                                    <a
                                                        href={route('projects.edit', project.id)}
                                                        className="text-indigo-600 hover:text-indigo-900 mr-2"
                                                    >
                                                        <FaEdit size={18} />
                                                    </a>
                                                    <a
                                                        href={route('projects.show', project.id)}
                                                        className="text-blue-600 hover:text-blue-900 mr-2"
                                                    >
                                                        <FaEye size={18} />
                                                    </a>
                                                    <button
                                                        onClick={() => handleDelete(project.id)}
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