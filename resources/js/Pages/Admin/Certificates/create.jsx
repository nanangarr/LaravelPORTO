import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router } from '@inertiajs/react';
import Swal from 'sweetalert2';

export default function CertificateCreate() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        file: null,
        link: '',
        lisensi: '',
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
                post(route('certificates.store'), {
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
        <AuthenticatedLayout>
            <Head title="Create Certificate" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={handleSubmit}>
                            <div className='mb-4'>
                                <InputLabel htmlFor="title" value="Title" />
                                <TextInput
                                    id="title"
                                    type="text"
                                    name="title"
                                    value={data.title}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) => setData('title', e.target.value)}
                                />
                                {errors.title && <div className="text-red-500 text-sm mt-2">{errors.title}</div>}
                            </div>

                            <div className='mb-4'>
                                <InputLabel htmlFor="description" value="Description" className="mt-4" />
                                <textarea
                                    id="description"
                                    type="text"
                                    name="description"
                                    value={data.description}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('description', e.target.value)}
                                />
                                {errors.description && <div className="text-red-500 text-sm mt-2">{errors.description}</div>}
                            </div>

                            <div className='mb-4'>
                                <InputLabel htmlFor="file" value="File" className="mt-4" />
                                <input
                                    id="file"
                                    type="file"
                                    name="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={(e) => setData('file', e.target.files[0])}
                                    className={`mt-1 block w-full ${errors.file ? 'border-red-500' : ''}`}
                                />
                                {errors.file && <div className="text-red-500 text-sm mt-2">{errors.file}</div>}
                            </div>

                            <div className='mb-4'>
                                <InputLabel htmlFor="link" value="Link" className="mt-4" />
                                <TextInput
                                    id="link"
                                    type="url"
                                    name="link"
                                    value={data.link}
                                    className={`mt-1 block w-full ${errors.link ? 'border-red-500' : ''}`}
                                    onChange={(e) => setData('link', e.target.value)}
                                />
                                {errors.link && <div className="text-red-500 text-sm mt-2">{errors.link}</div>}
                            </div>
                            <div className='mb-4'>
                                <InputLabel htmlFor="lisensi" value="Lisensi" className="mt-4" />
                                <TextInput
                                    id="lisensi"
                                    type="text"
                                    name="lisensi"
                                    value={data.lisensi}
                                    className={`mt-1 block w-full ${errors.lisensi ? 'border-red-500' : ''}`}
                                    onChange={(e) => setData('lisensi', e.target.value)}
                                />
                                {errors.lisensi && <div className="text-red-500 text-sm mt-2">{errors.lisensi}</div>}
                            </div>
                            <div className="flex items-center justify-between">
                                <Link
                                    href={route('certificates.index')}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold text-xs uppercase py-2 px-4 rounded"
                                >
                                    Cancel
                                </Link>
                                <PrimaryButton
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    disabled={processing}
                                >
                                    {processing ? 'Creating...' : 'Create Project'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}