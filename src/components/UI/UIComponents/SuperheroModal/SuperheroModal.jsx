import React, { useContext, useEffect, useState } from 'react'
import { SuperHeroAppContext } from '../../../Context/AppContext';
import { MdCancel } from "react-icons/md";
import Switch from "react-switch";
import { createPortal } from 'react-dom';
import { getSuperHero } from '../../../services/api';

const SuperheroModal = () => {
    const { setShowSuperHeroModal, currentSuperHeroID } = useContext(SuperHeroAppContext);
    const [isSlideShowEnabled, setSlideShowEnabled] = useState(false);
    const [isHover, setHover] = useState(false);
    const [superheroData, setSuperheroData] = useState({});

    useEffect(() => {
        (async() => {
            const response = await getSuperHero(currentSuperHeroID);
            console.log(response);
            setSuperheroData(response);
        })()
    }, [currentSuperHeroID])

    return createPortal(
        <div onClick={(e) => (setShowSuperHeroModal(false))} style={{ backgroundColor: "rgba(161, 161, 170, 0.5)" }} className='fixed w-full h-full inset-0 flex justify-center items-center z-100000 '>
            <div onClick={e => e.stopPropagation()} className='w-4/5 h-4/5 bg-zinc-800 rounded-3xl flex flex-col p-4'>
                {/* Modal Header */}
                <div className='w-full text-white flex flex-row justify-between'>
                    <h1 className=' font-semibold text-xl'>Superhero Information</h1>
                    <label className='flex flex-row gap-2 justify-end flex-1 mr-10'>
                        <span>Slideshow</span>
                        <Switch 
                            onColor="#00ff00"
                            onHandleColor="#2693e6"
                            handleDiameter={30}
                            uncheckedIcon={false}
                            checkedIcon={false}
                            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                            height={20}
                            width={48}
                            className="react-switch" onChange={() => setSlideShowEnabled(!isSlideShowEnabled)} checked={isSlideShowEnabled} />
                    </label>
                    <button onMouseEnter={() =>  setHover(true)} onMouseLeave={() => setHover(false)} onClick={() => setShowSuperHeroModal(false)}>
                        <MdCancel size={25} color={isHover ? "red" : "white"} />
                    </button>
                </div>
                {/* Modal Information */}
                <div className='w-full h-full flex flex-row  mt-4 gap-4'>
                    <div style={{ backgroundImage: `url(${superheroData?.image?.url})` }} className='flex flex-1 w-full h-full bg-no-repeat bg-cover bg-center'></div>
                    <div style={{ flex: 2 }} className='flex w-full h-full flex-col text-white'>
                        <h1 className=" font-extrabold text-3xl">{superheroData?.name}</h1>
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById("portal")
    )
}

export default SuperheroModal