import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignInForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password,
      });
      setMessage(response.data.message);
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard', { replace: true }); // redirect to dashboard
    } catch (error: any) {
      setMessage(error.response.data.error as string);
    }
  };

  return (
    <div className="max-w-md mx-auto m-4 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Sign In</h2>
      {message && <p className="text-red-500 mb-4">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">Username</label>
          <input
            type="text"
            id="username"
            className="form-input mt-1 block w-full"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            className="form-input mt-1 block w-full"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignInForm;