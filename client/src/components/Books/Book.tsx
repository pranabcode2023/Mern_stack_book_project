import React from 'react';
import { Link } from 'react-router-dom';

interface BookProps {
  book: {
    _id: any;
    name: any;
    author: any;
    description: any;
    price: any;
    available: any;
   comments: CommentData[];
   image: any;
  };
}

const Book: React.FC<BookProps> = ({ book }) => {
  const { _id, name, author, description, price, comments, image } = book;
  console.log(book)
  
  const deleteHandler = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}books/deleteBook/${_id}`,
        {
          method: 'DELETE',
        }
      );

      if (response.ok) {
        // Refresh the page after deleting the item
        window.location.reload();
      } else {
        console.log('Error deleting book:', response.status);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div className="bookCard">
      <div className="container">
        <img src={image} alt={name} />
      </div>
      <div className="container">
        <article>Author Name:  {author}</article>
        <h3> Book Name: {name}</h3>
        <h3>Book Description : {description}</h3>
        <h2>Price : {price} €</h2>
        
      </div>

      <div className="container">
        <Link to={`/books/${_id}`}>
          <button>Update</button>
        </Link>
      </div>

      <div className="container">
        <button onClick={deleteHandler}>Delete</button>
      </div>
    </div>
  );
};

export default Book;


// import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';

// type Props = {};

// type Book= {
//     name: string;
//     author: string;
//     description: string;
//     price: string;
//   available: string;
// image: File | string;
// };

// const Book = (props: Props) => {
//   const navigate = useNavigate();
//   const { id } = useParams<{ id: string }>();

//   const [formData, setFormData] = useState<Book>({
//     name: '',
//     description: '',
//     price: '',
//     author: '',
//     available: false,
//     image: '',

//   });

//   useEffect(() => {
//     const fetchBook = async () => {
//       try {
//         const response = await fetch(`${process.env.REACT_APP_BASE_URL}books/all/${id}`);
//         const data = await response.json();
//         const bookData = data.book;
//         setFormData(bookData);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchBook();
//   }, [id]);

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
//     setFormData({ ...formData, [e.target.name]: value });
//   };

//   const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setFormData({ ...formData, image: e.target.files[0] });
//     } else {
//       setFormData({ ...formData, image: '' });
//     }
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     try {
//       const submitData = new FormData();
//       submitData.append('name', formData.name);
//       submitData.append('description', formData.description);
//       submitData.append('price', formData.price);
//       submitData.append('author', formData.author);
//       submitData.append('available', String(formData.available));
  
//       submitData.append('image', formData.image);

//       const requestOptions = {
//         method: 'PUT',
//         body: submitData,
//       };

//       const response = await fetch(`${process.env.REACT_APP_BASE_URL}books/updatebook/${id}`, requestOptions);
//       if (response.ok) {
//         navigate('/books');
//         alert('Book updated successfully.');
//       } else {
//         throw new Error('Failed to update the book.');
//       }
//     } catch (error) {
//       console.error(error);
//       alert('Failed to update the book.');
//     }


//   return (
//           <div className="bookCard">
//       <div className="container">
//         <img src={image} alt={name} />
//       </div>
//       <div className="container">
//         <article>By {author}</article>
//         <h3>{name}</h3>
//         <p>{formData.description}</p>
//         <h2>Euro {price}</h2>
        
//       </div>

//       <div className="container">
//         <Link to={`/books/${_id}`}>
//           <button>Update</button>
//         </Link>
//       </div>

//       <div className="container">
//         <button onClick={deleteHandler}>Delete</button>
//       </div>
//     </div>
//   );
// };

// export default Book;



