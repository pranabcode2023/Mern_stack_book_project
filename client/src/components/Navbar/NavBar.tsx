import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

type Props = {};

const NavBar = (props: Props) => {
  const { user, login, logout } = useContext(AuthContext);
  // console.log('author in navbar', author)

  const linkStyle = {
    color: "white",
    fontSize: "25px",
    textDecoration: "bold",
    cursor: "pointer",
  };

  return (
    <div>
      <div className="header">
        <h1>Welcome {user ? user.username : "guest"}</h1>
      </div>

      <div className="topnav">
        <Link to="/">Home</Link>
        <Link to="/books">Books</Link>
        <Link to="/addbook">Add Book</Link>
        <Link to="/register">Register</Link>
        {!user ? (
          <NavLink to="/login" style={linkStyle}>
            Log in
          </NavLink>
        ) : (
          <NavLink style={linkStyle} onClick={logout} to={"/"}>
            Logout
          </NavLink>
        )}
        <Link to="/profile">Profile</Link>
      </div>
    </div>
  );
};

export default NavBar;

// import React, { useContext } from 'react'
// import { AuthContext } from '../../contexts/AuthContext';
// import { Link } from 'react-router-dom';
// import { NavLink } from 'react-router-dom';

// type Props = {}

// const NavBar = (props: Props) => {
//     const { author, login, logout } = useContext(AuthContext);
// // console.log('author in navbar', author)

//     const linkStyle = {
//         color: "white",
//         fontSize: "25px",
//         textDecoration: "bold",
//         cursor: "pointer"
//     };

//     return (

//         <div>
//             <div className="header">
//             <h1>Welcome {author? author.username: "guest"}</h1>
//         </div>

//      <div className="topnav">
//                 <Link to="/">Home</Link>
//                 <Link to="/books">Books</Link>
//                  <Link to="/addbook">Add Book</Link>
//                <Link to="/register">Register</Link>
//                 {!author ? <NavLink to='/login' style={linkStyle}>Log in</NavLink> :
//                     <NavLink style={linkStyle} onClick={logout} to={'/'}>Logout</NavLink>}
//                 <Link to="/profile">Profile</Link>
//               </div>
//         </div>

//     )
// }

// export default NavBar;
