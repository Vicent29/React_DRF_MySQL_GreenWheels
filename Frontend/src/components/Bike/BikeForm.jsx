import React from 'react'
import { useBikes } from '../../hooks/useBikes'
import { useSlots } from '../../hooks/useSlots'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'

export default function FormBike() {
    const { createBike } = useBikes()
    const { slots, getSlotsnoBike } = useSlots()
    const { register, handleSubmit, formState: { errors } } = useForm()

    useEffect(() => {
        getSlotsnoBike()
    }, [])

    return (
        <div className="modal fade" id="ModalNewBike" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-center" id="exampleModalLabel"><i><b>Create a NEW BIKE:</b></i></h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        <form className='flex justify-center flex-col' onSubmit={handleSubmit(createBike)}>
                            <label className='font-bold text-left mb-1'>Slot:</label>
                            <select className='mb-3 block w-full p-2  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' name="" id="" {...register("slot", { required: false })}>
                                <option value="">Null</option>
                                {slots.map((item, id) => {
                                    return <option key={id} value={item.id}>{item.slug}</option>
                                })}
                            </select>

                            <label className='font-bold text-left mb-1'>Img:</label>
                            <input className='mb-3 block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' type="text" {...register("img_bike", { required: false })} placeholder="Img Path" />
                            {errors.img_bike?.type === 'required' && <span className='text-red-600'>*Img is required</span>}
                            
                            <label className='font-bold text-left mb-1'>Price for minute:</label>
                            <input className='mb-3 block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' type="number" step="0.005" {...register("pfm", { required: true })} placeholder='Price for minute' />
                            {errors.pfm?.type === 'required' && <span className='text-red-600'>*PFM is required</span>}
                            
                            <label className='font-bold text-left mb-1'>Status Bike:</label>
                            <label className="relative inline-flex items-center mr-5 cursor-pointer">
                                <input type="checkbox" value={true} {...register("status", { required: false })} className="sr-only peer" ></input>
                                <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                            </label>

                            <div className=" mt-4 modal-footer">
                                <button className="btn btn-outline-success" type='submit' data-bs-dismiss="modal">Create</button>
                                <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal">Close</button>
                            </div>

                        </form>
                        </div>
                    </div>
                </div>
            </div>
    )
}