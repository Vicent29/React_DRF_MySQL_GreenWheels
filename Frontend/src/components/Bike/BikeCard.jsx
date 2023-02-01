import React from 'react'
import "./Bike.scss"

export default function BikeCard({ bike }) {
    // console.log(bike);
    return (
        <>
            <div className='d-flex justify-center align-middle m-1'>
                <div className="flex flex-col items-center rounded-lg shadow md:flex-row md:max-w-xl border-gray-700 bg-gray-700 hover:bg-black hover-border-white hover-up">
                    <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={bike.img_bike} alt="img" />
                    <div className="flex flex-col justify-between p-4 leading-normal">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">{bike.slug}</h5>
                        <p className="mb-3 font-normal text-gray-400">Bicicleta GreenWheel: ecológica, económica ({bike.pfm}€/min) y cómoda. ¡Alquíla hoy!</p>
                    </div>
                </div>
            </div>
        </>
    )
}