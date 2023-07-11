// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// interface ProfileProps {
//   profile: any;
// }

// const DeleteProfile: React.FC<ProfileProps> = ({ profile }) => {
//   const { _id, email, username, books, avatar } = profile;
//   // console.log("profile", profile);
//   const [isDeleted, setIsDeleted] = useState(false);

//   const deleteHandler = async () => {
//     try {
//       const response = await fetch(
//         `${process.env.REACT_APP_BASE_URL}users/delete/${_id}`,
//         {
//           method: "DELETE",
//         }
//       );

//       if (response.ok) {
//         setIsDeleted(true);
//       } else {
//         console.log("Error deleting profile:", response.status);
//       }
//     } catch (error) {
//       console.log("Error:", error);
//     }
//   };

//   if (isDeleted) {
//     return null; // Render nothing if the profile is deleted
//   }

//   return (
//     <div className="bookCard">
//       <div className="container">
//         <img src={profile?.avatar} alt="" />
//         <h3>User Name: {profile?.username}</h3>
//         <h3>Email: {profile?.email}</h3>
//         <div className="container">
//           <Link to={`/profile/${_id}`}>
//             <button>Update</button>
//           </Link>
//         </div>
//         <button onClick={deleteHandler}>Delete </button>
//         <h1>Uploaded Books</h1>
//         {profile.books &&
//           profile.books.map((book: any) => {
//             return (
//               <div>
//                 <p>{book.name}</p>
//                 {/* NOTE authors uploaded book section */}
//                 <img src={book.avatar} alt="" />
//               </div>
//             );
//           })}
//       </div>
//     </div>
//   );
// };

// export default DeleteProfile;

import React, { useState, useContext, useEffect } from "react";
import BookCard from "../Books/BookCard";
import { AuthContext } from "../../contexts/AuthContext";
import { ModalContext } from "../../contexts/ModalContext";

type Props = {};

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

const DeleteProfile = (props: Props) => {
  const { user } = useContext(AuthContext);
  const { isModalOpen, closeModal, modalContent, setModalContent } =
    useContext(ModalContext);
  const token = localStorage.getItem("token");
  const [books, setBooks] = useState<Book[]>([]);
  const userId = user?._id.toString();
  const userComments = books.filter((book) =>
    book.Comments.some((comment) => comment.authorId.toString() === userId)
  );

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

  const deleteComment = async (bookId: string, commentId: string) => {
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
      // manually remove the deleted comment from the local state.
      setBooks(
        books.map((book) => {
          if (book._id === bookId) {
            return {
              ...book,
              Comments: book.Comments.filter(
                (comment) => comment._id !== commentId
              ),
            };
          }
          return book;
        })
      );
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const dislikeBook = async (bookId: string) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}books/likes/${bookId}`,
        requestOptions
      );
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      const result = await response.json(); // If your API returns updated book data, parse it as JSON
      console.log("response:", result);

      // Update the state
      setBooks(
        books.map((book) => {
          if (book._id === bookId) {
            // replace the entire book object with the one from the server
            return result.book;
          }
          return book;
        })
      );
    } catch (error) {
      console.log("error", error);
    }
  };

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
      console.log(data.msg); // book successfully deleted!
      setBooks(books.filter((book) => book._id !== id));
      setModalContent(null); // Clear the modal content
    } catch (error) {
      console.error("Failed to delete book:", error);
    }
  };

  return (
    <div className="inner-component">
      <h1 className="profile-page-header">
        Posts &#8674; Comments &#8674; Likes
      </h1>
      <div className="history-profile-container">
        <div className="profile-succulents-container">
          {books
            .filter((book) => book.userWhoPosted._id === user?._id)
            .map((book) => (
              <BookCard
                key={book._id}
                book={book}
                deleteBook={deleteBook}
                setBooks={setBooks}
              />
            ))}
        </div>
        <hr />
        <div className="profile-comments-container">
          {userComments.length === 0 ? (
            <p>You did not comment on any book, Go and hit the keyboard</p>
          ) : (
            userComments.flatMap((book) =>
              book.Comments.filter(
                (comment) => comment.authorId.toString() === userId
              ).map((comment) => (
                <div
                  key={comment._id}
                  className="comment-card"
                  onClick={() => deleteComment(book._id, comment._id)}
                  style={{ width: "200px" }}
                >
                  <div className="book-card">
                    <img
                      src={book.image}
                      alt={book.image}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  </div>
                  <div className="comment-details">
                    <p>
                      Comment:
                      <br />
                      {comment.text}
                    </p>
                    <p>{new Date(comment.createdAt).toLocaleString()}</p>
                    <button
                      onClick={() => deleteComment(book._id, comment._id)}
                    >
                      Delete Comment
                    </button>
                  </div>
                </div>
              ))
            )
          )}
        </div>
        <hr />
        <div className="profile-likes-container">
          {books.filter((book) => userId && book.likes.includes(userId))
            .length === 0 ? (
            <p>You did not like anything yet, go an hit the like button</p>
          ) : (
            books
              .filter((book) => userId && book.likes.includes(userId))
              .map((book) => (
                <div
                  key={book._id}
                  className="like-card"
                  style={{ width: "150px", height: "150px" }}
                  onClick={() => dislikeBook(book._id)}
                >
                  <img
                    src={book.image}
                    alt={book.image}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DeleteProfile;
