import { useState } from "react" 


export default function SlotsLine({ slot, deleteSlot, updateSlot }) {
    const [toggle, setToggle] = useState(slot.active)
    return (
        <>
            <td className="align">{slot.id}</td>
            <td className="align">{slot.slug}</td>
            <td className="align">
                {toggle && (
                    <div className="form-check form-switch text-center w-full d-flex justify-content-center">
                        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" onChange={() => { setToggle(!toggle); updateSlot({ "active": !toggle }, slot.id) }} checked />
                    </div>
                )}
                {!toggle && (
                    <div className="form-check form-switch text-center w-full d-flex justify-content-center">
                        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={() => { setToggle(!toggle); updateSlot({ "active": !toggle }, slot.id) }} />
                    </div>
                )}
            </td>
            <td className="align">{slot.station}</td>
            <td scope="col" className="btns">
                {/* <button type="button" className="btn btn-outline-success border-radius mr-3">Update</button> */}
                <button type="button" className="btn btn-outline-danger border-radius ml-3" onClick={() => deleteSlot(slot.id)}>Delete</button>
            </td>
        </>
    )
}