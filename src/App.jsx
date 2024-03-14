import React, { useEffect, useContext, useState } from 'react'
import MainAppScreen from './components/UI/screens/MainAppScreen';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import FavouritesScreen from './components/UI/screens/FavouritesScreen';
import AboutScreen from "./components/UI/screens/AboutScreen";
import FilterBar from './components/UI/UIComponents/FilterBar/FilterBar';
import { SuperHeroAppContext } from './components/Context/AppContext';
import { searchSuperHero } from './components/services/api'

import NavBar from "./components/UI/UIComponents/Navbar/Navbar";
import { NAV_LINK_SUPERHERO } from './components/utils/strings';

const App = () => {
    const { searchText, isAutoSuggestOpen, setAutoSuggestOpen } = useContext(SuperHeroAppContext)
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
			<div className='w-full bg-zinc-90 flex bg-zinc-900 flex-col sm:flex-row sm:gap-5 px-4'>
                <NavBar superheroList={superheroList} />
                <FilterBar filterTitle={NAV_LINK_SUPERHERO} />
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