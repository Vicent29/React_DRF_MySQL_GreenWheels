import MyMap from '../../components/Map/mapadmin'
import FormStation from '../../components/Stations/FormStations'
import { useStations } from '../../hooks/useStations'

export default function CreateStation() {
    const { createStation } = useStations()
    let lat
    let long
    const location = (e) => {
        lat = e.lat
        long = e.lng
        console.log(e);
    }

    const createStationForm = (request) => {
        if (lat !== undefined || long !== undefined) {
            createStation({ ...request, lat: lat, long: long })
        } else {
            console.log("lat and long not used");
        }
    }

    return (
        <>
            <div className="text-white d-flex col-12 flex-col-reverse md:flex-row">
                <div className="map text-white d-flex flex-column col-12 col-md-6">
                    <h1>Click to set Station</h1>
                    <MyMap onclickmap={location} />
                </div>
                <div className="form text-white d-flex flex-column justify-center align-items-center col-12 col-md-6">
                    <FormStation createStation={createStationForm} />
                </div>
            </div>
        </>
    )
}