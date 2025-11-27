import { advent_pro, monoton } from '@/font/font'
import { CgProfile } from "react-icons/cg";
import { FaSearch } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import logo from '../assets/logo/favicon.png'
import Image from 'next/image';

export default function Navbar() {
    return (
        <div className='py-5 px-20 text-white'>
            <div className='flex justify-between  items-center w-full'>
                <div className='flex items-center gap-2'>
                    <Image src={logo} alt='logo' className='z-10 w-[40px]' />
                    <h1 className='text-3xl'><span className={monoton.className}>Flavor Dash</span></h1>
                </div>
                <div className={advent_pro.className}>
                    <ul className='flex gap-2 items-center text-[22px] underline'>
                        <li className=' cursor-pointer hover:text-amber-300 duration-1000'>Home</li>
                        <li className=' cursor-pointer hover:text-amber-300 duration-1000'>Pages</li>
                        <li className=' cursor-pointer hover:text-amber-300 duration-1000'>Restaurent List</li>
                        <li className=' cursor-pointer hover:text-amber-300 duration-1000'>Shop</li>
                        <li className=' cursor-pointer hover:text-amber-300 duration-1000'>Contact us</li>
                    </ul>
                </div>
                <div className='flex items-center gap-2 text-[25px]'>
                    <button><FaSearch /></button>
                    <button><CgProfile /></button>
                    <button><FaShoppingCart /></button>
                </div>
            </div>
        </div >
    )
}
