import { useContext } from 'react'
import { SuperHeroAppContext } from '../../../Context/AppContext';
import { LuFilter } from "react-icons/lu";
import { NAV_LINK_SUPERHERO } from '../../../utils/strings';
import FilterBoxTemplate from '../Modal/ModalTemplates/FilterBoxTemplate/FilterBoxTemplate';
import MainModal from '../Modal/MainModal';

const FilterBar = ({ filterTitle }) => {
    const {setMainModalOpen, currentNavItemState } = useContext(SuperHeroAppContext);
    
    return (
        <div className='flex flex-row pb-2 sm:pb-0 items-center bg-zinc-900 justify-between'>
            <div className='flex flex-row sm:hidden'>
                <h1 className='text-red-600 text-2xl font-bold'>{filterTitle}</h1>
            </div>
            {
                currentNavItemState === NAV_LINK_SUPERHERO ?    
                    <span
                        className='cursor-pointer'
                        // onTouchEnd={() => setModalState(true)}
                        onClick={() => setMainModalOpen(true)}
                    >
                        <LuFilter color='white' size={24} />
                    </span> :
                    null
            }
            <MainModal>
                <FilterBoxTemplate />
            </MainModal>
        </div>
    )              
}

export default FilterBar