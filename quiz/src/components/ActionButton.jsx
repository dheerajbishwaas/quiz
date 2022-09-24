import React from "react";
import styled from "styled-components";

function ActionButton(props) {

    const clickHandler = (id) =>{
        props.update(true);
        props.setId(id);
    }

  return (
    <>
      <ButtonContainer>
        <div>
          <button className="btn" onClick={()=> clickHandler(props.topicId)}>Update</button>
          <button className="btn">Delete</button>
        </div>
      </ButtonContainer>
    </>
  );
}

const ButtonContainer = styled.div`

  button {
    margin: 0 10px 0 15px;
    background-color: #997af0;
    color: white;
    padding: 0.5rem 0.5rem;
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

export default ActionButton;
