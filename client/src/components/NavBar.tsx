import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';



type Props = {}

const NavBar = (props: Props) => {
    const { user, login, logout } = useContext(AuthContext);

   
    
    const linkStyle = {
        color: "white",
        fontSize: "25px",
        textDecoration: "bold",
        cursor: "pointer"
    };
    
    
    return (
     // <div>
    //   <h1>NavBar</h1>
    //   <h1>Welcome { user ? user.username : "guest"}</h1>
    //   <div>{user ? <p>User logged in!</p> : <p>User logged out!</p>}</div>
    //   <div>{ user ? <button onClick={logout}>Logout</button> : <Link to='/login'>Login</Link>}</div>
    //   <div>
    //     <Link to='/' >Home</Link>
    //   </div>
    // </div>
        
        <div>
            <div className="header">
            <h1>Welcome {user? user.username: "guest"}</h1>
            {/* <div>{user ? <p>User logged in!</p> : <p>User logged out!</p>}</div>
            <div>{user ? <button onClick={logout}>Logout</button> : <Link to='/login'>Login</Link>}</div> */}
                {/* <NavLink to='/' style={linkStyle}></NavLink> */}

                        {/* {!user ? <NavLink to='/login' style={linkStyle}>Log in</NavLink> :
                            <p style={linkStyle}  onClick={logout}>Logout</p>} */}
        </div>
        <div className="topnav">
                <Link to="/">Home</Link>
                <Link to="/books">Books</Link> 
                 <Link to="/addbook">Add Book</Link> 
               <Link to="/register">Register</Link>
                {/* <Link to="/login">Login</Link> */}
                {!user ? <NavLink to='/login' style={linkStyle}>Log in</NavLink> :
                            <NavLink style={linkStyle} onClick={logout} to={'/'}>Logout</NavLink>}
              </div>
        </div>

    )
}

export default NavBar


