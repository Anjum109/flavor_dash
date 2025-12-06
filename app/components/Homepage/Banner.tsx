import Image from 'next/image'
import React from 'react'
import banner from '../../assets/images/custom-img-014-copyright (1).png'
import { advent_pro, bricolage, hanken } from '@/font/font'
import { FaStar } from "react-icons/fa6";
export default function Banner() {
    return (
        <div>
            <div className="relative w-full">

                {/* BACKGROUND TEXT */}
                <h1 className="
        absolute 
      hidden lg:block
        left-1/2 
        -translate-x-1/2 
        text-[180px] 
        leading-none 
        font-extrabold 
        text-white/20 
        uppercase 
        tracking-tight 
        select-none
        whitespace-nowrap
        z-0
    ">
                    RIGHT  <br /> TO YOUR DOOR
                </h1>

                {/* MAIN IMAGE */}
                <div className="relative z-10 flex justify-center">

                    <Image src={banner} alt="img" className="h-full hidden lg:block lg:w-[700px] object-contain" />
                </div>
            </div>
            <div className='flex justify-between items-center px-12 '>
                <div className='flex flex-col h-full text-white gap-3 '>
                    <h1 className='text-[50px] leading-10 mt-[-300px] hidden lg:block'>
                        <span className={bricolage.className}>  Hot, mouthwatering, <br /> and lightning-fast.</span>
                    </h1>
                    <div className='hidden lg:block'>
                        <p className={hanken.className}> From burgers to pizza,
                            fries to drinks
                            everything arrives in <br />  just 30 minutes.No lines. Zero stress.</p>

                    </div>
                </div>
                <div className='hidden lg:block'>
                    <div className='flex gap-1  mt-[-200px] text-[20px] text-amber-600'>
                        <FaStar />  <FaStar />  <FaStar />  <FaStar />  <FaStar />
                    </div>
                    <p className='text-white text-[15px]'><span className={hanken.className}>Your trusted partner in delivering healthy choices.</span></p>
                </div>
            </div>
            <div className='lg:hidden pb-5'>
                <div className='flex justify-center items-center border-2 gap-1 border-amber-600 mx-12 rounded-4xl p-5 bg-[#96160f] '>
                    <div className='text-white text-6xl'>
                        <h1 className={advent_pro.className}>50% OFF</h1>
                        <p className='text-[15px] text-center'>ON YOUR FIRST ORDER</p>
                    </div>
                    <div>
                        <Image src={banner} alt="img" className='w-[100px]' />
                    </div>
                </div>
            </div>
        </div>
    )
}
