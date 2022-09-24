import React from 'react'
import styled from "styled-components";
import {useNavigate } from 'react-router-dom';

 function TopicCard(props) {

  const navigation = useNavigate();


  const clickHandler = () => {
    localStorage.setItem('topic',JSON.stringify(props.data));
    navigation('/test');
  }

  return (
    <>
    <Topic onClick={()=>clickHandler()}>
        <div className='main' >
          {props.data.name}
        </div>
    </Topic>
    
    </>
  )
}

const Topic=styled.div`
height:30vh;
width:150%;
display:flex;
font-size:50px;
background:#cc0000;
color:white;
flex-direction:coloum;
justify-content:center;
gap:2rem;
margin:10px;
align-items:center;
border:1px solid black;
&:hover{
    background:#4e0eff;
}
`;

export default TopicCard