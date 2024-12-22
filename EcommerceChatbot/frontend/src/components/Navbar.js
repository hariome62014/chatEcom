import React from 'react';

const Navbar = ({ darkMode, toggleTheme, handleLogout }) => {
    return (
        <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-lg">
            <h1 className="text-3xl font-bold">chatEcom</h1>
            <div className="flex items-center space-x-4">
                {/* Change Theme Icon */}
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full bg-blue-800 hover:bg-blue-700 transition-colors"
                    title="Change Theme"
                >
                    {darkMode ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3m6.364 1.636l-2.121 2.122M21 12h-3m-1.636 6.364l-2.122-2.121M12 21v-3m-6.364-1.636l2.121-2.122M3 12h3m1.636-6.364L8.757 7.05M16.95 16.95l-1.415 1.415" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 118.646 3.646 9.003 9.003 0 0020.354 15.354z" />
                        </svg>
                    )}
                </button>
                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
