import React, { useState, useEffect } from "react";
import { HiOutlineDownload, HiCheckCircle } from "react-icons/hi";
import { FaGithub, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { motion } from "framer-motion";
import { Head } from '@inertiajs/react';

const roles = [
    "Web Developer",
    "FrontEnd Web Developer",
    "FullStack Web Developer",
];

const socialLinks = {
    github: 'https://github.com/username',
    linkedin: 'https://linkedin.com/in/username',
    instagram: 'https://instagram.com/username',
    email: 'mailto:email@example.com',
    cv: '/path/to/cv.pdf'
};

const Hero = () => {
    const [text, setText] = useState("");
    const [roleIndex, setRoleIndex] = useState(0);

    useEffect(() => {
        let timeout;
        if (text.length < roles[roleIndex].length) {
            timeout = setTimeout(() => {
                setText(roles[roleIndex].slice(0, text.length + 1));
            }, 100);
        } else {
            timeout = setTimeout(() => {
                setText("");
                setRoleIndex((prev) => (prev + 1) % roles.length);
            }, 2000);
        }
        return () => clearTimeout(timeout);
    }, [text, roleIndex]);

    return (
        <>
            <Head>
                <title>Home - Nanang Ardiansyah</title>
            </Head>

            <motion.div
                id="home"
                className="relative w-full h-screen bg-gradient-to-br from-black via-gray-800 to-black text-orange-400 overflow-hidden flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/30 to-transparent"></div>

                {/* Floating bubbles */}
                {[...Array(10)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-orange-400/10 backdrop-blur-sm"
                        style={{
                            width: Math.random() * 100 + 50,
                            height: Math.random() * 100 + 50,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, Math.random() * 100 - 50],
                            x: [0, Math.random() * 100 - 50],
                            opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            repeatType: "reverse",
                        }}
                    />
                ))}

                <div className="container mx-auto px-4 md:px-8 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center px-4 py-2 rounded-full bg-orange-400/20 border border-orange-400/50 mb-6"
                        >
                            <HiCheckCircle className="mr-2 text-orange-400" />
                            <span className="text-sm font-medium">Available for work</span>
                        </motion.div>

                        <motion.h1
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight"
                        >
                            Hi, I'm <span className="text-orange-500">Nanang Ardiansyah</span>
                        </motion.h1>

                        <motion.h2
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-orange-300"
                        >
                            I'm a {text}
                            <motion.span
                                animate={{ opacity: [1, 0] }}
                                transition={{ duration: 0.5, repeat: Infinity }}
                                className="ml-1"
                            >
                                |
                            </motion.span>
                        </motion.h2>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8"
                        >
                            <a
                                href={socialLinks.cv}
                                download
                                className="px-6 py-3 text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-full font-medium flex items-center hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300"
                            >
                                Download CV
                                <HiOutlineDownload className="ml-2" />
                            </a>

                            <div className="flex gap-3">
                                {[
                                    { icon: <FaGithub />, href: socialLinks.github },
                                    { icon: <FaLinkedinIn />, href: socialLinks.linkedin },
                                    { icon: <FaInstagram />, href: socialLinks.instagram },
                                    { icon: <HiOutlineMail />, href: socialLinks.email },
                                ].map((social, i) => (
                                    <a
                                        key={i}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm hover:bg-teal-500/30 hover:border-teal-400/50 border border-transparent transition-all duration-300"
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default Hero;