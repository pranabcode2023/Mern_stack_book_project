import axios from 'axios';
import React from 'react';
import { Link} from 'react-router-dom';

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
    await axios.delete(`${process.env.REACT_APP_BASE_URL}books/all/${_id}`);
    
    //refresh the page after delete the items
    window.location.reload();
  
  } catch (error) {
    console.log(error);
  }
};

  return (
    // <div className="bookCard">
    //   <img src={image} alt={name} />
    //   <article>By {author}</article>
    //   <h3>{name}</h3>
    //   <p>{description}</p>
    //   <h2>Euro {price}</h2>
    //   <br/>
    //   <Link to={`/books/${_id}`}>
    //       <button>Update</button>
    //   </Link>
    //   <br/>
    //   <button onClick={deleteHandler}>Delete</button>
    // </div>

    
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
      <br/>
      <button onClick={deleteHandler}>Delete</button>
      </div>
 </div> 
   
  );
};

export default Book;

