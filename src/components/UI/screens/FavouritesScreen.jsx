import React, { useContext, useEffect, useState } from 'react'
import Grid from '../UIComponents/Grid/Grid'
import { getFavourites } from '../../services/storage'
import { SuperHeroAppContext } from '../../Context/AppContext';
import { getSuperheroListBasedOnIDS } from '../../services/api';

import { EMPTY_MESSAGE } from '../../utils/strings';
import MessageBox from '../UIComponents/MessageBox/MessageBox';
import SuperheroModalTemplate from '../UIComponents/Modal/ModalTemplates/SupeheroModalTemplate/SuperheroModalTemplate';
import MainModal from '../UIComponents/Modal/MainModal';
import Loader from '../UIComponents/Modal/ModalTemplates/Loader/Loader';

const FavouritesScreen = () => {
    const [superheroIDList] = useState(new Set([...getFavourites()]));
    const { mainSuperHeroList, setMainSuperHeroList, isMainModalOpen, setMainModalOpen }  = useContext(SuperHeroAppContext);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setMainSuperHeroList([]);
        setLoading(true);
        (async() => {
            const result = await getSuperheroListBasedOnIDS(superheroIDList);
            setMainSuperHeroList(result)
            setLoading(false);
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
            <MainModal
                isOpen={isMainModalOpen}
                closeModal={() => setMainModalOpen(false)}
            >
                <SuperheroModalTemplate />
            </MainModal>
            <MainModal isOpen={isLoading}>
                <Loader />
            </MainModal>
        </div>
    )
}

export default FavouritesScreen