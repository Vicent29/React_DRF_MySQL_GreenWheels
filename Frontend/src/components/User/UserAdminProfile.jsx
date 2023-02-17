import React, { useEffect, useState } from "react";
import { useIncident } from "../../hooks/useIncident";
import "./User.scss";

export default function UserAdminProfile() {
    const { incs, setInc, getAllInc, closeInc } = useIncident()
    const [message, setMessage] = useState({})

    useEffect(() => {
        getAllInc();
    }, [])

    const relaodInc = () => {
        setInc(incs.filter((inc) => {
            return inc.id !== message.id
        }))

    }
    // const close = async (rent) => {
    //     console.log(rent);
    //     console.log(getValues().slot);
    //     await closeRent(rent.id, { "bike": rent.bike, "slot": getValues().slot })
    //     getRentsByUser();
    // }

    return (
        <>
            <div className="">
                <table className="text-center table table-striped mb-0 table-dark">
                    <thead className="bord_thead">
                        <tr>
                            <th scope="col">User</th>
                            <th scope="col">Specify</th>
                            <th scope="col">Desc</th>
                        </tr>
                    </thead>
                    <tbody className="align-baseline">
                        {incs.map((inc, id) => {
                            return (
                                <tr key={id}>
                                    <td>{inc.user}</td>
                                    <td>{inc.bike ? "bike " + inc.bike : inc.slot ? "slot " + inc.slot : "loc " + inc.location}</td>
                                    <td>{inc.desc}</td>
                                    <td><button onClick={(e) => setMessage({ ...message, id: inc.id, user: inc.user, type: inc.bike ? "bike" : inc.slot ? "slot" : "other" })} data-bs-toggle="modal" data-bs-target="#modal_inc">Response</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            <div className="modal fade" id="modal_inc" tabIndex="-1" aria-labelledby="modal_incLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modal_incLabel">Close Incidence</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <input type="text" className="border" placeholder="message" onChange={(e) => setMessage({ ...message, message: e.target.value })} autoComplete="off" />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => { closeInc(message); relaodInc() }}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


