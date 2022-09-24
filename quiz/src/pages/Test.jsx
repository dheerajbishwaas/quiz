import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getQuestioByTopicRoute } from "../untils/ApiRoutes";
import {ToastContainer ,toast} from "react-toastify";
import { useNavigate } from "react-router-dom";

function Test() {
  
  const navigation = useNavigate();

  const [topic, setTopic] = useState([]);
  const [question, setQuestion] = useState({});
  const [current, setCurrent] = useState({});
  const [count, setCount] = useState(1);
  const [correct ,setCorrect] = useState(0);
  const [useranswer ,setUserAnswer] = useState(0);
  const [lastshow, setLastShow] = useState(false);

  let questionType = [
    "Beginner Level",
    "Intermediate Level",
    "Professional Level",
  ];

  let toastOptions = {
    position:"top-right",
    autoClose:8000,
    pauseOnHover:true,
    draggable:true,
    theme:"dark",
  }
  const getQuestionDetails = async () => {
    let test = localStorage.getItem("topic");
    test = JSON.parse(test);
    await axios
      .post(
        getQuestioByTopicRoute,
        { topic_id: test.id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.data.status === 200) {
          response.data.data[0].q_type =
            questionType[response.data.data[0].q_type - 1];
          setCurrent(response.data.data[0]);
          setQuestion(response.data.data);
        } else {
          // toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const next = () => {

    if(current.answer === useranswer){
      setCorrect(correct+1);
    }

    if(useranswer === 0){
      console.log(useranswer);
      toast.error("Please Choose Correct Answer",toastOptions);
    }else{
      if (question[count] !== undefined) {
        question[count].q_type = questionType[question[count].q_type - 1];
        setCurrent(question[count]);
        setCount(count + 1);
      }else{
        if(current.answer === useranswer){
          setCorrect(correct+1);
        }
        setLastShow(true);
      }
    }

  };

  const handlerOnChnage = (e) => {
    setUserAnswer(e.target.value);
  };

  useEffect(() => {
    if(!lastshow){
      document.getElementById('option1').checked = false;
      document.getElementById('option2').checked = false;
      document.getElementById('option3').checked = false;
      document.getElementById('option4').checked = false; 
      setUserAnswer(0);
    }
   
  }, [current]);

  useEffect(() => {
    let test = localStorage.getItem("topic");
    test = JSON.parse(test);
    setTopic(test);
    getQuestionDetails();
  }, []);

  return (
    <>
      {lastshow ? 
      
      <LastContainer>
          <div>Thank You For Paticpate This Quiz</div>
          <div> Your Score Is {correct}.</div>
      </LastContainer> 
      :
       <TestContainer>
       <div className="main">
         <div className="qtype">{current.q_type}</div>
         <div className="topic">Welcome to {topic.name} test !!</div>
         <div className="Question">
           {count}. Question : {current.question}
         </div>
         <div className="option">
           <ol className="list" type="A">
             <li>
               <input
                 type="radio"
                 value="1"
                 id="option1"
                 name="answer"
                 onChange={(e) => handlerOnChnage(e)}
               />{" "}
               <label htmlFor="option1">{current.option_first}</label>
             </li>
             <li>
               <input
                 type="radio"
                 value="2"
                 id="option2"
                 name="answer"
                 onChange={(e) => handlerOnChnage(e)}
               />{" "}
               <label htmlFor="option2">{current.option_second}</label>
             </li>
             <li>
               <input
                 type="radio"
                 value="3"
                 id="option3"
                 name="answer"
                 onChange={(e) => handlerOnChnage(e)}
               />{" "}
               <label htmlFor="option3">{current.option_third}</label>
             </li>
             <li>
               <input
                 type="radio"
                 value="4"
                 id="option4"
                 name="answer"
                 onChange={(e) => handlerOnChnage(e)}
               />{" "}
               <label htmlFor="option4">{current.option_fourth}</label>
             </li>
           </ol>
         </div>
         <div>
           {" "}
           <button type="button" onClick={() => next()}>
             Next
           </button>{" "}
         </div>
       </div>
     </TestContainer>
    }
     
      <ToastContainer />
    </>
  );
}

const LastContainer = styled.div`
height:100vh;
display:flex;
flex-direction:column;
justify-content:center;
gap:1rem;
align-items:center;
font-size: 40px;
font-weight: bold;
`;
const TestContainer = styled.div`
  .topic {
    font-size: 30px;
    font-weight: bold;
  }
  .Question {
    font-size: 30px;
    font-weight: normal;
  }

  .list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    font-size: 20px;
  }
  .main {
    height: 50vh;
    width: 100vh;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  .qtype {
    color: red;
    font-size: 15px;
  }
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  button {
    float: right;
    margin: 0 10px 0 15px;
    background-color: #997af0;
    color: white;
    padding: 1rem 2rem;
    border: none;
    cursor: pointer;
    font-weight: bold;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: 0.4s ease-in-out;
    &:hover {
      background: #4e0eff;
    }
  }
`;

export default Test;
