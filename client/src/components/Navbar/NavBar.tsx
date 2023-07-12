// import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
// import { AuthContext } from "../../contexts/AuthContext";
// import { useLocation } from "react-router-dom";
// import { NavLink } from "react-router-dom";

// type Props = {};

// const NavBar = (props: Props) => {
//   const { user, login, logout } = useContext(AuthContext);

//   const [formData, setFormData] = useState<SubmitLoginData>({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     login(formData.email, formData.password);
//   };

//   const useActivePath = () => {
//     const location = useLocation();
//     return location.pathname;
//   };

//   const activePath = useActivePath();

//   const linkStyle = {
//     color: "white",
//     fontSize: "25px",
//     textDecoration: "bold",
//     cursor: "pointer",
//   };

//   return (
//     <div>
//       <div className="header">
//         <h1>Welcome {user ? user.username : "guest"}</h1>

//         {user !== null ? <button onClick={logout}>Log-Out</button> : <> <form onSubmit={handleSubmit}>
//             <input type='email' name='email' placeholder='email' onChange={handleChange}/>
//             <input type='password' name='password' placeholder='password' onChange={handleChange}/>
//             <button type='submit'>Log-In</button>
//           </form></>}
//       </div>

//       <div className="topnav">
//         <NavLink className={activePath === "/" ? "active" : ""} to="/">
//           Homepage
//         </NavLink>
//         <NavLink
//           className={activePath === "/books" ? "active" : ""}
//           to="/books"
//         >
//           Books
//         </NavLink>
//         <NavLink
//           className={activePath === "/register" ? "active" : ""}
//           to="/register"
//         >
//           Register
//         </NavLink>
       
//         {!user ? (
//           <NavLink to="/login" style={linkStyle}>
//             Log in
//           </NavLink>
//         ) : (
//           <NavLink style={linkStyle} onClick={logout} to={"/"}>
//             Logout
//           </NavLink>
//         )}
//         <NavLink
//           className={activePath === "/profile" ? "active" : ""}
//           to="/profile"
//         >
//           Profile
//         </NavLink>
//       </div>
//     </div>
//   );
// };

// export default NavBar;

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
        {/* <Link to="/addbook">Add Book</Link> */}
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
