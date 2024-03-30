import React, { useState } from 'react'
import { EYE_COLOR, GENDER, HAIR_COLOR, HEIGHT, RACE, WEIGHT } from '../../../../../../../utils/strings'

import { BsGenderAmbiguous } from "react-icons/bs";
import { GiBodyHeight, GiWeightScale, GiMuscleUp } from "react-icons/gi";
import { FaEye } from "react-icons/fa";
import { SiStylelint } from "react-icons/si";
import { IoMdSwap } from "react-icons/io";

const AppearanceTab = ({ appearanceInfo }) => {
    return (
        <div className='grid grid-cols-1 px-[10px] gap-7 overflow-y-scroll md:overflow-y-hidden'>
            <GridItem title={GENDER} value={appearanceInfo?.gender} />
            <GridItem title={RACE} value={appearanceInfo?.race} />
            <GridItem title={HEIGHT} value={appearanceInfo?.height} />
            <GridItem title={WEIGHT} value={appearanceInfo?.weight} />
            <GridItem title={EYE_COLOR} value={appearanceInfo["eye-color"]} />
            <GridItem title={HAIR_COLOR} value={appearanceInfo["hair-color"]} />
        </div>
    )
}

const GridItem = ({ title, value }) => {
    const[swapMetric, setSwapMetric] = useState(0);

    const color = "rgb(220, 38, 38)"
    const getIcons = (title) => {
        switch(title) {
            case GENDER:
                return <BsGenderAmbiguous size={20} color={color} />
            case RACE:
                return <GiMuscleUp size={20} color={color} />
            case HEIGHT:
                return <GiBodyHeight size={20} color={color} />
            case WEIGHT:
                return <GiWeightScale  size={20} color={color} />
            case EYE_COLOR:
                return <FaEye size={20} color={color} />
            case HAIR_COLOR:
                return <SiStylelint size={20} color={color} />
            default:
                return 
        }
    }

    return(
        <div className='w-full flex flex-row justify-between items-center'>
            <div className='flex flex-row gap-3 items-center'>
                {getIcons(title)}
                <h1 className=' font-semibold sm:text-lg'>{title}</h1>
            </div>
            <div className='flex flex-row items-center gap-2'>
                <h1 className=' font-extrabold text-red-600 sm:text-lg'>{title === HEIGHT || title === WEIGHT ? value[swapMetric] : value}</h1>
                {
                    title === HEIGHT || title === WEIGHT ?
                    <span onClick={() => setSwapMetric(swapMetric => swapMetric === 0 ? 1 : 0)} className='bg-white rounded-full cursor-pointer'>
                        <IoMdSwap color={"rgb(68, 64, 60)"} />
                    </span> : null
                }
            </div>
        </div>
    )
}

export default AppearanceTab;