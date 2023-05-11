import React, { ChangeEvent, FormEvent, useContext, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext';


type Props = {}
function Login({}: Props) {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState<SubmitLoginData>({
    email: "",
    password: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(formData.email, formData.password);
  }
  return (
    <div className="login">
      
      <form className="form" onSubmit={handleSubmit}>
        <div className="title">Login</div>
        <div className="input-container">
           <label>Username </label>
          <input type='email' name='email' placeholder='email' onChange={handleChange}/>
        </div>
        <div className="input-container">
            <label>Password </label>
          <input type='password' name='password' placeholder='password'onChange={handleChange}/>
        </div>
        <div className="button-container">
          <button type='submit'>Login</button>
        </div>
        
      </form>
    </div>

    // <div className="login">
    //   <form className="form" onSubmit={handleSubmit}>
    //     <div className="title">Login</div>
    //     <div className="input-container">
    //       <label>Username </label>
    //       <input type="email" placeholder='Email' onChange={handleChange} />
        
    //     </div>
    //     <div className="input-container">
    //       <label>Password </label>
    //       <input type="password" name="pass" placeholder='Password' onChange={handleChange} />
         
    //     </div>
    //     <div className="button-container">
    //       <button type="submit" />
    //     </div>
    //   </form>
    // </div>
  );
}

export default Login