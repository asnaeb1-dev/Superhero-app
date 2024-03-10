import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaInfoCircle } from "react-icons/fa";
import { SuperHeroAppContext } from '../../../Context/AppContext';
import "./animate.css";

const Grid = ({ superheroList }) => {

    const { setCurrentSuperHeroID, setShowSuperHeroModal, modalState, filterBoxState } = useContext(SuperHeroAppContext);
    const handleSuperHeroID = (id) => {
        const index = id.split("_");
        setCurrentSuperHeroID(index[index.length - 1]);
        setShowSuperHeroModal(true)
    }

    return (
        <div onClick={(e) => e.target.id && handleSuperHeroID(e.target.id)} className={`${modalState ? "pointer-events-none" : setTimeout(() => "pointer-events-auto", 200)} w-full grid h-[calc(100vh_-_192px)] overflow-y-scroll grid-cols-2 gap-3 mb-4 sm:grid-cols-3 sm:h-[calc(100vh_-_90px)] md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6`}>
            {
                superheroList && (filterBoxState.alphabeticalOrderIncresing ? superheroList.map((superhero, index) => {
                    return (
                        <GridItem
                            key={index}
                            superheroID={superhero?.id}
                            superheroImage={superhero?.image?.url}
                            superheroName={superhero?.name}
                            superheroRealName={superhero?.biography["full-name"]}
                        />
                    )
                }) : superheroList.toReversed().map((superhero, index) => {
                    return (
                        <GridItem
                            key={index}
                            superheroID={superhero?.id}
                            superheroImage={superhero?.image?.url}
                            superheroName={superhero?.name}
                            superheroRealName={superhero?.biography["full-name"]}
                        />
                    )
                }))
            }
        </div>
    )
}

const GridItem = ({ superheroImage, superheroName, superheroRealName, superheroID }) => {
    const [mouseEnter, setMouseEnter] = useState(false)
    const gridItemRef = useRef();

    useEffect(() => {
        if(mouseEnter) {
            gridItemRef.current.classList.add(`animate-height-pop`);
        } else {
            gridItemRef.current.classList.remove(`animate-height-pop`);
        }
    }, [mouseEnter])

    return (
        <div className='rounded-xl h-[300px] cursor-pointer bg-no-repeat bg-cover bg-center xl:h-[450px]' style={{ backgroundImage: `url(${superheroImage})` }}>
            <div id={`superhero_id_${superheroID}`} className='w-full h-full flex items-end flex-col'>
                <div onClick={() => console.log("touchend")} onTouchEnd={e => console.log("click")} className='flex-1 p-4'>
                    <FaInfoCircle onMouseEnter={() => setMouseEnter(true)} onMouseLeave={() => setMouseEnter(false)} size={23} color={mouseEnter ? 'rgb(220 38 38)' : 'white' } />
                </div>
                <div ref={gridItemRef} className={`w-full ${mouseEnter ? 'h-4/5' : `h-1/5 animate-height-down-pop`} rounded-t-xl p-4 bg-black bg-opacity-50`}>
                    <h1 className='text-white font-extrabold xl:text-2xl'>{superheroName}</h1>
                    <h1 className={superheroRealName ? ' text-red-600 font-semibold':"opacity-0"}>{superheroRealName ? superheroRealName : "random"}</h1>
                </div>
            </div>
        </div>
    )
}

export default Grid