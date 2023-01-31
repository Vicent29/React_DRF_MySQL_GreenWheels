import "./Signin.scss"

export default function SignUp() {
    return (
        <div className="login-box register">
            <div className="card">
                <h2>Register</h2>
                <form>
                    <div className="flex justify-between">
                        <div className="user-box col-5">
                            <input type="text" name="" required="" />
                            <label>First Name</label>
                        </div>
                        <div className="user-box col-5">
                            <input type="text" name="" required="" />
                            <label>Last Name</label>
                        </div>
                    </div>
                    <div className="user-box">
                        <input type="email" name="" required="" />
                        <label>Email</label>
                    </div>
                    <div className="user-box">
                        <input type="password" name="" required="" />
                        <label>Password</label>
                    </div>
                    <div className="user-box">
                        <input type="password" name="" required="" />
                        <label>Password</label>
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