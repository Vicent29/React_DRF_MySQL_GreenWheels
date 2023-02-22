import React, {useState} from 'react'
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./Bike.scss";

export default function BikesLine({ bike, slots, deleteBike, changeStatusBike, updateBike}) {
    const [checkUpdate, setcheckUpdate] = useState(false);
    const { register, getValues } = useForm();

    const Update_fields = () => {
        setcheckUpdate(false);
        updateBike(getValues(), bike.id);
    }
    return (
        <>  
            <td className='align'>{bike.id}</td>
            {!checkUpdate && (
                <>
                    <td className='align'>{bike.slot ? bike.slot : <FontAwesomeIcon className='pending' icon="fa-solid fa-person-biking" />}</td>
                    <td className='align'><img className="img_status_bike" onClick={(e) => changeStatusBike(bike.id)} src={bike.status === true ? '/assets/other_imgs/bike_status_green.png' : '/assets/other_imgs/bike_status_red.png'} alt="avatar"/></td>
                    <td className='align'>{bike.pfm} €</td>
                    <td className='align'><img src={bike.img_bike ? bike.img_bike : "https://enjoymiamibeach.com/espanol/wp-content/uploads/2016/07/citi-bike-rental-miami-beach-2.jpg"} alt="img_bike_rent" className='img_bike_admin rounded-circle img-fluid' /></td>
                    <td scope="col" className="btns">
                        <button type="button" className="btn btn-outline-success border-radius mr-3" onClick={() => setcheckUpdate(true)}>Update</button>
                        <button type="button" className="btn btn-outline-danger border-radius ml-3" onClick={(e) => deleteBike(bike.id)}>Delete</button>
                    </td>
                </>
            )}
            {checkUpdate && (
                <>
                   <td className='align'>
                        <select name="" id="" className="bg-transparent text-center" {...register("slot_id", { required: true })}>
                            <option value="" className="text-black">None</option>
                            {slots.map((slot) => {
                                return <option key={slot.id} value={slot.id} className="text-black">{slot.id} {slot.slug}</option>
                            })}
                        </select>
                   </td>
                   <td className='align'><img className="img_status_bike" onClick={(e) => changeStatusBike(bike.id)} src={bike.status === true ? '/assets/other_imgs/bike_status_green.png' : '/assets/other_imgs/bike_status_red.png'} alt="avatar"/></td>
                   <td className='align col-2'><input className='text-center col-4 bg-transparent' type="number" step="0.005" {...register("pfm")} placeholder={bike.pfm + " €"} /></td>
                   <td className='align col-3'><input className='text-center bg-transparent' type="text" {...register("img_bike")} placeholder={bike.img_bike} /></td>
                   <td scope="col" className="btns">
                    <button type="button" className="btn btn-outline-success border-radius mr-3" onClick={Update_fields}>Update</button>
                    <button type="button" className="btn btn-outline-danger border-radius ml-3" onClick={(e) => deleteBike(bike.id)}>Delete</button>
                   </td>
                </>
            )}
        </>
    )
}