import React from 'react'
// import { Link } from 'react-router-dom'
import { useBikes } from '../../hooks/useBikes'
import { useForm } from 'react-hook-form'

export default function FormBike() {
    const { createBike } = useBikes()
    const { register, handleSubmit, formState: { errors } } = useForm()
    return (
        <form className='text-white' onSubmit={handleSubmit(createBike)}>
            <input type="number" {...register("slot", { required: true })} placeholder="Id_slot" />
            <input type="text" {...register("img_bike", { required: true })} placeholder="Img Path" />
            <input type="number" {...register("pfm", { required: true })} placeholder='Price for minute' />
            <select {...register("status", { required: true })}>
                <option value={true}>active</option>
                <option value={false}>disable</option>
            </select>
            {errors.status?.type === 'required' && <span>Status is required</span>}
            <button type='submit'>Create</button>
        </form>
    )
}