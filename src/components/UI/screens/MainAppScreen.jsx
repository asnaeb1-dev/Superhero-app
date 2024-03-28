import React, { useContext, useEffect, useState } from 'react'
import { SuperHeroAppContext } from '../../Context/AppContext'
import { getSuperheroList } from '../../services/api'
import Grid from '../UIComponents/Grid/Grid'
import MainModal from '../UIComponents/Modal/MainModal'
import SuperheroModalTemplate from '../UIComponents/Modal/ModalTemplates/SupeheroModalTemplate/SuperheroModalTemplate'

const MainAppScreen = () => {
    const { mainSuperHeroList, setMainSuperHeroList, filterBoxState } = useContext(SuperHeroAppContext)

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
            <MainModal>
                <SuperheroModalTemplate />
            </MainModal>
        </div>
    )
}

export default MainAppScreen