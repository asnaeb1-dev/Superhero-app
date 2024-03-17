import React, { useContext } from 'react'
import MainAppScreen from './components/UI/screens/MainAppScreen';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FavouritesScreen from './components/UI/screens/FavouritesScreen';
import AboutScreen from "./components/UI/screens/AboutScreen";
import FilterBar from './components/UI/UIComponents/FilterBar/FilterBar';

import NavBar from "./components/UI/UIComponents/Navbar/Navbar";
import { NAV_LINK_SUPERHERO } from './components/utils/strings';
import { SuperHeroAppContext } from './components/Context/AppContext';

const App = () => {
	const { currentNavItemState } = useContext(SuperHeroAppContext)

	return (
		<BrowserRouter>
			<div className='w-full bg-zinc-90 flex bg-zinc-900 flex-col sm:flex-row sm:gap-5 px-4'>
                <NavBar />
                <FilterBar filterTitle={currentNavItemState} />
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