import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import ProjectsSection from './Sections/Projects';
import ExperiencesSection from './Sections/Experiences';
import SkillsSection from './Sections/Skills';
import CertificatesSection from './Sections/Certificates';
import Header from './NavigasiBar/Header';
import Hero from './Hero';
import About from './Sections/About';
import BootcampSection from './Sections/Bootcamp';
import Contact from './Sections/Contact';

export default function Index() {
    const { props } = usePage();
    const { projects, experiences, skills, certificates, bootcamps } = props;

    return (
        <div className="bg-gradient-to-br from-black via-gray-800 to-black text-orange-400">

            {/* Navigation */}
            <Header />

            {/* Hero Section */}
            <Hero />

            {/* About Section */}
            <About />

            {/* Projects Section */}
            <ProjectsSection projects={projects} />

            {/* Experiences Section */}
            <ExperiencesSection experiences={experiences} />

            {/* Skills Section */}
            <SkillsSection skills={skills} />

            <BootcampSection bootcamps={bootcamps} />

            {/* Certificates Section */}
            <CertificatesSection certificates={certificates} />

            {/* Contact Section */}
            <Contact />

            {/* Footer */}
            <footer className="py-8 bg-gradient-to-tr from-black via-gray-800 to-black text-orange-400 text-center">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-orange-300">
                        © 2025 My Portfolio. Built with Laravel & React.
                    </p>
                </div>
            </footer>
        </div>
    );
}