import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router } from '@inertiajs/react';
import Swal from 'sweetalert2';

export default function BootcampCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        start_date: '',
        end_date: '',
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
                post(route('bootcamp.store'), {
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
                    Tambah Bootcamp
                </h2>
            }
        >
            <Head title="Create Bootcamp" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={handleSubmit}>
                            <div className='mb-4'>
                                <InputLabel htmlFor="name" value="Nama Bootcamp" />
                                <TextInput
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) => setData('name', e.target.value)}
                                />
                                {errors.name && <div className="text-red-500 mt-2">{errors.name}</div>}
                            </div>

                            <div className='mb-4'>
                                <InputLabel htmlFor="description" value="Deskripsi Bootcamp" />
                                <textarea
                                    id="description"
                                    type="text"
                                    name="description"
                                    value={data.description}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('description', e.target.value)}
                                />
                                {errors.description && <div className="text-red-500 mt-2">{errors.description}</div>}
                            </div>

                            <div className='mb-4'>
                                <InputLabel htmlFor="start_date" value="Tanggal Mulai" />
                                <TextInput
                                    id="start_date"
                                    type="date"
                                    name="start_date"
                                    value={data.start_date}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('start_date', e.target.value)}
                                />
                                {errors.start_date && <div className="text-red-500 mt-2">{errors.start_date}</div>}
                            </div>

                            <div className='mb-4'>
                                <InputLabel htmlFor="end_date" value="Tanggal Selesai" />
                                <TextInput
                                    id="end_date"
                                    type="date"
                                    name="end_date"
                                    value={data.end_date}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('end_date', e.target.value)}
                                />
                                {errors.end_date && <div className="text-red-500 mt-2">{errors.end_date}</div>}
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
                                    {processing ? 'Create...' : 'Create Bootcamp'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}