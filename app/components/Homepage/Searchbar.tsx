import React from 'react'

export default function Searchbar() {
    return (
        <div className='flex justify-center mx-5 py-5 lg:px-12'>
            <input type='text' placeholder='Search For Dishes And Restaurent...' className='lg:w-[60%] outline-none border-2 border-amber-800 rounded-4xl px-12 py-2 text-black bg-[#eae5ecb9]  w-full' />
        </div>
    )
}
