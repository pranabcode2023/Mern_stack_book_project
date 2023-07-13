import { AuthContext } from "../../contexts/AuthContext";
// import BookCardModal from "./BookCardModal";
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
import { serverURL } from "../../utilis/serverURL";



///testing dialog
import { useRef } from "react";

interface ExtendedHTMLDialogElement extends HTMLDialogElement {
  open: boolean;
  close: () => void;
  showModal: () => void;
}

/// testing dialog


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
  bookName:string;
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
  // available:string;
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
    // isModalOpen,
    // closeModal,
    openModal,
    // modalContent,
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
    // available:"",
    image: "",
  });
  const fileInput = React.useRef<HTMLInputElement>(null);
  const { loading, setLoading } = useContext(AuthContext);

  const [modalComments, setModalComments] = useState<Comment[]>([]);

  //NOTE - dialog for comment
  
  const dialogRef = useRef<ExtendedHTMLDialogElement>(null);
  useEffect(() => {
    const dialogElement = dialogRef.current;
    const isModalDialogOpen = sessionStorage.getItem("isModalDialogOpen");

    if (dialogElement) {
      if (isModalDialogOpen === "true" && !dialogElement.open) {
        dialogElement.showModal();
      }
    }

    return () => {
      if (dialogElement && dialogElement.open) {
        dialogElement.close();
      }
    };
  }, []);

  const openModalDialog = () => {
    const dialogElement = dialogRef.current;
    if (dialogElement && !dialogElement.open) {
      getModalComments(book._id);
      dialogElement.showModal();
      sessionStorage.setItem("isModalDialogOpen", "true");
    }
  };

  const closeModalDialog = () => {
    const dialogElement = dialogRef.current;
    if (dialogElement && dialogElement.open) {
      dialogElement.close();
      sessionStorage.removeItem("isModalDialogOpen");
    }
  };

  ////dialog test

  const fetchBooks = async () => {
    const requestOptions = {
      method: "GET",
    };

    try {
      const response = await fetch(
        // `${process.env.REACT_APP_BASE_URL}books/all`,
        `${serverURL}/api/books/all`,
        requestOptions
      );
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const result = await response.json();
      // console.log(result);
      // fetchBooks();
    
    } catch (error) {
      console.error("Failed to fetch books:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

 
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
    if (editFormData.bookName !== "") {
      submitData.append("bookName", editFormData.bookName);
    }

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
        // `${process.env.REACT_APP_BASE_URL}books/update/${book._id}`,
        `${serverURL}/api/books/update/${book._id}`,
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
        // available:"",
        image: "",
      });

      fetchBooks();
      setLoading(false);
    } catch (error) {
      console.error("Failed to update book:", error);
    }
  };

  

  const handleCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setTextInput(e.target.value);
  };
  
  // console.log(textInput);

  const handleCommentSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
 
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
        // `${process.env.REACT_APP_BASE_URL}books/comments/${book._id}`,
        `${serverURL}/api/books/comments/${book._id}`,
        requestOptions
      );
      console.log('response<<<<<<<<<<<<<<<<<', response)
      // convert the response to JSON
      const data = await response.json();
      // console.log('data<<<<<<<<<<<<<<<<<', data)
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


  const deleteCommentModal = async (bookId: string, commentId: string) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(
        // `${process.env.REACT_APP_BASE_URL}books/delete/${bookId}/comments/${commentId}`,
        `${serverURL}/api/books/delete/${bookId}/comments/${commentId}`,
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
      // Send a PUT request to the server with the book's ID
      const response = await fetch(
        // `${process.env.REACT_APP_BASE_URL}books/likes/${book._id}`,
        `${serverURL}/api/books/likes/${book._id}`,
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
 
  // const getAllComments = async (bookId: string) => {
    // console.log('%cbook ID',"color:blue",  bookId)
  //   const requestOptions = {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   };

  //   try {
  //     const response = await fetch(
  //       `${process.env.REACT_APP_BASE_URL}books/allcomments/${bookId}`,
  //       requestOptions
  //     );
  //     console.log("%call comments :>> ", "color:green", response);
  //     if (!response.ok) {
  //       throw new Error("HTTP error " + response.status);
  //     }
  //     const result = await response.json();
  //     console.log("%call comments :>> ", "color:green", result);
  //     const updatedComments = result.succulent.Comments; // this is the new succulent back from the server without the comment we deleted
  //     console.log("%call comments :>> ", "color:green", updatedComments);

  //     setComments(updatedComments);
  //     toggleModal(updatedComments);
  //     // toggleModal()
  //     openModal();
  //   } catch (error) {
  //     console.error("Failed to delete comment:", error);
  //   }
  // };

  const getModalComments = async (bookId: string) => {
    // console.log('%cbook ID',"color:blue",  bookId)
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(
        // `${process.env.REACT_APP_BASE_URL}books/allcomments/${bookId}`,
        `${serverURL}/api/books/allcomments/${bookId}`,
        requestOptions
      );
      //  console.log("%call comments :>> ", "color:green",response);
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      const result = await response.json();
      // console.log("%call comments :>> ", "color:green",result);
      const updatedComments = result.book.Comments; // this is the new book back from the server without the comment we deleted
      
      console.log("%call comments :>> ", "color:green", updatedComments);

      setModalComments(updatedComments);

      // openModal();
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  useEffect(() => {
    // console.log("%cuseEffectmodal", "color:lightblue", succulent._id);
    getModalComments(book._id);
    //eslint-disable-next-line
  }, [comments.length, modalComments.length]);

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
          <img
            src={book.image}
            alt={book.bookName}
            className="book-card-img"
          />
          <p>
            <b>
              <i>Book Name:</i>
            </b>{" "}
            {book.bookName}
          </p>
          <p className="testclass">
            <i>
              <b>Description:</b>
            </i>{" "}
            {book.description}
          </p>
          <p>
            <i>
              <b>Price: </b>
            </i>
            {book.price}
          </p>
          <p>
            <i>
              <b>Posted by: </b>
            </i>
            {book.userWhoPosted.username}, on:{" "}
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
            {/* <MdComment className="book-card-btn" onClick={toggleModal} />  */}
            {/* testing modal dialog  */}

            <MdComment
              className="book-card-btn"
              onClick={openModalDialog}
            />
            <dialog ref={dialogRef}>
              <button className="custom-button" type="submit" onClick={closeModalDialog}>Close</button>
              <>
                {user ? (
                  <>
                    <h3>Comments</h3>
                    {console.log('JSX modal "comments">>> :', modalComments)}
                    {modalComments.length > 0 ? (
                      modalComments.map((comment) => (
                        <div key={comment._id} className="single-comment-modal">
                          <img
                            src={comment.authorImage}
                            alt="profile-img-author"
                            className="comment-user-pic"
                          ></img>
                          <span>
                            {comment.authorName}: {comment.text}
                          </span>
                          <p>
                            Posted on:{" "}
                            {new Date(comment.createdAt).toLocaleDateString()}{" "}
                            {new Date(comment.createdAt).toLocaleTimeString()}
                          </p>
                          {user && comment.authorId === user._id && (
                            <MdDeleteForever
                              className="delete-icon-comment"
                              onClick={() => {
                                deleteCommentModal(book._id, comment._id);
                                // getModalComments(book._id)
                              }}
                            />
                          )}
                        </div>
                      ))
                    ) : (
                      <h4>No comments found for this post</h4>
                      // <p>No comments found for this post</p>
                    )}
                    <form onSubmit={handleCommentSubmit}>
                      <input
                        type="text"
                        name="comment"
                        placeholder="write something"
                        onChange={handleCommentChange}
                        value={textInput}
                      />
                      <br />
                      <button className="custom-button" type="submit">
                        Submit
                      </button>
                    </form>
                  </>
                ) : (
                  <p>You have to log in to comment</p>
                )}
              </>
            </dialog>

            {user && likes.includes(user._id) ? (
              <AiFillLike
                className="book-card-btn"
                onClick={addOrRemoveLike}
              />
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
          <p>Back to Front side</p> 
          <button onClick={handleFlip}>flip back</button> 
          <RiArrowGoBackFill className="flip-back-icon" onClick={handleFlip} />

          <form onSubmit={handleEditSubmit}>
            <input
              type="text"
              name="bookNmae"
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
              name="city"
              value={editFormData.price}
              onChange={handleEditChange}
              placeholder="City"
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

