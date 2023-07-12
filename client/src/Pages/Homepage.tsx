// import React, { useEffect, useState } from 'react';


// type Props = {};

// interface Author {
//   id: string;
//   email: string;
//   username: string;
//   password: string;
//   image: string;
// }

// type Authors = Author[];

// const AuthorHomepage = (props: Props) => {
//   const [authors, setAuthors] = useState<Authors>([]);
//   const [author, setAuthor] = useState<Author | null>(null);
//   const [error, setError] = useState(false);

//   const getAuthors = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/authors/all");
//       const result = await response.json();
//       if (!response.ok) {
//         setError(result.error);
//       } else {
//         setAuthors(result);
//       }
//       console.log('response', response);
//       console.log('result', result);

//       console.log("all authors:", result);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getAuthorById = async () => {
//     const id = "646dfa8030ddfa257e002bd1";
//     try {
//       const response = await fetch(`http://localhost:5000/api/authors/id/${id}`);
//       const result = await response.json();
//       console.log("single author:", result);
//       setAuthor(result);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getAuthors();
//     getAuthorById();
//   }, []);

//   return (
//     <div>
//       <div>
//         <h2>All authors:</h2>

//         {authors &&
//           authors.map((author, i) => {
//             return (
//               <p key={i}>
//                 {author.username}
//                 <br />
//                 {author.email}
//               </p>
//             );
//           })}
//       </div>

     
//     </div>
//   );
// };

// export default AuthorHomepage;

import React from 'react'

export const Homepage = () => {
  return (


<div className="home-page-container">
<h1>Wellcome to my Websites to Sell Books</h1>
<div className="home-page-text fadeInText">
  <h4 style={{ fontSize: "clamp(1.1rem, 2.1vw, 1.7rem)" }}>
    This is an app for book lovers where you can share your own
    book and sell book online and get review from book lovers. You can
    also add comment/favorite/likes books in your profile .hopefully 
    you all enjoy this app.
  </h4>
</div>
<div className="home-page-gif"></div>
</div>
  )
}

