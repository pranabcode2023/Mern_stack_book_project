// import React, { useContext } from 'react'
// import { AuthContext } from '../contexts/AuthContext'
// import { Link } from 'react-router-dom';

// type Props = {}

// const NavBar = (props: Props) => {
//     const { user, login, logout } = useContext(AuthContext);
//     return (
//         <div>
//             <h1>NavBar</h1>
//             <div>{user ? <p>User logged in!</p> : <p>User logged out!</p>}</div>
//             <div>{user ? <button onClick={logout}>Logout</button> : <Link to='/login'>Login</Link>}</div>
//             <div>
//                 <Link to='/' >Home</Link>
//             </div>
//         </div>

//     )
// }

// export default NavBar


import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
// import { Link } from 'react-router-dom';

// bootstrap

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

// import Dropdown from 'react-bootstrap/Dropdown';
// import DropdownButton from 'react-bootstrap/DropdownButton';

// bootstrap

type Props = {}
const NavBar = (props: Props) => {

   const { user, login, logout } = useContext(AuthContext);
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <h1>NavBar</h1>
                    {/* <Navbar.Brand href="/">Navbar</Navbar.Brand> */}
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/Register">Register</Nav.Link>
                        <Nav.Link href="/login">
                            <div>{user ? <button onClick={logout}>Logout</button> : <Nav.Link href="/login">Login</Nav.Link>}</div>
                        </Nav.Link>
                        {/* <div>{user ? <p>User logged in!</p> : <p>User logged out!</p>}</div>
                        <div>{user ? <button onClick={logout}>Logout</button> : <Nav.Link href="/login">Login</Nav.Link>}</div> */}
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default NavBar;


// function BasicButtonExample() {
//     const { user, login, logout } = useContext(AuthContext);
//     return (
//         <Navbar bg="dark" variant="dark">
//             <Container>
//                 <DropdownButton id="dropdown-basic-button" title="Menu">
//                     <Dropdown.Item href="/">Home</Dropdown.Item>
//                     <Dropdown.Item href="/Register">Register</Dropdown.Item>
//                     <Dropdown.Item href="/login">
//                         Login
//                         <div>{user ? <p>User logged in!</p> : <p>User logged out!</p>}</div>
//                         <div>{user ? <button onClick={logout}>Logout</button> : <Nav.Link href="/login">Login</Nav.Link>}</div>
//                     </Dropdown.Item>
//                 </DropdownButton>
//             </Container>
//         </Navbar>
//     );
// }

// export default BasicButtonExample;