import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/operations/authAPI';
const Home = () => {
    const [query, setQuery] = useState('');
    const [responses, setResponses] = useState([]);
    const [darkMode, setDarkMode] = useState(false);
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const handleSend = async () => {
        if (query.trim() === '') return;
        const response = await axios.post('http://localhost:3001/api/chat', { query });
        setResponses([...responses, { query, response: response.data.response }]);
        setQuery('');
    };

    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    const handleLogout = (e) => {
        console.log("User logged out!");
        e.preventDefault()
        dispatch(logout(navigate))
       
    };

    return (
        <div className={darkMode ? "bg-gray-900 text-white min-h-screen" : "bg-gray-100 text-gray-900 min-h-screen"}>
            {/* Navbar Component */}
            <Navbar darkMode={darkMode} toggleTheme={toggleTheme} handleLogout={handleLogout} />

            {/* Chat Section */}
            <div className="container mx-auto mt-10 px-6">
                <div
                    className={`chat-box ${
                        darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'
                    } p-6 rounded-lg shadow-md transition-colors`}
                >
                    {responses.map((chat, index) => (
                        <div key={index} className="mb-4">
                            <p className="font-semibold">You: {chat.query}</p>
                            <p>Bot: {chat.response}</p>
                            <hr className="my-2 border-gray-300 dark:border-gray-700" />
                        </div>
                    ))}
                </div>
                <div className="input-group mt-6 flex">
                    <input
                        type="text"
                        className={`flex-1 p-4 rounded-l-lg border ${
                            darkMode
                                ? 'border-gray-700 bg-gray-900 text-white'
                                : 'border-gray-300 bg-gray-100 text-gray-800'
                        } focus:outline-none transition-colors`}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Type your query..."
                    />
                    <button
                        className="bg-blue-600 text-white px-6 py-4 rounded-r-lg hover:bg-blue-700 transition-colors"
                        onClick={handleSend}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
