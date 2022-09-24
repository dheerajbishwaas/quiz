import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getTopicsRoute } from "../untils/ApiRoutes";
import axios from "axios";
import TopicCard from "../components/TopicCard";

 function Client() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
    .post(getTopicsRoute, "", {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      if (response.data.status === 200) {
        setData(response.data.data);
      }
    })
    .catch((error) => {
      console.log(error.response);
    });
  },[]);

  return (
    <>
      <Heading>  
        <div>Welcome to Quiz!! </div>
      </Heading>
     <ClientPanel>

      {data.length > 0 ? data.map((item,i)=>{  
        
        return (<TopicCard key={i} data ={item} />)

      }):<TopicCard data='' />} 

     </ClientPanel>
    </>
  );
}

const Heading = styled.div`
font-size:30px;
color:#FF3399;
margin-top:50px;
margin-bottom:50px;
display: flex;
align-items: center;
justify-content: center;
`;

const ClientPanel =styled.div`
display: flex;
align-items: center;
justify-content: center;
`;

export default Client;
