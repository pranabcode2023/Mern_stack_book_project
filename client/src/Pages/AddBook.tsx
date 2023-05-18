import React, { useState } from 'react'

export const AddBook = () => {

  const [inputs, setInputs] = useState({
    name: '',
    description: '',
    price: '',
    author: '',
    available: 'false',
    image: '',
  })

  const handleChange = (e: any) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }
  
  return (
    <div className="register">
      <form className="form" >
        <div className="title">Add Book</div>
        
        <div className="input-container">
           <label>Name</label>
          <input type='text' placeholder='Name' value ={inputs.name} onChange={handleChange} />
        </div>
        <div className="input-container">
           <label>Author</label>
          <input type='text' placeholder='Author' value ={inputs.author}onChange={handleChange} />
        </div>
        <div className="input-container">
           <label>Description</label>
          <input type='text' placeholder='Description' value ={inputs.description}onChange={handleChange} />
        </div>
        <div className="input-container">
           <label>Price</label>
          <input type='text' placeholder='Price' value ={inputs.price}onChange={handleChange} />
        </div>
   
        <div className="input-container">
           <label>Image</label>
          <input type='text'  placeholder='Price'value ={inputs.image} onChange={handleChange}/>
        </div>
         
        <div className="input-container">
           <label>Avaiable</label>
          <input type='checkbox' value={inputs.available } />
        </div>
 
        <div className="button-container">
          <button type='submit'>Add Book</button>
        </div>
      </form>
    </div>
  )
}

