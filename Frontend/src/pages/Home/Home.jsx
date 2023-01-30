import MyMap from "../../components/Map/map";
import { useStations } from "../../hooks/useStations"

export default function Home() {
    const { stations } = useStations()
    console.log(stations);

    return (
        <div className="text-white d-flex flex-column col-6">
            <h1>Where are our bikes?</h1>
            <MyMap markers={stations} />
        </div>
    )
}