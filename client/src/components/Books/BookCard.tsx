import { AuthContext } from "../../contexts/AuthContext";
import BookCardModal from "./BookCardModal";
import BookModalElement from "./BookModalElement";
import React, {
  ChangeEvent,
  FormEvent,
  useState,
  useContext,
  useEffect,
  //   useReducer,
} from "react";
import { MdDeleteForever } from "react-icons/md";
import { MdComment } from "react-icons/md";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
import { ModalContext } from "../../contexts/ModalContext";

// interface UserWhoPosted {
//   _id: string;
//   email: string;
//   username: string;
//   avatar: string;
// }

// interface Comment {
//   authorId: string;
//   authorName: string;
//   authorImage: string;
//   text: string;
//   _id: string;
//   createdAt: string;
//   updatedAt: string;
// }

// interface Book {
//   _id: string;
//   userWhoPosted: UserWhoPosted;
//   image: string;
//   description: string;
//   price: string;
//   likes: string[];
//   Comments: Comment[];
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
// }
// type Image = string | File;

// interface FormData {
//   description: string;
//   price: string;
//   image: Image;
// }

interface UserWhoPosted {
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
  userWhoPosted: UserWhoPosted;
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
  bookName: string,
  userWhoPosted: string,
  description: string;
  price: string;
  available:string;
  image: Image;
  
}

interface BookCardProps {
  book: Book;
  deleteBook: (bookId: string) => void;
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
}

