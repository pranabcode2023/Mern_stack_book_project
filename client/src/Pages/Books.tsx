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

// interface CommentData {
//   author: string;
//   text: string;
// }

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

  // const handleAddComment = (bookIndex: number) => {
  //   const updatedBooks = [...books];
  //   const book = updatedBooks[bookIndex];
  //   const newComment: CommentData = {
  //     author: '',
  //     text: commentInput,
  //   };
  //   book.comments.push(newComment);
  //   setBooks(updatedBooks);
  //   setCommentInput('');
  // };


  
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
         
     {/* <form onSubmit={(e) => {
            e.preventDefault();
            // console.log(e.target);
          }} >
  
          <div>
            <input
              type='text'
              placeholder='Add a comment...'
            />
            <button type='submit'>
            Add Comment
          </button>
          </div>
          </form> */}
      
        </div>
      ))}
    </div>
  );
};

export default Books;
