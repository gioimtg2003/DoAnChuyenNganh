import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import './Register.scss';


const Register = () => {
    return (
        <div className="register-container">
            <div className="container mt-4">
                <div className="row">
                    <h2 className="text-center">Sign Up</h2>
                    <div className="form-register">
                        <form>
                            <div className="mb-3">
                                <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Email" required/>
                            </div>
                            <div className="mb-3">
                                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" required/>
                            </div>
                            <div className="mb-3">
                                <input type="text" class="form-control" id="Name" placeholder="Name" required/>
                            </div>
                            <div className="mb-3">
                                <input type="text" class="form-control" id="Address" placeholder="Address" required/>
                            </div>
                            <div className="mb-3">
                                <input type="text" class="form-control" id="Phone" placeholder="Phone" required/>
                            </div>
                            <div className="mb-3">
                                <input type="text" class="form-control" id="ShopName" placeholder="ShopName" required/>
                            </div>
                            <div className="mb-3">
                                <input type="text" class="form-control" id="ShopAddress" placeholder="ShopAddress" required/>
                            </div>
                            <div className="mb-3">
                            </div>
                            <div className="mb-3 text-center">
                                <button type="submit" class="btn btn-success ">Sign Up</button>
                            </div>
                        </form>
                    </div>
                    <div className="back">
                        <NavLink className="text-decoration-none" to="/login">Back to login</NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register