import React, { useContext, useEffect, useState } from 'react'
import Grid from '../UIComponents/Grid/Grid'
import { getFavourites } from '../../services/storage'
import { SuperHeroAppContext } from '../../Context/AppContext';
import { getSuperheroList, getSuperheroListBasedOnIDS } from '../../services/api';

const FavouritesScreen = () => {
    const [superheroIDList] = useState(new Set([...getFavourites()]));
    const { mainSuperHeroList, setMainSuperHeroList, setLoading }  = useContext(SuperHeroAppContext);
    
    useEffect(() => {
        setLoading(true)
        setMainSuperHeroList([]);
        (async() => {
            const result = await getSuperheroListBasedOnIDS(superheroIDList);
            setMainSuperHeroList(result)
            setLoading(false);
        })()
    }, [superheroIDList])

    return (
        <div className='w-full h-full  bg-zinc-900'>
            <Grid superheroList={mainSuperHeroList} />
        </div>
    )
}

export default FavouritesScreen