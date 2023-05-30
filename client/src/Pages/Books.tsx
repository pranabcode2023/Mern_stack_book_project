// import React, { useEffect, useState } from 'react';
// import Book from '../components/Books/Book';

// const URL = `${process.env.REACT_APP_BASE_URL}books/all`;

// interface BookData {
//   _id: String,
//   name: String,
//   author: String,
//   description: String,
//   price: String,
//   available: String,
//   comments: [],
//   image: File | string
// }



// const Books: React.FC = () => {
//   const [books, setBooks] = useState<BookData[]>([]);
  
  
//   const fetchHandler = async () => {
//   try {
//     const response = await fetch(URL);
//     if (response.ok) {
//       const data = await response.json();
//       return data;
//     } else {
//       throw new Error('Failed to fetch data');
//     }
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// };

//   useEffect(() => {
//     fetchHandler().then((data: { books: BookData[] } | null) => {
//       if (data) {
//         setBooks(data.books);
//       }
//     });
//   }, []);

//   const handleAddComment = (bookIndex: number) => {
//     // Handle adding comment logic here
  
//   };
  
//   const handleDeleteComment = (bookIndex: number) => {
//     // Handle adding comment logic here
  
//   };
  


//   console.log("books", books);

//   return (
//     <div className='books-container'>
//      {books.map((book: BookData, i: number) => (
//           <div className='book' key={i}>
//          <Book book={book} />

        
//         {book.comments.map((comment: CommentData) => (
//         <div>
//            <h4> {comment.author} </h4>
//              <p> {comment.text}</p>
//         </div>
//         ))}
         
//           <div>
//             <input type='text' placeholder='Add a comment...' />
//             <button onClick={() => handleAddComment(i)}>Add Comment</button>
//           </div>
         
//        </div>
     
//      ))}
      
//     </div>
//   );
// };

// export default Books;


// import React, { useEffect, useState } from 'react';
// import Book from '../components/Books/Book';

// const URL = `${process.env.REACT_APP_BASE_URL}books/all`;

// interface BookData {
//   _id: string;
//   name: string;
//   author: string;
//   description: string;
//   price: string;
//   available: string;
//   comments: CommentData[];
//   image: File | string;
// }

// interface CommentData {
//   _id: string; // ID of the comment
//   author: string;
//   text: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

// const Books: React.FC = () => {
//   const [books, setBooks] = useState<BookData[]>([]);
//   const [commentInput, setCommentInput] = useState<string>('');

//   const fetchHandler = async () => {
//     try {
//       const response = await fetch(URL);
//       if (response.ok) {
//         const data = await response.json();
//         return data;
//       } else {
//         throw new Error('Failed to fetch data');
//       }
//     } catch (error) {
//       console.log(error);
//       return null;
//     }
//   };

//   const handleAddComment = (bookIndex: number) => {
//     const updatedBooks = [...books];
//     const book = updatedBooks[bookIndex];
//     const newComment: CommentData = {
//       _id: '', // Assign a valid comment ID
//       author: 'Your Name',
//       text: commentInput,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     };
//     book.comments.push(newComment);
//     setBooks(updatedBooks);
//     setCommentInput('');
//   };

//   const handleDeleteComment = (bookIndex: number, commentIndex: number) => {
//     const updatedBooks = [...books];
//     const book = updatedBooks[bookIndex];
//     book.comments.splice(commentIndex, 1);
//     setBooks(updatedBooks);
//   };

//   useEffect(() => {
//     fetchHandler().then((data: { books: BookData[] } | null) => {
//       if (data) {
//         setBooks(data.books);
//       }
//     });
//   }, []);

//   console.log('books', books);

//   return (
//     <div className='books-container'>
//       {books.map((book: BookData, i: number) => (
//         <div className='book' key={i}>
//           <Book book={book} />

//           {book.comments.map((comment: CommentData, commentIndex: number) => (
//             <div key={commentIndex}>
//               <h4>{comment.author}</h4>
//               <p>{comment.text}</p>
//               <button onClick={() => handleDeleteComment(i, commentIndex)}>Delete Comment</button>
//             </div>
//           ))}

//           <div>
//             <input
//               type='text'
//               placeholder='Add a comment...'
//               value={commentInput}
//               onChange={(e) => setCommentInput(e.target.value)}
//             />
//             <button onClick={() => handleAddComment(i)}>Add Comment</button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Books;


// import React, { useEffect, useState } from 'react';
// import Book from '../components/Books/Book';

// const URL = `${process.env.REACT_APP_BASE_URL}books/all`;

