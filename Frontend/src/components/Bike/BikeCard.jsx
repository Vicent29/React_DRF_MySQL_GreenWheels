import React, { useContext, useState } from 'react'
import Rent from '../Rent/Rent';
import "./Bike.scss"
import AuthContextProvider from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useRent } from '../../hooks/useRent';

export default function BikeCard({ bike, createRnt }) {
    const navigate = useNavigate();
    const [show, setShow] = useState(true)
    const { user } = useContext(AuthContextProvider)

    const handleclick = () => {
        if (user) {
            setShow(!show)
        } else {
            navigate("/signin")
        }
    }

    return (
        <>
            {show && (
                <div className='d-flex justify-center align-middle m-1'>
                    <div className="flex flex-col items-center rounded-lg shadow w-[80%] md:flex-row md:max-w-xl border-gray-700 bg-gray-700 hover:bg-black hover-border-white hover-up" onClick={handleclick}>
                        <img className="object-cover md:h-full md:w-48 md:rounded-none md:rounded-l-lg" src={bike.img_bike} alt="img" />
                        <div className="flex flex-col justify-between p-4 leading-normal">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">{bike.slug}</h5>
                            <p className="mb-3 font-normal text-gray-400">GreenWheel bicycle: ecological, economical ({bike.pfm}€/min) and comfortable. Rent it today!</p>
                        </div>
                    </div>
                </div>
            )}
            {!show && (
                <Rent bike={bike} changestatus={handleclick} createRnt={createRnt} />
            )}
        </>
    )
}