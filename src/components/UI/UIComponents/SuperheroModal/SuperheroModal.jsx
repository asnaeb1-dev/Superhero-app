import React, { useContext } from 'react'
import { createPortal } from 'react-dom'
import { SuperHeroAppContext } from '../../../Context/AppContext';

const SuperheroModal = () => {
    const { showSuperheroModal, setShowSuperHeroModal } = useContext(SuperHeroAppContext);

    if(!showSuperheroModal) return null;
    return createPortal(
        <div onClick={() => setShowSuperHeroModal(false)} className='absolute w-full top-0 left-0 right-0 bottom-0 bg-zinc-400 opacity-10 flex justify-center items-center'>
            <div className='w-[80%] h-[80%] bg-slate-600 rounded-lg pointer-events-none relative z-10'>
                <h1>Hello!</h1>
                <button onClick={() => setShowSuperHeroModal(false)} >Click me</button>
            </div>
        </div>,
        document.getElementById("portal")
    )
}

export default SuperheroModal