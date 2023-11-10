import  { useState } from 'react';
import { auth, db } from '../../firebase_config';
import './Signup.css'
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import {  createUserWithEmailAndPassword } from "firebase/auth";

export const Signup = () => {
    const [data, setData] = useState({})
    const handleSign = async(e) =>{
        e.preventDefault()
        try{
            const res = await createUserWithEmailAndPassword(auth, data.email, data.password)
            await setDoc(doc(db, "inscriptionAdmin", res.user.uid), {
                ...data,
                timeStamp: serverTimestamp()
              });
              window.location.href = "/";
        } catch(err){
            console.log(err)
        }
    }
    const handleInput = (e) =>{
        
        const id = e.target.id
        const value = e.target.value

        setData({...data, [id]:value})
    }
    console.log(data)
    return (
            <div className="container">
                <form action="" onSubmit={handleSign}>
                <div className="header">
                    <div className="text">INSCRIPTION</div>
                    <div className="underline"></div>
                </div>

                <div className="inputs">
                    <div className="input" id='nom'>
                        NOM:<input type="text" required onChange={handleInput} id='nom'/>
                    </div>
                    <div className="input" id='contact'>
                        CONTACT: <input type="text" required onChange={handleInput} id='contact'/>
                    </div>
                    <div className="input" id='email'>
                        EMAIL: <input type="email" required onChange={handleInput} id='email'/>
                    </div>
                    <div className="input" id='age'>
                        AGE: <input type="text" required onChange={handleInput} id='age'/>
                    </div>
                    <div className="input" id='vehicule'>
                        VEHICULE: <input type="text" required onChange={handleInput} id='vehicule'/>
                    </div>
                    <div className="input" id='mp'>
                        MOT DE PASSE: <input type="password" required onChange={handleInput} id='password'/>
                    </div>
                </div>

                <div className="submit-container">
                    <button type='submit' className='submit1'>S'inscrire</button>
                </div>
                </form>

                <div className="notMember">Déja membre ?<a href="/">Se connecter</a></div>

            </div>
    )
}

export default Signup