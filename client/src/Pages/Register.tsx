import React, { ChangeEvent, FormEvent, useState } from 'react'

type Props = {}

const Register = (props: Props) => {

  const [formData, setFormData] = useState<SubmitRegisterData>({
    email: "",
    password: "",
    username: "",
    avatar: ""
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, avatar: e.target.files[0] })
    } else {
      setFormData({ ...formData, avatar: "" })
    }
  }
  
  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData)
    const submitData = new FormData();
    submitData.append("email", formData.email);
    submitData.append("username", formData.username);
    submitData.append("password", formData.password);
    submitData.append("avatar", formData.avatar);
    const requestOptions = {
      method: 'POST',
      body: submitData,
    };
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}users/new`, requestOptions);
      const result = await response.json();
      console.log(result);
      alert("Success! Check console.")
    } catch (error) {
      console.log(error)
      alert("Something went wrong - check console")
    }
  }

  return (
    // <div>
    //   <h1>Register</h1>
    //   <form onSubmit={handleSubmit}>
    //     <input type='email' name='email' placeholder='email' onChange={handleChange}/>
    //     <input type='password' name='password' placeholder='password'onChange={handleChange}/>
    //     <input name='username' placeholder='username' onChange={handleChange}/>
    //     <input type='file' name='avatar' onChange={handleFile} />
    //     <button type='submit'>Register me!</button>
    //   </form>
    // </div>

     <div className="register">
      <form className="form" onSubmit={handleSubmit}>
        <div className="title">Register</div>
        <div className="input-container">
          <input type='email' name='email' placeholder='Email' onChange={handleChange} />
        </div>
        <div className="input-container">
          <input type='password' name='password' placeholder='Password' onChange={handleChange} />
        </div>
        <div className="input-container">
          <input name='username' placeholder='username' onChange={handleChange} />
        </div>
      <div className="input-container">
          <textarea id="subject" name="subject" placeholder="Write something.." ></textarea>
      </div>
        <div className="input-container">
          <input type='file' name='avatar' onChange={handleFile} />
        </div>
        {/* <div className="input-container">
          <input type='file' name='avatar' onChange={handleFile} />
        </div>
        <div className="input-container">
          <input type='file' name='avatar' onChange={handleFile} />
        </div> */}
 
        <div className="button-container">
          <button type='submit'>Register me!</button>
        </div>
      </form>
    </div>
  )
}

export default Register


