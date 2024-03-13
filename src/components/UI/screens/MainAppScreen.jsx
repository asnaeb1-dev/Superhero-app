import React, { useContext, useEffect } from 'react'
import { SuperHeroAppContext } from '../../Context/AppContext'
import { getSuperheroList } from '../../services/api'
import Grid from '../UIComponents/Grid/Grid'
import SuperheroModal from '../UIComponents/SuperheroModal/SuperheroModal'

const MainAppScreen = () => {
    const { mainSuperHeroList, showSuperheroModal, setMainSuperHeroList, filterBoxState, setFilterBoxState, setLoading } = useContext(SuperHeroAppContext)

    useEffect(() => {
        setLoading(true);
        setMainSuperHeroList([]);
        (async() => {
            const result = await getSuperheroList(filterBoxState?.pageNumber, filterBoxState?.count, filterBoxState?.currentAlphabet);
            setMainSuperHeroList(result)
            setLoading(false);
        })()
    }, [filterBoxState?.count, filterBoxState?.currentAlphabet, filterBoxState?.pageNumber]);

    return (
        <div className=' bg-zinc-900 w-full overflow-y-hidden'>
            <Grid superheroList={mainSuperHeroList}/>
            {showSuperheroModal ? <SuperheroModal /> : null }
        </div>
    )
}

export default MainAppScreen