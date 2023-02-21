import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRent } from "../../hooks/useRent";
import { useSlots } from "../../hooks/useSlots";
import "./User.scss";

export default function UserRentProfile() {
    const { rents, getRentsByUser, closeRent } = useRent();
    const { slots, setSlots, getSlotsnoBike } = useSlots();
    const [valueslot, setSlotValue] = useState();
    const { register, handleSubmit, getValues } = useForm();

    useEffect(() => {
        getRentsByUser();
        getSlotsnoBike();
    }, [])

    const close = async (rent) => {
        console.log(rent);
        console.log(getValues().slot);
        await closeRent(rent.id, { "bike": rent.bike, "slot": getValues().slot })
        getRentsByUser();
    }


    return (
        <>
            <div className="">
                <table className="text-center table table-striped mb-0 table-dark">
                    <thead className="bord_thead">
                        <tr>
                            <th scope="col">Minutes</th>
                            <th scope="col">Bike</th>
                            <th scope="col">Cost</th>
                        </tr>
                    </thead>
                    <tbody className="align-baseline">
                        {rents.map((rent) => {
                            return (
                                <tr key={rent.id}>
                                    <td>{new Date(new Date(rent.data_fin) - new Date(rent.data_ini)).getMinutes()}</td>
                                    <td>{rent.bike}</td>
                                    {rent.cost == 0 ?
                                        <>
                                            <td>Not finished</td>
                                            <td>
                                                <select name="" id="" className="bg-transparent" {...register("slot", { required: true })}>
                                                    {slots.map((slot) => {
                                                        return <option key={slot.id} value={slot.id} className="text-black">{slot.id} {slot.slug}</option>
                                                    })}
                                                </select>
                                                <button className="btn btn-primary" onClick={() => close(rent)}>close rent</button>
                                            </td>
                                        </>
                                        :
                                        <>
                                            <td>{rent.cost + " €"}</td>
                                            <td>No options</td>
                                        </>
                                    }

                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}


