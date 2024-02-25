import React from 'react'
import { NAV_LINK_ABOUT, NAV_LINK_FAVOURITES, NAV_LINK_SUPERHERO } from '../../../utils/strings'

const Menu = () => {
    return (
        <div className='fixed z-20 w-full h-[calc(100%_-_70px)] p-4 bg-zinc-900 flex flex-col items-end bottom-0 left-0 right-0'>
            <div className=' w-full flex flex-col items-center gap-4'>
                <div className='w-[80%] h-[1px] bg-white'></div>
                <h1 className='text-2xl text-white font-semibold px-4'>{NAV_LINK_SUPERHERO}</h1>
                <div className='w-[80%] h-[1px] bg-white'></div>
            </div>
            <div className=' w-full flex flex-col items-center gap-4'>
                <h1 className='text-2xl text-white font-semibold px-4 pt-4'>{NAV_LINK_ABOUT}</h1>
                <div className='w-[80%] h-[1px] bg-white'></div>
            </div>
            <div className=' w-full flex flex-col items-center gap-4'>
                <h1 className='text-2xl text-white font-semibold px-4 pt-4'>{NAV_LINK_FAVOURITES}</h1>
                <div className='w-[80%] h-[1px] bg-white'></div>
            </div>
        </div>
    )
}

export default Menu