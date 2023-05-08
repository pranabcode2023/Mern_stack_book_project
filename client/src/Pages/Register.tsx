
import React, { ChangeEvent, useState } from 'react'

type Props = {}

// type Avatar = undefined | File

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

  const handleFile = (e: any) => {
    // console.log(typeof e.target.files[0])
    setFormData({...formData, avatar: e.target.files[0]})
  }
  
  const handleSubmit = async(e: { preventDefault: () => void }) => {
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
    const response = await fetch("http://localhost:5000/api/users/new", requestOptions);
    const result = await response.json();
    console.log(result)
    alert("successfull..... check console")
  } catch (error) {
    console.log(error)
    alert("something went wrong... check console")
  }

  }
// const handleSubmit = (e: { preventDefault: () => void; }) => {
//   e.preventDefault();
//   console.log(formData)
//   }
  
  // console.log(process.env.REACT_BASE_URL)
  return (
      <div>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
           <input type="email" name="email" placeholder="email" onChange={handleChange} />
           <input type="password" name="password" placeholder="password" onChange={handleChange}/>
           <input type="username" name="username" placeholder="username" onChange={handleChange} />
           <input type= "file" name = "avatar" onChange={handleFile}></input>
           <button type="submit">Submit</button>
          </form>
      
    </div>
  )
}

export default Register;




// import React, { ChangeEvent, FormEvent, useState } from 'react'

// type Props = {}

// const Register = (props: Props) => {

//   const [formData, setFormData] = useState({
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
//     <div>
//       <h1>Register</h1>
//       <form onSubmit={handleSubmit}>
//         <input type='email' name='email' placeholder='email' onChange={handleChange}/>
//         <input type='password' name='password' placeholder='password'onChange={handleChange}/>
//         <input name='username' placeholder='username' onChange={handleChange}/>
//         <input type='file' name='avatar' onChange={handleFile} />
//         <button type='submit'>Register me!</button>
//       </form>
//     </div>
//   )
// }

// export default Register

