import React, { Fragment } from 'react';
import './navBar.css';
import { Link } from 'react-router-dom';

const navBar = () => {
  return (
    <div className='container'>
      <div className='container-div'>
        <h1>Library Books</h1>
        <div className='list'>
          <ul>

            <Link to="/home" className='link-home'>
              <li>Home |</li>
            </Link>

            <Link to={`/MyAccount`} className='link-myaccount'>
                <li>MyAccount</li>
            </Link>
            
          </ul>
        </div>
      </div>
    </div>
  );
};

export default navBar;
