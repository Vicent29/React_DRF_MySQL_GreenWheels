import { useForm } from "react-hook-form"
import "./Signin.scss"
import { useAuth } from '../../hooks/useAuth'

export default function SignUp() {
    const { register, watch, handleSubmit, formState: { errors } } = useForm()
    const { signup, status } = useAuth();

    return (
        <div className="login-box register">
            <div className="card log">
                <h2>Register</h2>
                <form onSubmit={handleSubmit(signup)}>
                    <div className="flex justify-between">
                        <div className="user-box col-5">
                            <input type="text" name="" required="" {...register("first_name", {
                            required: true
                        })} />
                            <label>First Name</label>
                            {errors.first_name?.type === 'required' && <span className="text-base text-danger float-left">{"*Is required"}</span>}
                        </div>
                        <div className="user-box col-5">
                            <input type="text" name="" required="" {...register("last_name")} />
                            <label>Last Name</label>
                        </div>
                    </div>
                    <div className="user-box">
                        <input type="text" name="" {...register("email", {
                            required: true, pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "*Invalid format email"
                            }
                        })} />
                        <label>Email</label>
                        {errors.email && errors.email.type === "pattern" && <span className="text-base text-danger">{errors.email.message}</span>}
                        {errors.email?.type === 'required' && <span className="text-base text-danger">{"*Email is Required"}</span>}
                        {status.error === true && <span className="text-base text-danger">{"*Email Exist"}</span>}
                    </div>
                    <div className="user-box">
                        <input type="password" name="" required="" {...register("password_one", {
                            required: true, pattern: {
                                value: /^[A-Z0-9._@%&+-]{4,}/i,
                                message: "*More than 3 caracters"
                            }
                        })} />
                        <label>Password</label>
                        {errors.password_one && errors.password_one.type === "pattern" && <span className="text-base text-danger">{errors.password_one.message}</span>}
                        {errors.password_one?.type === 'required' && <span className="text-base text-danger">{"*Password is Required"}</span>}
                    </div>
                    <div className="user-box">
                    <input type="password" name="" required="" {...register("password_two", {
                            required: true,
                            pattern: {
                                value: /^[A-Z0-9._@%&+-]{4,}/i,
                                message: "*More than 3 caracters"
                            },
                            validate: (val) => {
                                if (watch('password_one') !== val) {
                                   return "*Your passwords do no match";
                                }
                              },
                        })} />
                        <label>Repeat Password</label>
                        {errors.password_two && (errors.password_two.type === "pattern" || errors.password_two.type === "validate" )  &&  <span className="text-base text-danger">{errors.password_two.message}</span>}
                        {errors.password_two?.type === 'required' && <span className="text-base text-danger">{"*Repeat a password"}</span>}
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