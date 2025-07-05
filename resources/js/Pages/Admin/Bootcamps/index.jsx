import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { router } from '@inertiajs/react';

export default function BootcampsIndex({ bootcamp }) {

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Apakah anda yakin?',
            text: "Data yang dihapus tidak dapat dipulihkan!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('bootcamp.destroy', id), {
                    onSuccess: () => {
                        Swal.fire(
                            'Dihapus!',
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
                    Bootcamps
                </h2>
            }
        >
            <Head title="Bootcamps" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-end items-center mb-6">
                        <a
                            href={route('bootcamp.create')}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Create New Bootcamp
                        </a>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <table className="min-w-full table-auto border-collapse border border-gray-300">
                            <thead>
                                <tr>
                                    <th className="w-1/6 px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border border-gray-300">Bootcamp Name</th>
                                    <th className="w-1/6 px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border border-gray-300">Image</th>
                                    <th className="w-2/6 px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border border-gray-300">Description</th>
                                    <th className="w-1/6 px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider border border-gray-300">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bootcamp.map((bootcamp) => (
                                    <tr key={bootcamp.id}>
                                        <td className="px-6 py-4 border border-gray-300">{bootcamp.name}</td>
                                        <td className="px-6 py-4 border border-gray-300">
                                            {bootcamp.image && (
                                                <img
                                                    src={`/storage/${bootcamp.image}`}
                                                    alt={bootcamp.name}
                                                    className="w-20 h-max object-cover"
                                                />
                                            )}
                                        </td>
                                        <td className="px-6 py-4 border border-gray-300">{bootcamp.description}</td>
                                        <td className="px-6 py-4 whitespace-nowrap border border-gray-300 align-middle">
                                            <div className="flex items-center">
                                                <a
                                                    href={route('bootcamp.edit', bootcamp.id)}
                                                    className="text-indigo-600 hover:text-indigo-900 mr-2"
                                                >
                                                    <FaEdit size={18} />
                                                </a>
                                                <a
                                                    href={route('bootcamp.show', bootcamp.id)}
                                                    className="text-blue-600 hover:text-blue-900 mr-2"
                                                >
                                                    <FaEye size={18} />
                                                </a>
                                                <button
                                                    onClick={() => handleDelete(bootcamp.id)}
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
        </AuthenticatedLayout>
    );
}