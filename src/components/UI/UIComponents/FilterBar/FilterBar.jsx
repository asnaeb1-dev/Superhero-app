import { useContext } from 'react'
import { SuperHeroAppContext } from '../../../Context/AppContext';
import Modal from '../SuperheroModal/Modal';
import { LuFilter } from "react-icons/lu";
import { NAV_LINK_SUPERHERO } from '../../../utils/strings';

const FilterBar = ({ filterTitle }) => {
    const { modalState, setModalState, currentNavItemState } = useContext(SuperHeroAppContext);
    
    return (
        <div className='flex flex-row pb-2 sm:pb-0 items-center bg-zinc-900 justify-between'>
            <div className='flex flex-row sm:hidden'>
                <h1 className='text-red-600 text-2xl font-bold'>{filterTitle}</h1>
            </div>
            {
                currentNavItemState === NAV_LINK_SUPERHERO ?    
                    <span className=' cursor-pointer' onTouchEnd={() => setModalState(true)} onClick={() => setModalState(true)}>
                        <LuFilter color='white' size={24} />
                    </span> :
                    null
            }
            {modalState ? <Modal /> : null}
        </div>
    )
}

export default FilterBar