import React from "react";
import { motion } from "framer-motion";

const About = () => {
    return (
        <motion.section
            id="about"
            className="w-full py-24 bg-gradient-to-br from-black via-gray-800 to-black text-orange-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
        >
            <div className="container mx-auto px-6">
                <motion.h2
                    initial={{ y: -30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl font-bold mb-16 text-center relative inline-block"
                >
                    About Me
                    <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-orange-400 to-indigo-500 rounded-full"></span>
                </motion.h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 items-center max-w-6xl mx-auto">
                    {/* Photo */}
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="flex justify-center"
                    >
                        <img
                            src="/images/FotoUNS.jpg"
                            alt="Nanang Ardiansyah"
                            className="w-64 h-max rounded-3xl shadow-2xl border-4 border-orange-500 object-cover transform hover:scale-105 transition duration-300"
                        />
                    </motion.div>

                    {/* Description */}
                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="text-white text-[1.05rem] leading-relaxed space-y-5"
                    >
                        <p>
                            I am a 5th semester student of{" "}
                            <span className="text-orange-400 font-medium">
                                D3 Informatics Engineering at UNS
                            </span>{" "}
                            with strong interest in{" "}
                            <span className="text-orange-400 font-medium">
                                Fullstack
                            </span>{" "}
                            and{" "}
                            <span className="text-orange-400 font-medium">
                                Web Development
                            </span>
                            .
                        </p>
                        <p>
                            Experienced as a{" "}
                            <span className="text-orange-400 font-medium">
                                Project Manager
                            </span>{" "}
                            and{" "}
                            <span className="text-orange-400 font-medium">
                                Frontend Developer
                            </span>{" "}
                            in developing the ASN AKPK system at BKPSDM Surakarta City,
                            as well as a{" "}
                            <span className="text-orange-400 font-medium">
                                Fullstack Developer
                            </span>{" "}
                            for an MRI image-based stroke detection project through the
                            DBS Foundation Coding Camp 2025 program.
                        </p>
                        <p>
                            Technologies I master include{" "}
                            <span className="text-orange-400">React</span>,{" "}
                            <span className="text-orange-400">Vue</span>,{" "}
                            <span className="text-orange-400">Next.js</span>,{" "}
                            <span className="text-orange-400">Laravel</span>,{" "}
                            <span className="text-orange-400">Express</span>, along with
                            experience in building REST APIs and database management.
                        </p>
                        <p>
                            I'm also active as{" "}
                            <span className="text-orange-400 font-medium">
                                Head of Human Resources Development Division
                            </span>{" "}
                            which has shaped my{" "}
                            <span className="text-orange-400">leadership</span> and{" "}
                            <span className="text-orange-400">team collaboration</span>{" "}
                            skills across various projects.
                        </p>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
};

export default About;