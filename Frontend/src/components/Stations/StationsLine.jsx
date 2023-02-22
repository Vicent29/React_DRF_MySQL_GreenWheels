import React, {useState} from 'react'
import { useForm } from "react-hook-form";

export default function StationLine({ station, deleteStation, updateStation }) {

    const [checkUpdate, setcheckUpdate] = useState(false);
    const { register, getValues } = useForm();

    const Update_fields = () => {
        setcheckUpdate(false);
        let data  = getValues()
        let change =data.name===''? delete data.name: "";
        change =data.long===''? delete data.long: "";
        change = data.lat===''? delete data.lat: "";
        change = data.img ===''? delete data.img: "";

        updateStation(data, station.slug);
    }

    return (
        <>

            {!checkUpdate && (
                <>
                    <td className='align'>{station.id}</td>
                    <td className='align'>{station.name}</td>
                    <td className='align'>{station.long}</td>
                    <td className='align'>{station.lat}</td>
                    <td className='align'><img src={station.img ? station.img : "https://www.seekpng.com/png/detail/305-3050927_png-file-svg-bike-parking-icon-png.png"} alt="img_bike_rent" className='img_bike_admin rounded-circle img-fluid' /></td>
                    <td scope="col" className="btns">
                        <button type="button" className="btn btn-outline-success border-radius mr-3" onClick={() => setcheckUpdate(true)}>Update</button>
                        <button type="button" className="btn btn-outline-danger border-radius ml-3" onClick={() => deleteStation(station.id)}>Delete</button>
                    </td>
                </>
            )}
            {checkUpdate && (
                <>  
                    <td className='align'>{station.id}</td>
                    <td className='align'><input autoComplete='off' className='text-center bg-transparent' type="text" {...register("name")} placeholder={station.name} /></td>
                    <td className='align'>{<input autoComplete='off' className='text-center col-4 bg-transparent' type="text" {...register("long")} placeholder={station.long} />}</td>
                    <td className='align'><input autoComplete='off' className='text-center col-4 bg-transparent' type="text" {...register("lat")} placeholder={station.lat} /></td>
                    <td className='align'><input className='text-center bg-transparent' type="text" {...register("img")} placeholder={station.img} /></td>
                    <td scope="col" className="btns">
                        <button type="button" className="btn btn-outline-success border-radius mr-3" onClick={Update_fields}>Update</button>
                        <button type="button" className="btn btn-outline-danger border-radius ml-3" onClick={(e) => deleteStation(station.id)}>Delete</button>
                    </td>
                </>
            )}
        </>
    )
}