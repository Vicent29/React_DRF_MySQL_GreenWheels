import React from 'react'
import { useBikes } from '../../hooks/useBikes'
import { useSlots } from '../../hooks/useSlots'
import { useForm } from 'react-hook-form'

export default function FormBike() {
    const { createBike } = useBikes()
    const { slots } = useSlots()
    const { register, handleSubmit, formState: { errors } } = useForm()
    return (
        <form className='text-white' onSubmit={handleSubmit(createBike)}>
            <select name="" id="" {...register("slot", { required: false })}>
                <option value="">Null</option>
                {slots.map((item, id) => {
                    return <option key={id} value={item.id}>{item.slug}</option>
                })}
            </select>
            <input type="text" {...register("img_bike", { required: true })} placeholder="Img Path" />
            {errors.img_bike?.type === 'required' && <span>Img is required</span>}
            <input type="number" {...register("pfm", { required: true })} placeholder='Price for minute' />
            {errors.pfm?.type === 'required' && <span>PFM is required</span>}
            <select {...register("status", { required: true })}>
                <option value={true}>active</option>
                <option value={false}>disable</option>
            </select>
            <button type='submit'>Create</button>
        </form>
    )
}