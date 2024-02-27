import React, { useContext } from 'react'
import MainAppScreen from './components/UI/screens/MainAppScreen';
import SuperheroModal from './components/UI/UIComponents/SuperheroModal/SuperheroModal';
import { SuperHeroAppContext } from './components/Context/AppContext';

const App = () => {
	const { showSuperheroModal } = useContext(SuperHeroAppContext);
	return (
		<div>
			<MainAppScreen />
		</div>
	)
}

export default App