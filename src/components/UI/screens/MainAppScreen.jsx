import React, { useContext, useEffect, useState } from 'react'
import { SuperHeroAppContext } from '../../Context/AppContext'
import { getSuperheroList } from '../../services/api'
import Grid from '../UIComponents/Grid/Grid'
import MainModal from '../UIComponents/Modal/MainModal'
import SuperheroModalTemplate from '../UIComponents/Modal/ModalTemplates/SupeheroModalTemplate/SuperheroModalTemplate'
import Loader from '../UIComponents/Modal/ModalTemplates/Loader/Loader'

const MainAppScreen = () => {
    const { mainSuperHeroList, setMainSuperHeroList, filterBoxState,isMainModalOpen, setMainModalOpen } = useContext(SuperHeroAppContext)
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setMainSuperHeroList([]);
        setLoading(true);
        (async() => {
            const result = await getSuperheroList(filterBoxState?.pageNumber, filterBoxState?.count, filterBoxState?.currentAlphabet);
            setMainSuperHeroList(result)
            setTimeout(() => setLoading(false), 300)
        })()
    }, [filterBoxState?.count, filterBoxState?.currentAlphabet, filterBoxState?.pageNumber]);

    return (
        <div className=' bg-zinc-900 w-full h-[calc(100vh_-_160px)] sm:h-[calc(100vh_-_74px)] overflow-y-scroll'>
            { <Grid superheroList={mainSuperHeroList}/> }
            <MainModal isOpen={isMainModalOpen} closeModal={() => setMainModalOpen(false)}>
                <SuperheroModalTemplate />
            </MainModal>
            <MainModal isOpen={isLoading}>
                <Loader />
            </MainModal>
        </div>
    )
}

export default MainAppScreen