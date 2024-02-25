import React from 'react'

const Menu = () => {
    return (
        <div className='fixed z-20 w-full h-[calc(100%_-_70px)] p-4 bg-zinc-900 flex flex-col items-end bottom-0 left-0 right-0'>
            <div className='text-red-600 w-full flex flex-col items-end gap-4'>
                <div className='w-[80%] h-[1px] bg-white'></div>
                <h1 className='text-2xl font-semibold px-4'>Superheros</h1>
                <div className='w-[80%] h-[1px] bg-white'></div>
            </div>
            <div className='text-red-600'>
                <h1 className='text-2xl font-semibold'>About</h1>
            </div>
            <div className='text-red-600'>
                <h1 className='text-2xl font-semibold'>Favourite</h1>
            </div>
        </div>
    )
}

export default Menu