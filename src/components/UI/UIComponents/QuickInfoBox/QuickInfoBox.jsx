import React from 'react';
import { COMBAT, DURABILITY, INTELLIGENCE, POWER, SPEED, STRENGTH } from '../../../utils/strings';

const QuickInfoBox = ({ superheroPowerStats }) => {
    return (
        <div className='grid text-white w-full text-sm'>
            <div className='flex flex-row justify-between items-end'>
                <p className=' font-bold'>{COMBAT}</p>
                <p>{superheroPowerStats?.combat}</p>
            </div>
            <div className='flex flex-row justify-between'>
                <p className=' font-bold'>{DURABILITY}</p>
                <p>{superheroPowerStats?.durability}</p>
            </div>
            <div className='flex flex-row justify-between'>
                <p className=' font-bold'>{INTELLIGENCE}</p>
                <p>{superheroPowerStats?.intelligence}</p>
            </div>
            <div className='flex flex-row justify-between'>
                <p className=' font-bold'>{POWER}</p>
                <p>{superheroPowerStats?.power}</p>
            </div>
            <div className='flex flex-row justify-between'>
                <p className=' font-bold'>{SPEED}</p>
                <p>{superheroPowerStats?.speed}</p>
            </div>
            <div className='flex flex-row justify-between'>
                <p className=' font-bold'>{STRENGTH}</p>
                <p>{superheroPowerStats?.strength}</p>
            </div>
        </div>
    )
}

export default QuickInfoBox