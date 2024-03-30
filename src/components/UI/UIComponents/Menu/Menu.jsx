import { useContext } from 'react'
import { NAV_LINK_ABOUT, NAV_LINK_FAVOURITES, NAV_LINK_SUPERHERO } from '../../../utils/strings'
import { Link, useLocation } from 'react-router-dom'
import "../../styles/menuanim.css"
import { SuperHeroAppContext } from '../../../Context/AppContext'

const Menu = () => {
    const { isNavLinkMenuOpen } = useContext(SuperHeroAppContext);
    const currentNavItem = useLocation();
    return (
        <div className={`fixed z-20 w-full h-[calc(100%_-_70px)] p-4 bg-zinc-900 flex flex-col items-end bottom-0 left-0 right-0 ${ isNavLinkMenuOpen ? "animate-slide-from-right" : "animate-slide-from-right-reverse"} `}>
            <div className=' w-full flex flex-col items-center gap-4'>
                <div className='w-[80%] h-[1px] bg-white'></div>
                <Link to="/">
                    <h1 className={`text-2xl  font-semibold px-4 ${currentNavItem.pathname === "/" ? "text-red-600" : "text-white"} `}>
                        {NAV_LINK_SUPERHERO}
                    </h1>
                </Link>
                <div className='w-[80%] h-[1px] bg-white'></div>
            </div>
            {/* <div className=' w-full flex flex-col items-center gap-4'>
                <Link className='pt-4' to="/about">
                    <h1 className={`text-2xl  font-semibold px-4 ${currentNavItem.pathname === "/about" ? "text-red-600" : "text-white"} `}>
                        {NAV_LINK_ABOUT}
                    </h1>
                </Link>
                <div className='w-[80%] h-[1px] bg-white'></div>
            </div> */}
            <div className=' w-full flex flex-col items-center gap-4'>
                <Link className='pt-4' to="/favourite">
                    <h1 className={`text-2xl  font-semibold px-4 ${currentNavItem.pathname === "/favourite" ? "text-red-600" : "text-white"} `}>
                        {NAV_LINK_FAVOURITES}
                    </h1>
                </Link>
                <div className='w-[80%] h-[1px] bg-white'></div>
            </div>
        </div>
    )
}

export default Menu