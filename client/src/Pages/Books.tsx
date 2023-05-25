import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Book from '../components/Books/Book';


const URL = `${process.env.REACT_APP_BASE_URL}books/all`;

interface BookData {
  _id: String,
  name: String,
  author: String,
  description: String,
  price: String,
  available: String,
  image: File | string
}

const fetchHandler = async () => {
  const response = await axios.get(URL);
  return response.data;
};

const Books: React.FC = () => {
  const [books, setBooks] = useState<BookData[]>([]);

  useEffect(() => {
    fetchHandler().then((data: { books: BookData[] }) => {
      setBooks(data.books);
    });
  }, []);

  console.log(books);

  return (
    <div className='books-container'>
     {books.map((book: BookData, i: number) => (
          <div className='book' key={i}>
            <Book book={book} />
          </div>
        ))}
    </div>
  );
};

export default Books;




