// import axios from 'axios';
// import React, {useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';


// const BookDetails = () => {
//    const history = useNavigate();
//   const [inputs, setInputs] = useState({
//     name: '',
//     description: '',
//     price: '',
//     author: '',
//     available: false,
//     image: '',
//   });
//   const id = useParams().id;
//   // console.log(id);

//   useEffect(() => {
    
//     const fetchHandler = async () => {
//       await axios.get(`${process.env.REACT_APP_BASE_URL}books/all/${id}`).then((res) => {
//         console.log(res.data);
//         setInputs(res.data.book);
//       });
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

//   const sendRequest = async () => {
//     try {
//       await axios.put(`${process.env.REACT_APP_BASE_URL}books/all/${id}`, {
//         name: String(inputs.name),
//         author: String(inputs.author),
//         description: String(inputs.description),
//         price: Number(inputs.price),
//         image: String(inputs.image),
//         available: Boolean(inputs.available),
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   };


//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     // Submit logic here
//   sendRequest().then(() => history('/books'));
//   };

//   return (
//     <div className="bookDetails">
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
//           <input
//             type="text"
//             id="image"
//             placeholder="Image"
//             value={inputs.image}
//             onChange={handleChange}
//             name="image"
//           />
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



import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {}

type BookData = {
  name: string;
  description: string;
  price: string;
  author: string;
  available: boolean;
  image: File | string;
};

const BookDetails = (props: Props) => {
  const navigate = useNavigate();
  
 
  const [formData, setFormData] = useState<BookData>({
    name: '',
    description: '',
    price: '',
    author: '',
    available: false,
    image: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, image: '' });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
     navigate('/books'); // navigate to books page
    
    console.log(formData);
    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('description', formData.description);
    submitData.append('price', formData.price);
    submitData.append('author', formData.author);
    submitData.append('available', String(formData.available));
    submitData.append('image', formData.image);
    
   
    

    const requestOptions = {
      method: 'PUT',
      body: submitData,
    };
       
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}books/all`, requestOptions);
      const result = await response.json();
      console.log(result);
      //refresh the page after delete the items
      window.location.reload();
      alert('Success! Check console.');
    } catch (error) {
      console.log(error);
      alert('Something went wrong - check console.');
    }
  };
  

  
  
  return (
    <div className="addBook">
      <form className="form" onSubmit={handleSubmit}>
        <div className="title">Add Book</div>

        <div className="input-container">
          <input
            type="text"
            id="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            name="name"
          />
        </div>
        <div className="input-container">
          <input
            type="text"
            id="author"
            placeholder="Author"
            value={formData.author}
            onChange={handleChange}
            name="author"
          />
        </div>
        <div className="input-container">
          <input
            type="text"
            id="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            name="description"
          />
        </div>
        <div className="input-container">
          <input
            type="text"
            id="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            name="price"
          />
        </div>

        <div className="input-container">
          <input type="file" id="image" placeholder="Image" onChange={handleFile} name="image" />
        </div>

        <div className="input-container">
          <label>Available</label>
          <input
            type="checkbox"
            id="available"
            checked={formData.available}
            onChange={handleChange}
            name="available"
          />
        </div>

        <div className="button-container">
          <button type="submit">Add Book</button>
        </div>
      </form>
    </div>
  );
};

export default BookDetails;
