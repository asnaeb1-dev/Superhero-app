import React, { useContext } from 'react'
import MainAppScreen from './components/UI/screens/MainAppScreen';
import SuperheroModal from './components/UI/UIComponents/SuperheroModal/SuperheroModal';
import { SuperHeroAppContext } from './components/Context/AppContext';

const App = () => {
	const { showSuperheroModal } = useContext(SuperHeroAppContext);
	return (
		<div className={showSuperheroModal ? 'absolute inset-0 overflow-y-hidden' : 'absolute inset-0 overflow-y-scroll'}>
			<MainAppScreen />
			<SuperheroModal />
		</div>
	)
}

export default App