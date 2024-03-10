import React, { useEffect, useState, useContext } from 'react'
import { APP_TITLE_P1, APP_TITLE_P2, NAV_ITEM_ABOUT, NAV_ITEM_FAVOURITE, NAV_ITEM_SUPERHERO, NAV_LINK_ABOUT, NAV_LINK_FAVOURITES, NAV_LINK_SUPERHERO, SEARCH_TEXT } from '../../../utils/strings'
import { FaSearch } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { FaXmark } from "react-icons/fa6";
import AutoSuggestList from '../AutoSuggestList/AutoSuggestList';
import { SuperHeroAppContext } from "../../../Context/AppContext"
import Menu from '../Menu/Menu';

const Navbar = ({ superheroList, getNavItem, currentNavItem }) => {
    const { searchText, setSearchText} = useContext(SuperHeroAppContext);
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <nav className='flex-col py-4 flex sm:flex-row items-center gap-6'>
            <div className='flex flex-1 flex-row item w-full'>
                <div className=' flex flex-row flex-1 font-extrabold'>
                    <h1 className='text-white text-3xl'>{APP_TITLE_P1}</h1>
                    <h1 className=' text-red-600 text-3xl'>{APP_TITLE_P2}</h1>
                </div>
                <button className='sm:hidden' onClick={() => setMenuOpen(!menuOpen)}>
                    {!menuOpen ? <IoMenu color='white' size={30} /> : <FaXmark color='white' size={30}/>}
                </button>
            </div>

            <div className='hidden flex-[2] justify-end sm:flex'>
                <ul onClick={(e) => getNavItem(e.target.id)} className='flex flex-row text-white justify-between gap-5 font-bold text-lg lg:gap-10'>
                    <li id='superhero_nav' className={currentNavItem === NAV_ITEM_SUPERHERO ? "cursor-pointer text-red-600 underline underline-offset-8" :'cursor-pointer hover:text-red-600'}>{NAV_LINK_SUPERHERO}</li>
                    <li id='about_nav' className={currentNavItem === NAV_ITEM_ABOUT ? "cursor-pointer text-red-600 underline underline-offset-8" :'cursor-pointer hover:text-red-600'}>{NAV_LINK_ABOUT}</li>
                    <li id='fav_nav' className={currentNavItem === NAV_ITEM_FAVOURITE ? "cursor-pointer text-red-600 underline underline-offset-8" :'cursor-pointer hover:text-red-600'}>{NAV_LINK_FAVOURITES}</li>
                </ul>
            </div>
            {menuOpen && <Menu />}
            <div className='flex-1 flex flex-col justify-end w-full'>
                <form id="search-form" className={`border-2 border-white w-full ${searchText.length === 0 ? "rounded-2xl" : "rounded-t-2xl"} px-4 py-3 flex flex-row`} onSubmit={e => (e.preventDefault(), handleSearchSubmit(e.target.superheroname.value))}>
                    <input onChange={e => setSearchText(e.target.value)} value={searchText} name='superheroname' className='text-red-600 w-full bg-transparent outline-none font-semibold' type='text' placeholder={SEARCH_TEXT} />
                    <button onClick={() => setSearchText("")}>
                        {
                            searchText && searchText.length > 0 ?
                                <FaXmark color='red' />:
                                <FaSearch color='white' />
                        }
                    </button>
                </form>
                {
                    searchText ?
                        <AutoSuggestList superheroList={superheroList} />:
                        null
                }
            </div>
        </nav>
    )
}

export default Navbar