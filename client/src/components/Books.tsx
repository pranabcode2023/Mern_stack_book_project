import React, { useEffect, useState } from 'react'
import axios from 'axios';

const URL = "http://localhost:5000/api/books/all";

const fetchHandler = async () => {
    return await axios.get(URL).then((res) =>res.data)
}


 const Books = () => {
    const [Books, setBooks] = useState()
useEffect(() => {

fetchHandler().then(data=>setBooks(data.books))
}, [] )

console.log(Books)
     return <div>
         <ul>
             
         </ul>
     </div>

}

export default Books;
