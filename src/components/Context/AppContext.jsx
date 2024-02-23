import { createContext, useState } from "react"; 
export const SuperHeroAppContext = createContext();

const AppContext = ({ children }) => {
    const [searchText, setSearchText] = useState('');
    const [darkMode, setDarkMode] = useState(true)
    const [isAutoSuggestOpen, setAutoSuggestOpen] = useState(false)
    const [superHeroInfo, setSuperHeroInfo] = useState({});
    const [showSuperheroModal, setShowSuperHeroModal] = useState(false)
    const state = {
        searchText,
        setSearchText,
        darkMode,
        setDarkMode,
        isAutoSuggestOpen,
        setAutoSuggestOpen,
        superHeroInfo,
        setSuperHeroInfo,
        showSuperheroModal,
        setShowSuperHeroModal
    }
    return (
        <SuperHeroAppContext.Provider value={state}>
            {children}
        </SuperHeroAppContext.Provider>
    );
};

export default AppContext;