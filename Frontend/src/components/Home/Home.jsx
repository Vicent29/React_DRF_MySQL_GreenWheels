import { useState, useEffect } from "react";
import BikeCard from "../Bike/BikeCard";
import MyMap from "../Map/map";
import { useBikes } from "../../hooks/useBikes";
import { useStations } from "../../hooks/useStations";
import { useRent } from "../../hooks/useRent";
import "./home.scss"

export default function HomeComponent() {
    const { stations } = useStations()
    const { bikes, setBikes, getBikesByStation } = useBikes()
    const { createRent } = useRent()

    const [show, setshow] = useState(null);

    const createRnt = async (data) => {
        let id = await createRent(data)
        setBikes(bikes.filter((bike) => bike.id !== id))
    }

    return (
        <div className="d-flex flex-col-reverse lg:flex-row">
            <div className="text-white d-flex flex-column col-12 col-lg-6">
                <h1>Where are our bikes?</h1>
                <MyMap markers={stations} clickonMap={getBikesByStation} setshow={setshow} />

            </div>
            {show !== null && (
                <div data-bs-spy="scroll" data-bs-offset="0" tabIndex="0" id="bikes" className="text-white flex-column justify-center align-middle col-12 col-lg-6 lg:mt-[5vh] h-[80vh] overflow-auto">
                    {bikes.map((bike, id) => {
                        return <BikeCard key={id} bike={bike} createRnt={createRnt} />
                    })}
                </div>
            )}
            {show === null && (
                <div data-bs-spy="scroll" data-bs-offset="0" tabIndex="0" className="text-white d-flex flex-column justify-center align-middle col-12 col-lg-6 lg:height-80 overflow-auto p-3">
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
    )
}