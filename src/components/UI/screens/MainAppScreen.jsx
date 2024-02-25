import React, { useContext, useEffect, useState } from 'react'
import NavBar from "../UIComponents/Navbar/Navbar"
import { SuperHeroAppContext } from '../../Context/AppContext'
import { getSuperheroList, searchSuperHero } from '../../services/api'
import Grid from '../UIComponents/Grid/Grid'
import { NAV_ITEM_ABOUT, NAV_ITEM_SUPERHERO, NAV_LINK_ABOUT, NAV_LINK_FAVOURITES, NAV_LINK_SUPERHERO } from '../../utils/strings'
const MainAppScreen = () => {
    const { searchText, isAutoSuggestOpen, setAutoSuggestOpen, mainSuperHeroList, setMainSuperHeroList } = useContext(SuperHeroAppContext)
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
        }, 1000)
        return () => clearTimeout(searchTimer);
    }, [searchText])

    useEffect(() => {
        console.log(superheroList);
    }, [superheroList])

    useEffect(() => {
        if(currentNavItem === NAV_ITEM_SUPERHERO) {
            (async() => {
                const result = await getSuperheroList();
                setMainSuperHeroList(result)
            })()
        }
    }, [currentNavItem])

    return (
        <div className=' bg-zinc-900 p-4 w-full'>
            <div className='fixed top-0 left-0 w-full bg-zinc-900  z-10'>
                <NavBar currentNavItem={currentNavItem} superheroList={superheroList} getNavItem={navItem => setCurrentNavItem(navItem)} />
                <div className='flex flex-row sm:hidden'>
                    <h1 className='text-red-600 px-4 text-2xl pb-2'>Superhero</h1>
                </div>
            </div>
            <div className='w-full relative mt-[157px] sm:mt-[65px]'>
                <Grid superheroList={mainSuperHeroList}/>
            </div>
        </div>
    )
}

export default MainAppScreen