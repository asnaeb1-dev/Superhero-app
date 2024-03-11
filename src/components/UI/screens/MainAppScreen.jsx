import React, { useContext, useEffect, useState } from 'react';
import NavBar from "../UIComponents/Navbar/Navbar";
import { SuperHeroAppContext } from '../../Context/AppContext';
import { getSuperheroList, searchSuperHero } from '../../services/api';
import Grid from '../UIComponents/Grid/Grid';
import { NAV_ITEM_SUPERHERO } from '../../utils/strings';
import SuperheroModal from '../UIComponents/SuperheroModal/SuperheroModal';
import FilterBar from '../UIComponents/FilterBar/FilterBar';

const MainAppScreen = () => {
    const { filterBoxState, searchText, isAutoSuggestOpen, setAutoSuggestOpen, mainSuperHeroList, setMainSuperHeroList, showSuperheroModal } = useContext(SuperHeroAppContext)

    const [superheroList, setSuperHeroList] = useState([]);
    const [currentNavItem, setCurrentNavItem] = useState(NAV_ITEM_SUPERHERO)

    useEffect(() => {
        if(!searchText) return;
        const searchTimer = setTimeout(() => {
            (async () => {
                const searchResponse = await searchSuperHero(searchText)
                setSuperHeroList(searchResponse.results);
                if(!isAutoSuggestOpen) {
                    setAutoSuggestOpen(true)
                }
            })()
        }, 500)
        return () => clearTimeout(searchTimer);
    }, [searchText]);

    useEffect(() => {
        if(currentNavItem === NAV_ITEM_SUPERHERO) {
            setMainSuperHeroList([]);
            (async() => {
                const result = await getSuperheroList(undefined, undefined, filterBoxState?.currentAlphabet);
                setMainSuperHeroList(result)
            })()
        }
    }, [currentNavItem]);

    return (
        <div className=' bg-zinc-900 px-4 w-full overflow-y-hidden'>
            <div className='w-full bg-zinc-90 sm:flex sm:flex-row sm:gap-5'>
                <NavBar currentNavItem={currentNavItem} superheroList={superheroList} getNavItem={navItem => setCurrentNavItem(navItem)} />
                <FilterBar filterTitle={"Superhero"} />
            </div>
            <Grid superheroList={mainSuperHeroList}/>
            {showSuperheroModal ? <SuperheroModal /> : null }
        </div>
    )
}

export default MainAppScreen