const BookCard = ({ book, deleteBook, setBooks }: BookCardProps) => {
  const { user } = useContext(AuthContext);
  const {
    isModalOpen,
    closeModal,
    openModal,
    modalContent,
    setModalContent,
    setModalContent2,
  } = useContext(ModalContext);

  const token = localStorage.getItem("token");
  const userId = user?._id.toString();
  const [likes, setLikes] = useState(book.likes);
  const [isFlipped, setIsFlipped] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [textInput, setTextInput] = useState("");
  // const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const [editFormData, setEditFormData] = useState<FormData>({
    bookName: "",
    userWhoPosted: "",
    description: "",
    price: "",
    available:"",
    image: "",
  });
  const fileInput = React.useRef<HTMLInputElement>(null);
  const { loading, setLoading } = useContext(AuthContext);

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
      console.log(result);
      fetchBooks();
    } catch (error) {
      console.error("Failed to fetch books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  ///////////////////////////////////////////////////////////////////////////////////////////////////
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

    if (editFormData.description !== "") {
      submitData.append("description", editFormData.description);
    }
    if (editFormData.price !== "") {
      submitData.append("price", editFormData.price);
    }
    if (editFormData.image !== "") {
      submitData.append("image", editFormData.image);
    }

    const requestOptions = {
      method: "PUT",
      headers: new Headers({
        Authorization: `Bearer ${token}`,
      }),
      body: submitData,
    };
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}books/update/${book._id}`,
        requestOptions
      );
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      const result = await response.json();
      console.log("Updated book: ", result.updatedBook);

      setIsFlipped(false);
      setEditFormData({
        bookName: "",
        userWhoPosted: "",
        description: "",
        price: "",
        available:"",
        image: "",
      });

      fetchBooks();
      setLoading(false);
    } catch (error) {
      console.error("Failed to update succulent:", error);
    }
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const handleCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setTextInput(e.target.value);
  };
  console.log(textInput);

  const handleCommentSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(textInput);
    if (!user) {
      setModalContent("Members only feature!");
      openModal();
      return;
    }

    try {
      console.log("test for submit data :", textInput);
      const submitData = new URLSearchParams();
      submitData.set("text", textInput);

      // request options
      const requestOptions = {
        method: "POST",
        headers: new Headers({
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        }),
        body: submitData,
      };

      // send a POST request to create a new comment
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}books/comments/${book._id}`,
        requestOptions
      );

      // convert the response to JSON
      const data = await response.json();

      if (!response.ok) {
        setModalContent(data.error); // set the error message as modal content
        openModal();
      }

      const newComment = data.book.Comments[data.book.Comments.length - 1];

      setComments([...comments, newComment]);
      setTextInput("");
      toggleModal([...comments, newComment]);
      fetchBooks();
    } catch (error) {
      console.error("Failed to create a comment:", error);
    }
  };

  /////////////////////////////////////////////////////////////////////////////////////////////

  const deleteCommentModal = async (bookId: string, commentId: string) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}books/delete/${bookId}/comments/${commentId}`,
        requestOptions
      );
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      const result = await response.json();
      console.log("results fetched again :>> ", result);
      const updatedComments = result.book.Comments; // this is the new book back from the server without the comment we deleted

      setComments(updatedComments);
      toggleModal(updatedComments);
      fetchBooks();
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const toggleModal = async (updatedComments: any) => {
    if (!user) {
      setModalContent("Members only feature");
      openModal();
    } else {
      setModalContent2(
        <BookModalElement
          user={user}
          book={book}
          comments={updatedComments}
          setComments={setComments}
          handleCommentSubmit={handleCommentSubmit}
          handleCommentChange={handleCommentChange}
          deleteCommentModal={deleteCommentModal}
          textInput={textInput}
        />
      );
      openModal();
    }
  };

  const addOrRemoveLike = async () => {
    // check if user exists
    if (!user) {
      setModalContent("Members only feature");
      openModal();
      return;
    }
    try {
      // Send a PUT request to the server with the succulent's ID
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}books/likes/${book._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Convert the response to JSON
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }
      setLikes(data.book.likes);

      // Handle the response data here
      fetchBooks();
    } catch (error) {
      console.error("Failed to update likes:", error);
    }
  };

  const handleDeleteBook = async () => {
    try {
      await deleteBook(book._id);
    } catch (error) {
      console.error("Failed to delete book:", error);
    }
  };
  /////////////////////////////////////////////////////////////////////////////////////
  const getAllComments = async (bookId: string) => {
    // console.log('%cbook ID',"color:blue",  booktId)
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}books/allcomments/${bookId}`,
        requestOptions
      );
      console.log("%call comments :>> ", "color:green", response);
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      const result = await response.json();
      console.log("%call comments :>> ", "color:green", result);
      const updatedComments = result.succulent.Comments; // this is the new succulent back from the server without the comment we deleted
      console.log("%call comments :>> ", "color:green", updatedComments);

      setComments(updatedComments);
      toggleModal(updatedComments);
      // toggleModal()
      // openModal();
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };
  //////////////////////////////////////////////////////////////////////////////////////

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
      <div className={`book-card-div ${isFlipped ? "flipped" : ""}`}>
        <div className="front">
          <img src={book.image} alt={book.image} className="book-card-img" />
          <p className="testclass">Description: {book.description}</p>
          <p>price: {book.price}</p>
          <p>
            Posted by: {book.userWhoPosted.username}, on:{" "}
            {new Date(book.createdAt).toLocaleDateString()}{" "}
            {new Date(book.createdAt).toLocaleTimeString()}
          </p>
          <p>
            {book.likes.length !== 0 && (
              <>
                <AiFillLike className="pt-0" /> {book.likes.length}
              </>
            )}{" "}
            {book.Comments.length !== 0 && (
              <>
                <MdComment /> {book.Comments.length}
              </>
            )}
          </p>
          <div className="book-card-buttons">
            {user && likes.includes(user._id) ? (
              <AiFillLike className="book-card-btn" onClick={addOrRemoveLike} />
            ) : (
              <AiOutlineLike
                className="book-card-btn"
                onClick={addOrRemoveLike}
              />
            )}
            {book.userWhoPosted._id === userId && (
              <MdDeleteForever
                className="book-card-btn"
                onClick={handleDeleteBook}
              />
            )}
            {book.userWhoPosted._id === userId && (
              <FaEdit className="book-card-btn" onClick={handleFlip} />
            )}
          </div>
        </div>
        <div className="back">
          {/* <p>this is the back of the Card</p> */}
          {/* <button onClick={handleFlip}>flip back</button> */}
          <RiArrowGoBackFill className="flip-back-icon" onClick={handleFlip} />

          <form onSubmit={handleEditSubmit}>
          <input
              type="text"
              name="bookName"
              value={editFormData.bookName}
              onChange={handleEditChange}
              placeholder="Book Name"
            />
            <br />
            <textarea
              name="description"
              value={editFormData.description}
              onChange={handleEditChange}
              placeholder="Description 
            (Max 120 characters)"
              maxLength={120}
              rows={4}
            />
            <br />
            <input
              type="text"
              name="price"
              value={editFormData.price}
              onChange={handleEditChange}
              placeholder="Price"
            />
            <br />
            <input
              ref={fileInput}
              type="file"
              name="image"
              onChange={handleFileChange}
              className="text-input-position-edit-from"
            />
            <br />
            <button className="custom-button" type="submit">
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default BookCard;
