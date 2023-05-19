// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom';

// const BookDetails = () => {
//   const [inputs, setInputs] = useState({
//     name: '',
//     description: '',
//     price: '',
//     author: '',
//     available: false,
//     image: '',
//    })
//    const id = useParams().id;
//    console.log(id)
//    useEffect(() => {
//      const fetchHandler =async () => {
//         await axios.get(`http://localhost:5000/api/books/all ${id}`).then(res =>console.log(res.data))
//      }
//      fetchHandler().then((data)=> setInputs(data.book))
//    }, [id])
  
  
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     // setInputs((prevState) => ({
//     //   ...prevState,
//     //   [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
//     // }));
//   };

//    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     // submit logic here
    
//   };
  
//   return (
//     <div className="register">
//       <form className="form" onSubmit={handleSubmit}>
//         <div className="title">Add Book</div>

//         <div className="input-container">
//           <label htmlFor="name">Name</label>
//           <input type="text" id="name" placeholder="Name" value={inputs.name} onChange={handleChange} name="name" />
//         </div>
//         <div className="input-container">
//           <label htmlFor="author">Author</label>
//           <input type="text" id="author" placeholder="Author" value={inputs.author} onChange={handleChange} name="author" />
//         </div>
//         <div className="input-container">
//           <label htmlFor="description">Description</label>
//           <input type="text" id="description" placeholder="Description" value={inputs.description} onChange={handleChange} name="description" />
//         </div>
//         <div className="input-container">
//           <label htmlFor="price">Price</label>
//           <input type="text" id="price" placeholder="Price" value={inputs.price} onChange={handleChange} name="price" />
//         </div>

//         <div className="input-container">
//           <label htmlFor="image">Image</label>
//           <input type="text" id="image" placeholder="Image" value={inputs.image} onChange={handleChange} name="image" />
//         </div>

//         <div className="input-container">
//           <label htmlFor="available">Available</label>
//           <input type="checkbox" id="available" checked={inputs.available} onChange={handleChange} name="available" />
//         </div>

//         <div className="button-container">
//           <button type="submit">Update Book</button>
//         </div>
//       </form>
//     </div>
//   )
// }
// export default BookDetails


import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BookDetails = () => {
  const [inputs, setInputs] = useState({
    name: '',
    description: '',
    price: '',
    author: '',
    available: false,
    image: '',
  });
  const id = useParams().id;
  console.log(id);

  useEffect(() => {
    const fetchHandler = async () => {
      await axios.get(`http://localhost:5000/api/books/all/${id}`).then((res) => {
        console.log(res.data);
        setInputs(res.data.book);
      });
    };
    fetchHandler();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Submit logic here
  };

  return (
    <div className="register">
      <form className="form" onSubmit={handleSubmit}>
        <div className="title">Book Details</div>

        <div className="input-container">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
            name="name"
          />
        </div>
        <div className="input-container">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            placeholder="Author"
            value={inputs.author}
            onChange={handleChange}
            name="author"
          />
        </div>
        <div className="input-container">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            placeholder="Description"
            value={inputs.description}
            onChange={handleChange}
            name="description"
          />
        </div>
        <div className="input-container">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            placeholder="Price"
            value={inputs.price}
            onChange={handleChange}
            name="price"
          />
        </div>

        <div className="input-container">
          <label htmlFor="image">Image</label>
          <input
            type="text"
            id="image"
            placeholder="Image"
            value={inputs.image}
            onChange={handleChange}
            name="image"
          />
        </div>

        <div className="input-container">
          <label htmlFor="available">Available</label>
          <input
            type="checkbox"
            id="available"
            checked={inputs.available}
            onChange={handleChange}
            name="available"
          />
        </div>

        <div className="button-container">
          <button type="submit">Update Book</button>
        </div>
      </form>
    </div>
  );
};

export default BookDetails;

