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
import useToggle from "../../../CustomHooks/useToggle"
import Menu from '../Menu/Menu';
import { Link, useLocation } from 'react-router-dom';
import { Oval } from 'react-loader-spinner';

//styles
import "../../styles/navbaranim.css"
import { searchSuperHero } from '../../../services/api';

/**
 * Things to fix:
 * 3) add loader
 */

const Navbar = () => {
    const { searchText, setSearchText, isNavLinkMenuOpen, setNavLinkMenuOpen, isAutoSuggestOpen,setAutoSuggestOpen, setCurrentNavItemState } = useContext(SuperHeroAppContext);
    const [isSearchBoxOpen, setSearchBoxOpen] = useToggle();
    const [isSearchResultsLoading, setSearchResultsLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    const currentNavItem = useLocation();

    const handleSearchClearButtonClick = () => {
        !isSearchBoxOpen ? setSearchBoxOpen() : searchText?.length > 0 ? setSearchText("") : setSearchBoxOpen();
    }

    useEffect(() => {
        switch(currentNavItem.pathname) {
            case "/":
                setCurrentNavItemState(NAV_LINK_SUPERHERO);
                break;
            
            case "/about":
                setCurrentNavItemState(NAV_LINK_ABOUT)
                break;
            
            case "/favourite":
                setCurrentNavItemState(NAV_LINK_FAVOURITES)
                break;
            
            default:
                setCurrentNavItemState(NAV_LINK_SUPERHERO)
                break;
        }
    }, [currentNavItem])

    useEffect(() => {
        if(!searchText) return;
        setSearchResultsLoading(true)
        const searchTimer = setTimeout(() => {
            (async() => {
                const searchResponse = await searchSuperHero(searchText);
                setSearchResults(searchResponse?.results);
                if(!isAutoSuggestOpen) {
                    setAutoSuggestOpen(true);
                }
                setSearchResultsLoading(false);
            })()
        }, 300)
        return () => clearTimeout(searchTimer);
    }, [searchText])

    return (
        <nav className='flex-col py-4 flex sm:flex-row items-center gap-6 flex-1 bg-zinc-900 w-full'>
            <div className='flex flex-1 flex-row item w-full'>
                <div className=' flex flex-row flex-1 font-extrabold'>
                    <h1 className='text-white text-3xl'>{APP_TITLE_P1}</h1>
                    <h1 className=' text-red-600 text-3xl'>{APP_TITLE_P2}</h1>
                </div>
                <button className='sm:hidden' onClick={() => setNavLinkMenuOpen(!isNavLinkMenuOpen)}>
                    {!isNavLinkMenuOpen ? <IoMenu color='white' size={30} /> : <FaXmark color='white' size={30}/>}
                </button>
            </div>

            <div className='hidden flex-[2] justify-end sm:flex'>
                <ul className='flex flex-row text-white justify-between gap-5 font-bold text-lg lg:gap-10'>
                    <li id='superhero_nav' className={currentNavItem.pathname === "/" ? "cursor-pointer text-red-600 underline underline-offset-8" :'cursor-pointer hover:text-red-600'}>
                        <Link to="/">{NAV_LINK_SUPERHERO}</Link>
                    </li>
                    {/* <li id='about_nav' className={currentNavItem.pathname === "/about" ? "cursor-pointer text-red-600 underline underline-offset-8" :'cursor-pointer hover:text-red-600'}>
                        <Link to="/about">{NAV_LINK_ABOUT}</Link>
                    </li> */}
                    <li id='fav_nav' className={currentNavItem.pathname === "/favourite" ? "cursor-pointer text-red-600 underline underline-offset-8" :'cursor-pointer hover:text-red-600'}>
                        <Link to="/favourite">{NAV_LINK_FAVOURITES}</Link>
                    </li>
                </ul>
            </div>
            {isNavLinkMenuOpen && <Menu />}
            <div className={`flex flex-col justify-end relative w-full sm:w-auto ${isSearchBoxOpen ? 'animate-slide-left' : (searchText?.length > 0 ? '' : 'animate-slide-right')}`}>
                <form id="search-form" className={`border-2 border-white ${searchText.length === 0 ? "rounded-2xl" : "rounded-t-2xl"} px-4 py-2 flex flex-row justify-between ${isSearchResultsLoading ? "gap-2" : ''}`} onSubmit={e => (e.preventDefault())}>
                    <div className='flex flex-row w-full gap-2'>
                        <Oval
                            visible={isSearchResultsLoading}
                            height="20"
                            width="20"
                            color="rgb(220 38 38)"
                            secondaryColor='rgba(220 38 38, 0.5)'
                            ariaLabel="oval-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                        />
                        <input
                            onChange={e => (setSearchText(e.target.value))}
                            value={searchText}
                            name='superheroname'
                            className={`text-red-600 focus:text-red-600 w-full sm:${(isSearchBoxOpen ? "w-full" : "w-0")} bg-transparent outline-none font-semibold`}
                            type='text'
                            placeholder={SEARCH_TEXT}
                        />    
                    </div>
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
                        <AutoSuggestList searchText={searchText} superheroList={searchResults} />:
                        null
                }
            </div>
        </nav>
    )
}

export default Navbar