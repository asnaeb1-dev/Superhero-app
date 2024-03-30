import React from 'react'
import { InfinitySpin } from 'react-loader-spinner'

const Loader = () => {
    return (
        <div className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white w-full flex items-center flex-col justify-center '>
            <InfinitySpin
                visible={true}
                width="200"
                color="rgb(220 38 38)"
                ariaLabel="infinity-spin-loading"
            />
            <h1 className=' font-extrabold text-xl text-center'>Superheros assembling...</h1>
        </div>
    )
}

export default Loader