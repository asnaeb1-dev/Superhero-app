import React, { useContext, useEffect, useState } from 'react'
import Grid from '../UIComponents/Grid/Grid'
import { getFavourites } from '../../services/storage'
import { SuperHeroAppContext } from '../../Context/AppContext';
import { getSuperheroListBasedOnIDS } from '../../services/api';

import { EMPTY_MESSAGE } from '../../utils/strings';
import MessageBox from '../UIComponents/MessageBox/MessageBox';
import SuperheroModal from '../UIComponents/SuperheroModal/SuperheroModal';

const FavouritesScreen = () => {
    const [superheroIDList] = useState(new Set([...getFavourites()]));
    const { mainSuperHeroList, setMainSuperHeroList, showSuperheroModal }  = useContext(SuperHeroAppContext);
    
    useEffect(() => {
        setMainSuperHeroList([]);
        (async() => {
            const result = await getSuperheroListBasedOnIDS(superheroIDList);
            setMainSuperHeroList(result)
        })()
    }, [superheroIDList])

    return (
        <div className={`w-full h-[calc(100vh_-_160px)] sm:h-[calc(100vh_-_74px)] ${superheroIDList?.size === 0 ? `flex justify-center items-center` : ''} overflow-y-scroll bg-zinc-900`}>
            {
                superheroIDList?.size === 0 ?
                    <MessageBox message={EMPTY_MESSAGE} />
                    :
                    <Grid superheroList={mainSuperHeroList} />
            }
            {showSuperheroModal ? <SuperheroModal /> : null }
        </div>
    )
}

export default FavouritesScreen