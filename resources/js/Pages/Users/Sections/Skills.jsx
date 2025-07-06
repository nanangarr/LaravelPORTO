import React from 'react';
import { motion } from 'framer-motion';

export default function SkillsSection({ skills }) {
    // Duplicate the skills array to create a seamless loop effect
    const loopingSkills = [...skills, ...skills, ...skills, ...skills];

    return (
        <section
            id="skills"
            className="py-16 bg-gradient-to-tr from-black via-gray-800 to-black text-orange-400"
        >
            <div className="container mx-auto px-4">
                <motion.h2
                    initial={{ y: -20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-4xl font-bold mb-16 text-center relative inline-block"
                >
                    Skills
                    <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-teal-400 to-indigo-500 rounded-full"></span>
                </motion.h2>

                <div className="overflow-hidden">
                    {skills && skills.length > 0 ? (
                        <motion.div
                            className="flex gap-12"
                            initial={{ x: 0 }}
                            animate={{ x: "-100%" }}
                            transition={{
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 20,
                                ease: "linear",
                            }}
                        >
                            {loopingSkills.map((skill, index) => (
                                <div className="text-center text-orange-300 flex-shrink-0">
                                    {skill.image && (
                                        <div className="mb-4">
                                            <img
                                                src={skill.image}
                                                alt={skill.name}
                                                className="w-20 h-20 mx-auto object-contain"
                                            />
                                        </div>
                                    )}
                                    <h3 className="text-lg font-medium">
                                        {skill.name}
                                    </h3>
                            </div>
                            ))}
                        </motion.div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-orange-300 text-lg">No skills available yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}