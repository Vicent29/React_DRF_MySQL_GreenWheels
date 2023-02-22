import React from "react"
import { useForm } from "react-hook-form"
import { useTel } from "../../hooks/useTel"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function Announce() {

    const { register, handleSubmit } = useForm()
    const { sendMessage, allchatid } = useTel()

    const send = async (data) => {
        let chatids = await allchatid();
        chatids.map(async (id) => { await sendMessage(id, data.message) });
    }

    return (
        <>
            <a className="menu-link" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <FontAwesomeIcon className="text-2xl text-white" icon="fa-solid fa-comment-medical" />
            </a>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">ANNOUNCE</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <input type="text" className="border" placeholder="message" {...register("message", { required: true })} autoComplete="off" />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSubmit(send)}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}