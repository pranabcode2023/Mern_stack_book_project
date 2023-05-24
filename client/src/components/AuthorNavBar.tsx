import React, { useContext } from 'react'
// import { AuthContext } from '../contexts/AuthContext'
import { AuthorAuthContext } from '../contexts/AuthorAuthContext';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';



type Props = {}

const AuthorNavBar = (props: Props) => {
    const { author, login, logout } = useContext(AuthorAuthContext);

   
    
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
            <h1>Welcome {author? author.username: "guest"}</h1>
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
                {!author ? <NavLink to='/login' style={linkStyle}>Log in</NavLink> :
                            <NavLink style={linkStyle} onClick={logout} to={'/'}>Logout</NavLink>}
              </div>
        </div>

    )
}

export default AuthorNavBar








// import Button from 'react-bootstrap/Button';
// import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';

// function NavScrollExample() {
//   return (
//       <Navbar bg="light" expand="lg">
//              <div className="header">
//             <h1>Welcome {user? user.username: "guest"}</h1>
           
//         </div>
//       <Container fluid>
//         <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
//         <Navbar.Toggle aria-controls="navbarScroll" />
//         <Navbar.Collapse id="navbarScroll">
//           <Nav
//             className="me-auto my-2 my-lg-0"
//             style={{ maxHeight: '100px' }}
//             navbarScroll
//           >
//             <Nav.Link href="/">Home</Nav.Link>
//             <Nav.Link href="/books">Books</Nav.Link>
//             <Nav.Link href="//addbook">Add Book</Nav.Link>
//             <Nav.Link href="/Register">Register</Nav.Link>
//             {!user ? <NavLink to='/login'>Log in</NavLink> :
//                             <NavLink onClick={logout} to={'/'}>Logout</NavLink>}
                      
//              <NavDropdown title="Link" id="navbarScrollingDropdown">
//               <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
//               <NavDropdown.Item href="#action4">
//                 Another action
//               </NavDropdown.Item>
//               <NavDropdown.Divider />
//               <NavDropdown.Item href="#action5">
//                 Something else here
//               </NavDropdown.Item>
//             </NavDropdown>
//             <Nav.Link href="#" disabled>
//               Link
//             </Nav.Link>
//           </Nav>
//           <Form className="d-flex">
//             <Form.Control
//               type="search"
//               placeholder="Search"
//               className="me-2"
//               aria-label="Search"
//             />
//             <Button variant="outline-success">Search</Button>
//           </Form>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default NavScrollExample;

