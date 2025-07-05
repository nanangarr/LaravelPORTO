import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function BootcampsView({ bootcamp }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Bootcamp Details
                </h2>
            }
        >
            <Head title="Bootcamp Details" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h1 className="text-2xl font-bold mb-6">{bootcamp.name}</h1>

                        <table className="min-w-full table-auto border-collapse border border-gray-300">
                            <tbody>
                                <tr>
                                    <td className="px-6 py-4 font-semibold border border-gray-300">
                                        Description
                                    </td>
                                    <td className="px-6 py-4 border border-gray-300">
                                        {bootcamp.description}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-semibold border border-gray-300">
                                        Image
                                    </td>
                                    <td className="px-6 py-4 border border-gray-300">
                                        {bootcamp.image ? (
                                            <img
                                                src={`/storage/${bootcamp.image}`}
                                                alt={bootcamp.name}
                                                className="h-max w-40 object-cover rounded"
                                            />
                                        ) : (
                                            <p className="text-gray-500">No image available</p>
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-semibold border border-gray-300">
                                        Start Date
                                    </td>
                                    <td className="px-6 py-4 border border-gray-300">
                                        {bootcamp.start_date
                                            ? new Date(bootcamp.start_date).toLocaleDateString()
                                            : "N/A"}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-semibold border border-gray-300">
                                        End Date
                                    </td>
                                    <td className="px-6 py-4 border border-gray-300">
                                        {bootcamp.end_date
                                            ? new Date(bootcamp.end_date).toLocaleDateString()
                                            : "N/A"}
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="mt-6">
                            <Link
                                href={route("bootcamp.index")}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Back to Bootcamps
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
