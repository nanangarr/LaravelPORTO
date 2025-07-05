import React from 'react';
import { Link } from '@inertiajs/react';

export default function Navbar({ containerStyles, menuOpened, toggleMenu }) {
    const navLink = [
        { path: '#home', name: 'Home' },
        { path: '#about', name: 'About' },
        { path: '#experiences', name: 'Experience' },
        { path: '#projects', name: 'Projects' },
        { path: '#skills', name: 'Skills' },
        { path: '#bootcamp', name: 'Bootcamp' },
        { path: '#certificate', name: 'Certificate' },
        { path: '#contact', name: 'Contact', isEmail: true },
    ];

    const handleClick = (e, path, isEmail) => {
        if (isEmail) {
            e.preventDefault();
            window.location.href = path;
            if (menuOpened) toggleMenu();
            return;
        }

        if (path.startsWith('/#')) {
            e.preventDefault();
            const elementId = path.split('#')[1];
            const element = document.getElementById(elementId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                if (menuOpened) toggleMenu();
            }
        }
    };

    return (
        <nav className={`${containerStyles}`}>
            {navLink.map((link) => (
                <a
                    key={link.name}
                    href={link.isEmail ? link.path : link.path}
                    className="px-2 py-2 rounded-full hover:bg-orange-500 text-white"
                    onClick={(e) => handleClick(e, link.path, link.isEmail)}
                >
                    <div className="flexCenter">{link.name}</div>
                </a>
            ))}
        </nav>
    );
}