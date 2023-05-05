import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './Pages/Register';

interface User {
  email: String,
  username: String,
  password: String
}

type Users = User[]

function App() {
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
    const id = "6453b80f01452f119fe12c4b";
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
    <>
    <div className="App">
      <h1>Mern_project</h1>
      <h2>All users:</h2>
      { users.map((user, i) => {
        return <p key={i}>{user.username}</p>
      }) }
      <h2>User with ID:64537a7a01452f119fe12c49</h2>
      { user && <p>{user.username}</p> }
      </div>
      <BrowserRouter>
        <Routes>
          <Route path='register' element={<Register/>}/>
        </Routes>
      </BrowserRouter>
      </>
  );
}

export default App;

