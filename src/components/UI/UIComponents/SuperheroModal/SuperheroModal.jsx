import React, { useContext, useEffect, useRef, useState } from 'react'
import { SuperHeroAppContext } from '../../../Context/AppContext';
import { MdCancel } from "react-icons/md";
import { IoIosArrowUp } from "react-icons/io";

import Switch from "react-switch";
import { createPortal } from 'react-dom';
import { getSuperHero } from '../../../services/api';
import SuperHeroTab from './SuperHeroTab';

import "./superheromodal.css";
import { MODAL_SIZE } from '../../../utils/strings';

const SuperheroModal = () => {
    const { setShowSuperHeroModal, showSuperheroModal, currentSuperHeroID } = useContext(SuperHeroAppContext);
    const [isSlideShowEnabled, setSlideShowEnabled] = useState(false);
    const [isHover, setHover] = useState(false);
    const [superheroData, setSuperheroData] = useState({});
    const containerRef = useRef()
    const [currentModalSize, setCurrentModalSize] = useState(MODAL_SIZE.CLOSED);

    useEffect(() => {
        // (async() => {
        //     const response = await getSuperHero(currentSuperHeroID);
        //     console.log(response);
        //     setSuperheroData(response);
        // })()
    }, [currentSuperHeroID])

    useEffect(() => {
        if(showSuperheroModal) {
            containerRef.current.classList.add("animate-height")
            setCurrentModalSize(MODAL_SIZE.MID_SIZE)
        } 
    }, [showSuperheroModal])

    const handleModalClose = () => {
        if(currentModalSize === MODAL_SIZE.FULL_SIZE) {
            containerRef.current.classList.remove("animate-height-full");
            containerRef.current.classList.add("animate-height-full-to-reduce");
        } else {
            containerRef.current.classList.remove("animate-height")
            containerRef.current.classList.add("animate-height-reduce")    
        }
        setTimeout(() => {
            setShowSuperHeroModal(false)
            setCurrentModalSize(MODAL_SIZE.CLOSED);
        }, currentModalSize === MODAL_SIZE.MID_SIZE ? 255 : 500)
    }

    const handleModalSize = () => {
        if(currentModalSize === MODAL_SIZE.MID_SIZE) {
            setCurrentModalSize(MODAL_SIZE.FULL_SIZE);
            containerRef.current.classList.remove("animate-height-reduce");
            containerRef.current.classList.remove("animate-height");
            containerRef.current.classList.add("animate-height-full");
        } else {
            setCurrentModalSize(MODAL_SIZE.MID_SIZE);
            containerRef.current.classList.remove("animate-height-full");
            containerRef.current.classList.remove("animate-height");
            containerRef.current.classList.add("animate-height-reduce");
        }
    }   

    return createPortal(
        <div onClick={() => (setShowSuperHeroModal(false))} style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }} className='fixed w-full h-full inset-0 flex justify-center items-center'>
            <div onClick={e => e.stopPropagation()} ref={containerRef} className='w-full z-20 rounded-t-3xl absolute bottom-0 bg-zinc-800 flex flex-col p-4'>
                {/* Modal Header */}
                <div className='w-full h-10 flex items-center justify-end'>
                    <div className='flex flex-row items-center w-full h-full' onClick={handleModalSize}>
                        <IoIosArrowUp size={20} color='white' />
                    </div>
                    <button  onMouseEnter={() =>  setHover(true)} onMouseLeave={() => setHover(false)} onClick={handleModalClose}>
                        <MdCancel size={25} color={isHover ? "red" : "white"} />
                    </button>
                </div>
                <div className='w-full h-full flex flex-col items-center'>
                    <div className='w-full h-[45
                        0px] flex flex-col gap-4 items-center text-white'>
                        <div style={{ backgroundImage: `url(https://www.superherodb.com/pictures2/portraits/10/100/10060.jpg)` }} className='w-[60%] h-[300px] bg-cover bg-no-repeat rounded-2xl '></div>
                        <h1 className=' font-extrabold text-3xl'>{"Batman"}</h1>
                    </div>
                    <SuperHeroTab/>
                </div>
            </div>
        </div>,
        document.getElementById("portal")
    )
}

export default SuperheroModal