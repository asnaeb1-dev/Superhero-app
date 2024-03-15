import React, { useContext, useEffect, useState } from 'react'
import Grid from '../UIComponents/Grid/Grid'
import { getFavourites } from '../../services/storage'
import { SuperHeroAppContext } from '../../Context/AppContext';
import { getSuperheroList, getSuperheroListBasedOnIDS } from '../../services/api';

const FavouritesScreen = () => {
    const [superheroIDList] = useState(new Set([...getFavourites()]));
    const { mainSuperHeroList, setMainSuperHeroList, filterBoxState }  = useContext(SuperHeroAppContext);
    
    useEffect(() => {
        setMainSuperHeroList([]);
        (async() => {
            const result = await getSuperheroListBasedOnIDS(superheroIDList);
            setMainSuperHeroList(result)
        })()
    }, [superheroIDList])

    return (
        <div className='w-full h-[calc(100vh_-_160px)] sm:h-[calc(100vh_-_74px)] overflow-y-scroll bg-zinc-900'>
            <Grid superheroList={mainSuperHeroList} />
        </div>
    )
}

export default FavouritesScreen