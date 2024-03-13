import React, { useContext, useEffect, useState } from 'react'
import { SuperHeroAppContext } from '../../Context/AppContext'
import { getSuperheroList, searchSuperHero } from '../../services/api'
import Grid from '../UIComponents/Grid/Grid'
import { NAV_ITEM_SUPERHERO } from '../../utils/strings'
import SuperheroModal from '../UIComponents/SuperheroModal/SuperheroModal'

const MainAppScreen = () => {
    const { mainSuperHeroList, showSuperheroModal, setMainSuperHeroList, filterBoxState } = useContext(SuperHeroAppContext)
    
    useEffect(() => {
        setMainSuperHeroList([]);
        (async() => {
            const result = await getSuperheroList(undefined, undefined, filterBoxState?.currentAlphabet);
            setMainSuperHeroList(result)
        })()
    }, [])

    return (
        <div className=' bg-zinc-900 w-full overflow-y-hidden'>
            <Grid superheroList={mainSuperHeroList}/>
            {showSuperheroModal ? <SuperheroModal /> : null }
        </div>
    )
}

export default MainAppScreen