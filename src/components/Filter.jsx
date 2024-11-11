import { useState, useEffect } from 'react';

const Filter = ({filter, handleFilterChange}) => {
    return (
        <div>
           <h1>Find countries</h1> <input value={filter} onChange={handleFilterChange} /> 
        </div>
    )
}



export default Filter;