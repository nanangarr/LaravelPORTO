import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function ProjectsView({ project }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Project Details
                </h2>
            }
        >
            <Head title="Project Details" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h1 className="text-2xl font-bold mb-6">{project.title}</h1>

                        <table className="min-w-full table-auto border-collapse border border-gray-300">
                            <tbody>
                                <tr>
                                    <td className="px-6 py-4 font-semibold border border-gray-300">
                                        Description
                                    </td>
                                    <td className="px-6 py-4 border border-gray-300">
                                        {project.description}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-semibold border border-gray-300">
                                        Image
                                    </td>
                                    <td className="px-6 py-4 border border-gray-300">
                                        {project.image ? (
                                            <img
                                                src={`/storage/${project.image}`}
                                                alt={project.title}
                                                className="h-40 w-40 object-cover rounded"
                                            />
                                        ) : (
                                            <p className="text-gray-500">No image available</p>
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-semibold border border-gray-300">
                                        Project Link
                                    </td>
                                    <td className="px-6 py-4 border border-gray-300">
                                        {project.link ? (
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 hover:underline"
                                            >
                                                {project.link}
                                            </a>
                                        ) : (
                                            <p className="text-gray-500">No link available</p>
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-semibold border border-gray-300">
                                        GitHub Link
                                    </td>
                                    <td className="px-6 py-4 border border-gray-300">
                                        {project.github_link ? (
                                            <a
                                                href={project.github_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 hover:underline"
                                            >
                                                {project.github_link}
                                            </a>
                                        ) : (
                                            <p className="text-gray-500">No GitHub link available</p>
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-semibold border border-gray-300">
                                        Start Date
                                    </td>
                                    <td className="px-6 py-4 border border-gray-300">
                                        {project.start_date}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-semibold border border-gray-300">
                                        End Date
                                    </td>
                                    <td className="px-6 py-4 border border-gray-300">
                                        {project.end_date
                                            ? project.end_date
                                            : "Ongoing"}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 font-semibold border border-gray-300">
                                        Skills
                                    </td>
                                    <td className="px-6 py-4 border border-gray-300">
                                        {project.skills.length > 0 ? (
                                            <div className="flex flex-wrap">
                                                {project.skills.map((skill) => (
                                                    <span
                                                        key={skill.id}
                                                        className="inline-block bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded mr-2 mb-2"
                                                    >
                                                        {skill.name}
                                                    </span>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-gray-500">
                                                No skills associated
                                            </p>
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="mt-6">
                            <Link
                                href={route("projects.index")}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Back to Projects
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
