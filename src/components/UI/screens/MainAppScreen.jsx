import React, { useContext, useEffect, useState } from 'react'
import { SuperHeroAppContext } from '../../Context/AppContext'
import { getSuperheroList } from '../../services/api'
import Grid from '../UIComponents/Grid/Grid'
import SuperheroModal from '../UIComponents/SuperheroModal/SuperheroModal'

const MainAppScreen = () => {
    const { mainSuperHeroList, showSuperheroModal, setMainSuperHeroList, filterBoxState, setFilterBoxState } = useContext(SuperHeroAppContext)

    useEffect(() => {
        setMainSuperHeroList([]);
        (async() => {
            const result = await getSuperheroList(filterBoxState?.pageNumber, filterBoxState?.count, filterBoxState?.currentAlphabet);
            setMainSuperHeroList(result)
        })()
    }, [filterBoxState?.count, filterBoxState?.currentAlphabet, filterBoxState?.pageNumber]);

    useEffect(() => {
        console.log("page has changed", filterBoxState.pageNumber);
    }, [filterBoxState.pageNumber]);

    return (
        <div className=' bg-zinc-900 w-full h-[calc(100vh_-_160px)] sm:h-[calc(100vh_-_74px)] overflow-y-scroll'>
            {
                <Grid superheroList={mainSuperHeroList}/>
            }
            {showSuperheroModal ? <SuperheroModal /> : null }
        </div>
    )
}

export default MainAppScreen