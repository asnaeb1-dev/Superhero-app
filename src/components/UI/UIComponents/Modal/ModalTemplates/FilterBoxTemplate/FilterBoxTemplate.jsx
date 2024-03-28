import React, { useContext, useState } from 'react'
import { FaAngleDown, FaAngleUp, FaCheck } from "react-icons/fa";
import { SuperHeroAppContext } from '../../../../../Context/AppContext';
import { GrFormNextLink, GrFormPreviousLink  } from "react-icons/gr";
import { ALPHABET, COUNT, NEXT, PAGE, PREVIOUS } from '../../../../../utils/strings';

const FilterBoxTemplate = () => {
    const { filterBoxState, setFilterBoxState, setMainModalOpen } = useContext(SuperHeroAppContext);
    const [currentFilterBoxState, setCurrentFilterBoxState] = useState(filterBoxState);

    const handlePageMovement = (pageMovement = NEXT) => {
        switch (pageMovement) {
            case PREVIOUS:
                if(filterBoxState.pageNumber - filterBoxState.count < 2) return;
                setCurrentFilterBoxState(filterState => {
                    const newState = {...filterState}
                    newState.pageNumber-=newState.count;
                    return newState
                })
                break;
            case NEXT:
                setCurrentFilterBoxState(filterState => {
                    const newState = {...filterState}
                    newState.pageNumber+=newState.count;
                    return newState
                })
                break;
            default:
                break;
        }
    }

    return (
        <div onTouchEnd={e => e.stopPropagation()} onClick={e => e.stopPropagation()} className=' bg-zinc-800 z-50 rounded-br-xl rounded-bl-xl rounded-tl-xl border-[1.5px] border-red-600 absolute grid grid-cols-1 right-[27px] top-[174px] sm:top-[63px] w-[200px] h-[240px] p-4'>
            <div className='flex flex-row justify-between text-white items-center'>
                <h1>{currentFilterBoxState.alphabeticalOrderIncresing ? "A-Z" : "Z-A"}</h1>
                <div
                    onClick={() => setCurrentFilterBoxState(filterState => {
                        const newState = {...filterState}
                        newState.alphabeticalOrderIncresing = !newState.alphabeticalOrderIncresing
                        return newState
                    })}
                >
                    { currentFilterBoxState.alphabeticalOrderIncresing ? <FaAngleDown /> : <FaAngleUp /> }
                </div>
            </div>
            <div className='flex flex-row justify-between text-white items-center'>
                <h1>{COUNT}</h1>
                <select 
                    onChange={e => setCurrentFilterBoxState(filterState => {
                        const newState = {...filterState};
                        newState.count = e.target.value;
                        return newState;
                    })} 
                    defaultValue={currentFilterBoxState.count}
                    className='bg-zinc-800 outline-none font-semibold'
                    name="superhero_count"
                    id="superhero_count"
                >
                    {
                        [...new Array(6)].map((item, index) => {
                            return <option key={index} value={`${(index + 1) * 10}`}>{(index + 1)* 10}</option>
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
                    style={{textTransform: "uppercase"}}
                    onChange={e => setCurrentFilterBoxState(filterState => {
                        const newState = {...filterState};
                        newState.currentAlphabet = e.target.value;
                        return newState;
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
            <div className='flex flex-row justify-end' onClick={() => setFilterBoxState(currentFilterBoxState)} onTouchEnd={() => setFilterBoxState(currentFilterBoxState)}>
                <button onTouchEnd={() => setTimeout(() => setMainModalOpen(false), 300)} onClick={() => setTimeout(() => setMainModalOpen(false), 300)}>
                    <FaCheck color='red'/>
                </button>
            </div>
        </div>
    )
}

export default FilterBoxTemplate;