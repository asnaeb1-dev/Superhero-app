import React, { useContext, useEffect, useState } from 'react'
import NavBar from "../UIComponents/Navbar/Navbar"
import { SuperHeroAppContext } from '../../Context/AppContext'
import { searchSuperHero } from '../../services/api'
const MainAppScreen = () => {
    const { searchText, isAutoSuggestOpen, setAutoSuggestOpen } = useContext(SuperHeroAppContext)
    const [superheroList, setSuperHeroList] = useState([]);

    useEffect(() => {
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

    return (
        <div className='absolute top-0 left-0 right-0 bottom-0 bg-zinc-900 p-4 w-full'>
            <NavBar superheroList={superheroList} />
        </div>
    )
}

export default MainAppScreen