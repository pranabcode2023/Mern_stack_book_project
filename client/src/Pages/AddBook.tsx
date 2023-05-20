import axios from 'axios';
import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
  const history = useNavigate();
  
  const [inputs, setInputs] = useState({
    name: "",
    description: "",
    price: "",
    author: "",
    available: false,
    image: ""
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    }));
  };

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setInputs({ ...inputs, image: URL.createObjectURL(file) });
    } else {
      setInputs({ ...inputs, image: "" });
    }
  };
  
  const sendRequest = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}books/all`, {
        name: inputs.name,
        author: inputs.author,
        description: inputs.description,
        price: Number(inputs.price),
        image: inputs.image,
        available: inputs.available,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendRequest().then(() => history('/books'));
  };

  return (
    <div className="addBook">
      <form className="form" onSubmit={handleSubmit}>
        <div className="title">Add Book</div>

        <div className="input-container">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" placeholder="Name" value={inputs.name} onChange={handleChange} name="name" />
        </div>
        <div className="input-container">
          <label htmlFor="author">Author</label>
          <input type="text" id="author" placeholder="Author" value={inputs.author} onChange={handleChange} name="author" />
        </div>
        <div className="input-container">
          <label htmlFor="description">Description</label>
          <input type="text" id="description" placeholder="Description" value={inputs.description} onChange={handleChange} name="description" />
        </div>
        <div className="input-container">
          <label htmlFor="price">Price</label>
          <input type="text" id="price" placeholder="Price" value={inputs.price} onChange={handleChange} name="price" />
        </div>

        <div className="input-container">
          <label htmlFor="image">Image</label>
          <input type="file" id="image" placeholder="Image" onChange={handleFile} name="image" />
        </div>

        <div className="input-container">
          <label htmlFor="available">Available</label>
          <input type="checkbox" id="available" checked={inputs.available} onChange={handleChange} name="available" />
        </div>

        <div className="button-container">
          <button type="submit">Add Book</button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;

// import React, { ChangeEvent, FormEvent, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// type SubmitBookData = {
//   name: string;
//   description: string;
//   price: number;
//   author: string;
//   available: boolean;
//   image: string;
// };

// const AddBook = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState<SubmitBookData>({
//     name: '',
//     description: '',
//     price: 0,
//     author: '',
//     available: false,
//     image: '',
//   });

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });
//   };

//   const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setFormData({ ...formData, image: URL.createObjectURL(e.target.files[0]) });
//     } else {
//       setFormData({ ...formData, image: '' });
//     }
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     console.log(formData);

//     const submitData = new FormData();
//     submitData.append('name', formData.name);
//     submitData.append('description', formData.description);
//     submitData.append('price', formData.price.toString());
//     submitData.append('author', formData.author);
//     submitData.append('available', String(formData.available));
//     submitData.append('image', formData.image);

//     navigate('/books'); // navigate to books page

//     const requestOptions = {
//       method: 'POST',
//       body: submitData,
//     };
//     try {
//       const response = await fetch(`${process.env.REACT_APP_BASE_URL}books/all`, requestOptions);
//       const result = await response.json();
//       console.log(result);
//       alert('Success! Check console.');
//     } catch (error) {
//       console.log(error);
//       alert('Something went wrong - check console.');
//     }
//   };

//   return (
//     <div className="register">
//       <form className="form" onSubmit={handleSubmit}>
//         <div className="title">Add Book</div>

//         <div className="input-container">
//           <input
//             type="text"
//             id="name"
//             placeholder="Name"
//             value={formData.name}
//             onChange={handleChange}
//             name="name"
//           />
//         </div>
//         <div className="input-container">
//           <input
//             type="text"
//             id="author"
//             placeholder="Author"
//             value={formData.author}
//             onChange={handleChange}
//             name="author"
//           />
//         </div>
//         <div className="input-container">
//           <input
//             type="text"
//             id="description"
//             placeholder="Description"
//             value={formData.description}
//             onChange={handleChange}
//             name="description"
//           />
//         </div>
//         <div className="input-container">
//           <input
//             type="text"
//             id="price"
//             placeholder="Price"
//             value={formData.price.toString()}
//             onChange={handleChange}
//             name="price"
//           />
//         </div>

//         <div className="input-container">
//           <input type="file" id="image" placeholder="Image" onChange={handleFile} name="image" />
//         </div>

//         <div className="input-container">
//           <label>Available</label>
//           <input
//             type="checkbox"
//             id="available"
//             checked={formData.available}
//             onChange={handleChange}
//             name="available"
//           />
//         </div>

//         <div className="button-container">
//           <button type="submit">Add Book</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddBook;
