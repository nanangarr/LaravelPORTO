import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { router } from '@inertiajs/react';

export default function CertificatesIndex({ certificates }) {

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
                router.delete(route('certificates.destroy', id), {
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
                    Certificates
                </h2>
            }
        >
            <Head title="Certificates" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-end items-center mb-6">
                        <a
                            href={route('certificates.create')}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Create New Certificate
                        </a>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className=" bg-white border border-gray-200">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Name</th>
                                        <th className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">File</th>
                                        <th className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Lisensi</th>
                                        <th className="w-2/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Deskripsi</th>
                                        <th className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {certificates.map((certificate) => (
                                        <tr key={certificate.id}>
                                            <td className="px-6 py-4 whitespace-nowrap border border-gray-200">{certificate.title}</td>
                                            <td className="px-6 py-4 whitespace-nowrap border border-gray-300">
                                                {certificate.file && (
                                                    <img
                                                        src={`/storage/${certificate.file}`}
                                                        alt="Uploaded File"
                                                        className="h-10 w-30 object-cover rounded"
                                                    />
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap border border-gray-200">{certificate.lisensi}</td>
                                            <td className="px-6 py-4 whitespace-nowrap border border-gray-200">{certificate.description}</td>
                                            <td className="px-6 py-4 whitespace-nowrap border border-gray-300 align-middle">
                                                <div className="flex items-center">
                                                    <a
                                                        href={route('certificates.edit', certificate.id)}
                                                        className="text-indigo-600 hover:text-indigo-900 mr-2"
                                                    >
                                                        <FaEdit size={18} />
                                                    </a>
                                                    <button
                                                        onClick={() => handleDelete(certificate.id)}
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
    )
}