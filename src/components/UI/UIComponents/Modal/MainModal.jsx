import React from 'react'
import { createPortal } from 'react-dom';

const MainModal = ({ children, isOpen, closeModal }) => {
    const modalRoot = document.getElementById("main-portal")
    if(!isOpen) return null;
    return createPortal(
        <>
            <div onClick={() => closeModal(false)} style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }} className='fixed w-full h-full inset-0'></div>
            {children}
        </>,
        modalRoot
    )
}

export default MainModal