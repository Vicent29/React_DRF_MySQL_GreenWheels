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
                        <p>Greenwheels es una empresa de alquiler de bicicletas en línea que ofrece bicicletas modernas y confiables para su uso diario.
                            Todas las bicicletas cuentan con un diseño atractivo y práctico, además de ser resistentes y fáciles de usar.
                            Con Greenwheels, puedes alquilar una bicicleta de forma rápida y sencilla, disfrutar de una forma sostenible de transporte y explorar la ciudad sin preocuparte por el estacionamiento o la mantención.
                            ¡Elige Greenwheels para una experiencia cómoda y ecológica en dos ruedas!
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}