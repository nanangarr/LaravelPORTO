import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function CertificatesSection({ certificates }) {
    const [selectedCertificate, setSelectedCertificate] = useState(null);

    return (
        <motion.section
            id="certificate"
            className="py-20 bg-gradient-to-tr from-black via-gray-800 to-black text-orange-400"
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
                    Certificates & Achievements
                    <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-teal-400 to-indigo-500 rounded-full"></span>
                </motion.h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto justify-center items-center">
                    {certificates && certificates.length > 0 ? (
                        certificates.map((certificate) => (
                            <motion.div
                                key={certificate.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="bg-gray-900 backdrop-blur-md border border-orange-400/10 rounded-xl shadow-lg shadow-orange-500/20 transition-all duration-300 hover:shadow-orange-500/30 hover:-translate-y-1 flex flex-col h-full"
                            >
                                {/* Certificate Image Thumbnail */}
                                <div
                                    className="cursor-pointer relative overflow-hidden"
                                    onClick={() => setSelectedCertificate(certificate)}
                                >
                                    {certificate.file ? (
                                        <img
                                            src={certificate.file}
                                            alt={certificate.title}
                                            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-48 bg-gray-800 flex items-center justify-center">
                                            <span className="text-gray-500">No preview</span>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <p className="text-white text-lg">No certificates available yet.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Image Preview Modal */}
            {selectedCertificate && (
                <div
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 cursor-pointer"
                    onClick={() => setSelectedCertificate(null)}
                >
                    <div className="relative w-full h-full max-w-4xl max-h-[90vh]">
                        <button
                            className="absolute -top-12 right-0 text-white hover:text-orange-400 transition-colors z-10"
                            onClick={() => setSelectedCertificate(null)}
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="relative w-full h-full flex items-center justify-center">
                            <img
                                src={selectedCertificate.file}
                                alt={selectedCertificate.title}
                                className="max-w-full max-h-full object-contain rounded-lg"
                            />

                            <div className="absolute bottom-4 left-0 right-0 text-center">
                                <div className="inline-block bg-black/70 px-6 py-3 rounded-lg">
                                    <h3 className="text-xl font-bold text-orange-400">
                                        {selectedCertificate.title}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </motion.section>
    );
}