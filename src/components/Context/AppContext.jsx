import { createContext, useState } from "react"; 
import { NAV_ITEM_SUPERHERO } from "../utils/strings";
export const SuperHeroAppContext = createContext();

const AppContext = ({ children }) => {
    const [searchText, setSearchText] = useState('');
    const [isAutoSuggestOpen, setAutoSuggestOpen] = useState(false)
    const [superHeroInfo, setSuperHeroInfo] = useState({});
    const [showSuperheroModal, setShowSuperHeroModal] = useState(false)
    const [mainSuperHeroList, setMainSuperHeroList] = useState([])
    const [currentSuperHeroID, setCurrentSuperHeroID] = useState(-1);
    const [isFilterBoxOpen, setFilterBoxOpen] = useState(false);
    const [isNavLinkMenuOpen, setNavLinkMenuOpen] = useState(false);
    const [currentNavItemState, setCurrentNavItemState] = useState(NAV_ITEM_SUPERHERO);

    const[modalState, setModalState] = useState(false)

    const [filterBoxState, setFilterBoxState] = useState(
        {
            alphabeticalOrderIncresing: true,
            count: 20,
            currentAlphabet: "A",
            pageNumber: 1
        }
    )

    const state = {
        searchText, setSearchText,
        isAutoSuggestOpen, setAutoSuggestOpen,
        superHeroInfo, setSuperHeroInfo,
        showSuperheroModal, setShowSuperHeroModal,
        mainSuperHeroList, setMainSuperHeroList,
        currentSuperHeroID, setCurrentSuperHeroID,
        isFilterBoxOpen, setFilterBoxOpen,
        modalState, setModalState,
        filterBoxState, setFilterBoxState,
        isNavLinkMenuOpen, setNavLinkMenuOpen,
        currentNavItemState, setCurrentNavItemState
    }
    return (
        <SuperHeroAppContext.Provider value={state}>
            {children}
        </SuperHeroAppContext.Provider>
    );
};

export default AppContext;