// interface BookData {
//   _id: string;
//   name: string;
//   author: string;
//   description: string;
//   price: string;
//   available: string;
//   comments: CommentData[]; // Updated type to include CommentData interface
//   image: File | string;
// }

// interface CommentData {
//   author: string;
//   text: string;
// }



// const Books: React.FC = () => {
//   const [books, setBooks] = useState<BookData[]>([]);
//   const [commentInput, setCommentInput] = useState<string>(''); // New state for comment input value

//   const fetchHandler = async () => {
//     try {
//       const response = await fetch(URL);
//       if (response.ok) {
//         const data = await response.json();
//         return data;
//       } else {
//         throw new Error('Failed to fetch data');
//       }
//     } catch (error) {
//       console.log(error);
//       return null;
//     }
//   };

//   const handleAddComment = (bookIndex: number) => {

//     const updatedBooks = [...books]; // Create a copy of the books array
//     const book = updatedBooks[bookIndex];
//     const newComment: CommentData = {
//       author: '', // get it from user input
//       text: commentInput,
  
//     };
//     book.comments.push(newComment); // Add the new comment to the book's comments array
//     setBooks(updatedBooks); // Update the books state with the modified array
//     setCommentInput(''); // Reset the comment input value
//   };

//   const handleDeleteComment = (bookIndex: number, commentIndex: number) => {
    
//     const updatedBooks = [...books]; //NOTE -  Create a copy of the books array
//     const book = updatedBooks[bookIndex];
//     book.comments.splice(commentIndex, 1); //NOTE - Remove the comment at the specified index
//     setBooks(updatedBooks); //NOTE -  Update the books state with the modified array
  
//   };

//   useEffect(() => {
//     fetchHandler().then((data: { books: BookData[] } | null) => {
//       if (data) {
//         setBooks(data.books);
//       }
//     });
//   }, []);

//   console.log('books', books);

//   return (
//     <div className='books-container'>
//       {books.map((book: BookData, i: number) => (
//         <div className='book' key={i}>
//           <Book book={book} />

//           {book.comments.map((comment: CommentData, commentIndex: number) => (
//             <div key={commentIndex}>
//               <h4>{comment.author}</h4>
//               <p>{comment.text}</p>
//               <button onClick={() => handleDeleteComment(i, commentIndex)}>Delete Comment</button> {/* Add delete button */}
//             </div>
//           ))}

//           <div>
//             <input
//               type='text'
//               placeholder='Add a comment...'
//               value={commentInput}
//               onChange={(e) => setCommentInput(e.target.value)} // Update the comment input value
//             />
//             <button onClick={() => handleAddComment(i)}>Add Comment</button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Books;

import React, { useEffect, useState } from 'react';
import Book from '../components/Books/Book';

const URL = `${process.env.REACT_APP_BASE_URL}books/all`;

interface BookData {
  _id: string;
  name: string;
  author: string;
  description: string;
  price: string;
  available: string;
  comments: CommentData[]; 
  image: File | string;
}

interface CommentData {
  author: string;
  text: string;
}

const Books: React.FC = () => {
  const [books, setBooks] = useState<BookData[]>([]);
  const [commentInput, setCommentInput] = useState<string>('');

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

  const handleAddComment = (bookIndex: number) => {
    const updatedBooks = [...books];
    const book = updatedBooks[bookIndex];
    const newComment: CommentData = {
      author: '',
      text: commentInput,
    };
    book.comments.push(newComment);
    setBooks(updatedBooks);
    setCommentInput('');
  };

  
  const handleDeleteComment = (bookIndex: number, commentIndex: number) => {
    const updatedBooks = [...books];
    const book = updatedBooks[bookIndex];
    book.comments.splice(commentIndex, 1); //NOTE - splice method
    setBooks(updatedBooks);
  };

  const fetchData = async () => {
    const data = await fetchHandler();
    if (data) {
      setBooks(data.books);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); 

  console.log('books', books);

  return (
    <div className='books-container'>
      {books.map((book: BookData, i: number) => (
        <div className='book' key={i}>
          <Book book={book} />

          {book.comments.map((comment: CommentData, commentIndex: number) => (
            <div key={commentIndex}>
              <h4>{comment.author}</h4>
              <p>{comment.text}</p>
              <button onClick={(e) => { e.preventDefault(); handleDeleteComment(i, commentIndex); } }>Delete Comment</button>
            </div>
          ))}

          <div>
            <input
              type='text'
              placeholder='Add a comment...'
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
            />
            <button onClick={(e) => { e.preventDefault(); handleAddComment(i); }}>Add Comment</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Books;
