import { useState } from "react" 

export default function UserLine({ user, changeStatus }) {
    const [toggle, setToggle] = useState(user.is_active)
    return (
        <>
            <td className="align-items-center justify-center">{user.id}</td>
            <td className='align-items-center justify-center'><img src={user.avatar ? user.avatar : "https://i.postimg.cc/T3g6d9nk/image.png"} alt="img_bike_rent" className='img_bike_admin rounded-circle img-fluid' /></td>
            <td className="align-items-center justify-center">{user.first_name } {user.last_name}</td>
            <td className="align-items-center justify-center">{user.email}</td>
            <td className="align-items-center justify-center">
                {toggle && (
                    <div className="form-check form-switch text-center w-full d-flex justify-content-center">
                        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" onChange={() => { setToggle(!toggle); changeStatus(user.id) }} checked />
                    </div>
                )}
                {!toggle && (
                    <div className="form-check form-switch text-center w-full d-flex justify-content-center">
                        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={() => { setToggle(!toggle); changeStatus(user.id) }} />
                    </div>
                )}
            </td>
        </>
    )
}