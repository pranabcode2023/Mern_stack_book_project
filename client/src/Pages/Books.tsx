import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Book from '../components/Book';


const URL = `${process.env.REACT_APP_BASE_URL}books/all`;

interface BookData {
  _id: any;
  name: any;
  author: any;
  description: any;
  price: any;
  available: any;
  image: any;
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
    <div className='booksmaping'>
      <ul>
        {books.map((book: BookData, i: number) => (
          <li className='book'key={i}>
            <Book book={book} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Books;

