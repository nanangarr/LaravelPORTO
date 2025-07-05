import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router } from '@inertiajs/react';
import Swal from 'sweetalert2';

export default function SkillsCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        image: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: "Data akan ditambahkan.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, tambahkan!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                post(route('skills.store'), {
                    onSuccess: () => {
                        Swal.fire(
                            'Berhasil!',
                            'Data berhasil ditambahkan.',
                            'success'
                        );
                    },
                    onError: () => {
                        Swal.fire(
                            'Gagal!',
                            'Terjadi kesalahan saat menambahkan data.',
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
                    Keterampilan Saya
                </h2>
            }
        >

            <Head title="Create Skill" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h1 className="text-2xl font-bold mb-6">Create New Skill</h1>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <InputLabel htmlFor="name" value="Skill Name" />
                                <TextInput
                                    id="name"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                />
                                {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
                            </div>

                            <div className="mb-4">
                                <InputLabel htmlFor="image" value="Skill Image" />
                                <TextInput
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

                            <div className="flex items-center justify-between">
                                <Link
                                    href={route('skills.index')}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold text-xs uppercase py-2 px-4 rounded"
                                >
                                    Cancel
                                </Link>
                                <PrimaryButton
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    disabled={processing}
                                >
                                    {processing ? 'Creating...' : 'Create Skill'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};
