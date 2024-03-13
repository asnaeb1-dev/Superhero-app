import React, { useContext, useState } from 'react'
import { SuperHeroAppContext } from '../../../Context/AppContext';
import Modal from '../SuperheroModal/Modal';
import { LuFilter } from "react-icons/lu";

const FilterBar = ({ filterTitle }) => {
    const { modalState, setModalState } = useContext(SuperHeroAppContext);
    
    return (
        <div className='flex flex-row pb-2 sm:pb-0 items-center justify-between'>
            <div className='flex flex-row sm:hidden'>
                <h1 className='text-red-600 text-2xl font-bold'>{filterTitle}</h1>
            </div>
            <span className=' cursor-pointer' onTouchEnd={() => setModalState(true)} onClick={() => setModalState(true)}>
                <LuFilter color='white' size={24} />
            </span>
            {modalState ? <Modal /> : null}
        </div>
    )
}

export default FilterBar