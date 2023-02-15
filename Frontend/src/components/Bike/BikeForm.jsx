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
        <form onSubmit={handleSubmit(createBike)}>
            <select name="" id="" {...register("slot", { required: false })}>
                <option value="">Null</option>
                {slots.map((item, id) => {
                    return <option key={id} value={item.id}>{item.slug}</option>
                })}
            </select>
            <input type="text" {...register("img_bike", { required: false })} placeholder="Img Path" />
            {errors.img_bike?.type === 'required' && <span>Img is required</span>}
            <input type="number" step="0.005" {...register("pfm", { required: true })} placeholder='Price for minute' />
            {errors.pfm?.type === 'required' && <span>PFM is required</span>}
            <select {...register("status", { required: true })}>
                <option value={true}>active</option>
                <option value={false}>disable</option>
            </select>
            <button type='submit'>Create</button>
        </form>
    )
}