import React, { useState } from 'react'
import './LoginSignUp.css'

import user_ic from '../Assets/person.png'
import email_ic from '../Assets/email.png'
import password_ic from '../Assets/password.png'

export const LoginSignUp = () => {
    const [action, setAction] = useState("Connexion")
  return (
    <div className="container">
        <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
        </div>
        <div className="inputs">
            {action==="Connexion" ?<div></div>:
            <div className="input">
                <img src={user_ic} alt="" />
                <input type="text" placeholder='Entrez votre nom'/>
            </div>}
            <div className="input">
                <img src={email_ic} alt="" />
                <input type="email" placeholder='Entrez votre email'/>
            </div>
            <div className="input">
                <img src={password_ic} alt="" />
                <input type="password" placeholder='Mot de passe'/>
            </div>
        </div>
        <div className="submit-container" >
        {action==="Inscription"? <button className={"submit"}><a href="/dashboard">S'Inscrire</a></button>:
        <div><button className={"submit"}><a href="/dashboard">Se Connecter</a></button>
        <div className="forgot-password">Mot de passe oublié ? <span>Cliquez ici !</span></div></div>}

        </div>
        <div className="action-container">
            <button className={action==="Connexion"?"action gray":"action"} onClick={()=>{setAction("Inscription")}}>Inscription</button>
            <button className={action==="Inscription"?"action gray":"action"} onClick={()=>{setAction("Connexion")}}>Connexion</button>
        </div>
    </div>
  )
}

export default LoginSignUp
