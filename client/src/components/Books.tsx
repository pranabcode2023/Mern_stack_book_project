// import React, { useEffect, useState } from 'react'
// import axios from 'axios';

// const URL = "http://localhost:5000/api/books/all";

// const fetchHandler = async () => {
//     return await axios.get(URL).then((res) =>res.data)
// }


//  const Books = () => {
//     const [Books, setBooks] = useState()
// useEffect(() => {

// fetchHandler().then(data=>setBooks(data.books))
// }, [] )

// console.log(Books)
//      return <div>
//          <ul>
//              {Books && Books.map((Book, i) => (
//                  <div key={i}>
//                      <Book/>
//                  </div>
//              ))}
//          </ul>
//      </div>

// }

// export default Books;


import React, { useEffect, useState } from 'react';
import axios from 'axios';


const URL = "http://localhost:5000/api/books/all";

const fetchHandler = async () => {
    return await axios.get(URL).then((res) => res.data);
}

const Books = () => {
    const [books, setBooks] = useState([]); // Updated variable name to lowercase 'books' to avoid confusion with component name

    useEffect(() => {
        fetchHandler().then(data => setBooks(data.books));
    }, []);

    console.log(books);

    return (
        <div>
            
            <ul>
                {books && books.map((book, i) => ( // Updated variable name to lowercase 'book'
                    <div key={i}>
                    
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default Books;
