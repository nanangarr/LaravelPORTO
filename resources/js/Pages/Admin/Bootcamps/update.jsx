import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Swal from 'sweetalert2';

export default function BootcampsUpdate({ bootcamp }) {
    const { data, setData, put, processing, errors } = useForm({
        name: bootcamp.name || '',
        description: bootcamp.description || '',
        image: null,
        start_date: bootcamp.start_date || '',
        end_date: bootcamp.end_date || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        Swal.fire({
            title: 'Are you sure?',
            text: "The data will be updated.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                put(route('bootcamp.update', bootcamp.id), {
                    onSuccess: () => {
                        Swal.fire(
                            'Success!',
                            'Data has been updated.',
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
                    Edit Bootcamp
                </h2>
            }
        >
            <Head title="Edit Bootcamp" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h1 className="text-2xl font-bold mb-6">Edit Bootcamp</h1>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <InputLabel htmlFor="name" value="Bootcamp Name" />
                                <TextInput
                                    id="name"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                />
                                {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
                            </div>

                            <div className="mb-4">
                                <InputLabel htmlFor="description" value="Bootcamp Description" />
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
                                {bootcamp.image && (
                                    <img
                                        src={`/storage/${bootcamp.image}`}
                                        alt={bootcamp.title}
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
                                    href={route('bootcamp.index')}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold text-xs uppercase py-2 px-4 rounded"
                                >
                                    Cancel
                                </Link>
                                <PrimaryButton
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    disabled={processing}
                                >
                                    {processing ? 'Updating...' : 'Update Bootcamp'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
