import React from "react";
import styled from 'styled-components';


function Topics(props) {
  return (
    <>
      <DivContainer>
        <div className="main">
          <span>Enter Topic Name:</span>
          <input type="text" name="topic" value={props.updateName!==undefined ? props.updateName:''} placeholder="Enter Topic Name" onChange={(e)=>props.handeChange(e)} />
        </div>

      </DivContainer>
    </>
  );
}

const DivContainer = styled.div`
.main{
  margin:20px
}
`;

export default Topics;
