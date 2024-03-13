import React, { useEffect, useContext, useState } from 'react'
import MainAppScreen from './components/UI/screens/MainAppScreen';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FavouritesScreen from './components/UI/screens/FavouritesScreen';
import AboutScreen from "./components/UI/screens/AboutScreen";
import FilterBar from './components/UI/UIComponents/FilterBar/FilterBar';
import { SuperHeroAppContext } from './components/Context/AppContext';
import { NAV_ITEM_FAVOURITE, NAV_ITEM_SUPERHERO } from './components/utils/strings'
import { getSuperheroList, searchSuperHero } from './components/services/api'

import NavBar from "./components/UI/UIComponents/Navbar/Navbar";

const App = () => {
    const { filterBoxState, searchText, isAutoSuggestOpen, setAutoSuggestOpen, mainSuperHeroList, setMainSuperHeroList, showSuperheroModal } = useContext(SuperHeroAppContext)
	const [superheroList, setSuperHeroList] = useState([]);

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
    }, [searchText])

	return (
		<BrowserRouter>
			<div className='w-full bg-zinc-90'>
                <NavBar superheroList={superheroList} getNavItem={navItem => setCurrentNavItem(navItem)} />
                <FilterBar filterTitle={"Superhero"} />
            </div>
			<Routes>
				<Route path='/' Component={MainAppScreen} />
				<Route path='/favourite' Component={FavouritesScreen} />
				<Route path='/about' Component={AboutScreen} />
			</Routes>
		</BrowserRouter>
	)
}

export default App