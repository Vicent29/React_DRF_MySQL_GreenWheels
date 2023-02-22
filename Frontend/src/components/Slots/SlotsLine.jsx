import { useState } from "react"
export default function SlotsLine({ slot }) {
    const [toggle, setToggle] = useState(slot.active)
    return (
        <>
            <td>{slot.id}</td>
            <td>{slot.slug}</td>
            <td>
                {toggle && (
                    <div className="form-check form-switch text-center w-full d-flex justify-content-center">
                        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" onChange={() => setToggle(!toggle)} checked />
                    </div>
                )}
                {!toggle && (
                    <div className="form-check form-switch text-center w-full d-flex justify-content-center">
                        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={() => setToggle(!toggle)} />
                    </div>
                )}
            </td>
            <td>{slot.station}</td>
        </>
    )
}