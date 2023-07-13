import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

type Props = {};

interface SubmitLoginData {
  email: string;
  password: string;
}

const Login = (props: Props) => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState<SubmitLoginData>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/profile");
    login(formData.email, formData.password);
  };

  return (
    <div className="login-page-container">
      <form className="login-page-form" onSubmit={handleSubmit}>
        
      <div className="title">Login</div>
          <input
            type="text"
            name="email"
            placeholder="email"
            onChange={handleChange}
          />
     
          <input
            type="text"
            name="password"
            placeholder="password"
            onChange={handleChange}
          />
      
       
          <button type="submit">Login</button>
        
      </form>
    </div>
  );
};

export default Login;
