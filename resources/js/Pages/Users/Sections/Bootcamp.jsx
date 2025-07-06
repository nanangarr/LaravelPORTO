import React from "react";
import { motion } from "framer-motion";

export default function BootcampSection({ bootcamps = [] }) {
    return (
        <motion.section
            id="bootcamp"
            className="py-20 bg-gradient-to-br from-black via-gray-800 to-black text-orange-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
            <div className="container mx-auto px-4 relative">
                <motion.h2
                    initial={{ y: -20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-4xl font-bold mb-16 text-center relative inline-block"
                >
                    Bootcamps
                    <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-teal-400 to-indigo-500 rounded-full"></span>
                </motion.h2>

                {/* Timeline container */}
                <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-700"></div>

                    {/* Bootcamp items */}
                    <div className="space-y-20">
                        {bootcamps.map((bootcamp, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <div key={bootcamp.id} className="relative">
                                    {/* Timeline dot - positioned absolutely in the center */}
                                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-orange-400 rounded-full z-10"></div>

                                    {/* Bootcamp card */}
                                    <motion.div
                                        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5 }}
                                        className={`relative ${isEven ? 'mr-auto pr-8' : 'ml-auto pl-8'}`}
                                        style={{ width: 'calc(50% - 20px)' }}
                                    >
                                        <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
                                            <div className="flex flex-col">
                                                {bootcamp.image && (
                                                    <img
                                                        src={bootcamp.image}
                                                        alt={bootcamp.name}
                                                        className="w-16 h-max mb-4"
                                                    />
                                                )}
                                                <h3 className="text-2xl font-bold text-white mb-2">
                                                    {bootcamp.name}
                                                </h3>
                                                <p className="text-sm text-gray-400 mb-4">
                                                    {bootcamp.start_date} - {bootcamp.end_date}
                                                </p>
                                                <p className="text-white mb-4">
                                                    {Array.isArray(bootcamp.description)
                                                        ? (
                                                            <ul className="list-disc pl-5">
                                                                {bootcamp.description.map((item, index) => (
                                                                    <li key={index}>{item}</li>
                                                                ))}
                                                            </ul>
                                                        ) : (
                                                            bootcamp.description.split('\n').map((line, index) => (
                                                                <p key={index}>{line}</p>
                                                            ))
                                                        )}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </motion.section>
    );
}