import React, { useContext, useState } from 'react'
import { FaAngleDown, FaAngleUp, FaCheck } from "react-icons/fa";
import { SuperHeroAppContext } from '../../../Context/AppContext';

const FilterBox = () => {
    const { isFilterBoxOpen, setFilterBoxOpen } = useContext(SuperHeroAppContext);
    const [filterBoxState, setFilterBoxState] = useState(
        {
            alphabeticalOrderIncresing: true,
            count: 20,
            currentAlphabet: "A",
        }
    )
    return (
        <div className=' bg-zinc-800 rounded-lg absolute grid grid-cols-1 right-4 top-[180px] w-[200px] h-[200px] p-4'>
            <div className='flex flex-row justify-between text-white items-center'>
                <h1>{filterBoxState.alphabeticalOrderIncresing ? "A-Z" : "Z-A"}</h1>
                <button onClick={() => setFilterBoxState(filterState => {
                    const newState = {...filterState}
                    newState.alphabeticalOrderIncresing = !newState.alphabeticalOrderIncresing
                    return newState
                })}>
                    {
                        filterBoxState.alphabeticalOrderIncresing ? <FaAngleDown /> : <FaAngleUp />
                    }
                </button>
            </div>
            <div className='flex flex-row justify-between text-white items-center'>
                <h1>Count</h1>
                <button>
                    <FaAngleDown />
                </button>
            </div>
            <div className='flex flex-row justify-between text-white items-center'>
                <h1>Alphabet</h1>
                <input className='w-[30px] border-2 border-red-600 rounded-md bg-transparent text-center outline-none focus:bg-slate-500' value={filterBoxState.count} maxLength={1} onChange={e => setFilterBoxState(filterState => {
                    const newState = {...filterBoxState};
                    newState.count = e.target.value;
                    return newState;
                })} />
            </div>
            <div className='flex flex-row justify-end'>
                <button onTouchEnd={() => setFilterBoxOpen(false)}>
                    <FaCheck color='red'/>
                </button>
            </div>
        </div>
    )
}

export default FilterBox