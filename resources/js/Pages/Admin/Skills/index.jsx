import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { router } from '@inertiajs/react';
import Swal from 'sweetalert2';
import { FaEdit, FaTrash } from 'react-icons/fa';

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
            router.delete(route('skills.destroy', id), {
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

export default function SkillsIndex({ skills }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Keterampilan Saya
                </h2>
            }
        >
            <Head title="Skills" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-end items-center mb-6">
                        <a
                            href={route('skills.create')}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Create New Skill
                        </a>
                    </div>

                    <div className="">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
                                <thead className="">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border border-gray-300">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border border-gray-300">Image</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border border-gray-300">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {skills.map((skill) => (
                                        <tr key={skill.id} className="hover:bg-gray-100 border border-gray-300">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border border-gray-300">{skill.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap border border-gray-300">
                                                {skill.image && (
                                                    <img
                                                        src={`/storage/${skill.image}`}
                                                        alt={skill.name}
                                                        className="h-10 w-30 object-cover rounded"
                                                    />
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-4">
                                                <a
                                                    href={route('skills.edit', skill.id)}
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                >
                                                    <FaEdit size={18} />
                                                </a>
                                                <button
                                                    onClick={() => handleDelete(skill.id)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    <FaTrash size={18} />
                                                </button>
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