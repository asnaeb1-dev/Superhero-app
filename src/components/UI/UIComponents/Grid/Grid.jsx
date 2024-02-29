import React, { useContext } from 'react'
import { FaInfoCircle } from "react-icons/fa";
import { SuperHeroAppContext } from '../../../Context/AppContext';

const Grid = ({ superheroList }) => {

    const { setCurrentSuperHeroID, setShowSuperHeroModal } = useContext(SuperHeroAppContext);

    const handleSuperHeroID = (id) => {
        const index = id.split("_");
        setCurrentSuperHeroID(index[index.length - 1]);
        setShowSuperHeroModal(true)
    }

    return (
        <div onClick={(e) => handleSuperHeroID(e.target.id)} className='w-full grid h-[calc(100vh_-_192px)] overflow-y-scroll grid-cols-2 gap-3 mb-4 sm:grid-cols-3 sm:h-[calc(100vh_-_90px)] md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
            {
                superheroList && superheroList.map((superhero, index) => {
                    return (
                        <GridItem
                            key={index}
                            superheroID={superhero?.id}
                            superheroImage={superhero?.image?.url}
                            superheroName={superhero?.name}
                            superheroRealName={superhero?.biography["full-name"]}
                        />
                    )
                })
            }
        </div>
    )
}

const GridItem = ({ superheroImage, superheroName, superheroRealName, superheroID }) => {
    return (
        <div  className='rounded-xl h-[300px] cursor-pointer bg-no-repeat bg-cover bg-center xl:h-[450px]' style={{ backgroundImage: `url(${superheroImage})` }}>
            <div id={`superhero_id_${superheroID}`} className='w-full h-full flex items-end flex-col'>
                <div className='flex-1 p-4'>
                    <FaInfoCircle onMouseEnter={e => console.log("mouse has entered")} onMouseLeave={e => console.log("mouse has left")} size={23} color='white' />
                </div>
                <div className=' w-full p-4 hover:bg-black hover:bg-opacity-30'>
                    <h1 className='text-white font-extrabold xl:text-2xl'>{superheroName}</h1>
                    <h1 className={superheroRealName ? ' text-red-600 font-semibold':"opacity-0"}>{superheroRealName ? superheroRealName : "random"}</h1>
                </div>
            </div>
        </div>
    )
}

export default Grid