import React, {
  useState,
  useContext,
  useEffect,
  ChangeEvent,
  FormEvent,
} from "react";
import BookCard from "../components/Books/BookCard";
import { AuthContext } from "../contexts/AuthContext";
import { ModalContext } from "../contexts/ModalContext";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faLeaf } from "@fortawesome/free-solid-svg-icons";
import { FiPlusSquare } from "react-icons/fi";
import { FiMinusSquare } from "react-icons/fi";

type Props = {};

interface Owner {
  _id: string;
  email: string;
  username: string;
  avatar: string;
}

interface Comment {
  authorId: string;
  authorName: string;
  authorImage: string;
  text: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

interface Book {
  _id: string;
  owner: Owner;
  image: string;
  description: string;
  price: string;
  likes: string[];
  Comments: Comment[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

type Image = string | File;

interface FormData {
  description: string;
  price: string;
  image: Image;
}

const Books = (props: Props) => {
  const { user } = useContext(AuthContext);
  const { isModalOpen, closeModal, modalContent, setModalContent, openModal } =
    useContext(ModalContext);
  const token = localStorage.getItem("token");
  const [books, setBooks] = useState<Book[]>([]);
  const userId = user?._id.toString();
  const userComments = books.filter((book) =>
    book.Comments.some((Comment) => Comment.authorId.toString() === userId)
  );
  const [editFormData, setEditFormData] = useState<FormData>({
    description: "",
    price: "",
    image: "",
  });
  const fileInput = React.useRef<HTMLInputElement>(null);
  const [showForm, setShowForm] = useState(false);
  const { loading, setLoading } = useContext(AuthContext);

  function scrollToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
  }

  const handleEditChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditFormData({
      ...editFormData,
      image: e.target.files ? e.target.files[0] : "",
    });
  };

  const handleEditSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const submitData = new FormData();
    submitData.append("description", editFormData.description);
    submitData.append("price", editFormData.price);
    submitData.append("image", editFormData.image);

    const requestOptions = {
      method: "POST",
      headers: new Headers({
        Authorization: `Bearer ${token}`,
      }),
      body: submitData,
    };
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}books/new`,
        requestOptions
      );
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      const result = await response.json();
      console.log(result);

      // setSucculents((prevState) =>
      //   prevState.map((succ) =>
      //     succ._id === succulent._id ? result.updatedSucculent : succ
      //   )

      setEditFormData({
        description: "",
        price: "",
        image: "",
      });
      if (fileInput.current) {
        fileInput.current.value = ""; // reset the file input
      }
      fetchBooks().then(() => {
        scrollToBottom();
      });
      setShowForm(false);
      setLoading(false);
    } catch (error) {
      console.error("Failed to update succulent:", error);
    }
  };

  const fetchBooks = async () => {
    const requestOptions = {
      method: "GET",
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}books/all`,
        requestOptions
      );
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      const result = await response.json();
      // console.log(result);
      setBooks(result);
    } catch (error) {
      console.error("Failed to fetch books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const deleteBook = async (id: string) => {
    // check if user exists
    if (!user) {
      setModalContent("Members only feature");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}books/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      // Handle the response data here
      console.log(data.msg); // Book successfully deleted!
      setBooks(books.filter((book) => book._id !== id));
      setModalContent(null); // Clear the modal content
    } catch (error) {
      console.error("Failed to delete succulent:", error);
    }
  };

  const sortBooksByLikes = () => {
    const sortedBooks = [...books].sort(
      (a, b) => b.likes.length - a.likes.length
    );
    console.log("test for sorting by likes", sortedBooks);
    setBooks(sortedBooks);
  };

  const sortBooksByComments = () => {
    const sortedBooks = [...books].sort(
      (a, b) => b.Comments.length - a.Comments.length
    );
    setBooks(sortedBooks);
  };
  // const sortAlphabeticallyBySpecies = () => {
  //   setBooks(
  //     books.slice().sort((a, b) => a.species.localeCompare(b.species))
  //   );
  // };

  const toggleFormVisibility = () => {
    if (!user) {
      setModalContent("Members only feature");
      openModal();
      return;
    }
    setShowForm((prevShowForm) => !prevShowForm);
  };

  return (
    <>
      {loading && (
        <>
          <div className="spinner">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </>
      )}
      <div className="filter-buttons-container">
        <button className="custom-button2" onClick={sortBooksByLikes}>
          Sort by likes
        </button>
        <button className="custom-button2" onClick={sortBooksByComments}>
          Sort by comments
        </button>
        {/* <button
          className="custom-button2"
          onClick={sortAlphabeticallyBySpecies}
        >
          Sort alphabetically
        </button> */}
        <button className="custom-button2" onClick={fetchBooks}>
          Default order
        </button>
      </div>
      <div>
        <h1 className="wobble-hor-bottom succulent-page-header">
          Click To Post
        </h1>
        <span>
          {showForm ? (
            <FiMinusSquare
              className="wobble-hor-bottom create-post-icon"
              onClick={toggleFormVisibility}
            />
          ) : (
            <FiPlusSquare
              className="wobble-hor-bottom create-post-icon"
              onClick={toggleFormVisibility}
            />
          )}
        </span>
        {showForm && (
          <form className="create-book-form" onSubmit={handleEditSubmit}>
            {/* <input
              type="text"
              name="species"
              value={editFormData.species}
              onChange={handleEditChange}
              placeholder="Species"
              required
            /> */}
            <br />
            <textarea
              name="description"
              value={editFormData.description}
              onChange={handleEditChange}
              placeholder="Description 
            (Max 120 characters)"
              maxLength={120}
              rows={4}
              required
            />
            <br />
            <input
              type="text"
              name="city"
              value={editFormData.price}
              onChange={handleEditChange}
              placeholder="Price"
              required
            />
            <br />
            <input
              ref={fileInput}
              type="file"
              name="img"
              onChange={handleFileChange}
              accept="image/png, image/jpg, image/jpeg"
              required
              className="text-input-position-create-succulent"
            />
            <br />
            <button className="custom-button" type="submit">
              Post
            </button>
          </form>
        )}
      </div>
      <div className="books-page-container">
        {books.map((book) => (
          <BookCard
            key={book._id}
            book={book}
            deleteBook={deleteBook}
            setBooks={setBooks}
          />
        ))}
      </div>
    </>
  );
};

export default Books;

// import React, { useEffect, useState } from "react";
// import Book from "../components/Books/Book";

// const URL = `${process.env.REACT_APP_BASE_URL}books/all`;

// interface BookData {
//   _id: string;
//   name: string;
//   user: string;
//   description: string;
//   price: string;
//   available: string;
//   comments: CommentData[];
//   avatar: File | string;
// }

// type CommentData = {
//   user: string;
//   text: string;
//   _id: string;
// };

// const Books: React.FC = () => {
//   const [books, setBooks] = useState<BookData[]>([]);

//   const fetchHandler = async () => {
//     try {
//       const response = await fetch(URL);
//       if (response.ok) {
//         const data = await response.json();
//         return data;
//       } else {
//         throw new Error("Failed to fetch data");
//       }
//     } catch (error) {
//       console.log(error);
//       return null;
//     }
//   };

//   const fetchData = async () => {
//     const data = await fetchHandler();
//     if (data) {
//       setBooks(data.books);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   console.log("books", books);

//   return (
//     <div className="books-container">
//       {books.map((book: BookData, i: number) => (
//         <div className="book" key={i}>
//           <Book book={book} />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Books;
