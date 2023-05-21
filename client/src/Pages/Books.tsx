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

// import React, { useEffect, useState } from 'react';

// import Book from '../components/Book';

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


// const Books = (props: Props) => {
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

// export default Books;


