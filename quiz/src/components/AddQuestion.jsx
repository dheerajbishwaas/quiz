import React, {useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import Topics from "./Topics";
import Questions from "./Questions";
import {ToastContainer,toast} from "react-toastify";
import axios from "axios";
import { addQuestionRoute,getQuestioByTopicRoute } from "../untils/ApiRoutes";


function AddQuestion(props) {
  const [questions, setQuestions] = useState([]);
  const [count, setCount] = useState(1);
  const [values, setValues] = useState([]);
  const [check, setCheck] = useState([
    "topic",
    "1optionFirst",
    "1optionSecond",
    "1optionThird",
    "1optionFourth",
    "1answer",
    "1questiontype",
  ]);

  const navigation = useNavigate();

  let validation = [
    "optionFirst",
    "optionSecond",
    "optionThird",
    "optionFourth",
    "answer",
    "questiontype",
  ];

  let toastOptions = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const vladitionCheck = () =>{
    let valueIsempty = false;
    if(count > 1){
      check.map((item) => {
        if (values[item] === undefined || values[item] === "") {
          valueIsempty = true;
        }
      });
    }
    return valueIsempty;
  }





  const addQuestions = () => {

    let valueIsempty = vladitionCheck();
    
    if (valueIsempty) {
      toast.error("Please Fill All Fields First", toastOptions);
    } else {
      if (count <= 10) {
        setCount(count + 1);
        setQuestions((questions) => [
          ...questions,
          <Questions
            questionNumber={count}
            handeChange={(e) => handelchange(e)}
          />,
        ]); 
        validation.map((item) => {
          setCheck((check) => [...check, count + item]);
        });
        toast.success("Question Panel No." + count + " Added", toastOptions);
      } else {
        toast.error("You Can Add only 10 Question", toastOptions);
      }
    }

  };

  const deletQuestion = (idnot) => {
    if (idnot > 1) {
      toast.success("Question Panel No." + idnot + " Deleted", toastOptions);
      setQuestions((questions) =>
        questions.filter((id, index) => index !== idnot - 1)
      );
      setCount(count - 1);
    } else {
      toast.error("You cannot Delete First Question", toastOptions);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!vladitionCheck()) {     
      await axios.post(addQuestionRoute,values,{
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.data.status == 200) {
          // localStorage.setItem("user", JSON.stringify(data.user));
          toast.success(response.data.message);
          navigation("/dashboard");
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });

    }else{
      toast.error("Please Fill All Fields First", toastOptions);
    }

  };

  const handelchange = async (e) => {
    const { name, value } = e.target;
    if (isNaN(name)) {
      values[name] = value;
      setValues({ ...values });
    }
  };


  const getTopicDetails = async () => {

    
    await axios
    .post(
      getQuestioByTopicRoute,
      { topic_id: props.updateId },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      if (response.data.status === 200) {
        
      } else {
        // toast.error(response.data.message);
      }
    })
    .catch((error) => {
      console.log(error.response);
    });


  }


  useEffect(()=>{
    //geting data for update topic and Question 
    if(props.updateId !== undefined ){
      

    }

  },[])

  useEffect(() => {
    if (!localStorage.getItem("users")) {
      navigation("/");
    }
  }, []);

 

  return (
    <>
     <Heading> <div>{props.updateId !==undefined ? "Update Question":"Add Question"}</div></Heading>
      
      {props.updateId !==undefined ?  
        <FormContainer>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Topics handeChange={(e) => handelchange(e)} updateName={props.updateId.name} />
          <button type="button" onClick={addQuestions}>
            Add Questions{" "}
          </button>
          <button type="button" onClick={() => deletQuestion(count - 1)}>
            Delete Last Question
          </button>

          {questions.map((item, i) => (
            <div id={i + 1} key={i + 1}>
              {item}
            </div>
          ))}
            <button type="submit">Submit Topic</button>
          </form>
        </FormContainer>
      :
      
      <FormContainer>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Topics handeChange={(e) => handelchange(e)} />
          <button type="button" onClick={addQuestions}>
            Add Questions{" "}
          </button>
          <button type="button" onClick={() => deletQuestion(count - 1)}>
            Delete Last Question
          </button>

          {questions.map((item, i) => (
            <div id={i + 1} key={i + 1}>
              {item}
            </div>
          ))}
          <button type="submit">Submit Topic</button>
        </form>
      </FormContainer>}


      <ToastContainer />
    </>
  );
}
const Heading = styled.div`
display:flex;
justify-content:center;
font-size:30px;
margin:30px
`;


const FormContainer = styled.div`
  .logout {
    float: right;
    margin: 30px;
    background-color: red;
    &:hover {
      background: #8b0000;
    }
  }
  input {
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    width: 25%;
    font-size: 1rem;
    margin: 15px;
    &:focus {
      border: 0.1rem solid Red;
      outline: none;
    }
  }
  button {
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

export default AddQuestion;
