import React from 'react'
import MainAppScreen from './components/UI/screens/MainAppScreen';
import SuperheroModal from './components/UI/UIComponents/SuperheroModal/SuperheroModal';
import Menu from './components/UI/UIComponents/Menu/Menu';

const App = () => {
	return (
		<div className='absolute inset-0'>
			<MainAppScreen />
			<SuperheroModal />
		</div>
	)
}

export default App