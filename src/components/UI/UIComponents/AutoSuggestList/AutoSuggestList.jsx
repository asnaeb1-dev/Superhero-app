import React, { useContext, useState } from 'react'
import { SuperHeroAppContext } from '../../../Context/AppContext'
import "./autosuggestlist.css";

const AutoSuggestList = ({ superheroList = [] }) => {
    const { isAutoSuggestOpen, setAutoSuggestOpen, showSuperheroModal, setShowSuperHeroModal, setCurrentSuperHeroID, searchText } = useContext(SuperHeroAppContext)
    const [windowSize, setWindowSize] = useState(document.getElementById('search-form').getBoundingClientRect().width);

    const handleSelect = id => {
        setAutoSuggestOpen(false)
        setTimeout(() => {
            setShowSuperHeroModal(true)
            console.log("ID", id);
            setCurrentSuperHeroID(id)    
        }, 500)
    }
    
    window.addEventListener("resize", e => {
        const width = document.getElementById('search-form').getBoundingClientRect().width;
        setWindowSize(width)
    })

    if(!isAutoSuggestOpen) return null;
    return (
        <div onClick={e => handleSelect(e)} className={`bg-zinc-900 max-h-[350px] border-2 border-white ${searchText.length === 0 ? "rounded-xl" : "rounded-b-2xl"} overflow-y-scroll absolute top-[127px] w-[94%] md:top-[57px] main-content`}>
            {
                superheroList && superheroList.map((superhero, index) => {
                    return (
                        <AutoSuggestItem
                            key={index}
                            id={superhero?.id}
                            superheroName={superhero?.name}
                            superheroRealName={superhero?.biography["full-name"]}
                            superheroImage={superhero?.image?.url}
                            handleSelect={itemId => handleSelect(itemId)}
                        />
                    )
                })
            }
        </div>
    )
}

const AutoSuggestItem = ({ superheroName, superheroImage, superheroRealName, id, handleSelect }) => {
        return (
        <div id={`${id}`} onClick={e => handleSelect(e.target.id)} className='flex flex-row h-16 gap-4  m-2 p-2 w-full rounded-md hover:bg-white hover:bg-opacity-20'>
            <img src={superheroImage} alt={superheroName} />
            <div className='flex flex-col justify-start'>
                <h1 className='text-white font-bold text-md'>{superheroName}</h1>
                <p className='text-white'>{superheroRealName}</p>
            </div>
        </div>
    )
}
export default AutoSuggestList