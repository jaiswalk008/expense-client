import { useState } from 'react';
import './user.css';
import Input from '../UI/Input'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';
 
import { useDispatch  } from 'react-redux';
import { authActions, expenseActions } from '../Context/store';
const Login = () => {
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
   
    const history = useHistory();
    
    const dispatch = useDispatch();
    const emailChangeHandler = (e) =>{
        setEmail(e.target.value);
    }
    const passwordChangeHandler = (e) => {setPassword (e.target.value)}
    const loginHandler = async (e) =>{
        e.preventDefault();
        const userDetails ={
            email:email,
            password:password,
        }
        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}login/`, userDetails);
            setErrorMessage('');
            dispatch(authActions.setToken(res.data.token));
            localStorage.setItem('user-name',res.data.username);
            if(res.data.premium)dispatch(expenseActions.setPremium());
            history.push('/expense');
            
        } catch (err) {
            console.log(err);
            setErrorMessage(err.response.data.message);
        }
    }

    return (
        <>
            <header className="bg-dark text-light">
                <h2 className="title">Expense Tracker</h2>
            </header>
            <div className='form-container'>
        <div>
            <h2>Login</h2>
            <form onSubmit={loginHandler}>
                <Input id="email" label="Email" type="email" value={email} onChange={emailChangeHandler} />
                <Input id="password" label="Password" type="password" value={password} onChange={passwordChangeHandler} />
                
                <button className='btn w-100 mt-1 btn-dark'>Login</button>
            </form>
            {errorMessage.length>0 && <p className='message-alert'>{errorMessage}</p>}
            <p className='forgot-password'><Link to="/forgotpassword">Forgot Password?</Link></p>
            </div>
            <p className='signup'><Link to="/signup">Don't have an account? Signup</Link></p>
        </div>
        </>
    )
}
export default Login;