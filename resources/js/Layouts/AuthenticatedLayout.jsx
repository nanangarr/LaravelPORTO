import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import {
    FiLayout,
    FiFolder,
    FiAward,
    FiBriefcase,
    FiUsers,
    FiFileText,
    FiMenu,
    FiX,
    FiChevronDown
} from 'react-icons/fi';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const MenuBar = [
        {
            name: 'Dashboard',
            icon: <FiLayout className="mr-3" size={20} />,
            route: 'dashboard'
        },
        {
            name: 'Proyek',
            icon: <FiFolder className="mr-3" size={20} />,
            route: 'projects.index'
        },
        {
            name: 'Keahlian',
            icon: <FiAward className="mr-3" size={20} />,
            route: 'skills.index'
        },
        {
            name: 'Pengalaman',
            icon: <FiBriefcase className="mr-3" size={20} />,
            route: 'experiences.index'
        },
        {
            name: 'Pelatihan',
            icon: <FiUsers className="mr-3" size={20} />,
            route: 'bootcamp.index'
        },
        {
            name: 'Sertifikat',
            icon: <FiFileText className="mr-3" size={20} />,
            route: 'certificates.index'
        }
    ]

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white shadow-md transition-all duration-300 fixed h-full`}>
                <div className="flex items-center justify-between p-4 border-b">
                    {sidebarOpen ? (
                        <Link href="/">
                            <ApplicationLogo className="block h-9 pl-5 w-auto fill-current text-gray-800" />
                        </Link>
                    ) : (
                        <Link href="/" className="flex justify-center w-full">
                            <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                        </Link>
                    )}
                    <button
                        onClick={toggleSidebar}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
                    </button>
                </div>

                <nav className="mt-4 pl-8">
                    <ul>
                        <li className='flex flex-col space-y-2'>
                            {MenuBar.map((item) => (
                                <NavLink
                                    key={item.name}
                                    href={route(item.route)}
                                    active={route().current(item.route)}
                                    className="flex items-center p-3 hover:bg-gray-50"
                                >
                                    {item.icon}
                                    {sidebarOpen && <span>{item.name}</span>}
                                </NavLink>
                            ))}
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Main Content */}
            <div className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
                {/* Top Navigation */}
                <nav className="bg-white border-b border-gray-100">
                    <div className="flex justify-end items-center h-16 px-4">
                        <div className="relative">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                        >
                                            {user.name}
                                            <FiChevronDown className="-me-0.5 ms-2" size={16} />
                                        </button>
                                    </span>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link
                                        href={route('profile.edit')}
                                    >
                                        Profil
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                    >
                                        Keluar
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </nav>

                {header && (
                    <header className="bg-white shadow">
                        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}

                <main className="">{children}</main>
            </div>
        </div>
    );
}