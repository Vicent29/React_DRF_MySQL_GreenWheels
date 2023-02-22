import { useState } from "react" 

export default function UserLine({ user, updateUser }) {
    const [toggle, setToggle] = useState(user.is_active)
    return (
        <>
            <td className="align">{user.id}</td>
            <td className="align">{user.avatar}</td>
            <td className="align">{user.first_name}</td>
            <td className="align">{user.email}</td>
            <td className="align">
                {toggle && (
                    <div className="form-check form-switch text-center w-full d-flex justify-content-center">
                        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" onChange={() => { setToggle(!toggle); updateUser({ "is_active": !toggle }, user.id) }} checked />
                    </div>
                )}
                {!toggle && (
                    <div className="form-check form-switch text-center w-full d-flex justify-content-center">
                        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={() => { setToggle(!toggle); updateUser({ "is_active": !toggle }, user.id) }} />
                    </div>
                )}
            </td>
        </>
    )
}