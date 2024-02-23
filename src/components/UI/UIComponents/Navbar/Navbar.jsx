import React, { useEffect, useState, useContext } from 'react'
import { APP_TITLE_P1, APP_TITLE_P2, NAV_LINK_ABOUT, NAV_LINK_FAVOURITES, NAV_LINK_SUPERHERO, SEARCH_TEXT } from '../../../utils/strings'
import { FaSearch } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import AutoSuggestList from '../AutoSuggestList/AutoSuggestList';
import { SuperHeroAppContext } from "../../../Context/AppContext"

const Navbar = ({ superheroList }) => {
   
    const { searchText, setSearchText} = useContext(SuperHeroAppContext);

    return (
        <nav className=' flex-col flex sm:flex-row items-center gap-6'>
            <div className='flex flex-1 flex-row item w-full'>
                <div className=' flex flex-row flex-1'>
                    <h1 className='text-white text-3xl'>{APP_TITLE_P1}</h1>
                    <h1 className=' text-red-600 text-3xl'>{APP_TITLE_P2}</h1>
                </div>
                <button className='sm:hidden'>
                    <IoMenu color='white' size={30} />
                </button>
            </div>

            <div className='hidden flex-[2] justify-end sm:flex'>
                <ul className='flex flex-row text-white justify-between gap-5 font-bold text-lg lg:gap-10'>
                    <li className=' cursor-pointer hover:text-red-600'>{NAV_LINK_SUPERHERO}</li>
                    <li className=' cursor-pointer  hover:text-red-600'>{NAV_LINK_ABOUT}</li>
                    <li className=' cursor-pointer  hover:text-red-600'>{NAV_LINK_FAVOURITES}</li>
                </ul>
            </div>

            <div className='flex-1 flex flex-col justify-end w-full'>
                <form className='border-2 border-white w-full rounded-full px-4 py-3 flex flex-row' onSubmit={e => (e.preventDefault(), handleSearchSubmit(e.target.superheroname.value))}>
                    <input onChange={e => setSearchText(e.target.value)} value={searchText} name='superheroname' className='text-red-600 w-full bg-transparent outline-none' type='text' placeholder={SEARCH_TEXT} />
                    <button><FaSearch color='white' /></button>
                </form>
                <AutoSuggestList superheroList={superheroList} />
            </div>
        </nav>
    )
}

export default Navbar