import React from 'react'
import "./Bike.scss";

export default function BikesLine({ bike, deleteBike,/* changeStatusBike */ }) {
    return (
        <>  
            <td className='align'>{bike.id}</td>
            <td className='align'>{bike.slot}</td>
            <td className='align'><img className="img_status_bike" src={bike.status === true ? '/assets/other_imgs/bike_status_green.png' : '/assets/other_imgs/bike_status_red.png'} alt="avatar"/></td>
            <td className='align'>{bike.pfm} €</td>
            {/* <td>{bike.img_bike}</td> */}
            <td className='align'><img src="https://enjoymiamibeach.com/espanol/wp-content/uploads/2016/07/citi-bike-rental-miami-beach-2.jpg" alt="img_bike_rent" className='img_bike_admin rounded-circle img-fluid' /></td>
            <td scope="col" className="btns">
                <button type="button" className="btn btn-outline-success border-radius mr-3">Update</button>
                <button type="button" className="btn btn-outline-danger border-radius ml-3" onClick={(e) => deleteBike(bike.id)}>Delete</button>
            </td>
        </>
    )
}