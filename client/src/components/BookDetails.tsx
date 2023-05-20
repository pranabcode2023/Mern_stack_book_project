import axios from 'axios';
import React, {useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


const BookDetails = () => {
   const history = useNavigate();
  const [inputs, setInputs] = useState({
    name: '',
    description: '',
    price: '',
    author: '',
    available: false,
    image: '',
  });
  const id = useParams().id;
  // console.log(id);

  useEffect(() => {
    
    const fetchHandler = async () => {
      await axios.get(`${process.env.REACT_APP_BASE_URL}books/all/${id}`).then((res) => {
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

  const sendRequest = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_BASE_URL}books/all/${id}`, {
        name: String(inputs.name),
        author: String(inputs.author),
        description: String(inputs.description),
        price: Number(inputs.price),
        image: String(inputs.image),
        available: Boolean(inputs.available),
      });
    } catch (error) {
      console.error(error);
    }
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Submit logic here
  sendRequest().then(() => history('/books'));
  };

  return (
    <div className="bookDetails">
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




// import axios from 'axios';
// import React, { ChangeEvent, useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';

// const BookDetails = () => {
//   const history = useNavigate();
//   const [inputs, setInputs] = useState({
//     name: '',
//     description: '',
//     price: '',
//     author: '',
//     available: false,
//     image: undefined as File | undefined, // Update the type of 'image'
//   });
//   const id = useParams().id;

//   useEffect(() => {
//     const fetchHandler = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_BASE_URL}books/all/${id}`);
//         setInputs(response.data.book);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchHandler();
//   }, [id]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, type, checked } = e.target;
//     setInputs((prevState) => ({
//       ...prevState,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       const file = e.target.files[0];
//       setInputs({ ...inputs, image: file });
//     } else {
//       setInputs({ ...inputs, image: undefined });
//     }
//   };

//   const sendRequest = async () => {
//     try {
//       const formData = new FormData();
//       formData.append('name', String(inputs.name));
//       formData.append('author', String(inputs.author));
//       formData.append('description', String(inputs.description));
//       formData.append('price', Number(inputs.price).toString());

//       if (inputs.image) {
//         formData.append('image', inputs.image);
//       }

//       formData.append('available', Boolean(inputs.available).toString());

//       await axios.put(`${process.env.REACT_APP_BASE_URL}books/all/${id}`, formData);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     sendRequest().then(() => history('/books'));
//   };

//   return (
//     <div className="register">
//       <form className="form" onSubmit={handleSubmit}>
//         <div className="title">Book Details</div>

//         <div className="input-container">
//           <label htmlFor="name">Name</label>
//           <input
//             type="text"
//             id="name"
//             placeholder="Name"
//             value={inputs.name}
//             onChange={handleChange}
//             name="name"
//           />
//         </div>
//         <div className="input-container">
//           <label htmlFor="author">Author</label>
//           <input
//             type="text"
//             id="author"
//             placeholder="Author"
//             value={inputs.author}
//             onChange={handleChange}
//             name="author"
//           />
//         </div>
//         <div className="input-container">
//           <label htmlFor="description">Description</label>
//           <input
//             type="text"
//             id="description"
//             placeholder="Description"
//             value={inputs.description}
//             onChange={handleChange}
//             name="description"
//           />
//         </div>
//         <div className="input-container">
//           <label htmlFor="price">Price</label>
//           <input
//             type="text"
//             id="price"
//             placeholder="Price"
//             value={inputs.price}
//             onChange={handleChange}
//             name="price"
//           />
//         </div>

//         <div className="input-container">
//           <label htmlFor="image">Image</label>
//           <input type="file" id="image"  onChange={handleFile} name="image" />
//         </div>

//         <div className="input-container">
//           <label htmlFor="available">Available</label>
//           <input
//             type="checkbox"
//             id="available"
//             checked={inputs.available}
//             onChange={handleChange}
//             name="available"
//           />
//         </div>

//         <div className="button-container">
//           <button type="submit">Update Book</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default BookDetails;

