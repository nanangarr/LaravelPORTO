import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function ExperiencesView({ experience }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Experience Details
                </h2>
            }
        >
            <Head title="Experience Details" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h1 className="text-2xl font-bold mb-6">{experience.company_name}</h1>

                        <table className="min-w-full table-auto border-collapse border border-gray-300">
                            <tbody>
                                <tr>
                                    <td className="px-6 py-4 font-semibold border border-gray-300">
                                        Job Title
                                    </td>
                                    <td className="px-6 py-4 border border-gray-300">
                                        {experience.job_title}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-semibold border border-gray-300">
                                        Location
                                    </td>
                                    <td className="px-6 py-4 border border-gray-300">
                                        {experience.location}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-semibold border border-gray-300">
                                        Start Date
                                    </td>
                                    <td className="px-6 py-4 border border-gray-300">
                                        {experience.start_date}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-semibold border border-gray-300">
                                        End Date
                                    </td>
                                    <td className="px-6 py-4 border border-gray-300">
                                        {experience.end_date ? experience.end_date : "Ongoing"}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-semibold border border-gray-300">
                                        Description
                                    </td>
                                    <td className="px-6 py-4 border border-gray-300">
                                        {experience.description}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-semibold border border-gray-300">
                                        Image
                                    </td>
                                    <td className="px-6 py-4 border border-gray-300">
                                        {experience.image ? (
                                            <img
                                                src={`/storage/${experience.image}`}
                                                alt={experience.company_name}
                                                className="h-40 w-40 object-cover rounded"
                                            />
                                        ) : (
                                            <p className="text-gray-500">No image available</p>
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="mt-6">
                            <Link
                                href={route("experiences.index")}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Back to Experiences
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
