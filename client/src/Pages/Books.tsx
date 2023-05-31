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
