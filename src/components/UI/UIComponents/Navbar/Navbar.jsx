import React, { useEffect, useState, useContext, useRef } from 'react';
//title
import { APP_TITLE_P1, APP_TITLE_P2, NAV_LINK_ABOUT, NAV_LINK_FAVOURITES, NAV_LINK_SUPERHERO, SEARCH_TEXT } from '../../../utils/strings';

//icons
import { FaSearch } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { FaXmark } from "react-icons/fa6";

//components
import AutoSuggestList from '../AutoSuggestList/AutoSuggestList';
import { SuperHeroAppContext } from "../../../Context/AppContext"
import useToggle from "../../../CustomHooks/useToggle"
import Menu from '../Menu/Menu';
import { Link, useLocation } from 'react-router-dom';

//styles
import "../../styles/navbaranim.css"
import { ClipLoader } from 'react-spinners';
import { searchSuperHero } from '../../../services/api';

const Navbar = () => {
    const { isAutoSuggestOpen, setAutoSuggestOpen } = useContext(SuperHeroAppContext);

    const [menuOpen, setMenuOpen] = useState(false);
    const [isSearchBoxOpen, setSearchBoxOpen] = useToggle();
    const [searchText, setSearchText] = useState("");
    const [isSearchLoading, setSearchLoading] = useState(false);
    //for search list
	const [superheroList, setSuperHeroList] = useState([]);

    const navbarRef = useRef();
    const currentNavItem = useLocation();

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

    useEffect(() => {
        if(!searchText) return;
        setSearchLoading(true);
        const searchTimer = setTimeout(() => {
            (async () => {
                const searchResponse = await searchSuperHero(searchText)
                setSuperHeroList(searchResponse.results);
                if(!isAutoSuggestOpen) {
                    setAutoSuggestOpen(true)
                }
                setSearchLoading(false)
            })()
        }, 500)
        return () => clearTimeout(searchTimer);
    }, [searchText])

    return (
        <nav className='flex-col py-4 flex sm:flex-row items-center gap-6 flex-1 bg-zinc-900 w-full'>
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
                <ul className='flex flex-row text-white justify-between gap-5 font-bold text-lg lg:gap-10'>
                    <li id='superhero_nav' className={currentNavItem.pathname === "/" ? "cursor-pointer text-red-600 underline underline-offset-8" :'cursor-pointer hover:text-red-600'}>
                        <Link to="/">{NAV_LINK_SUPERHERO}</Link>
                    </li>
                    <li id='about_nav' className={currentNavItem.pathname === "/about" ? "cursor-pointer text-red-600 underline underline-offset-8" :'cursor-pointer hover:text-red-600'}>
                        <Link to="/about">{NAV_LINK_ABOUT}</Link>
                    </li>
                    <li id='fav_nav' className={currentNavItem.pathname === "/favourite" ? "cursor-pointer text-red-600 underline underline-offset-8" :'cursor-pointer hover:text-red-600'}>
                        <Link to="/favourite">{NAV_LINK_FAVOURITES}</Link>
                    </li>
                </ul>
            </div>
            {menuOpen && <Menu />}
            <div ref={navbarRef} className={`flex flex-col justify-end relative w-full sm:w-auto`}>
                <form id="search-form" className={`border-2 border-white ${searchText.length === 0 ? "rounded-2xl" : "rounded-t-2xl"} px-4 py-2 flex flex-row items-center justify-center`} onSubmit={e => e.preventDefault()}>
                    {
                        isSearchLoading ?
                            <span>
                                <ClipLoader color="rgb(239 68 68)" size={13} speedMultiplier={0.8} />
                            </span>:
                            null
                    }
                    <input
                        onChange={e => (setSearchText(e.target.value))}
                        value={searchText}
                        name='superheroname'
                        className={`text-red-600 w-full sm:${(isSearchBoxOpen ? "w-full" : "w-0")} bg-transparent outline-none font-semibold`}
                        type='text'
                        placeholder={SEARCH_TEXT}
                    />
                    <button className=' outline-none' onClick={() => window.innerWidth > 640 ? handleSearchClearButtonClick() : setSearchText("")}>
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