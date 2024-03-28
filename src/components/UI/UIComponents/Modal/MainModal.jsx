import React, { useContext } from 'react'
import { SuperHeroAppContext } from '../../../Context/AppContext'
import { createPortal } from 'react-dom';

const MainModal = ({ children, type }) => {
    const { isMainModalOpen, setMainModalOpen } = useContext(SuperHeroAppContext);
    if(!isMainModalOpen) return null;
    return createPortal(
        <>
            <div onClick={() => setMainModalOpen(false)} style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }} className='fixed w-full h-full inset-0'></div>
            {children}
        </>,
        document.getElementById("main-portal")
    )
}

export default MainModal