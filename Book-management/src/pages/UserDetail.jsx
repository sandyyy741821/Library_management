import React, { useEffect, useState } from 'react';
import NavBar from '../components/navBar';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../baseURL/axios';
import './UserDetail.css';

const UserDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const res = await axios.get(`/Userbook/${id}`);
        setBook(res.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };
    fetchBookDetails();
  }, [id]);

  const handleBorrow = async () => {
    if (name.trim() === '') {
      alert('Please enter your name before borrowing.');
      return;
    }

    try {
      const res = await axios.post(`/MyAccount/${name}/${id}`);
      if (res.status === 200) {
        alert(res.data.message);
        navigate(`/MyAccount/${name}`); 
      }
    } catch (error) {
      console.error("Error borrowing the book:", error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="BookDetail">
        {book.title && (
          <div>
            <h3>Title: {book.title}</h3>
            <h3>Author: {book.author}</h3>
            <button className='cancel'>Return</button>
          </div>
        )}
      </div>
    </>
  );
};

export default UserDetail;