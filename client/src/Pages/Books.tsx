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

interface CommentData {
  _id: String,
  author: String,
  text: String,
  createdAt: Date,
 updatedAt: Date

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

  // const handleAddComment = (bookIndex: number) => {
  //   // Handle adding comment logic here
  //   // You can access the book using `books[bookIndex]` and get the comment input value
  //   // Update the book's comments array with the new comment
  // };

    const handleAddComment = (bookIndex: number, comment: CommentData) => {
    const bookId = books[bookIndex]._id;
    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
    const urlencoded = new URLSearchParams();
    urlencoded.append("author", comment.author);
    urlencoded.append("text", comment.text);
    
    const requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: urlencoded,
    };
    
    fetch(`http://localhost:5000/api/books/commentsbook/${bookId}`, requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result);
        
        // Assuming the API response returns the updated book with the new comment,
        // you can update the books state with the updated book
        const updatedBooks = [...books];
        updatedBooks[bookIndex] = JSON.parse(result);
        setBooks(updatedBooks);
      })
      .catch(error => console.log('error', error));
  };

  const handleDeleteComment = (bookIndex: number, commentId: string) => {
    const bookId = books[bookIndex]._id;
    
    const requestOptions = {
      method: 'DELETE',
    };
    
    fetch(`http://localhost:5000/api/books/commentsbook/${bookId}/${commentId}`, requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result);
        
        // Assuming the API response returns the updated book without the deleted comment,
        // you can update the books state with the updated book
        const updatedBooks = [...books];
        updatedBooks[bookIndex] = JSON.parse(result);
        setBooks(updatedBooks);
      })
      .catch(error => console.log('error', error));
  }


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
            <button onClick={() => handleDeleteComment(i, comment._id)}>Delete Comment</button>
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


