import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router } from '@inertiajs/react';
import Swal from 'sweetalert2';

export default function ExperiencesCreate() {
    const [isPresent, setIsPresent] = useState(false); // Default to false
    const { data, setData, post, processing, errors } = useForm({
        company_name: '',
        job_title: '',
        image: null,
        location: '',
        start_date: '',
        end_date: '',
        description: ''
    });

    const handleCheckboxChange = (e) => {
        setIsPresent(e.target.checked);
        if (e.target.checked) {
            setData('end_date', ''); // Clear end_date if "Masih Bekerja" is checked
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Remove end_date from data if "Masih Bekerja" is checked
        const submitData = { ...data };
        if (isPresent) {
            delete submitData.end_date;
        }

        Swal.fire({
            title: 'Apakah anda yakin?',
            text: "Data akan ditambahkan.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, tambahkan!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                post(route('experiences.store'), {
                    data: submitData, // Use modified data
                    onSuccess: () => {
                        Swal.fire(
                            'Berhasil!',
                            'Data telah ditambahkan.',
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
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Tambah Pengalaman Kerja
                </h2>
            }
        >
            <Head title="Tambah Pengalaman Kerja" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <InputLabel forInput="company_name" value="Nama Perusahaan" />
                                    <TextInput
                                        id="company_name"
                                        type="text"
                                        name="company_name"
                                        value={data.company_name}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) => setData('company_name', e.target.value)}
                                    />
                                    {errors.company_name && <div className="text-red-500 mt-2">{errors.company_name}</div>}
                                </div>

                                <div className="mb-4">
                                    <InputLabel forInput="job_title" value="Jabatan" className="mt-4" />
                                    <TextInput
                                        id="job_title"
                                        type="text"
                                        name="job_title"
                                        value={data.job_title}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('job_title', e.target.value)}
                                    />
                                    {errors.job_title && <div className="text-red-500 mt-2">{errors.job_title}</div>}
                                </div>

                                <div className="mb-4">
                                    <InputLabel forInput="location" value="Lokasi" className="mt-4" />
                                    <TextInput
                                        id="location"
                                        type="text"
                                        name="location"
                                        value={data.location}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('location', e.target.value)}
                                    />
                                    {errors.location && <div className="text-red-500 mt-2">{errors.location}</div>}
                                </div>

                                <div className='mb-4'>
                                    <InputLabel forInput="start_date" value="Tanggal Mulai" className="mt-4" />
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

                                <div className="mb-4">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={isPresent}
                                            onChange={handleCheckboxChange}
                                            className="mr-2"
                                        />
                                        <span>Masih Bekerja</span>
                                    </label>
                                </div>

                                {!isPresent && (
                                    <div className="mb-4">
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
                                )}

                                <div className="mb-4">
                                    <InputLabel forInput="description" value="Deskripsi" className="mt-4" />
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
                                        href={route('experiences.index')}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold text-xs uppercase py-2 px-4 rounded"
                                    >
                                        Cancel
                                    </Link>
                                    <PrimaryButton
                                        type="submit"
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        disabled={processing}
                                    >
                                        {processing ? 'Menyimpan...' : 'Simpan'}
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}