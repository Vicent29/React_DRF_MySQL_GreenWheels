import { useState, useEffect } from "react";
import BikeCard from "../Bike/BikeCard";
import MyMap from "../Map/map";
import { useBikes } from "../../hooks/useBikes";
import { useStations } from "../../hooks/useStations";
import "./home.scss"

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
            <div className="text-white d-flex flex-column justify-center align-middle col-6 height-80 overflow-auto">
                {show !== null && (
                    bikes.map((bike, id) => {
                        return <BikeCard key={id} bike={bike} />
                    })
                )}
                {show === null && (
                    <div className="px-3">
                        <h1>About us</h1>
                        <p>
                            Greenwheels is an online bike rental company that offers modern and reliable bikes for your daily use.
                            All bicycles have an attractive and practical design, as well as being resistant and easy to use.
                            With Greenwheels, you can quickly and easily rent a bike, enjoy a sustainable form of transportation,
                            and explore the city without worrying about parking or maintenance.
                            Choose Greenwheels for a comfortable and eco-friendly experience on two wheels!
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}