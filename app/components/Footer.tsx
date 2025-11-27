import React from 'react'
import logo from '../assets/logo/faviconfull.png'
import Image from 'next/image'
import { advent_pro } from '@/font/font'

export default function Footer() {
    return (
        <div className='bg-[#f8ecec]'>
            <div className='bg-gray-200 my-5 h-[2px] w-full'></div>
            <Image src={logo} alt='logo' />
            <div className='flex justify-between text-[20px] text-gray-600 items-center mx-12 mb-4'>
                <p className={advent_pro.className}>flavordash@gmail.com</p>
                <p className={advent_pro.className}>you can contact with us for any query</p>
            </div>
        </div>
    )
}
