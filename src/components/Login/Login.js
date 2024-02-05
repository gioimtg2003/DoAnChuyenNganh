import './Login.scss';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';

const Login = (props) => {
    return ( 

        <div className="login-container">
            <div className='container'>
                <div className='row'>
                    <div className='content-center col-4'>
                        <div className="form-login mt-4">
                            <h2 className="mb-3 text-center">Login</h2>
                            <form>
                                <div className="mb-3">
                                    <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Email" required/>
                                </div>
                                <div className="mb-3">
                                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" required/>
                                </div>
                                <div className="mb-3 form-check">
                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                    <label class="form-check-label" for="exampleCheck1">Remember Account</label>
                                </div>
                                <div className="mb-3">
                                    <button type="submit" class="btn btn-primary ">Log in</button>
                                </div>
                            </form>
                            <div className="mb-3 text-center ">
                                <a href="#" className="forgot-pass">Forgotten Password</a>
                            </div>
                            
                            <div>
                                <p className="create"> Don’t have an account yet? 
                                <NavLink to="/register">Create New Account</NavLink>
                                </p>
                           </div> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
