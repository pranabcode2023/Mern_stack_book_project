import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar/NavBar';
import { Homepage } from './Pages/Homepage';
import Login from './Pages/Login';
import Register from './Pages/Register';
import { AuthContextProvider } from './contexts/AuthContext';

import Books from './Pages/Books';
import BookDetails from './components/Books/BookDetails';
import AddBook from './Pages/AddBook';
import Profile from './Pages/Profile';
import UpdateProfile from './components/Profile/UpdateProfile.tsx';

import './styles.css';


function App() {
  // const { user } = useContext(AuthContext);
  // console.log("active user from app",user);
  
  return (
    <AuthContextProvider>
      <BrowserRouter>
       {/* <div>{author? <p> User logged in!</p> : <p> User logged out!</p>} </div> */}
        {/* <NavBar /> */}
        <NavBar/>
        <Routes>
          <Route path='/' element={<Homepage/>} />
          <Route path='/books' element={<Books />} />
          <Route path='/books/:id' element={ <BookDetails /> } />
          <Route path='/addbook' element={ <AddBook/>} />
          <Route path='/register' element={ <Register /> } />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={
            <Profile />
         } />
           <Route path='/authors/:id' element={ <UpdateProfile /> } />
          
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;


