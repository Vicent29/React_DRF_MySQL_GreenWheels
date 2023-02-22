import React from 'react'

export default function Rent({ bike, changestatus, createRnt }) {

    return (
        <div className='d-flex justify-center align-middle m-1'>
            <div className="flex flex-col items-center w-[80%] rounded-lg shadow md:flex-row md:max-w-xl border-gray-700 bg-gray-700 hover:bg-black hover-border-white hover-up">
                <img className="object-cover md:h-full md:w-48 md:rounded-none md:rounded-l-lg" src={bike.img_bike} alt="img" />
                <div className="flex flex-col justify-between p-4 leading-normal w-full">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">{bike.slug}</h5>
                    <h6 className="mb-2 text-xl font-bold tracking-tight text-white">You want to reserve it?</h6>
                    <div className='d-flex justify-evenly'>
                        <button type='button' className='btn btn-outline-info' onClick={(e) => { createRnt({ "bike": bike.id, "slug": bike.slug }) }}>Confirm</button>
                        <button type='button' className='btn btn-outline-danger' onClick={changestatus}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}