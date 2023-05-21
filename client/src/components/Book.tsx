import axios from 'axios';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
  // const history = useNavigate()
  const { _id, name, author, description, price, image } = book;
  // const deleteHandler = async () => {
  //   try {
  //     await axios
  //       .delete(`http://localhost:5000/api/books/all/${_id}`)
  //       .then(res => res.data)
  //       .then(() => history("/books"));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
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

// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';



// type Props = {}

// interface BookData {
//   _id: String,
//   name: String,
//   author: String,
//   description: String,
//   price: String,
//   available: String,
//   image: String
// }

// type BookDatas = BookData[]


// const Book = (props: Props) => {
//   const [bookDatas, setBookDatas] = useState<BookDatas[]>([]);
//   const [bookData, setBookData] = useState<BookData | null>(null);


//     const getBookDatas = async () => {
//     try {
//       const response = await fetch(`${process.env.REACT_APP_BASE_URL}books/all`);
//       const result = await response.json();
//       setBookDatas(result);
//       console.log("all books:", result)
//     } catch (error) {
//       console.log(error);
//     }
//   }


  
//   const getBookDataById = async () => {
//     const id = "645a623c1682270c68965ff7";
//     try {
//       const response = await fetch(`${process.env.REACT_APP_BASE_URL}books/id/${id}`);
//       const result = await response.json();
//       console.log("single book:", result);
//       setBookData(result);
//     } catch (error) {
//       console.log(error)
//     }
//   }

  
//   useEffect(() => {
//     getBookDatas();
//     getBookDataById();
//   }, [])


//   return (

//           <div className="column middle">
//         <h2>Main Content</h2>
        
//         <h1>Mern_stack</h1>
//         {/* <button onClick={() => localStorage.setItem("myName", "pranab")}>test</button>
//         <button onClick={() => localStorage.setItem("myName", "pablo")}>test</button> */}
//         <h2>All users:</h2>
//         {bookDatas.map((bookData, i) => {
//           return <p key={i}>
//             {bookData.name}
//             <br />
//             {bookData.author}
//           </p>
//         })}
//       </div>
  
//   );
// };

// export default Book;