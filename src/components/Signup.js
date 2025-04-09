import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('User signed up!');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSignup} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4">Sign Up</h2>
        <input type="email" placeholder="Email" className="mb-2 p-2 border w-full" onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" className="mb-4 p-2 border w-full" onChange={e => setPassword(e.target.value)} required />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded w-full">Sign Up</button>
      </form>
    </div>
  );
}
