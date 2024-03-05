import React, { useContext, useState } from 'react'
import { FaAngleDown, FaAngleUp, FaCheck } from "react-icons/fa";
import { SuperHeroAppContext } from '../../../Context/AppContext';

const FilterBox = () => {
    const { setModalState, filterBoxState, setFilterBoxState } = useContext(SuperHeroAppContext);
    const [currentFilterBoxState, setCurrentFilterBoxState] = useState(filterBoxState)
    return (
        <div onTouchEnd={e => e.stopPropagation()} className=' bg-zinc-800 z-50 rounded-lg absolute grid grid-cols-1 right-4 top-[180px] w-[200px] h-[200px] p-4'>
            <div className='flex flex-row justify-between text-white items-center'>
                <h1>{currentFilterBoxState.alphabeticalOrderIncresing ? "A-Z" : "Z-A"}</h1>
                <div onClick={() => setCurrentFilterBoxState(filterState => {
                    const newState = {...filterState}
                    newState.alphabeticalOrderIncresing = !newState.alphabeticalOrderIncresing
                    return newState
                })}>
                    { currentFilterBoxState.alphabeticalOrderIncresing ? <FaAngleDown /> : <FaAngleUp /> }
                </div>
            </div>
            <div className='flex flex-row justify-between text-white items-center'>
                <h1>Count</h1>
                <button>
                    <FaAngleDown />
                </button>
            </div>
            <div className='flex flex-row justify-between text-white items-center'>
                <h1>Alphabet</h1>
                <input
                    className='w-[30px] border-2 border-red-600 rounded-md bg-transparent text-center outline-none focus:bg-slate-500'
                    value={currentFilterBoxState.currentAlphabet}
                    maxLength={1}
                    type={"text"}
                    onChange={e => setCurrentFilterBoxState(filterState => {
                        const newState = {...filterState};
                        newState.currentAlphabet = e.target.value;
                        return newState
                    })}
                />
            </div>
            <div className='flex flex-row justify-end' onTouchEnd={() => setFilterBoxState(currentFilterBoxState)}>
                <button onTouchEnd={() => setTimeout(() => setModalState(false), 300)}>
                    <FaCheck color='red'/>
                </button>
            </div>
        </div>
    )
}

export default FilterBox