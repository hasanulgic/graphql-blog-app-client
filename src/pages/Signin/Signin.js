import React, { useEffect, useState } from "react";
import Home from "../Home/Home";
import { gql, useMutation } from "@apollo/client";

const SINGIN = gql`
  mutation Login($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      token
      userError
    }
  }
`;

const Signin = () => {
  const [dataError, setDataError] = useState("");
  const [signIn, { data, loading, error, reset }] = useMutation(SINGIN);

  // console.log(data)

  const handleRegister = (e) => {
    e.preventDefault();
    reset();
    setDataError('')
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    // console.log("data: ", data);
    try {
      signIn({
        variables: data,
      });
    } catch (error) {
      console.log(error)
    }
    
  };

  useEffect(() => {
    if (data && data.signin.token) {
      localStorage.setItem("token", data.signin.token);
    }

    if (data && data.signin.userError) {
      setDataError(data.signin.userError);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setDataError(error.message);
    }
  }, [error]);

  return (
    <>
      <Home />
      <h1 className="text-center font-bold text-5xl my-4 pb-4">Login</h1>
      <hr />
      <div className="form">
        <form onSubmit={handleRegister}>
          <label htmlFor="">Your Email</label>
          <input name="email" type="email" />
          <label htmlFor="">Your Password</label>
          <input name="password" type="password" />

          <button
            disabled={loading}
            type="submit"
            className={`rounded-full p-2 text-black ${
              loading ? "bg-gray-400" : "bg-white"
            }`}
          >
            Login
          </button>
          {dataError && (
            <p className="text-center text-red-500 mt-8 font-medium">
              {dataError}
            </p>
          )}
        </form>
      </div>
    </>
  );
};

export default Signin;
