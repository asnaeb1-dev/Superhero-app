import React, { useContext, useState } from 'react'
import { FaAngleDown, FaAngleUp, FaCheck } from "react-icons/fa";
import { SuperHeroAppContext } from '../../../Context/AppContext';
import { GrFormNextLink, GrFormPreviousLink  } from "react-icons/gr";
import { ALPHABET, COUNT, PAGE } from '../../../utils/strings';

const FilterBox = () => {
    const { setModalState, filterBoxState, setFilterBoxState } = useContext(SuperHeroAppContext);
    const [currentFilterBoxState, setCurrentFilterBoxState] = useState(filterBoxState);

    const handlePageMovement = (pageMovement = "NEXT") => {
        switch (pageMovement) {
            case "PREVIOUS":
                break;
            case "NEXT":
                break;
            default:
                break;
        }
    }

    return (
        <div onTouchEnd={e => e.stopPropagation()} className=' bg-zinc-800 z-50 rounded-br-xl rounded-bl-xl rounded-tl-xl border-[1.5px] border-red-600 absolute grid grid-cols-1 right-[15px] top-[75px] w-[200px] h-[240px] p-4'>
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
                <h1>{COUNT}</h1>
                <select defaultValue={currentFilterBoxState.count} className='bg-zinc-800 outline-none font-semibold' name="superhero_count" id="superhero_count">
                    {
                        [...new Array(6)].map((item, index) => {
                            return <option key={index} value={`${(index + 1) * 10}`}>{(index + 1 )* 10}</option>
                        })
                    }
                </select>
            </div>
            <div className='flex flex-row justify-between text-white items-center'>
                <h1>{ALPHABET}</h1>
                <input
                    className='w-[30px] border-2 border-red-600 rounded-lg bg-transparent text-center outline-none focus:bg-slate-500'
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
            <div className='flex flex-row justify-between text-white items-center'>
                <h1>{PAGE}</h1>
                <span className='flex flex-row gap-2'>
                    <div onTouchEnd={() => handlePageMovement("PREVIOUS")} className='border-[2px] border-red-600 rounded-lg px-2 hover:bg-white hover:bg-opacity-10'>
                        <GrFormPreviousLink size={25} />
                    </div>
                    <div onTouchEnd={() => handlePageMovement("NEXT")} className='border-[2px] border-red-600 rounded-lg px-2 hover:bg-white hover:bg-opacity-10'>
                        <GrFormNextLink size={25} />
                    </div>
                </span>
            </div>
            <div className='flex flex-row justify-end' onTouchEnd={() => setFilterBoxState(currentFilterBoxState)}>
                <button onTouchEnd={() => setTimeout(() => setModalState(false), 300)} onClick={() => setTimeout(() => setModalState(false), 300)}>
                    <FaCheck color='red'/>
                </button>
            </div>
        </div>
    )
}

export default FilterBox