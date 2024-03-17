import React, { useEffect, useState } from 'react'
import { APPEARANCE, BIOGRAPHY, POWERSTATS } from '../../../../utils/strings'
import AbilitiesTab from './TabContent/AbilitiesTab';
import AppearanceTab from "./TabContent/AppearanceTab"
import BiographyTab from "./TabContent/BiographyTab";

const SuperHeroTab = ({ superheroInfo }) => {
    const [superheroTabState, setSuperHeroTabState] = useState(POWERSTATS);

    return (
        <div className='w-full h-full my-4 md:my-0 text-white'>
            <h1 className='font-extrabold hidden md:block text-3xl pb-5'>{superheroInfo?.name}</h1>
            <div className='w-full flex gap-7 flex-row justify-between overflow-x-scroll sm:overflow-x-hidden'>
                <p
                    onClick={e => setSuperHeroTabState(e.target.id)}
                    id={POWERSTATS}
                    className={`${superheroTabState !== POWERSTATS ? "font-bold" : "overline text-red-600"} cursor-pointer hover:text-red-600 overline-offset-8 font-bold decoration-2 decoration-red-600`}
                >
                    {POWERSTATS}
                </p>
                <p  onClick={e => setSuperHeroTabState(e.target.id)} id={APPEARANCE} className={`${superheroTabState !== APPEARANCE ? "font-bold" : "overline text-red-600"} cursor-pointer hover:text-red-600 overline-offset-8 font-bold decoration-2 decoration-red-600`}>{APPEARANCE}</p>
                <p  onClick={e => setSuperHeroTabState(e.target.id)} id={BIOGRAPHY} className={`${superheroTabState !== BIOGRAPHY ? "font-bold" : "overline text-red-600"} cursor-pointer hover:text-red-600 overline-offset-8 font-bold decoration-2 decoration-red-600`}>{BIOGRAPHY}</p>
            </div>
            <div className='w-full mt-4 overflow-y-scroll md:overflow-y-hidden md:mt-4'>
                {
                    superheroTabState === POWERSTATS ? 
                        <AbilitiesTab powerstats={superheroInfo?.powerstats} /> : 
                        (superheroTabState === APPEARANCE ? 
                            <AppearanceTab appearanceInfo={superheroInfo?.appearance} /> :
                            <BiographyTab biographyData={superheroInfo?.biography} />
                        )
                }
            </div>
        </div>
    )
}

export default SuperHeroTab