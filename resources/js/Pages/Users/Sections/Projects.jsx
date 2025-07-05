import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ProjectsSection({ projects }) {
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 6;

    // Pagination logic
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);
    const totalPages = Math.ceil(projects.length / projectsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <motion.section
            id="projects"
            className="py-20 bg-gradient-to-bl from-black via-gray-800 to-black text-orange-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
            <div className="container mx-auto px-4">
                <motion.h2
                    initial={{ y: -20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-4xl font-bold mb-16 text-center relative inline-block"
                >
                    Projects
                    <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-teal-400 to-indigo-500 rounded-full"></span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {currentProjects.map((project) => (
                        <motion.div
                            key={project.id}
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5 }}
                            className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-300 group"
                        >
                            <div className="relative overflow-hidden h-48">
                                {project.image && (
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-2xl font-bold mb-2 text-white">{project.title}</h3>
                                <p className="text-white mb-4 line-clamp-3">{project.description}</p>

                                {project.skills?.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.skills.map((skill) => (
                                            <span
                                                key={skill.id}
                                                className="px-3 py-1 bg-orange-300/50 rounded-full text-xs text-white"
                                            >
                                                {skill.name}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <div className="flex gap-3">
                                    {project.link && (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 text-center text-white px-4 py-2 bg-orange-600 hover:bg-orange-500 rounded-lg transition-colors"
                                        >
                                            Live Demo
                                        </a>
                                    )}
                                    {project.github_link && (
                                        <a
                                            href={project.github_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 text-center px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                                        >
                                            Code
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-12">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => handlePageChange(i + 1)}
                                className={`w-10 h-10 mx-1 rounded-full flex items-center justify-center ${currentPage === i + 1
                                    ? 'bg-orange-500 text-white'
                                    : 'bg-gray-800 text-white hover:bg-gray-700'
                                    } transition-colors`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </motion.section>
    );
}