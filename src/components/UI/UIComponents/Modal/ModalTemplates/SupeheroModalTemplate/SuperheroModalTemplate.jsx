import React, { useContext, useEffect, useRef, useState } from 'react'
import { SuperHeroAppContext } from '../../../../../Context/AppContext';
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { MdFavorite, MdFavoriteBorder, MdOutlineNavigateNext  } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";

import { getSuperHero } from '../../../../../services/api';
import SuperHeroTab from "./SuperHeroTabs/SuperHeroTab"

import "./superheromodal.css";
import { MODAL_SIZE, NEXT_TEXT } from '../../../../../utils/strings';
import { getFavourites, saveFavourite } from '../../../../../services/storage';

const SuperheroModalTemplate  = () => {
    const { currentSuperHeroID, setCurrentSuperHeroID, setMainModalOpen, isMainModalOpen } = useContext(SuperHeroAppContext);
    const [superheroData, setSuperheroData] = useState({});

    const [currentModalSize, setCurrentModalSize] = useState(MODAL_SIZE.CLOSED);
    const [isFavorite, setFavorite] = useState(false);
    const [favouriteList, setFavouriteList] = useState(new Set([...getFavourites()]));

    useEffect(() => {
        //get details from API endpoint
        (async() => {
            const response = await getSuperHero(currentSuperHeroID);
            setSuperheroData(response);
        })()
        //check for favorites
        setFavorite(favouriteList.has(currentSuperHeroID))
    }, [currentSuperHeroID]);

    useEffect(() => {
        if(isFavorite) {
            setFavouriteList(favList => {
                const newList = new Set(favList);
                newList.add(currentSuperHeroID);
                return newList;
            });
        } else {
            setFavouriteList(favList => {
                const newList = new Set(favList);
                newList.delete(currentSuperHeroID);
                return newList;
            });
        }
        
    }, [isFavorite]);

    useEffect(() => {
        saveFavourite(Array.from(favouriteList));
    }, [favouriteList])

    const handleModalSize = () => {
        setCurrentModalSize(modalSize => {
            if(modalSize === MODAL_SIZE.MID_SIZE) {
                return MODAL_SIZE.FULL_SIZE
            }
            return MODAL_SIZE.MID_SIZE
        })
    };

    /*
        sm	640px	@media (min-width: 640px) { ... }
        md	768px	@media (min-width: 768px) { ... }
        lg	1024px	@media (min-width: 1024px) { ... }
        xl	1280px	@media (min-width: 1280px) { ... }
        2xl	1536px  @media (min-width: 1536px) { ... }
    */
    return (
        <div
            onTouchEnd={e => e.stopPropagation()}
            onClick={e => e.stopPropagation()}
            className={`w-full h-[408px] md:w-4/5 z-20 md:h-3/5 lg:h-3/5 xl:w-3/5 2xl:h-2/3 rounded-t-2xl bottom-0 md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 absolute md: bg-zinc-800 flex flex-col p-4 md:rounded-2xl ${!isMainModalOpen ? "animate-height-full-to-reduce" : currentModalSize === MODAL_SIZE.MID_SIZE ? "animate-height-full" : (currentModalSize === MODAL_SIZE.FULL_SIZE ? "animate-slide-in-half": "animate-height")}`}
        >
            {/* Modal Header */}
            <div className='w-full h-14 flex items-center justify-between'>
                <div className={`flex flex-row items-center w-full h-full md:hidden`} onClick={handleModalSize}>
                    {
                        currentModalSize === MODAL_SIZE.FULL_SIZE || currentModalSize === MODAL_SIZE.CLOSED ?
                            <IoIosArrowUp color='white' className='text-2xl cursor-pointer' /> :
                            <IoIosArrowDown color='white' className='text-2xl cursor-pointer' />
                    }
                </div>
                <div className=' cursor-pointer hidden md:block ml-2' onClick={() => setMainModalOpen(false)}>
                    <FaArrowLeft size={20} color='red' />
                </div>
                <button onClick={() => setCurrentSuperHeroID(String(Number(currentSuperHeroID) + 1))} className='flex flex-row text-white items-center rounded-lg border-transparent border-2 hover:border-red-600 pl-2 pb-1'>
                    <p>{NEXT_TEXT}</p>
                    <MdOutlineNavigateNext size={25} color="white" />
                </button>
            </div>
            {/* Info Deck */}
            <div className='w-full h-full flex flex-col md:flex-row items-center'>
                {/* Image center */}
                <div className='w-full md:h-full flex flex-col gap-4 items-center text-white'>
                    <div style={{ backgroundImage: `url(${superheroData?.image?.url})` }} className='w-[60%] sm:w-[75%] h-[300px] md:h-[calc(100%_-_66px)] bg-cover bg-no-repeat rounded-2xl flex justify-end items-end p-5 '>
                        <span className={`cursor-pointer ${isFavorite ? "animate-bounce" : ""}`} id='fav-icon' onClick={() => setFavorite(!isFavorite)}>
                            {
                                !isFavorite ? <MdFavoriteBorder  size={25} color='red' />:
                                    <MdFavorite size={25} color='red' />
                            }
                        </span>
                    </div>
                    <h1 className='font-extrabold text-3xl md:hidden'>{superheroData?.name}</h1>
                </div>
                {/* Superhero tab */}
                <SuperHeroTab superheroInfo={superheroData} />
            </div>
        </div>
        )
}

export default SuperheroModalTemplate;