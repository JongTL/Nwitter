import { authService, firebaseInstance } from "fBase";
import React, { useState } from "react";

import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    } from 'firebase/auth';
    


const Auth= ()=> {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [newAccount,setNewAccount]=useState(true);
    const [error,setError]=useState("");

    const onChange=(event)=>{
        const {target :{name,value}}=event;
        if(name==="email"){
            setEmail(value)
        } else if(name==="password"){
            setPassword(value);
        };
        console.log(event.target.name);
    }
    
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            let data;
            const auth = getAuth();
            if (newAccount) {
                data = await createUserWithEmailAndPassword(auth, email, password);
            } else {
                data = await signInWithEmailAndPassword(auth, email, password);
            }
            console.log(data);
        } catch (e) {
            setError(e.message);
        }
    };
const toggleAccount=()=>setNewAccount((prev)=>!prev);
const onSocialClick=async(event)=>{
    const {target:{name}}=event;
    let provider;
    if(name==="google"){
        provider=new firebaseInstance.auth.GoogleAuthProvider();
    }else if(name==="github"){
        provider=new firebaseInstance.auth.GithubAuthProvider();
    }
    const data= await authService.signInWithPopup(provider);
    console.log(data);
}

    return(
        <div>
            <form onSubmit={onSubmit}>
                <input name="email" type="email" placeholder="Email" required value={email} onChange={onChange}/>
                <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange}/>
                <input type="submit" value ={newAccount?"Create Account" : "Log in "}/>
                {error}
            </form>
            <span onClick={toggleAccount}>{newAccount?"Sign In" : "Create Account"}</span>
            
            <div>
                <button onClick={onSocialClick} name="google">Continue with google</button>
                <button onClick={onSocialClick} name="github">Continue with github</button>
            </div>
        </div>
    );
};
export default Auth;