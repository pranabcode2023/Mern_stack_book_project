// import axios from 'axios';
// import React from 'react';
// import { Link} from 'react-router-dom';

// interface BookProps {
//   book: {
//     _id: any;
//     name: any;
//     author: any;
//     description: any;
//     price: any;
//     available: any;
//     image: any;
//   };
// }

// const Book: React.FC<BookProps> = ({ book }) => {
 
//   const { _id, name, author, description, price, image } = book;

//   const deleteHandler = async () => {
//   try {
//     await axios.delete(`${process.env.REACT_APP_BASE_URL}books/all/${_id}`);
    
//     //refresh the page after delete the items
//     window.location.reload();
  
//   } catch (error) {
//     console.log(error);
//   }
// };

//   return (
//    <div className="bookCard">
//       <div className="container">
//         <img src={image} alt={name} />
//         </div>
//       <div className="container">
//          <article>By {author}</article>
//          <h3>{name}</h3>
//          <p>{description}</p>
//          <h2>Euro {price}</h2>
//       </div>
    
//     <div className="container">
//        <Link to={`/books/${_id}`}>
//           <button>Update</button>
//        </Link>
//     </div>
    
//     <div className="container">
//       <button onClick={deleteHandler}>Delete</button>
//       </div>
//    </div>
   
//   );
// };

// export default Book;



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
    image: any;
  };
}

const Book: React.FC<BookProps> = ({ book }) => {
  const { _id, name, author, description, price, image } = book;

  const deleteHandler = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}books/all/${_id}`,
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
        <article>By {author}</article>
        <h3>{name}</h3>
        <p>{description}</p>
        <h2>Euro {price}</h2>
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


