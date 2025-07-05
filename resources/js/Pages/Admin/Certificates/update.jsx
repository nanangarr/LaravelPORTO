import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router } from '@inertiajs/react';
import Swal from 'sweetalert2';

export default function CertificateUpdate({ certificate }) {
    const { data, setData, put, processing, errors } = useForm({
        title: certificate.title || '',
        description: certificate.description || '',
        file: null,
        link: certificate.link || '',
        lisensi: certificate.lisensi || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: "Data akan diperbarui.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, perbarui!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                put(route('certificates.update', certificate.id), {
                    onSuccess: () => {
                        Swal.fire(
                            'Berhasil!',
                            'Data berhasil diperbarui.',
                            'success'
                        );
                    },
                    onError: () => {
                        Swal.fire(
                            'Gagal!',
                            'Terjadi kesalahan saat memperbarui data.',
                            'error'
                        );
                    }
                });
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Update Certificate" />
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
                                {certificate.file && (
                                    <div className="mb-2">
                                        <img src={`/storage/${certificate.file}`} alt="Uploaded File" className="w-32 h-max object-cover" />
                                    </div>
                                )}
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
                                    {processing ? 'Updating...' : 'Update Certificate'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}