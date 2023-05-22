import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './Pages/Register';
import Homepage from './Pages/Homepage';
// import Homepage2 from './Pages/Homepage2';
import Login from './Pages/Login';
import {AuthContextProvider } from './contexts/AuthContext';
import NavBar from './components/NavBar';
import './styles.css';
import Books from './Pages/Books';
import AddBook from './Pages/AddBook';
import BookDetails from './components/BookDetails';
function App() {
  // const { user } = useContext(AuthContext);
  // console.log("active user from app",user);
  
  return (
    <AuthContextProvider>
      <BrowserRouter>
       {/* <div>{user? <p> User logged in!</p> : <p> User logged out!</p>} </div> */}
        <NavBar />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/books' element={<Books />} />
          <Route path='/addbook' element={ <AddBook/>} />
          <Route path='/register' element={ <Register /> } />
          <Route path='/login' element={<Login />} />
          <Route path='/books/:id' element={ <BookDetails /> } />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;


