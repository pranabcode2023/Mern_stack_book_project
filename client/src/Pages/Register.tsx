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

     <div className="login">
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
          <input type='file' name='avatar' onChange={handleFile} />
          </div>
        <div className="button-container">
          <button type='submit'>Register me!</button>
        </div>
      </form>
    </div>
  )
}

export default Register


// const Register = (props: Props) => {

//   const [formData, setFormData] = useState<SubmitRegisterData>({
//     email: "",
//     password: "",
//     username: "",
//     avatar: ""
//   });

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setFormData({...formData, [e.target.name]: e.target.value})
//   }

//   const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setFormData({ ...formData, avatar: e.target.files[0] })
//     } else {
//       setFormData({ ...formData, avatar: "" })
//     }
//   }
  
//   const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     console.log(formData)
//     const submitData = new FormData();
//     submitData.append("email", formData.email);
//     submitData.append("username", formData.username);
//     submitData.append("password", formData.password);
//     submitData.append("avatar", formData.avatar);
//     const requestOptions = {
//       method: 'POST',
//       body: submitData,
//     };
//     try {
//       const response = await fetch(`${process.env.REACT_APP_BASE_URL}users/new`, requestOptions);
//       const result = await response.json();
//       console.log(result);
//       alert("Success! Check console.")
//     } catch (error) {
//       console.log(error)
//       alert("Something went wrong - check console")
//     }
//   }
//   return (
      
    
//       <div className="form">
//           <div className="form-body">
//               <div className="username">
//                   <label className="form__label" for="firstName">First Name </label>
//                   <input className="form__input" type="text" id="firstName" placeholder="First Name"/>
//               </div>
//               <div className="lastname">
//                   <label className="form__label" for="lastName">Last Name </label>
//                   <input  type="text" name="" id="lastName"  className="form__input"placeholder="LastName"/>
//               </div>
//               <div className="email">
//                   <label className="form__label" for="email">Email </label>
//                   <input  type="email" id="email" className="form__input" placeholder="Email"/>
//               </div>
//               <div className="password">
//                   <label className="form__label" for="password">Password </label>
//                   <input className="form__input" type="password"  id="password" placeholder="Password"/>
//               </div>
//               <div className="confirm-password">
//                   <label className="form__label" for="confirmPassword">Confirm Password </label>
//                   <input className="form__input" type="password" id="confirmPassword" placeholder="Confirm Password"/>
//               </div>
//           </div>
//           <div class="footer">
//               <button type="submit" class="btn">Register</button>
//           </div>
//       </div>      
//     )       
// }
// export default Register;