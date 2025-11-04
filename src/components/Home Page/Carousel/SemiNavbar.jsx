import React, { useContext, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { UserContext } from '../../../context/UserContext';
import AuthModal from '../../AuthModal';

const SemiNavbar = () => {
    const { user, isAuthenticated } = useContext(UserContext);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    const navLinks = [
        { name: 'Meeting', path: '/banquet-page' },
        { name: 'Weddings', path: '/wedding-page' },
        { name: 'Sleep Boutique', path: '/sleep-boutique' },
        { name: 'Contacts', path: '/contact' },
    ];

    const handleAuthClick = () => {
        setIsAuthModalOpen(true);
    };

    const closeAuthModal = () => {
        setIsAuthModalOpen(false);
    };

    return (
        <>
            <div className='w-full absolute top-0 right-0 z-20 bg-transparent p-3 hover:bg-white text-white hover:text-black transition-all duration-300 ease-in-out'>
                <div className='flex flex-wrap items-center justify-center md:justify-end gap-4'>
                    <ul className='flex flex-wrap items-center justify-center gap-4 md:gap-6'>
                        {navLinks.map((link, index) => (
                            <li key={index}>
                                <Link to={link.path} className='hover:text-gray-400 transition-colors text-sm lg:text-base'>
                                    {link.name}
                                </Link>
                            </li>
                        ))}

                        {/* Auth Buttons */}
                        {!isAuthenticated ? (
                            <li>
                                <button
                                    onClick={handleAuthClick}
                                    className='hover:text-gray-400 transition-colors text-sm lg:text-base'
                                >
                                    Sign Up
                                </button>
                            </li>
                        ) : (
                            <li>
                                <Link to="/profile" className='hover:text-gray-400 transition-colors text-sm lg:text-base'>
                                    Profile
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>

            {/* Modal */}
            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={closeAuthModal}
            />
        </>
    );
};

export default SemiNavbar;
