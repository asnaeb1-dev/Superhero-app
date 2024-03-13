import React, { useEffect, useContext, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//components
import FavouritesScreen from './components/UI/screens/FavouritesScreen';
import AboutScreen from "./components/UI/screens/AboutScreen";
import MainAppScreen from './components/UI/screens/MainAppScreen';
import FilterBar from './components/UI/UIComponents/FilterBar/FilterBar';
import { SuperHeroAppContext } from './components/Context/AppContext';
import { searchSuperHero } from './components/services/api'
import NavBar from "./components/UI/UIComponents/Navbar/Navbar";
import LoaderModal from './components/UI/UIComponents/SuperheroModal/LoaderModal';

const App = () => {
    const {  isLoading } = useContext(SuperHeroAppContext)

	return (
        <>
            {isLoading ? <LoaderModal /> : null}
            <BrowserRouter>
                <div className='w-full bg-zinc-90 flex bg-zinc-900 flex-col sm:flex-row sm:gap-5 px-4'>
                    <NavBar getNavItem={navItem => setCurrentNavItem(navItem)} />
                    <FilterBar filterTitle={"Superhero"} />
                </div>
                <Routes>
                    <Route path='/' Component={MainAppScreen} />
                    <Route path='/favourite' Component={FavouritesScreen} />
                    <Route path='/about' Component={AboutScreen} />
                </Routes>
            </BrowserRouter>
        </>
		
	)
}

export default App