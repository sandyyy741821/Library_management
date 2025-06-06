import React, { useState, useEffect } from "react";
import NavBar from "../components/navBar";
import Search from "../components/Search";
import axios from "../baseURL/axios";
import { Link } from "react-router-dom";
import './Home.css'


const Home = () => {
    const [books, setData] = useState([]);
    const [query,setQuery] = useState("");
    const handleChanges = (e)=>{
        setQuery(e.target.value)
    };
    const getQuery = async(e)=>{
        e.preventDefault();
        try{
            const res = await axios.get(`/search?query=${query}`);
            setData(res.data);
        }
        catch(error){
            setData("Search Not found");
        }
    };

    const fetchData = async () => {
        try {
            const res = await axios.get('/home'); 
            console.log(res.data);
            setData(res.data);
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <NavBar />
            <Search query={query} handleChanges={handleChanges} getQuery={getQuery}/>
            <div className="BookList">
                <ul>
                    {books.map((book) => (
                        <div className="cards" key={book.id}>
                            <Link to={`/book/${book.id}`}>
                                <img src={book.url} alt={book.title} />
                                <li>{book.title} by {book.author}</li>
                            </Link>
                        </div>
                    ))}
                </ul>
            </div>

        </>
    );
};

export default Home;
