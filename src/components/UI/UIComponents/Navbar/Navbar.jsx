import React, { useEffect, useState, useContext, useRef } from 'react';
//title
import { APP_TITLE_P1, APP_TITLE_P2, NAV_ITEM_ABOUT, NAV_ITEM_FAVOURITE, NAV_ITEM_SUPERHERO, NAV_LINK_ABOUT, NAV_LINK_FAVOURITES, NAV_LINK_SUPERHERO, SEARCH_TEXT } from '../../../utils/strings';

//icons
import { FaSearch } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { FaXmark } from "react-icons/fa6";

//components
import AutoSuggestList from '../AutoSuggestList/AutoSuggestList';
import { SuperHeroAppContext } from "../../../Context/AppContext"
import Menu from '../Menu/Menu';
import useToggle from '../../../CustomHooks/useToggle';

//css
import "../../styles/navbaranim.css";
import FilterBar from '../FilterBar/FilterBar';

const Navbar = ({ superheroList, getNavItem, currentNavItem }) => {
    const { searchText, setSearchText} = useContext(SuperHeroAppContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isSearchBoxOpen, setSearchBoxOpen] = useToggle();
    const navbarRef = useRef();

    const handleSearchClearButtonClick = () => {
        if(!isSearchBoxOpen) {
            //OPEN SEARCH BOX
            setSearchBoxOpen();
            navbarRef.current.classList.remove("animate-slide-right");
            navbarRef.current.classList.add("animate-slide-left");
        } else {
            if(searchText && searchText.length > 0) {
                setSearchText("");
            } else {
                setSearchBoxOpen();
                navbarRef.current.classList.remove("animate-slide-left");
                navbarRef.current.classList.add("animate-slide-right");    
            }
        }
    }

    // useEffect(() => {
    //     let timeout;
    //     if(isSearchBoxOpen) {
    //             timeout = setTimeout(() => {
    //                 if(searchText.length === 0) {
    //                     setSearchBoxOpen();
    //                     navbarRef.current.classList.remove("animate-slide-left");
    //                     navbarRef.current.classList.add("animate-slide-right");    
    //                 }
    //             }, 5000);
    //     }
    //     return () => clearTimeout(timeout)
    // }, [isSearchBoxOpen])

    return (
        <nav className='flex-col py-4 flex sm:flex-row items-center gap-6 flex-1'>
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
            <div ref={navbarRef} className={`flex flex-col justify-end`}>
                <form id="search-form" className={`border-2 border-white ${searchText.length === 0 ? "rounded-2xl" : "rounded-t-2xl"} px-4 py-2 flex flex-row`} onSubmit={e => (e.preventDefault(), handleSearchSubmit(e.target.superheroname.value))}>
                    <input onChange={e => (setSearchText(e.target.value), setTypingStarted())} value={searchText} name='superheroname' className={`text-red-600 ${isSearchBoxOpen ? "w-full" : "w-0"} bg-transparent outline-none font-semibold`} type='text' placeholder={SEARCH_TEXT} />
                    <button onClick={handleSearchClearButtonClick}>
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