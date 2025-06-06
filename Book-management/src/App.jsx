import React, { Fragment, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BookDetail from './pages/BookDetail';
import UserDetail from './pages/UserDetail';
import MyAccount from './pages/MyAccount';
import Error from './pages/Error';
import Login from './login_page.jsx';
import axios from './baseURL/axios.jsx';
import posthog from 'posthog-js';

posthog.init('phc_JtrL1XtrGMLiI5d7ONunXcncjGciPy11mrKX4I1rvL8', {
  api_host: 'https://app.posthog.com',
  autocapture: true,
  capture_web_vitals: true
});

const App = () => {
  const [username, setUser] = useState('');
  const [password, setpass] = useState('');
  const [message, setmessage] = useState(null);

  const sendData = async (e) => {
    e.preventDefault();
    if (username === '' || password === '') {
      setmessage('Invalid username or password');
      posthog.capture('Login Attempt', {
        status: 'failed',
        reason: 'Empty credentials',
      });
      return;
    }
    try {
      const res = await axios.post('/', { username, password }, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.status === 200 && res.data.message === 'Login successful') {
        setmessage('Login Successful');
        posthog.identify(username);
        posthog.capture('Login Attempt', {
          status: 'success',
        });
        window.location.href = '/home';
      } else {
        setmessage('Login failed');
        posthog.capture('Login Attempt', {
          status: 'failed',
          reason: 'Invalid credentials',
        });
      }
    } catch (error) {
      setmessage('Login failed');
      posthog.capture('Login Attempt', {
        status: 'failed',
        reason: 'Network/server error',
      });
      console.log('error', error);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login sendData={sendData} setUser={setUser} setpass={setpass} message={message} />} />
        <Route path="/book/:id" element={<BookDetail />} />
        <Route path="/home" element={<Home />} />
        <Route path="/MyAccount/:id" element={<UserDetail />} />
        <Route path="/MyAccount" element={<MyAccount />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
