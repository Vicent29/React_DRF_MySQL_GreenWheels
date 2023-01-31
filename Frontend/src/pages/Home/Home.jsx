import { useState, useEffect } from "react";
import MyMap from "../../components/Map/map";
import { useBikes } from "../../hooks/useBikes";
import { useStations } from "../../hooks/useStations"

export default function Home() {
    const { stations } = useStations()
    const { bikes, getBikesByStation } = useBikes()

    return (
        <div>
            <div className="text-white d-flex flex-column col-6">
                <h1>Where are our bikes?</h1>
                <MyMap markers={stations} clickonMap={getBikesByStation} />
            </div>
            <div className="flex-col col-span-6">
                {/* {bikes.map((bike,id) => {

                })} */}
            </div>
        </div>
    )
}