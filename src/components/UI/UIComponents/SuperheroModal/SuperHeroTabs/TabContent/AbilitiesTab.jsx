import React from 'react'
import { COMBAT, DURABILITY, INTELLIGENCE, POWER, SPEED, STRENGTH } from '../../../../../utils/strings'
import { GiSwordsPower, GiBrain, GiBattleAxe, GiSpeedometer, GiMuscleUp  } from "react-icons/gi";
import { VscWorkspaceTrusted } from "react-icons/vsc";

const AbilitiesTab = ({ powerstats }) => {
    return (
        <div className='grid grid-cols-1 px-[10px] gap-7 overflow-y-scroll md:overflow-y-hidden'>
            <GridItem title={COMBAT} value={powerstats?.combat} />
            <GridItem title={DURABILITY} value={powerstats?.durability} />
            <GridItem title={INTELLIGENCE} value={powerstats?.intelligence} />
            <GridItem title={POWER} value={powerstats?.power} />
            <GridItem title={SPEED} value={powerstats?.speed} />
            <GridItem title={STRENGTH} value={powerstats?.strength} />
        </div>
    )
}

const GridItem = ({ title, value }) => {
    const color = "rgb(220, 38, 38)"
    const getIcons = (title) => {
        switch(title) {
            case INTELLIGENCE:
                return <GiBrain size={20} color={color} />
            case STRENGTH:
                return <GiMuscleUp size={20} color={color} />
            case SPEED:
                return <GiSpeedometer size={20} color={color} />
            case DURABILITY:
                return <VscWorkspaceTrusted size={20} color={color} />
            case POWER:
                return <GiSwordsPower size={20} color={color} />
            case COMBAT:
                return <GiBattleAxe size={20} color={color} />
            default:
                return 
        }
    }

    return(
        <div className='w-full flex flex-row justify-between items-center'>
            <div className='flex flex-row gap-4'>
                {getIcons(title)}
                <h1 className=' font-semibold'>{title}</h1>
            </div>
            <div className='flex flex-row'>
                <h1 className=' font-extrabold text-red-600'>{value}</h1>
                <h1>/100</h1>
            </div>
        </div>
    )
}

export default AbilitiesTab