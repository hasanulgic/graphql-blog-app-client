import './Signup.css'
import Home from '../Home/Home';
import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from 'react';

const SIGNUP = gql`
  mutation ResgisterUser(
    $name: String!
    $email: String!
    $password: String!
    $bio: String
  ) {
    signup(name: $name, email: $email, password: $password, bio: $bio) {
      token
      userError
    }
  }
`;

const Signup = () => {
  const [dataError, setDataError] = useState("");
  const [signUp, { data, loading, error }] = useMutation(SIGNUP);

    const handleRegister = (e) => {
        e.preventDefault();
        const data = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value,
            bio: e.target.bio.value
        }
        
        signUp({
          variables: data
        })
    }

    useEffect(()=> {
      if(data && data.signup.token){
        localStorage.setItem('token', data.signup.token)
      }
      
      if(data && data.signup.userError){
        setDataError(data.signup.userError);
      }
    }, [data])

    useEffect(()=> {
      if(error){
        setDataError(error.message)
      }
    }, [error])

    return (
      <>
        <Home />
        <h1 className="text-center font-bold text-5xl my-4 pb-4">Register</h1>
        <hr />
        <div className="form">
          <form onSubmit={handleRegister}>
            <label htmlFor="">Your Name</label>
            <input name="name" type="text" />
            <label htmlFor="">Your Email</label>
            <input name="email" type="email" />
            <label htmlFor="">Your Password</label>
            <input name="password" type="password" />
            <label htmlFor="">Your Bio</label>
            <input name="bio" type="text" />
            <button
              disabled={loading}
              type="submit"
              className={`rounded-full p-2 text-black ${
                loading ? "bg-gray-400" : "bg-white"
              }`}
            >
              Register
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

export default Signup;