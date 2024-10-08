import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import WalletConnect from './WalletConnect';

const Navbar: React.FC = () => {
    const location = useLocation();

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-xl font-bold">ZKSync Project</div>
                <div className="flex items-center space-x-4">
                    <Link
                        to="/"
                        className={`text-white ${location.pathname === '/' ? 'font-bold' : ''
                            } hover:text-purple-300`}
                    >
                        Home
                    </Link>
                    <Link
                        to="/projects"
                        className={`text-white ${location.pathname === '/projects' ? 'font-bold' : ''
                            } hover:text-purple-300`}
                    >
                        Projects
                    </Link>
                    {location.pathname === '/projects' && (
                        <WalletConnect />
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
