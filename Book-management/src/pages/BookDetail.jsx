import React, { useEffect, useState } from 'react'
import NavBar from '../components/navBar'
import { useParams,useNavigate } from 'react-router-dom'
import axios from '../baseURL/axios'
import './BookDetail.css'
import { Link } from 'react-router-dom'
const BookDetail = () => {
  const{id}=useParams();
  const navigate = useNavigate();
  const [bId,setbId]=useState({});

  useEffect(()=>{
    const fetchById=async()=>{
      try{
        const res=await  axios.get(`/book/${id}`);
        setbId(res.data);

      }catch(error){
        console.log("error:",error);
      }
    }
    fetchById();
  },[id]);
  const handleClick = ()=>{
    alert("You borrowed the book Successfully!")
  };
  return (
    <>
      <NavBar />
      <div className="BookDetail">
      {bId.title && (
      <>
            <h3>Title: {bId.title}</h3>
            <h3>Author: {bId.author}</h3>
            <img src={`/${bId.url}`} alt={bId.title} />
            <p><strong>Description:{bId.author}</strong></p> 
       <Link to={`/MyAccount/${bId.id}`}><button className="borrow" onClick={handleClick}>Borrow</button></Link>
        </>
      )};
      </div>
    </>
  )
}


export default BookDetail
