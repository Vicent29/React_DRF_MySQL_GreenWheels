import SlotsLine from "./SlotsLine"
export default function SlotsTable({slots}) {
    console.log(slots);
    return (
        <div className="d-flex justify-center overflow-auto max-h-screen">
            <table className="mytable table table-striped col-10 text-center bg-light mt-4">
                <thead className="sticky top-0" >
                    <tr className="grey ">
                        <th className='col-1'>ID</th>
                        <th className='col-1'>Slug</th>
                        <th className='col-1'>Active</th>
                        <th className='col-1'>Station</th>
                        {/* <th className='col-2' scope="col">
                            <Link to="/addstation">
                                <button className="btn btn-outline-info">New Station</button>
                            </Link>
                        </th> */}
                    </tr>
                </thead>
                <tbody>
                    {slots.map(item => {
                        return <tr key={item.id}><SlotsLine slot={item} /*deleteStation={deleteStation} updateStation={updateStation}*/ /></tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}