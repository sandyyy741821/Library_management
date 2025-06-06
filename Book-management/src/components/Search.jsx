import React from 'react'
import './Search.css'
const Search = ({query,handleChanges,getQuery}) => {
  return (
    <>
        <div className='Search-div'>
            <form onSubmit={getQuery}>
                <input 
                type="text" 
                placeholder='Book Title or Author'
                value={query}
                onChange={handleChanges}
                />
                <button>Submit</button>
            </form>
        </div>
    </>
  )
}

export default Search
