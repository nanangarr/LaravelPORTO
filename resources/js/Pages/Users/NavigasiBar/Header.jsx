import React, { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import { FaBarsStaggered } from 'react-icons/fa6';

export default function Header() {
    const [menuOpened, setMenuOpened] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => setMenuOpened((prev) => !prev);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpened(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="fixed top-0 left-0 right-0 bg-gray-900 shadow-md z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between py-4">
                    {/* Logo */}
                    <a href="/#home" className="text-2xl sm:text-3xl font-bold text-orange-400">
                        Porto<span className="text-white">folio</span>
                    </a>

                    {/* Navbar */}
                    <div className="hidden xl:flex flex-1 justify-center">
                        <Navbar
                            containerStyles="flex gap-x-5"
                            menuOpened={menuOpened}
                            toggleMenu={toggleMenu}
                        />
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center gap-x-4 xs:gap-x-5">
                        {/* Menu Toggle */}
                        <FaBarsStaggered
                            onClick={toggleMenu}
                            className="xl:hidden cursor-pointer text-xl text-white"
                        />

                        {/* Hire Me Button */}
                        <a
                            href="#contact"
                            className="text-sm sm:text-base font-medium bg-gradient-to-r from-orange-500 to-orange-600 text-white 
                                       px-4 sm:px-6 py-2 rounded-full transition-all 
                                       duration-300 hover:bg-primary/90"
                        >
                            Hire Me
                        </a>
                    </div>
                </div>

                {/* Mobile Menu */}
                {menuOpened && (
                    <div
                        ref={menuRef}
                        className="xl:hidden absolute top-full left-0 right-0 bg-gray-900 shadow-md rounded-b-lg p-4 z-40"
                    >
                        <Navbar
                            containerStyles="flex flex-col gap-y-4"
                            menuOpened={menuOpened}
                            toggleMenu={toggleMenu}
                        />
                    </div>
                )}
            </div>
        </header>
    );
}