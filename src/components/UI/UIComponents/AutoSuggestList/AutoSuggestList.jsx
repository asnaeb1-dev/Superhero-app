import React, { useContext } from 'react'
import { SuperHeroAppContext } from '../../../Context/AppContext'

const AutoSuggestList = ({ superheroList = [] }) => {
    const { isAutoSuggestOpen, setAutoSuggestOpen, showSuperheroModal, setShowSuperHeroModal } = useContext(SuperHeroAppContext)

    const handleSelect = e => {
        setAutoSuggestOpen(false)
        setShowSuperHeroModal(true)
    }

    if(!isAutoSuggestOpen) return null;
    return (
        <div onClick={e => handleSelect(e)} className=' max-h-[350px] h-[350px] overflow-y-scroll absolute top-[135px] w-[94%] md:top-[70px] md:w-[24%]'>
            {
                superheroList && superheroList.map((superhero, index) => {
                    return (
                        <AutoSuggestItem
                            key={index}
                            id={superhero?.id}
                            superheroName={superhero?.name}
                            superheroRealName={superhero?.biography["full-name"]}
                            superheroImage={superhero?.image?.url}
                        />
                    )
                })
            }
        </div>
    )
}

const AutoSuggestItem = ({ superheroName, superheroImage, superheroRealName, id }) => {
    return (
        <div id={id} className='flex flex-row h-16 gap-4  m-2 p-2 rounded-md hover:bg-white hover:bg-opacity-20'>
            <img src={superheroImage} alt={superheroName} />
            <div className='flex flex-col justify-start'>
                <h1 className='text-white font-bold text-md'>{superheroName}</h1>
                <p className='text-white'>{superheroRealName}</p>
            </div>
        </div>
    )
}
export default AutoSuggestList