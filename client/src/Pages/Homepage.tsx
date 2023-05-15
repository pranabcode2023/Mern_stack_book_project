import React, { useEffect, useState } from 'react'

type Props = {}

interface User {
  email: String,
  username: String,
  password: String
}

type Users = User[]

const Homepage = (props: Props) => {
  const [users, setUsers] = useState<Users>([]);
  const [user, setUser] = useState<User | null>(null);

  const getUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users/all");
      const result = await response.json();
      setUsers(result);
      console.log("all users:", result)
    } catch (error) {
      console.log(error);
    }
  }

  const getUserById = async () => {
    const id = "645a623c1682270c68965ff7";
    try {
      const response = await fetch(`http://localhost:5000/api/users/id/${id}`);
      const result = await response.json();
      console.log("single user:", result);
      setUser(result);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUsers();
    getUserById();
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
    //   {/* <h2>User with ID: 6447a2bc1362e69f068f823b</h2>
    //   { user && <p>{user.username}</p> } */}
    // </div>
    
    
    <div className="row">
      <div className="column side">
        <h2>Side</h2>
        <h2>highlights</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit..</p>
        <div className="card">
  {/* <img src="/w3images/jeans3.jpg" alt="Denim Jeans" style="width:100%"> */}
  <h1>Tailored Jeans</h1>
  <p className="price">$19.99</p>
  <p>Some text about the jeans. Super slim and comfy lorem ipsum lorem jeansum. Lorem jeamsun denim lorem jeansum.</p>
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
        <button onClick={() => localStorage.setItem("myName", "pranab")}>test</button>
        <button onClick={() => localStorage.setItem("myName", "pablo")}>test</button>
        <h2>All users:</h2>
        {users.map((user, i) => {
          return <p key={i}>
            {user.username}
            <br />
            {user.email}
          </p>
        })}
      </div>
  
      <div className="column side">
        <h2>Side</h2>
        <h2>coming soon</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit..</p>
        <div className="card">
  {/* <img src="/w3images/jeans3.jpg" alt="Denim Jeans" style="width:100%"> */}
  <h1>Tailored Jeans</h1>
  <p className="price">$19.99</p>
  <p>Some text about the jeans. Super slim and comfy lorem ipsum lorem jeansum. Lorem jeamsun denim lorem jeansum.</p>
  <p><button>Add to Cart</button></p>
</div>
      </div>
    </div>
  )
};

export default Homepage