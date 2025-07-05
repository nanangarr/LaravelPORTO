import React from 'react';
import { motion } from 'framer-motion';

export default function ExperiencesSection({ experiences }) {
    return (
        <motion.section
            id="experiences"
            className="py-20 bg-gradient-to-br from-black via-gray-800 to-black text-orange-400"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
        >
            <div className="container mx-auto px-6">
                <motion.h2
                    initial={{ y: -20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl font-bold mb-16 text-center relative inline-block"
                >
                    Work Experience
                    <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-teal-400 to-indigo-500 rounded-full"></span>
                </motion.h2>

                <div className="max-w-5xl mx-auto space-y-8">
                    {experiences && experiences.length > 0 ? (
                        experiences.map((experience) => (
                            <motion.div
                                key={experience.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="bg-gray-800 backdrop-blur-md border border-orange-400/10 p-6 rounded-xl shadow-md shadow-orange-500/20 transition-shadow"
                            >
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                    <div>
                                        <h3 className="text-xl font-semibold text-orange-400">
                                            {experience.company_name} - {experience.location}
                                        </h3>
                                        <p className="text-white text-lg font-medium italic">
                                            {experience.job_title}
                                        </p>
                                    </div>
                                    <div className="text-gray-300 mt-2 md:mt-0 text-sm">
                                        <span className="bg-white/10 text-white px-3 py-1 rounded-full">
                                            {new Date(experience.start_date).toLocaleDateString()} - {experience.end_date ? new Date(experience.end_date).toLocaleDateString() : 'Present'}
                                        </span>
                                    </div>
                                </div>

                                {experience.description && (
                                    <p className="text-white leading-relaxed">
                                        {experience.description}
                                    </p>
                                )}
                            </motion.div>
                        ))
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-white text-lg">No work experience available yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </motion.section>
    );
}
