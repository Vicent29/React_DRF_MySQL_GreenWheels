import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import "./incident.scss"
import { useBikes } from "../../hooks/useBikes"
import { useSlots } from "../../hooks/useSlots"
import { useIncident } from "../../hooks/useIncident"



export default function Incident() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [step, setStep] = useState(0);
    const [form, setForm] = useState();
    const { bikes } = useBikes();
    const { slots } = useSlots();
    const { createIncidence } = useIncident();

    const newPage = (data) => {
        setForm(data)
        handleStep(1)
    }

    const steps = ["Incidence", "Specify", "Description"]

    let prueba = steps.map((s, id) => {
        return id === step ? <li key={id} className='is-active'>{s}</li> : <li key={id}>{s}</li>
    })

    const handleStep = (number) => {
        if (step + number !== -1) {
            setStep(step + number)
        }
    }

    // const 

    return (
        <>
            <div className='all_incident'>
                <div className='text-white'>
                    <div className="container-fluid">
                        <br /><br />
                        <ul className="list-unstyled multi-steps">
                            {prueba}
                        </ul>
                    </div>
                    <form className='d-flex justify-center align-items-center formclass' onSubmit={handleSubmit(newPage)}>
                        <div className="w-full max-w-xs">
                            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                                {step === 0 && (
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Incident
                                        </label>
                                        <select name="" id="" className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            {...register("incident", { required: true })}>
                                            <option value="bike">Bike</option>
                                            <option value="slot">Slot</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                )}
                                {step === 1 && form.incident === "bike" && (
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Bike
                                        </label>
                                        <select name="" id="" className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            {...register("bike", { required: true })}>
                                            {bikes.map((bike) => {
                                                return <option key={bike.id} value={bike.id}>{bike.id} {bike.slug}</option>
                                            })}
                                        </select>
                                    </div>
                                )}
                                {step === 1 && form.incident === "slot" && (
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Slot
                                        </label>
                                        <select name="" id="" className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            {...register("slot", { required: true })}>
                                            {slots.map((slot) => {
                                                return <option key={slot.id} value={slot.id}>{slot.id} {slot.slug}</option>
                                            })}
                                        </select>
                                    </div>
                                )}
                                {step === 1 && form.incident === "other" && (
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Location
                                        </label>

                                        <input name="" id="" className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            {...register("location", { required: true })} placeholder="C/ de españa" autoComplete="off" />
                                    </div>
                                )}
                                {step === 2 && (
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Description
                                        </label>
                                        <input name="" id="" className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                            {...register("desc", { required: true })} placeholder="don't works" autoComplete="off" required />
                                    </div>
                                )}
                                <div className="flex items-center justify-between">
                                    <button type='button' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        onClick={(e) => handleStep(-1)}>Prev</button>
                                    {step !== 2 && (
                                        <button type='button' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            onClick={handleSubmit(newPage)}>Next</button>
                                    )}
                                    {step === 2 && (
                                        <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            onClick={handleSubmit(createIncidence)}>Send</button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}