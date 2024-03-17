import React, { useContext } from 'react'
import { createPortal } from 'react-dom'
import { SuperHeroAppContext } from '../../../Context/AppContext'
import FilterBox from '../FilterBox/FilterBox'

const Modal = () => {
    const { setModalState } = useContext(SuperHeroAppContext)

    return createPortal(
        <div onTouchEnd={e =>(setModalState(false))} onClick={() => setModalState(false)} style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }} className='w-full h-full fixed z-20 inset-0 bg-zinc-500'>
            <FilterBox />
        </div>,
        document.getElementById("portal")
    )
}

export default Modal