import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function OrganizationSection({ organizations }) {
    return (
        <AuthenticatedLayout >
            <section
                id="organization"
                className="py-20 bg-gradient-to-br from-black via-gray-800 to-black text-orange-400"
            >
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold mb-16 text-center relative inline-block">
                        Organization Experience
                        <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-teal-400 to-indigo-500 rounded-full"></span>
                    </h2>

                    <div className="max-w-5xl mx-auto space-y-8">
                        {organizations && organizations.length > 0 ? (
                            organizations.map((org) => (
                                <div
                                    key={org.id}
                                    className="bg-gray-800 backdrop-blur-md border border-orange-400/10 p-6 rounded-xl shadow-md shadow-orange-500/20 transition-shadow"
                                >
                                    <h3 className="text-xl font-semibold text-orange-400">
                                        {org.name}
                                    </h3>
                                    <p className="text-white text-lg font-medium">
                                        {org.description}
                                    </p>
                                    <p className="text-gray-300 mt-2">
                                        Duration: {org.duration} months
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="text-white text-center">
                                No organization experience available.
                            </p>
                        )}
                    </div>
                </div>
            </section>
        </AuthenticatedLayout>
    );
}