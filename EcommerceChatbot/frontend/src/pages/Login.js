import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import HighlightText from '../components/HighlightText';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/operations/authAPI';

const Login = () => {

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const { email, password } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }


  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(login(email, password, navigate))
    
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Toaster position="top-right" />
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">Welcome to <HighlightText  text={"chatEcom"}/></h1>
        <p className="text-gray-600 text-center mb-6">Login to your account</p>
        <form onSubmit={handleOnSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              name='email'
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={email}
              onChange={handleOnChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name='password'
              id="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={password}
              onChange={handleOnChange}
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 px-4 text-white font-semibold rounded-md shadow-sm bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? <span className="loader inline-block w-5 h-5 border-2 border-t-2 border-white rounded-full animate-spin"></span> : 'Login'}
          </button>
        </form>
        <div className="flex justify-between items-center mt-4 text-sm">
          <a href="#" className="text-blue-600 hover:underline" onClick={() => toast.info('Reset password flow')}>Forgot Password?</a>
          <a href="/signup" className="text-blue-600 hover:underline" onClick={() => toast.info('Redirect to registration')}>Register</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
