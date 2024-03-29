import React from 'react'
import { ALTER_EGOS, FIRST_APPEARANCE, FULL_NAME, PLACE_OF_BIRTH, PUBLISHERS } from '../../../../../../../utils/strings'

const BiographyTab = ({ biographyData }) => {
    return(
        <div className='w-full flex flex-col px-[10px] gap-5'>
            <span className='flex flex-row gap-4'>
                <h1 className=' font-semibold text-stone-400'>{FULL_NAME}:</h1>
                <h1 className=' font-bold'>{biographyData["full-name"]}</h1>
            </span>
            <span className='flex flex-row gap-4'>
                <h1 className=' font-semibold text-stone-400'>{FIRST_APPEARANCE}:</h1>
                <h1 className=' font-bold'>{biographyData["first-appearance"]}</h1>
            </span>
            <span className='flex flex-row gap-4'>
                <h1 className=' font-semibold text-stone-400'>{ALTER_EGOS}:</h1>
                <h1 className=' font-bold'>{biographyData["alter-egos"]}</h1>
            </span>
            <span className='flex flex-row gap-4'>
                <h1 className=' font-semibold text-stone-400'>{PLACE_OF_BIRTH}:</h1>
                <h1 className=' font-bold'>{biographyData["place-of-birth"]}</h1>
            </span>
            <span className='flex flex-row gap-4'>
                <h1 className=' font-semibold text-stone-400'>{PUBLISHERS}:</h1>
                <h1 className=' font-bold'>{biographyData?.publisher}</h1>
            </span>
        </div>
    )
}

export default BiographyTab