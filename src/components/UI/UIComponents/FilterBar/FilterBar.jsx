import React, { useContext, useState } from 'react'
import { FaFilter } from "react-icons/fa6";
import FilterBox from '../FilterBox/FilterBox';
import { SuperHeroAppContext } from '../../../Context/AppContext';

const FilterBar = ({ filterTitle }) => {
    const { isFilterBoxOpen, setFilterBoxOpen } = useContext(SuperHeroAppContext);
    
    return (
        <div className='flex flex-row pb-2 items-center justify-between '>
            <div className='flex flex-row sm:hidden'>
                <h1 className='text-red-600 text-2xl font-bold'>{filterTitle}</h1>
            </div>
            <span onTouchEnd={() => setFilterBoxOpen(true)}>
                <FaFilter color='white' size={22} />
            </span>
            {isFilterBoxOpen ? <FilterBox /> : null}
        </div>
    )
}

export default FilterBar