import SlotsLine from "./SlotsLine"
import SlotsForm from "./SlotsForm";
import "./Slots.scss";

export default function SlotsTable({slots, deleteSlot, updateSlot}) {
    return (
        <div className="d-flex justify-center overflow-auto h-[80vh]">
            <SlotsForm></SlotsForm>
            <table className="mytable table table-striped col-10 text-center bg-light mt-4">
                <thead className="sticky top-0" >
                    <tr className="grey ">
                        <th className='col-1'>ID</th>
                        <th className='col-1'>Slug</th>
                        <th className='col-1'>Active</th>
                        <th className='col-1'>Station</th>
                        <th className='col-2' scope="col">
                            <button className="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#ModalNewSlot">New Slot</button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {slots.map(item => {
                        return <tr key={item.id}><SlotsLine slot={item} updateSlot={updateSlot} deleteSlot={deleteSlot} /></tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}