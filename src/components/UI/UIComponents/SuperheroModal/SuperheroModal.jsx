import React, { useContext, useEffect, useRef, useState } from 'react'
import { SuperHeroAppContext } from '../../../Context/AppContext';
import { MdCancel } from "react-icons/md";
import Switch from "react-switch";
import { createPortal } from 'react-dom';
import { getSuperHero } from '../../../services/api';
import SuperHeroTab from './SuperHeroTab';

import "./superheromodal.css";

const SuperheroModal = () => {
    const { setShowSuperHeroModal, showSuperheroModal, currentSuperHeroID } = useContext(SuperHeroAppContext);
    const [isSlideShowEnabled, setSlideShowEnabled] = useState(false);
    const [isHover, setHover] = useState(false);
    const [superheroData, setSuperheroData] = useState({});
    const containerRef = useRef()

    useEffect(() => {
        (async() => {
            const response = await getSuperHero(currentSuperHeroID);
            console.log(response);
            setSuperheroData(response);
        })()
    }, [currentSuperHeroID])

    useEffect(() => {
        if(showSuperheroModal) {
            containerRef.current.classList.add("animate-height")
        }
    }, [showSuperheroModal])

    return createPortal(
        <div onClick={e => (setShowSuperHeroModal(false))} style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }} className='fixed w-full h-full inset-0 flex justify-center items-center z-100000 '>
            <div onClick={e => e.stopPropagation()} ref={containerRef} id='modal-container' className='w-full rounded-t-3xl absolute bottom-0 bg-zinc-800 flex flex-col p-4'>
                {/* Modal Header */}
                <div className='w-full h-10 flex items-center justify-end'>
                    <button onMouseEnter={() =>  setHover(true)} onMouseLeave={() => setHover(false)} onClick={() => setShowSuperHeroModal(false)}>
                        <MdCancel size={25} color={isHover ? "red" : "white"} />
                    </button>
                </div>
                <div className='w-full h-full flex flex-col items-center'>
                    <div className='w-full h-[45
                        0px] flex flex-col gap-4 items-center text-white'>
                        <div style={{ backgroundImage: `url(${superheroData?.image?.url})` }} className='w-[60%] h-[300px] bg-cover bg-no-repeat rounded-2xl '></div>
                        <h1 className=' font-extrabold text-3xl'>{superheroData?.name}</h1>
                    </div>
                    <SuperHeroTab/>
                </div>
            </div>
        </div>,
        document.getElementById("portal")
    )
}

export default SuperheroModal