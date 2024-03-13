import React from 'react'
import { ClipLoader } from 'react-spinners'
const LoaderModal = () => {
    return (
        <div className='fixed w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-40'>
            <div className='bg-black text-red-500 bg-opacity-75 w-[80px] h-[80px] rounded-full flex justify-center items-center'>
                <ClipLoader color="rgb(239 68 68)" size={50} speedMultiplier={0.8} />
            </div>
        </div>
    )
}

export default LoaderModal