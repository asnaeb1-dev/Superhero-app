import React from 'react'

const Grid = ({ superheroList }) => {
    return (
        <div className='w-full grid grid-cols-2 gap-2 my-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
            {
                superheroList && superheroList.map((superhero, index) => {
                    return <GridItem key={index} superheroImage={superhero?.image?.url} />
                })
            }
        </div>
    )
}

const GridItem = ({ superheroImage }) => {
    return (
        <div className='rounded-xl'>
            <img className='rounded-xl object-fill h-[100%]' src={superheroImage} />
        </div>
    )
}

export default Grid