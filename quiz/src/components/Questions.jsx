import React from 'react'
import styled from 'styled-components';

function Questions(props) {

  let names = {
    'question':props.questionNumber+'question',
    'optionFirst':props.questionNumber+'optionFirst',
    'optionSecond':props.questionNumber+'optionSecond',
    'optionThird':props.questionNumber+'optionThird',
    'optionFourth':props.questionNumber+'optionFourth',
    'answer':props.questionNumber+'answer',
    'questiontype':props.questionNumber+'questiontype'
  }

  return (
   <>
     <FormContainer>
      <div>Questions {props.questionNumber}</div>
    
      <input type="text"  name={names.question} placeholder='Enter Question' onChange={(e)=>props.handeChange(e)} />
      <input type="text"  name={names.optionFirst}  placeholder='Enter option first' onChange={(e)=>props.handeChange(e)}/>
      <input type="text"  name={names.optionSecond}  placeholder='Enter option second ' onChange={(e)=>props.handeChange(e)} />
      <input type="text"  name={names.optionThird}  placeholder='Enter option Third' onChange={props.handeChange}/>
      <input type="text"  name={names.optionFourth}  placeholder='Enter option Fourth' onChange={props.handeChange}/>

      <select  name={names.answer} onChange={props.handeChange}>
        <option value="">Select which one is Correct</option>
        <option value="1">1 option</option>
        <option value="2">2 option</option>
        <option value="3">3 option</option>
        <option value="4">4 option</option>
      </select>
      <select  name={names.questiontype} onChange={props.handeChange}>
        <option value="">Select Question Level Type</option>
        <option value="1">Beginner Level</option>
        <option value="2">Intermediate Level</option>
        <option value="3">Professional Level</option>
      </select>
      <hr /> 
    </FormContainer>
   </>
  )
}

const FormContainer = styled.div`
margin:20px 0 0 0;
div{
margin:0 0 0 15px;
}
input,select {
  padding: 1rem;
  border: 0.1rem solid #4e0eff;
  border-radius: 0.4rem;
  width: 20%;
  font-size: 1rem;
  margin:15px;
  &:focus {
    border: 0.1rem solid Red;
    outline: none;
  }
}
`;

export default Questions