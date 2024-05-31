import {useEffect,useRef,useContext} from 'react';

import lg from '../../assets/images/lg.png';
import { authContext } from '../../context/AuthContext';
import {NavLink, Link} from 'react-router-dom'
import {BiMenu} from "react-icons/bi";
const navLinks = [
    {
        path:'/index',display:'Home'
    },
    {
        path:'/doctors',display:'Find a doctor'
    },
    {
        path:'/service',display:'Services'
    },
    
]

const Header = () => {

    const headerRef = useRef(null)
    const menuRef = useRef(null)
    const {user,role,token} = useContext(authContext)

    const handleStickyHeader = ()=>{
        window.addEventListener('scroll', ()=>{
            if(document.body.scrollTop > 80 || document.documentElement.scrollTop >80)
            {
                headerRef.current.classList.add('sticky__header')
            }else{
                headerRef.current.classList.remove('sticky__header')
                
            }
        })
    }
    useEffect(()=>{
        handleStickyHeader()

        return ()=> window.removeEventListener('scroll',handleStickyHeader)
    });
    const toggleMenu = ()=> menuRef.current.classList.toggle('show_menu')
    return(
        <header className='header flex items-center' ref={headerRef}>
        <div className='container'>
            <div className='flex items-center justify-between'>
                {/*========logo========*/}
                <div>
                    <img src={lg} alt=""/>
                    </div>
                {/*========menu========*/}
                <div className='navigation' ref={menuRef} onClick={toggleMenu}>
                    <ul className='menu flex items-center gap-[2.7rem]'>
                    {
                        navLinks.map((Link,index)=><li key={index}>
                            <NavLink to={Link.path} className={navClass=> navClass.isActive ? 'text-primaryColor text-[16px] leading-7 font-[800]':
                            'text-white text-[16px] leading-7 font-[800] hover:text-primaryColor'}> {Link.display}</NavLink>
                        </li>)
                    }
                    </ul>
                </div>
                {/*========nav right========*/}
                <div className='flex items-center gap-4'>
                    {
                        token && user ? (<div>
                            <Link to={`${role === 'doctor' ? '/doctors/profile/me' : role === 'admin' ? '/admin/profile/me' : '/users/profile/me'}`}>
    <figure className="w-[55px] h-[55px] rounded-full cursor-pointer">
        <img src={user?.photo} className='w-full rounded-full ' alt=""/>
    </figure>
</Link>
                
                            </div>):(<Link to="/signin">
                                <button className='bg-black py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]'>Sign-in</button>
                            </Link>)
                    }
                   
                
               
                </div>
        </div></div>
    </header>
   ); 
};
export default Header;