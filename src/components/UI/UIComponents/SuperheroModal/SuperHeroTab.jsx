import React, { useState } from 'react'
import { APPEARANCE, BIOGRAPHY, CONNECTIONS, POWERSTATS } from '../../../utils/strings'

const SuperHeroTab = () => {
    const [superheroTabState, setSuperHeroTabState] = useState(POWERSTATS)
    
    return (
        <div className='w-full h-full my-4 text-white'>
            <div className='w-full flex gap-7 flex-row justify-between' onClick={e => setSuperHeroTabState(e.target.id)}>
                <p
                    id={POWERSTATS}
                    className={superheroTabState === POWERSTATS ?'font-bold': 'underline underline-offset-8 font-bold decoration-2 decoration-red-600'}
                >
                    {POWERSTATS}
                </p>
                <p id={APPEARANCE} className={superheroTabState === APPEARANCE ?'font-bold': 'underline underline-offset-8 font-bold decoration-2 decoration-red-600'}>{APPEARANCE}</p>
                <p id={BIOGRAPHY} className={superheroTabState === BIOGRAPHY ?'font-bold': 'underline underline-offset-8 font-bold decoration-2 decoration-red-600'}>{BIOGRAPHY}</p>
            </div>
            <div className=''>

            </div>
        </div>
    )
}

export default SuperHeroTab