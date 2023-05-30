import React, { useEffect, useState } from 'react';
import Book from '../components/Books/Book';

const URL = `${process.env.REACT_APP_BASE_URL}books/all`;

interface BookData {
  _id: String,
  name: String,
  author: String,
  description: String,
  price: String,
  available: String,
  comments: [],
  image: File | string
}



const Books: React.FC = () => {
  const [books, setBooks] = useState<BookData[]>([]);
  
  
  const fetchHandler = async () => {
  try {
    const response = await fetch(URL);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Failed to fetch data');
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

  useEffect(() => {
    fetchHandler().then((data: { books: BookData[] } | null) => {
      if (data) {
        setBooks(data.books);
      }
    });
  }, []);

  const handleAddComment = (bookIndex: number) => {
    // Handle adding comment logic here
  
  };
  
  const handleDeleteComment = (bookIndex: number) => {
    // Handle adding comment logic here
  
  };
  


  console.log("books", books);

  return (
    <div className='books-container'>
     {books.map((book: BookData, i: number) => (
          <div className='book' key={i}>
         <Book book={book} />

        
        {book.comments.map((comment: CommentData) => (
        <div>
           <h4> {comment.author} </h4>
             <p> {comment.text}</p>
        </div>
        ))}
         
          <div>
            <input type='text' placeholder='Add a comment...' />
            <button onClick={() => handleAddComment(i)}>Add Comment</button>
          </div>
         
       </div>
     
     ))}
      
    </div>
  );
};

export default Books;






// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Book from '../components/Books/Book';


// const URL = `${process.env.REACT_APP_BASE_URL}books/all`;

// interface BookData {
//   _id: String,
//   name: String,
//   author: String,
//   description: String,
//   price: String,
//   available: String,
//   image: File | string
// }

// const fetchHandler = async () => {
//   const response = await axios.get(URL);
//   return response.data;
// };

// const Books: React.FC = () => {
//   const [books, setBooks] = useState<BookData[]>([]);

//   useEffect(() => {
//     fetchHandler().then((data: { books: BookData[] }) => {
//       setBooks(data.books);
//     });
//   }, []);

//   console.log(books);

//   return (
//     <div className='books-container'>
//      {books.map((book: BookData, i: number) => (
//           <div className='book' key={i}>
//             <Book book={book} />
//           </div>
//         ))}
//     </div>
//   );
// };

// export default Books;


