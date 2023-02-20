import { useForm } from "react-hook-form"
import "./Signin.scss"
import { useAuth } from '../../hooks/useAuth'

export default function Signin() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { signin, status } = useAuth();


    return (
        <div className="login-box login">
            <div className="card log">
                <h2>Login</h2>
                <form onSubmit={handleSubmit(signin)}>
                    <div className="user-box">
                        <input type="text" name="" {...register("email", {
                            required: true, pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "*Invalid format email"
                            }
                        })} />
                        <label>Email</label>
                        {errors.email && errors.email.type === "pattern" && <span className="text-base text-danger">{errors.email.message}</span>}
                        {errors.email?.type === 'required' && <span className="text-base text-danger">{"*Email Required"}</span>}
                    </div>
                    <div className="user-box">
                        <input type="password" name="" required="" {...register("password", {
                            required: true, pattern: {
                                value: /^[A-Z0-9._@%&+-]{4,}/i,
                                message: "*More than 3 caracters"
                            }
                        })} />
                        <label className="paco">Password</label>
                        {errors.password && errors.password.type === "pattern" && <span className="text-base text-danger">{errors.password.message}</span>}
                        {errors.password?.type === 'required' && <span className="text-base text-danger">{"*Password Required"}</span>}
                    </div>
                    <button type="submit">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        SignIn
                    </button>
                </form>
            </div>
        </div>
    )
}