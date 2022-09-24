import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../untils/ApiRoutes";

function Register() {
  const navigation = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = values;
    if (handleValidation()) {
      await axios
        .post(
          registerRoute,
          {
            username,
            email,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.data.status == 200) {
            // localStorage.setItem("user", JSON.stringify(data.user));
            toast.success(response.data.message);
            navigation("/");
          } else {
            toast.error(response.data.message);
          }
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  };

  const handleValidation = () => {
    let toastOptions = {
      position: "top-right",
      autoClose: 8000,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    };
    const { username, email, password, confirmPassword } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password & confirm password should be the same",
        toastOptions
      );
      return false;
    } else if (username.length < 4) {
      toast.error("Username should be greater then 3 word ", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Email cannot be null", toastOptions);
      return false;
    }
    return true;
  };
  useEffect(() => {
    if (localStorage.getItem("users")) {
      navigation("/");
    }
  }, []);

  const handelchange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h1>Quiz</h1>
          </div>
          <input
            type="text"
            placeholder="User name"
            name="username"
            onChange={(e) => handelchange(e)}
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            onChange={(e) => handelchange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handelchange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handelchange(e)}
          />
          <button type="submit">Create User</button>
          <span>
            already have a Account ? <Link to="/login">Login </Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}
const FormContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;

  .brand {
    display: flex;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input {
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid white;
        outline: none;
      }
    }
    button {
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
    span {
      color: white;
      text-transform: uppercase;
      a {
        color: #4e0eff;
        text-decoration: none;
        font=weight: bold;
      }
    }
  }
`;

export default Register;
