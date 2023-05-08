
import React, { ChangeEvent, useState } from 'react'

type Props = {}

// interface FormData {
//   email: String,
//   password: String,
//   username: String,
//   avatar: String
// }

const Register = (props: Props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    avatar: ""
  });
  
  // console.log(formData)
  const handleChange = async(e: { target: { name: any; value: any } }) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }
  
  const handleSubmit = async(e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(formData)
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
  const urlencoded = new URLSearchParams();
    urlencoded.append("email", formData.email);
    urlencoded.append("username", formData.username);
    urlencoded.append("password", formData.password);
    urlencoded.append("avatar", formData.avatar);
    
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
  };
  
  try {
    const response = await fetch("http://localhost:5000/api/users/new", requestOptions);
    const result = await response.json();
    console.log(result)
    alert("successfull..... check console")
  } catch (error) {
    console.log(error)
    alert("something went wrong... check console")
  }

  }
  
  
  // console.log(process.env.REACT_BASE_URL)
  return (
      <div>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
           <input type="email" name="email" placeholder="email" onChange={handleChange} />
           <input type="password" name="password" placeholder="password" onChange={handleChange}/>
           <input type="username" name="username" placeholder="username" onChange={handleChange} />
          <input type= "file" name = "avatar"></input>
           <button type="submit">Submit</button>
          </form>
      
    </div>
  )
}

export default Register;

