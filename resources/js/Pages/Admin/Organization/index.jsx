import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { router } from '@inertiajs/react';

export default function OrganizationIndex({ organizations }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Organizations
                </h2>
            }
        >
            <Head title="Organizations" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-end items-center mb-6">
                        <a
                            href={route('organizations.create')}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Create New Organization
                        </a>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {organizations.map((organization) => (
                                        <tr key={organization.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">{organization.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <a href={route('organizations.show', organization.id)} className="text-blue-600 hover:text-blue-900 mr-4"><FaEye /></a>
                                                <a href={route('organizations.edit', organization.id)} className="text-yellow-600 hover:text-yellow-900 mr-4"><FaEdit /></a>
                                                <button onClick={() => handleDelete(organization.id)} className="text-red-600 hover:text-red-900"><FaTrash /></button>
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
    )}