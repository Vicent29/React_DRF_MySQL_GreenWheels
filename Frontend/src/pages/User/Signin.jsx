import { useForm } from "react-hook-form"
import "./Signin.scss"

export default function Signin() {
    const { register, handleSubmit, formState: { errors } } = useForm()

    const signup = (request) => {
        console.log(request);
    }

    return (
        <div className="login-box login">
                <div className="card">
                <h2>Login</h2>
                <form onSubmit={handleSubmit(signup)}>
                    <div className="user-box">
                        <input type="text" name="" {...register("email", {
                            required: true, pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "invalid email address"
                            }
                        })} />
                        <label>Email</label>
                        {errors.email && errors.email.type === "pattern" && <span className="text-danger">{"Invalid Format"}</span>}
                        {errors.email?.type === 'required' && <span className="text-danger">{"Email Required"}</span>}
                    </div>
                    <div className="user-box">
                        <input type="password" name="" required="" {...register("password", {
                            required: true, pattern: {
                                value: /^[A-Z0-9._@%&+-]{4,}/i,
                                message: "hello"
                            }
                        })} />
                        <label>Password</label>
                        {errors.password && errors.password.type === "pattern" && <span className="text-danger">{"More than 3 caracters"}</span>}
                        {errors.password?.type === 'required' && <span className="text-danger">{"Password Required"}</span>}
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