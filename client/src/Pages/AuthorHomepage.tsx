import React, { useEffect, useState } from 'react'
import AuthorProfile from '../components/AuthorProfile'






type Props = {}

interface Author {
  email: String,
  username: String,
  password: String,
  image: String
}

type Authors = Author[]

const AuthorHomepage = (props: Props) => {
  const [authors, setAuthors] = useState<Authors>([]);
    const [author, setAuthor] = useState<Author | null>(null);
    const [error, setError] = useState(false)

  
  const getAuthors = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/authors/all");
        const result = await response.json();
        if (!response.ok) {
            setError(result.error)
        } else {
           setAuthors(result);
        }
        console.log('response', response)
        console.log('result', result)
      
      console.log("all authors:", result)
    } catch (error) {
      console.log(error);
    }
  }


  const getAuthorById = async () => {
    const id ="646dfa8030ddfa257e002bd1";
    try {
      const response = await fetch(`http://localhost:5000/api/authors/id/${id}`);
      const result = await response.json();
      console.log("single author:", result);
      setAuthor(result);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAuthors();
    getAuthorById();
  }, [])




  return (
    // <div>
    //     <h1>Mern_stack</h1>
    //   <button onClick={() => localStorage.setItem("myName", "pranab")}>test</button>
    //   <button onClick={() => localStorage.setItem("myName", "pablo")}>test</button>
    //   <h2>All users:</h2>
    //   { users.map((user, i) => {
    //     return <p key={i}>{user.username}</p>
    //   }) }
    //   <h2>User with ID: 6447a2bc1362e69f068f823b</h2>
    //   { user && <p>{user.username}</p> }
    // </div>
    
    
    <div className="row">
      <div className="column side">
        <h2>Side</h2>
        <h2>highlights</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit..</p>
        <div className="card">
          <h1>Image.....</h1>
          {/* <img src="/w3images/jeans3.jpg" alt="Denim Jeans" style="width:100%"> */}
          <h1>Book Name.....</h1>
          <p className="price">$19.99</p>
          <p>Some text about the Book</p>
           <p><button>Add to Cart</button></p>
        </div>
      </div>
  
      <div className="column middle">
        <h2>Main Content</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Maecenas sit amet pretium urna. Vivamus venenatis velit nec neque ultricies,
          eget elementum magna tristique. Quisque vehicula, risus eget aliquam placerat,
          purus leo tincidunt eros, eget luctus quam orci in velit. Praesent scelerisque tortor sed accumsan convallis.</p>
        <h1>Mern_stack</h1>
        {/* <button onClick={() => localStorage.setItem("myName", "pranab")}>test</button>
        <button onClick={() => localStorage.setItem("myName", "pablo")}>test</button> */}
        
        <h2>All authors:</h2>
        <AuthorProfile authorId={''} />
        {authors && authors.map((author, i) => {
          return <p key={i}>
            {author.username}
            <br />
            {author.email}
          </p>
        })}
      </div>
  
      <div className="column side">
        <h2>Side</h2>
        <h2>coming soon</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit..</p>
          <div className="card">
          <h1>Image.....</h1>
          {/* <img src="/w3images/jeans3.jpg" alt="Denim Jeans" style="width:100%"> */}
          <h1>Book Name.....</h1>
          <p className="price">$19.99</p>
          <p>Some text about the Book</p>
           <p><button>Add to Cart</button></p>
        </div>
      </div>
    </div>
 
  )
};

export default AuthorHomepage;



