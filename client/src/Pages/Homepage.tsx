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

  const getUsers = async() => {
    try {
      const response = await fetch("http://localhost:5000/api/users/all");
      const result = await response.json();
      setUsers(result);
      console.log("all users:", result)
    } catch (error) {
      console.log(error);
    }
  }

  const getUserById = async() => {
    const id = "6447a2bc1362e69f068f823b";
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
    <div>
    <h1>hello</h1>
    <h2>All users:</h2>
    { users.map((user, i) => {
      return <p key={i}>{user.username}</p>
    }) }
    <h2>User with ID: 6447a2bc1362e69f068f823b</h2>
    { user && <p>{user.username}</p> }
  </div>
  )
}

export default Homepage