import React, {useState,useEffect} from "react";
import {Link,useNavigate} from "react-router-dom";
import styled from "styled-components";
import DataTable from "react-data-table-component";
import { getTopicsRoute } from "../untils/ApiRoutes";
import {ToastContainer,toast} from "react-toastify";
import axios from "axios";
import ActionButton from "../components/ActionButton";
import AddQuestion from "../components/AddQuestion";

function Dashboard() {
  const navigation = useNavigate();
  const [data, setData] = useState([]);
  const [update,setUpdate] = useState(false);
  const [updateId,setUpdateId] = useState(false);

  let toastOptions = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const logOut = () => {
    localStorage.removeItem("users");
    navigation("/");
    toast.success("Logout Successfully", toastOptions);
  };

  

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

  const columns = [
    {
      id: 1,
      name: "Id",
      selector: (data) => data.id,
      sortable: true,
      reorder: true
    },
    {
      id: 2,
      name: "Name",
      selector: (data) => data.name,
      sortable: true,
      reorder: true
    },
    {
      id: 3,
      name: "Action",
      selector: (data) => <ActionButton topicId={data} setId={setUpdateId} update={setUpdate} />,
      sortable: true,
      reorder: true
    }
  ];

  return (
    <>
      <DashboardContainer>
         <button className="logout btn" onClick={() => logOut()}>
          Logout
        </button>
        <button className="logout btn" onClick={() => navigation('/add')}>
          Add Questions
        </button>
      </DashboardContainer> 
      <br></br>
      <br></br><br></br>
      {update ? <AddQuestion updateId={updateId} /> :<DataTable
          title="Topics"
          columns={columns}
          data={data}
          defaultSortFieldId={1}
          // sortIcon={<SortIcon />}
          pagination
          selectableRows
          />
      }
    <ToastContainer />
    </>  
    
  )
}

const DashboardContainer = styled.div`


button {
  float:right;
  margin: 50px 50px 0 0px;
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

export default Dashboard