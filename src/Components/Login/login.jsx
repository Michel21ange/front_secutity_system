import { useState } from 'react'
import './login.css'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase_config';
import {useNavigate} from 'react-router-dom'


export const Login = () => {
    const [error, setError]=useState(false)
    const [email, setEmail]=useState("")
    const [password, setPassword]=useState("")
    const navpage = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            /*const user = userCredential.user;*/
            navpage("/dashboard")
            // ...
        })
        .catch((error) => {
            setError(true)
  });
        
    }

    return (
            <div className="container">
                <form action="" onSubmit={handleLogin}>
                <div className="header">
                    <div className="text">CONNEXION</div>
                    <div className="underline"></div>
                </div>

                <div className="inputs">
                    <div className="input" id='email'>
                        EMAIL:<input type="email" required onChange={e=>setEmail(e.target.value)}/>
                    </div>
                    <div className="input" id='mp'>
                        MOT DE PASSE: <input type="password" onChange={e=>setPassword(e.target.value)}/>
                    </div>
                </div>

                <div className="submit-container">
                    <button type='submit' className='submit'>Se connecter</button>
                    {error && <span>Email ou mot de passe incorrect</span>}
                </div>
                </form>

                <div className="notMember">Pas encore membre ?<a href="/signup">S'inscrire</a></div>
                

            </div>
    )
}

export default Login