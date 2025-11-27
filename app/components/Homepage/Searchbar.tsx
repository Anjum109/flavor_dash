import React from 'react'

export default function Searchbar() {
    return (
        <div className='flex justify-center py-5 px-12'>
            <input type='text' placeholder='Search Here ......' className='lg:w-[60%] outline-none border-2 border-amber-800 rounded-4xl px-12 py-2 text-white' />
        </div>
    )
}
