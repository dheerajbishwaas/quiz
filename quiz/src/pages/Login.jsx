import React,{useState,useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from "../assets/logo.svg";
import {ToastContainer ,toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { loginRoute } from '../untils/ApiRoutes';

function Login() {
    const navigation = useNavigate()
    const [values,setValues] = useState({
        email:"",
        password:"",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {email,password} = values;
        if(handleValidation()){
            const {data} = await axios.post(loginRoute,{
                email,password
            });
            if(data.status === 200){
                localStorage.setItem('users',JSON.stringify(data.user));
                navigation('/dashboard');
            }else{
                toast.error(data.message);
            }
        }
    }

    const handleValidation = () =>{
        let toastOptions = {
            position:"top-right",
            autoClose:8000,
            pauseOnHover:true,
            draggable:true,
            theme:"dark",
        }
        const {email,password} = values;
        if(email.length < 4){
            toast.error("email should be greater then 3 word ",toastOptions);
            return false;
        }else if(password===''){
            toast.error("Password cannot be null",toastOptions);
            return false;
        }
        return true;
    }
   

    const handelchange = (e) =>{
        setValues({...values,[e.target.name]:e.target.value});
    }

    useEffect(()=>{
      if(localStorage.getItem('users')){
        navigation('/dashboard');
      }
    },[])

  return (
    <>
    <FormContainer>
        <form onSubmit={(e)=>handleSubmit(e)}>
            <div className="brand">
                <img src={Logo} alt="Logo" />
                <h1>Quiz</h1>
            </div>
            <input type="text" placeholder='Enter Your Email ' name="email" onChange={(e)=>handelchange(e)} />
            <input type="password" placeholder='Password' name="password" onChange={(e)=>handelchange(e)} />
            <button type='submit'>Login</button>
            <span>Dont have an Account ? <Link to="/register">Register </Link></span>
            
        </form>
    </FormContainer>
    <ToastContainer />
    </>
  )
}
const FormContainer = styled.div`
height:100vh;
display:flex;
flex-direction:column;
justify-content:center;
gap:1rem;
align-items:center;

.brand{
    display:flex;
    justify-content:center;
    gap:1rem;
    align-items:center;
    img{
        height:5rem; 
    }
    h1{
        color:white;
    }
}
form{
    display:flex;
    flex-direction:column;
    gap:2rem;
    background-color:#00000076;
    border-radius:2rem;
    padding:3rem 5rem;
    input{
        padding:1rem;
        border:0.1rem solid #4e0eff;
        border-radius:0.4rem;
        width:100%;
        font-size:1rem;
        &:focus{
            border:0.1rem solid white;
            outline:none;
        }
        
    }
    button{
        background-color:#997af0;
        color:white;
        padding:1rem 2rem;
        border:none;
        cursor:pointer;
        font-weight:bold;
        border-radius:0.4rem;
        font-size:1rem;
        text-transform:uppercase;
        transition:0.4s ease-in-out;
        &:hover{
            background:#4e0eff;
        }
    }
    span{
        color:white;
        text-transform:uppercase;
        a{
            color:#4e0eff;
            text-decoration:none;
            font=weight:bold;
        }
    }
}
`;

export default Login