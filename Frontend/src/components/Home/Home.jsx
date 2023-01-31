import { useState, useEffect } from "react";
import BikeCard from "../Bike/BikeCard";
import MyMap from "../Map/map";
import { useBikes } from "../../hooks/useBikes";
import { useStations } from "../../hooks/useStations";

export default function HomeComponent() {
    const { stations } = useStations()
    const { bikes, getBikesByStation } = useBikes()

    const [show, setshow] = useState(null);

    return (
        <div className="d-flex">
            <div className="text-white d-flex flex-column col-6">
                <h1>Where are our bikes?</h1>
                <MyMap markers={stations} clickonMap={getBikesByStation} setshow={setshow} />

            </div>
            <div className="text-white d-flex flex-column justify-center align-middle col-6">
                {show !== null && (
                    bikes.map((bike, id) => {
                        console.log(bike.id);
                        return <BikeCard key={id} bike={bike} />
                    })
                )}
                {show === null && (
                    <h1>About us</h1>
                )}
            </div>
        </div>
    )
}