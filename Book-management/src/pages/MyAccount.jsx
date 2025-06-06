import React, { useEffect, useState } from 'react';
import NavBar from '../components/navBar';
import axios from '../baseURL/axios';
import './MyAccount.css';


const YourAccount = () => {
  const { name,id } = useParams();
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        const res = await axios.get(`/MyAccount/${name}/${id}`);
        setBorrowedBooks(res.data);
      } catch (error) {
        console.error("Error fetching borrowed books:", error);
      }
    };
    fetchBorrowedBooks();
  }, [name,id]);


  return (
    <>
      <NavBar />
      <div className="Borrowed">
        <h2>Your Borrowed Books</h2>
        {borrowedBooks.length > 0 ? (
          borrowedBooks.map((book) => (
            <div key={book.id} className="book-item">
              <h3>Title: {book.title}</h3>
              <h3>Author: {book.author}</h3>
              <button
                className="return"
                onClick={() => handleReturn(book.id)}
              >
                Return
              </button>
            </div>
          ))
        ) : (
          <p>No books</p>
        )}
      </div>
    </>
  );
};

export default YourAccount;