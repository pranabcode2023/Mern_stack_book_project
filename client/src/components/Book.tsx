
// import React from 'react';
// import { Link } from 'react-router-dom';

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
//   const { name, author, description, price, image } = book;

//   return (
   
//       <div className="bookCard">
//         <img src={image} alt={name} />
//         <article>By{author}</article>
//          <h3>{name}</h3>
//          <p>{description}</p>
//          <h2>Euro{price}</h2>
//            <p><button link = {`/books/{_id}`}>Update</button> </p>
//            <p><button>Delete</button></p>
//         </div>
    
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

  return (
    <div className="bookCard">
      <img src={image} alt={name} />
      <article>By {author}</article>
      <h3>{name}</h3>
      <p>{description}</p>
      <h2>Euro {price}</h2>
      <div className="button-container">
        <Link to={`/books/${_id}`}>
          <button>Update</button>
        </Link>
        <button>Delete</button>
      </div>
    </div>
  );
};

export default Book;

