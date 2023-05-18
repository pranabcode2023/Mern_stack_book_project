// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Book from '../components/Book';

// const URL = "http://localhost:5000/api/books/all";

// const fetchHandler = async () => {
//     return await axios.get(URL).then((res) => res.data);
// }

// const Books = () => {
//     const [books, setBooks] = useState([]); // Updated variable name to lowercase 'books' to avoid confusion with component name

//     useEffect(() => {
//         fetchHandler().then(data => setBooks(data.books));
//     }, []);

//     console.log(books);

//     return (
//         <div>
            
//             <ul>
//                 {books && books.map((book, i) => ( // Updated variable name to lowercase 'book'
//                     <div key={i}>
//                     <Book/>
//                     </div>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default Books;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Book from '../components/Book';

const URL = "http://localhost:5000/api/books/all";

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
    <div>
      <ul>
        {books.map((book: BookData, i: number) => (
          <div key={i}>
            <Book book={book} />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Books;

